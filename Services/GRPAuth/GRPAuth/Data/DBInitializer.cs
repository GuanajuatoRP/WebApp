using GRPAuth.Models;
using Microsoft.AspNetCore.Identity;

namespace GRPAuth.Data
{
    public class DBInitializer
    {
        public static async Task<bool> Initialize(GRPAuthContext context, UserManager<GRPUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            context.Database.EnsureCreated();


            if (context.Roles.Any() || context.Users.Any()) return false;


            //Adding roles
            var roles = UserRoles.GetAllRoles();

            foreach (var role in roles)
            {
                if(!await roleManager.RoleExistsAsync(role))
                {
                    var resultAddRole = await roleManager.CreateAsync(new IdentityRole(role));
                    if (!resultAddRole.Succeeded)
                        throw new ApplicationException("Adding role '" + role + "' failed with error(s): " + resultAddRole.Errors);
                }
            }

            //create admin
            var admin = new GRPUser()
            {
                UserName = "kilarn123",
                Email = "297855909592563723",
                EmailConfirmed = true,
            };

            string pwd = "NMdRx$HqyT8jX6";

            var resultAddUser = await userManager.CreateAsync(admin, pwd);
            if (!resultAddUser.Succeeded)
                throw new ApplicationException("Adding user '" + admin.UserName + "' failed with error(s): " + resultAddUser.Errors);

            var resultAddRoleToUser = await userManager.AddToRoleAsync(admin, UserRoles.Admin);
            if (!resultAddRoleToUser.Succeeded)
                throw new ApplicationException("Adding user '" + admin.UserName + "' to role '" + UserRoles.Admin + "' failed with error(s): " + resultAddRoleToUser.Errors);


            await context.SaveChangesAsync();

            return true;
        }
    }
}
