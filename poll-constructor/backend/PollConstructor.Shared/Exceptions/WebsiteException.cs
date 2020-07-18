using System.Runtime.Serialization;
using PollConstructor.Shared.Enums;
namespace PollConstructor.Shared.Exceptions
{
    public class WebsiteException : ApiException
    {
        public WebsiteException(string message) : base(ResponseCode.UnexpectedError, message)
        { }

        public WebsiteException(SerializationInfo info, StreamingContext context) : base(info, context)
        { }
    }
}
