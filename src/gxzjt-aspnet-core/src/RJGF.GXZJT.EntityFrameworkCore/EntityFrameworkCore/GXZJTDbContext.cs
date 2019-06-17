using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using RJGF.GXZJT.Authorization.Roles;
using RJGF.GXZJT.Authorization.Users;
using RJGF.GXZJT.MultiTenancy;

namespace RJGF.GXZJT.EntityFrameworkCore
{
    public class GXZJTDbContext : AbpZeroDbContext<Tenant, Role, User, GXZJTDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public GXZJTDbContext(DbContextOptions<GXZJTDbContext> options)
            : base(options)
        {
        }
    }
}
