using BusinessLogiclayer.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogiclayer.ServicesContracts
{
    public interface IFleetService
    {
        Task<IEnumerable<FleetDto>> GetAllAsync();
        Task<FleetDto?> GetByIdAsync(int id);
        Task<int?> CreateAsync(CreateFleetDto dto);
        Task<int?> UpdateAsync(int id, EditFleetDto dto);
        Task<int?> DeleteAsync(int id);
    }
}
