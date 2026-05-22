using BusinessLogiclayer.Dtos;

namespace BusinessLogiclayer.ServicesContracts
{
  public interface IBrandLogoService
  {
    Task<IEnumerable<BrandLogoDto>> GetAllAsync();
    Task<BrandLogoDto?> GetByIdAsync(int id);
    Task<int?> CreateAsync(CreateUpdateBrandLogoDto dto);
    Task<int?> UpdateAsync(int id, CreateUpdateBrandLogoDto dto);
    Task<int?> DeleteAsync(int id);
  }
}
