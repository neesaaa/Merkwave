using BusinessLogiclayer.Dtos;

namespace BusinessLogiclayer.ServicesContracts
{
  public interface IOdooModuleService
  {
    Task<IEnumerable<OdooModuleDto>> GetAllAsync();
    Task<OdooModuleDto?> GetByIdAsync(int id);
    Task<int?> CreateAsync(CreateUpdateOdooModuleDto dto);
    Task<int?> UpdateAsync(int id, CreateUpdateOdooModuleDto dto);
    Task<int?> DeleteAsync(int id);
  }
}
