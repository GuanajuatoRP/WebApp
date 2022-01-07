namespace GRPAuth.Models
{
    public static class UserRoles
    {
        public const string Admin = "Admin";
        public const string Moderator = "Moderator";
        public const string User = "User";

        public static string[] GetAllRoles() => new string[] { Admin, Moderator, User };
    }
}
