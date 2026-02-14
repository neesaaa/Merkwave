using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string Slug { get; set; } = string.Empty;
        public string TitleEn { get; set; } = string.Empty;
        public string TitleAr { get; set; } = string.Empty;
        public string ClientName { get; set; } = string.Empty;
        public DateTime ProjectDate { get; set; } 
        public ProjectCategory Category { get; set; } = ProjectCategory.WebDevelopment;
        public string ImageUrl { get; set; } = string.Empty;
        public string DemoUrl { get; set; } = string.Empty;
    }
}
