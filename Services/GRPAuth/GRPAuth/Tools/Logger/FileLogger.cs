using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GRPAuth.Helper.Logger
{
    public class FileLogger : IGRPLogger
    {
        private readonly string FILENAME;
        
        public FileLogger(string path)
        {
            FILENAME = path;
        }
        
        public async void LogError(string message, Exception e, string user = null)
        {
            var log = new Log()
            {
                ErrorLevel = EErrorLevel.Error,
                Timestamp = DateTime.Now,
                User = user,
                Message = message,
                MessageException = e?.Message ?? string.Empty,
                TypeException = e?.GetType()?.FullName ?? string.Empty,
                StackTrace = e?.StackTrace ?? string.Empty,
            };
            log.GenerateVerboseDetails(e);
            await File.AppendAllLinesAsync(FILENAME, log.GetLines(true));
        }
        public async void LogWarning(string message, string user = null)
        {
            var log = new Log()
            {
                ErrorLevel = EErrorLevel.Warning,
                Timestamp = DateTime.Now,
                User = user,
                Message = message,
            };
            await File.AppendAllLinesAsync(FILENAME, log.GetLines(false));
        }
        public async void LogInfo(string message, string user = null)
        {
            var log = new Log()
            {
                ErrorLevel = EErrorLevel.Info,
                Timestamp = DateTime.Now,
                User = user,
                Message = message,
            };
            await File.AppendAllLinesAsync(FILENAME, log.GetLines(false));
        }
        public async void LogAuth(string message, string user = null)
        {
            var log = new Log()
            {
                ErrorLevel = EErrorLevel.Auth,
                Timestamp = DateTime.Now,
                User = user,
                Message = message,
            };
            await File.AppendAllLinesAsync(FILENAME, log.GetLines(false));
        }
        public async void LogAuthError(string message, IEnumerable<IdentityError> errors, string user = null)
        {
            var log = new Log()
            {
                ErrorLevel = EErrorLevel.Auth,
                Timestamp = DateTime.Now,
                User = user,
                Message = message,
                MessageException = string.Concat(errors.Select(c => $"{c.Code} {c.Description}\n")),
                TypeException = "Authentification error",
            };
            await File.AppendAllLinesAsync(FILENAME, log.GetLines(false));
        }
    }
}
