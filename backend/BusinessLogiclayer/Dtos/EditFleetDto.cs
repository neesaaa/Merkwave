using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace BusinessLogiclayer.Dtos
{
  public class EditFleetDto
  {
    public string NameEn { get; set; } = string.Empty;
    public string NameAr { get; set; } = string.Empty;

    public string DescriptionEn { get; set; } = string.Empty;
    public string DescriptionAr { get; set; } = string.Empty;

    public string DetailedDescriptionEn { get; set; } = string.Empty;
    public string DetailedDescriptionAr { get; set; } = string.Empty;

    /// <summary>Optional — if provided, replaces the existing image.</summary>
    public IFormFile? Image { get; set; }

    /// <summary>Optional — if provided, replaces the existing 3D model file.</summary>
    public IFormFile? Model3D { get; set; }

    public List<CreateFleetFeatureDto> Features { get; set; } = new();
  }
}
