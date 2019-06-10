using System.Threading.Tasks;
using Abp.Application.Services;
using RJGF.GXZJT.Sessions.Dto;

namespace RJGF.GXZJT.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
