using GRPAuth.Data;
using GRPAuth.Helper.Logger;
using GRPAuth.Settings;
using GRPAuth.Tools;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Net;
using System.Reflection;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
#region Services

builder.Services.AddSingleton(builder.Configuration.GetSection("JWTSettings").Get<JWTSettings>());
var logger = builder.Services.AddLogging(builder.Configuration.GetSection("LoggingSettings").Get<LoggingSettings>());

builder.Services.AddControllers();
builder.Services.AddCORS(builder.Configuration);
builder.Services.AddDBServices(builder.Configuration);
builder.Services.AddJWTServices(builder.Configuration);

builder.Services.AddRepositories();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddIdentity();

#endregion


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseStaticFiles();
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        string swaggerJsonBasePath = string.IsNullOrWhiteSpace(options.RoutePrefix) ? "." : "..";
        options.SwaggerEndpoint($"{swaggerJsonBasePath}/swagger/v1/swagger.json", Assembly.GetExecutingAssembly().GetName().Name);
        options.InjectStylesheet("/swagger-ui/SwaggerDark.css");
    });
}

app.ConfigureExceptionHandler(logger);

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

public static class StartupConfig
{
    /* Configure Services */
    public static void AddRepositories(this IServiceCollection services)
    {
        //services.AddScoped<repo>();
    }
    public static IGRPLogger AddLogging(this IServiceCollection services, LoggingSettings settings)
    {
        var path = Path.Combine("/var/log", "GRPAuthLogs.txt");
        
        var logger = new FileLogger(path);
        services.AddTransient<IGRPLogger, FileLogger>((services) => logger);
        //var logger = new APILogger();
        //builder.Services.AddTransient<IGRPLogger, FileLogger>((services) => new APILogger());

        return logger;
    }
    public static void AddCORS(this IServiceCollection services, IConfiguration config)
    {
        List<string> originsAllowed = config.GetSection("CallsOrigins").Get<List<string>>();
        services.AddCors(o =>
        {
            o.AddDefaultPolicy(builder =>
            {
                builder.WithOrigins(originsAllowed.ToArray()).AllowAnyHeader().WithMethods("PUT", "DELETE", "GET", "POST").Build();
            });
        });
    }
    public static void AddJWTServices(this IServiceCollection services, IConfiguration config)
    {
        var jwtSettings = config.GetSection("JWTSettings").Get<JWTSettings>();
        services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(x =>
        {
            x.RequireHttpsMetadata = false;
            x.SaveToken = true;
            x.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                ValidateIssuer = true,
                ValidateAudience = true,
                //ValidAudience = jwtSettings.ValidAudience,
                //ValidIssuer = jwtSettings.ValidIssuer,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret)),
                ValidateLifetime = true,
                RoleClaimType = "Roles",
                NameClaimType = "Name",
            };
        });

    }
    public static void AddSwaggerServices(this IServiceCollection services)
    {
        var xmlPath = $"{AppContext.BaseDirectory}{Assembly.GetExecutingAssembly().GetName().Name}.XML";
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = Assembly.GetExecutingAssembly().GetName().Name, Version = "v1" });
            c.IncludeXmlComments(xmlPath);
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = "JWT Authorization header using the Bearer scheme.",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Scheme = "bearer",
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT"
            });
            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
                    },
                    new string [] {}
                }
            });
        });
    }
    public static void AddDBServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddDbContext<GRPAuthContext>(options => options.UseSqlServer(config.GetConnectionString("GRPAuth")));
    }

    public static void AddIdentity(this IServiceCollection services)
    {
        services.AddIdentity<GRPUser, IdentityRole>(options =>
        {
            options.SignIn.RequireConfirmedAccount = true;
            
            options.ClaimsIdentity.RoleClaimType = "Roles";
            options.ClaimsIdentity.UserNameClaimType = "Name";
            options.ClaimsIdentity.EmailClaimType = "Email";

            //Password
            options.Password.RequireDigit = true;
            options.Password.RequireLowercase = true;
            options.Password.RequireUppercase = true;
            options.Password.RequireNonAlphanumeric = true;
            options.Password.RequiredLength = 6;
            options.Password.RequiredUniqueChars = 1;

            //Lockout
            options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
            options.Lockout.MaxFailedAccessAttempts = 5;
            options.Lockout.AllowedForNewUsers = true;

            //User settings
            options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
            options.User.RequireUniqueEmail = false;
        })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<GRPAuthContext>();

    }


    /* Configure */
    public static void ConfigureExceptionHandler(this IApplicationBuilder app, IGRPLogger logger)
    {
        app.UseExceptionHandler(appError =>
        {
            appError.Run(async context =>
            {
                var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                if (contextFeature != null)
                {
                    context.Response.ContentType = "text/html; charset=utf-8";
                    string message = string.Empty;
                    var user = context?.User?.Identity?.Name ?? "Unknown User";
                    if (contextFeature.Error is ServiceException se)
                    {
                        context.Response.StatusCode = (int)se.StatusCode;
                        message = se.Message;

                        logger.LogWarning($"{se.Message}", user);
                    }
                    else
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        message = "Internal Server Error.";

                        logger.LogError($"Internal Server Error - {contextFeature.Error.Message}", contextFeature.Error, user);
                    }

                    await context.Response.WriteAsync(message);
                }
            });
        });
    }
}