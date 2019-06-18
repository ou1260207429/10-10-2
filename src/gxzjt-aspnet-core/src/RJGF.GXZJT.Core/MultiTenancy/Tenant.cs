using Abp.MultiTenancy;
using RJGF.GXZJT.Authorization.Users;

namespace RJGF.GXZJT.MultiTenancy
{
    public class Tenant : AbpTenant<User>
    {
        public Tenant()
        {            
        }

        public Tenant(string tenancyName, string name)
            : base(tenancyName, name)
        {
        }
    }
}
