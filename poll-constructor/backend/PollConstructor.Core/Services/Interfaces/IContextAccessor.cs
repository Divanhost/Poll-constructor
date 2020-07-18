namespace PollConstructor.Core.Services.Interfaces
{
    public interface IContextAccessor
    {
        string RootPath
        {
            get;
        }
        int GetUserId();
        bool IsUserInRole(string role);
    }
}
