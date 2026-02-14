using BusinessLogiclayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace BusinessLogiclayer.Dtos
{
    public class CreateUpdateDto
    {
        public string Slug { get; set; } = string.Empty;
        public string TitleEn { get; set; } = string.Empty;
        public string TitleAr { get; set; } = string.Empty;
        public string ClientName { get; set; } = string.Empty;
        public DateTime ProjectDate { get; set; } 
        public string Category { get; set; } = string.Empty;
        public IFormFile? Image { get; set; }
        public string DemoUrl { get; set; } = string.Empty;
    }
}
