using GRPAuth.Data;
using GRPAuth.Helper.Logger;
using GRPAuth.Models;
using GRPAuth.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GRPAuth.Controllers
{
    [Route("")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly GRPAuthContext context;
        private readonly UserManager<GRPUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;
        private readonly IGRPLogger logger;
        private readonly JWTSettings jwtSettings;

        public AuthController(GRPAuthContext context, UserManager<GRPUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IGRPLogger logger, JWTSettings jwtSettings)
        {
            this.context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
            this.logger = logger;
            this.jwtSettings = jwtSettings;
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim("Name", user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("DiscordID", user.Email),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim("Roles", userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret));

                var token = new JwtSecurityToken(
                    //issuer: JWTSettings.ValidIssuer,
                    //audience: JWTSettings.ValidAudience,
                    expires: DateTime.Now.AddMinutes(jwtSettings.DurationTime),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            logger.LogAuth($"{model.Username} a tenté de se connecter avec le mauvais mot de passe", model.Username);
            return Unauthorized();
        }

        /// <summary>
        /// appelé par le bot lorsqu'un user execute la commande /register
        /// </summary>
        /// <param name="model"></param>
        /// <returns>token</returns>
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
            {
                logger.LogAuth("Un utilisateur a tenté de créer un utilisateur existant déjà", model.Username);
                return BadRequest(new Response { Status = ResponseStatus.Error, Message = "L'utilisateur existe déjà" });
            }

            GRPUser user = new GRPUser()
            {
                Email = model.DiscordId,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };

            var result = await userManager.CreateAsync(user);
            if (!result.Succeeded)
            {
                logger.LogAuthError("Une erreur est survenue lors de la création de l'utilisateur", result.Errors, model.Username);
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = ResponseStatus.Error, Message = "Impossible de créer l'utilisateur, une erreur est survenue" });
            }


            var registrationToken = await userManager.GenerateEmailConfirmationTokenAsync(user);
            logger.LogAuth($"Utilisateur {model.Username} avec le DiscordId {model.DiscordId} a été enregistré", model.Username);

            return Ok(new Response { Status = ResponseStatus.Success, Message = registrationToken });
        }

        [HttpPost]
        [Route("UserExist")]
        public async Task<IActionResult> UserExist([FromBody] UserExistModel model)
        {
            var userExists = await userManager.FindByIdAsync(model.DiscordId);
            if (userExists == null)
            {
                logger.LogAuth($"L'utilisateur ayant le DiscordId {model.DiscordId} n'existe pas");
                return BadRequest(new Response { Status = ResponseStatus.Error, Message = $"L'utilisateur ayant le DiscordId {model.DiscordId} n'existe pas" });
            } else
            {
                logger.LogAuth($"Utilisateur ayant le DiscordId {model.DiscordId} existe");
                return Ok(new Response { Status = ResponseStatus.Success, Message = "L'utilisateur existe" });
            }
        }

        [HttpDelete]
        [Route("DeleteUser/{discordId}")]
        public async Task<IActionResult> DeleteUser([FromRoute] string discordId)
        {
            var user = await userManager.FindByEmailAsync(discordId);
            if(user != null)
                await userManager.DeleteAsync(user);

            return Ok();
        }

        [HttpPost]
        [Route("ConfirmDiscord")]
        public async Task<IActionResult> ConfirmDiscord([FromBody] ConfirmDiscordModel model)
        {
            if (model.DiscordId == null || model.Code == null || model.Password == null)
                return BadRequest(new Response { Status = ResponseStatus.Error, Message = "Nom d'utilisateur ou Code invalide" });

            var user = await userManager.FindByEmailAsync(model.DiscordId);
            if (user == null)
                return BadRequest(new Response { Status = ResponseStatus.Error, Message = "Nom d'utilisateur invalide" });


            var result = await userManager.AddPasswordAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new Response { Status = ResponseStatus.Error, Message = "Le compte discord a déjà un mot de passe" });
            }

            if (user.EmailConfirmed) return Ok(new Response { Status = ResponseStatus.Warning, Message = "Le compte discord a déjà été validé" });
            await userManager.ConfirmEmailAsync(user, model.Code);

            logger.LogAuth($"{model.DiscordId} a confirmé son compte discord", model.DiscordId);
            return Ok(new Response { Status = ResponseStatus.Success, Message = "Le compte discord a été validé avec succès" });
        }

        [HttpPost]
        [Route("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
        {
            var user = await userManager.FindByEmailAsync(model.DiscordId);
            if (user == null || !(await userManager.IsEmailConfirmedAsync(user)))
            {
                return BadRequest(new Response { Status = ResponseStatus.Error, Message = "L'utilisateur n'a pas été trouvé ou n'a pas été confirmé" });
            }

            var code = await userManager.GeneratePasswordResetTokenAsync(user);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

            logger.LogAuth($"Code de reset de mot de passe généré avec succès pour {user.UserName}", user.UserName);
            //return Ok(new Response { Status = ResponseStatus.Success, Message = code });
            return Ok(new Response { Status = ResponseStatus.Success, Message = "Le code vous a été envoyé par message privé sur Discord par GuanajuatoBot" });
        }

        [HttpPost]
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            var user = await userManager.FindByEmailAsync(model.DiscordId);
            if (user == null)
            {
                return BadRequest(new Response { Status = ResponseStatus.Error, Message = "L'utilisateur n'a pas été trouvé" });
            }
            var result = await userManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (!result.Succeeded)
            {
                logger.LogAuthError("Une erreur est survenue lors de la création de l'utilisateur", result.Errors, user.UserName);
                return BadRequest(new Response { Status = ResponseStatus.Error, Message = "Impossible de réinitialiser le mot de passe, code incorrect" });
            }
            logger.LogAuth("Mot de passe réinitialisé avec succès", user.UserName);
            return Ok(new Response { Status = ResponseStatus.Success, Message = "Le mot de passe à été réinitialisé avec succès" });
        }

        [HttpPost]
        [Route("Initialize")]
        public async Task<IActionResult> Initialize()
        {
            var result = await DBInitializer.Initialize(context, userManager, roleManager);
            var resultMessage = $"Initialisation DB : {(result ? "Succès" : "DB existe déja")}";

            logger.LogAuth(resultMessage);
            return Ok(new Response { Status = ResponseStatus.Success, Message = resultMessage });
        }
    }
}
