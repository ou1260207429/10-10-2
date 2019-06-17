using Abp.Authorization;
using RJGF.GXZJT.Authorization.Roles;
using RJGF.GXZJT.Authorization.Users;

namespace RJGF.GXZJT.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
