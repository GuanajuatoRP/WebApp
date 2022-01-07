using GRPAuth.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GRPAuth.Helper.Logger
{
    public class DbLogger : IGRPLogger
    {
        /*public async void LogError(string message, Exception e, string user = null)
        {
            using(var ctx = new GRPAuthContext())
            {
                var log = new Log()
                {
                    ErrorLevel = EErrorLevel.Error,
                    Timestamp = DateTime.Now,
                    User = user,
                    Message = message,
                    MessageException = e.Message,
                    TypeException = e.GetType().FullName,
                    StackTrace = e.StackTrace,
                };
                log.GenerateVerboseDetails(e);
                ctx.Logs.Add(log);
                await ctx.SaveChangesAsync();
            }
        }
        public async void LogWarning(string message, string user = null)
        {
            using (var ctx = new GuanajuatoAuthContext())
            {
                var log = new Log()
                {
                    ErrorLevel = EErrorLevel.Warning,
                    Timestamp = DateTime.Now,
                    User = user,
                    Message = message,
                };
                ctx.Logs.Add(log);
                await ctx.SaveChangesAsync();
            }
        }
        public async void LogInfo(string message, string user = null)
        {
            using (var ctx = new GuanajuatoAuthContext())
            {
                var log = new Log()
                {
                    ErrorLevel = EErrorLevel.Info,
                    Timestamp = DateTime.Now,
                    User = user,
                    Message = message,
                };
                ctx.Logs.Add(log);
                await ctx.SaveChangesAsync();
            }
        }
        public async void LogAuth(string message, string user = null)
        {
            using (var ctx = new GuanajuatoAuthContext())
            {
                var log = new Log()
                {
                    ErrorLevel = EErrorLevel.Auth,
                    Timestamp = DateTime.Now,
                    User = user,
                    Message = message,
                };
                ctx.Logs.Add(log);
                await ctx.SaveChangesAsync();
            }
        }
        public async void LogAuthError(string message, IEnumerable<IdentityError> errors, string user = null)
        {
            using (var ctx = new GuanajuatoAuthContext())
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
                ctx.Logs.Add(log);
                await ctx.SaveChangesAsync();
            }
        }*/
        public void LogAuth(string message, string user = null)
        {
            throw new NotImplementedException();
        }

        public void LogAuthError(string message, IEnumerable<IdentityError> errors, string user = null)
        {
            throw new NotImplementedException();
        }

        public void LogError(string message, Exception e, string user = null)
        {
            throw new NotImplementedException();
        }

        public void LogInfo(string message, string user = null)
        {
            throw new NotImplementedException();
        }

        public void LogWarning(string message, string user = null)
        {
            throw new NotImplementedException();
        }
    }
}
