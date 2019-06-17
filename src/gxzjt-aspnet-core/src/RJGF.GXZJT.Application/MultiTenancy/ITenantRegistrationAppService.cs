using Abp.Application.Services;
using RJGF.GXZJT.MultiTenancy.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RJGF.GXZJT.MultiTenancy
{
    public interface ITenantRegistrationAppService: IApplicationService
    {
        Task<TenantDto> RegisterTenant(CreateTenantDto input);
    }
}
