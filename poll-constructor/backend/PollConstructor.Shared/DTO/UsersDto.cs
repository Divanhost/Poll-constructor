namespace PollConstructor.Shared.DTO
{
    public class UserDto
    {
        public int Id
        {
            get;
            set;
        }
        public string UserName
        {
            get;
            set;
        }
        public string Email
        {
            get;
            set;
        }
        public string NewPassword
        {
            get;
            set;
        }
        public string OldPassword
        {
            get;
            set;
        }

        public string[] Roles
        {
            get;
            set;
        }
    }
}
