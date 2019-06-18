using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using RJGF.GXZJT.Configuration;

namespace RJGF.GXZJT.Web.Host.Startup
{
    [DependsOn(
       typeof(GXZJTWebCoreModule))]
    public class GXZJTWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public GXZJTWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(GXZJTWebHostModule).GetAssembly());
        }
    }
}
