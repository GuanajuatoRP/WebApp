namespace GRPAuth.Settings
{
    public class JWTSettings
    {
        //public static string ValidAudience { get; set; }
        //public static string ValidIssuer { get; set; }
        public string Secret { get; set; }
        public int DurationTime { get; set; }
    }
}
