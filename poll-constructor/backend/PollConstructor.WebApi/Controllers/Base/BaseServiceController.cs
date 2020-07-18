namespace PollConstructor.Web.Controllers
{
    public class BaseServiceController<TService> : BaseController
    {
        protected TService _service;

        protected BaseServiceController(TService service) : base()
        {
            _service = service;
        }
    }
}