using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using RJGF.GXZJT.Authorization;

namespace RJGF.GXZJT
{
    [DependsOn(
        typeof(GXZJTCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class GXZJTApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<GXZJTAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(GXZJTApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddProfiles(thisAssembly)
            );
        }
    }
}
