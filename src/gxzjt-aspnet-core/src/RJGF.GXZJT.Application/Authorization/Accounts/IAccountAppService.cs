using System.Threading.Tasks;
using Abp.Application.Services;
using RJGF.GXZJT.Authorization.Accounts.Dto;

namespace RJGF.GXZJT.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
