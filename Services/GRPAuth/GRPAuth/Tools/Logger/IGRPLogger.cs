using Microsoft.AspNetCore.Identity;

namespace GRPAuth.Helper.Logger
{
    public interface IGRPLogger
    {
        public void LogError(string message, Exception e, string user = null);
        public void LogWarning(string message, string user = null);
        public void LogInfo(string message, string user = null);
        public void LogAuth(string message, string user = null);
        public void LogAuthError(string message, IEnumerable<IdentityError> errors, string user = null);
    }
}
