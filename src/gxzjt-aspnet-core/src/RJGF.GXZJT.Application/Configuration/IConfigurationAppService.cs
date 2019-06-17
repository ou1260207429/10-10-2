using System.Threading.Tasks;
using RJGF.GXZJT.Configuration.Dto;

namespace RJGF.GXZJT.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
