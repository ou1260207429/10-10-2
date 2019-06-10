using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using RJGF.GXZJT.Configuration.Dto;

namespace RJGF.GXZJT.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : GXZJTAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
