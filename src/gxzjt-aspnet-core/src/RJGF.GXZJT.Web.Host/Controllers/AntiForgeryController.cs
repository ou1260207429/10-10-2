using Microsoft.AspNetCore.Antiforgery;
using RJGF.GXZJT.Controllers;

namespace RJGF.GXZJT.Web.Host.Controllers
{
    public class AntiForgeryController : GXZJTControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
