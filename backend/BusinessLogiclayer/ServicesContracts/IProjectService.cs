using BusinessLogiclayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.ServicesContracts
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectDto>> GetAllAsync();

        Task<ProjectDto?> GetByIdAsync(int id);

        Task<int?> CreateAsync(CreateUpdateDto dto);

        Task<int?> UpdateAsync(int id, CreateUpdateDto dto);

        Task<int?> DeleteAsync(int id);
    }
}
