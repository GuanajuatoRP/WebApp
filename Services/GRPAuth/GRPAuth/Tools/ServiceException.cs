using System.Net;

namespace GRPAuth.Tools
{
    public class ServiceException : Exception
    {
        public HttpStatusCode StatusCode { get; set; }
        public ServiceException(string message, HttpStatusCode statusCode) : base(message)
        {
            StatusCode = statusCode;
        }
        public ServiceException(HttpStatusCode statusCode) : base(string.Empty)
        {
            StatusCode = statusCode;
        }
    }
}
