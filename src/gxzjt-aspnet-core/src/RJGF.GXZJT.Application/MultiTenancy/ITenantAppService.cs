using Abp.Application.Services;
using Abp.Application.Services.Dto;
using RJGF.GXZJT.MultiTenancy.Dto;

namespace RJGF.GXZJT.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

