using System.ComponentModel.DataAnnotations;

namespace RJGF.GXZJT.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}