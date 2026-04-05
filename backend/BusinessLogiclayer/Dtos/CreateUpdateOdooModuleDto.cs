using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.Dtos
{
  public class CreateUpdateOdooModuleDto
  {
    public string NameAr { get; set; } = string.Empty;
    public string NameEn { get; set; } = string.Empty;
    public string DescriptionAr { get; set; } = string.Empty;
    public string DescriptionEn { get; set; } = string.Empty;
    public string DetailedDescriptionAr { get; set; } = string.Empty;
    public string DetailedDescriptionEn { get; set; } = string.Empty;
    public IFormFile? Image { get; set; }
  }
}
