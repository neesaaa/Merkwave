using BusinessLogiclayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.Dtos
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Slug { get; set; } = string.Empty;
        public string TitleEn { get; set; } = string.Empty;
        public string TitleAr { get; set; } = string.Empty;
        public string ClientName { get; set; } = string.Empty;
        public DateTime ProjectDate { get; set; }
        public string Category { get; set; } = string.Empty;
        public string CategoryAr { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty;
        public string DemoUrl { get; set; } = string.Empty;
    }
}
