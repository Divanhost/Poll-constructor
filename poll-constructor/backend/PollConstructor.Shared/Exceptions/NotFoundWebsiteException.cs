using PollConstructor.Shared.Enums;
namespace PollConstructor.Shared.Exceptions
{
    public class NotFoundWebsiteException : ApiException
    {
        public NotFoundWebsiteException(string message) : base(ResponseCode.NotFound, message)
        { }
    }
}
