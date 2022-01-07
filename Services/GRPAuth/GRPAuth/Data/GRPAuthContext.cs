using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GRPAuth.Data
{
    public class GRPAuthContext : IdentityDbContext<GRPUser>
    {
        public GRPAuthContext() { }
        public GRPAuthContext(DbContextOptions<GRPAuthContext> options) : base(options)
        {
            Database.Migrate();
        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
