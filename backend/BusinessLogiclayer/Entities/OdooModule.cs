using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.Entities
{
  public class OdooModule
  {
    public int Id { get; set; }
    public string NameAr { get; set; } = string.Empty;
    public string NameEn { get; set; } = string.Empty;
    public string DescriptionAr { get; set; } = string.Empty;
    public string DescriptionEn { get; set; } = string.Empty;
    public string DetailedDescriptionAr { get; set; } = string.Empty;
    public string DetailedDescriptionEn { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
  }
}
