using Abp.AutoMapper;
using RJGF.GXZJT.Authentication.External;

namespace RJGF.GXZJT.Models.TokenAuth
{
    [AutoMapFrom(typeof(ExternalLoginProviderInfo))]
    public class ExternalLoginProviderInfoModel
    {
        public string Name { get; set; }

        public string ClientId { get; set; }
    }
}
