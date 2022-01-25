namespace GRPAuth.Models
{
    public struct LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public struct RegisterModel
    {
        public string Username { get; set; }
        public string DiscordId { get; set; }
    }
    public struct UserExistModel
    {
        public string DiscordId { get; set; }
    }
    public struct ConfirmDiscordModel
    {
        public string DiscordId { get; set; }
        public string Code { get; set; }
        public string Password { get; set; }
    }
    public struct ResetPasswordModel
    {
        public string DiscordId { get; set; }
        public string Code { get; set; }
        public string Password { get; set; }
    }
    public struct ForgotPasswordModel
    {
        public string DiscordId { get; set; }
    }
}
