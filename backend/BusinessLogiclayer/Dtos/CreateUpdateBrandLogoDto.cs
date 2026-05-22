using Microsoft.AspNetCore.Http;

namespace BusinessLogiclayer.Dtos
{
  public class CreateUpdateBrandLogoDto
  {
    public string Name { get; set; } = string.Empty;
    public string AltText { get; set; } = string.Empty;
    public IFormFile? Image { get; set; }
  }
}
