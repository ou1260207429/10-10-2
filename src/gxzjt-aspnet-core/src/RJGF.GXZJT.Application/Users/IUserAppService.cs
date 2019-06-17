using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using RJGF.GXZJT.Roles.Dto;
using RJGF.GXZJT.Users.Dto;

namespace RJGF.GXZJT.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedUserResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);
    }
}
