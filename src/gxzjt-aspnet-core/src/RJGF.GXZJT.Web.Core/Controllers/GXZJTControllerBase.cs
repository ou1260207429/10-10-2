using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace RJGF.GXZJT.Controllers
{
    public abstract class GXZJTControllerBase: AbpController
    {
        protected GXZJTControllerBase()
        {
            LocalizationSourceName = GXZJTConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
