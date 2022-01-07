using System;
using System.Text;

namespace GRPAuth.Helper.Logger
{
    public class Log
    {
        public long Id { get; set; }
        public EErrorLevel ErrorLevel { get; set; }
        public DateTime Timestamp { get; set; }
        public string User { get; set; }
        public string Message { get; set; }

        public string MessageException { get; set; }
        public string TypeException { get; set; }
        public string StackTrace { get; set; }
        public string VerboseDetails { get; set; }

        public void GenerateVerboseDetails(Exception e)
        {
            VerboseDetails = GenerateLinesForVerboseDetails(e);

        }
        private string GenerateLinesForVerboseDetails(Exception e)
        {
            return
$@"Message : {e.Message}

Type : {e.GetType().FullName}

StackTrace:
{e.StackTrace}

Inner Exception:
{(e.InnerException != null ? GenerateLinesForVerboseDetails(e.InnerException) : "none")}";
        }

        public string[] GetLines(bool verbose = false)
        {
            StringBuilder builder = new StringBuilder();
            builder.Append("Timestamp : ").Append(Timestamp.ToString("F")).AppendLine();
            builder.Append("User : ").Append(User).AppendLine();
            builder.Append("Message : ").Append(Message).AppendLine();
            builder.Append("Exception Message : ").Append(MessageException).AppendLine();
            builder.Append("Type Exception : ").Append(TypeException).AppendLine();
            builder.Append("StackTrace : ").Append(StackTrace).AppendLine();
            if(verbose) builder.Append("Verbose : ").Append(VerboseDetails).AppendLine();

            return builder.ToString().Split(Environment.NewLine);
        }
    }

    public enum EErrorLevel
    {
        Error, Warning, Info, Auth
    }
}
