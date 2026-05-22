using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.Entities
{
  public class Testimonial
  {
    public int Id { get; set; }

    public int Rating { get; set; }

    public string TextEn { get; set; } = string.Empty;
    public string TextAr { get; set; } = string.Empty;

    public string ClientNameEn { get; set; } = string.Empty;
    public string ClientNameAr { get; set; } = string.Empty;

    public string ClientPositionEn { get; set; } = string.Empty;
    public string ClientPositionAr { get; set; } = string.Empty;

    public string Avatar { get; set; } = string.Empty;
  }
}
