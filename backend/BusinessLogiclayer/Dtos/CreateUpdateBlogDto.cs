using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.Dtos
{
    public class CreateUpdateBlogDto
    {
        public string TitleEn { get; set; } = string.Empty;
        public string TitleAr { get; set; } = string.Empty;

        public string DescriptionEn { get; set; } = string.Empty;
        public string DescriptionAr { get; set; } = string.Empty;

        public string DetailedDescriptionEn { get; set; } = string.Empty;
        public string DetailedDescriptionAr { get; set; } = string.Empty;

        public IFormFile? Image { get; set; }

        public string Creator { get; set; } = string.Empty;

        public DateTime BlogDate { get; set; }
    }
}
