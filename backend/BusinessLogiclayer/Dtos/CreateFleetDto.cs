using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.Dtos
{
    public class CreateFleetDto
    {
        public string NameEn { get; set; } = string.Empty;
        public string NameAr { get; set; } = string.Empty;

        public string DescriptionEn { get; set; } = string.Empty;
        public string DescriptionAr { get; set; } = string.Empty;

        public string? DetailedDescriptionEn { get; set; }
        public string? DetailedDescriptionAr { get; set; }

        public IFormFile? Image { get; set; }
        public IFormFile? Model3D { get; set; }

        public List<CreateFleetFeatureDto>? Features { get; set; }
    }
}
