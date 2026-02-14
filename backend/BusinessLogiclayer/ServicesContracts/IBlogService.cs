using BusinessLogiclayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.ServicesContracts
{
    public interface IBlogService
    {
        Task<IEnumerable<BlogDto>> GetAllAsync();

        Task<BlogDetailedDto?> GetByIdAsync(int id);

        Task<int?> CreateAsync(CreateUpdateBlogDto dto);

        Task<int?> UpdateAsync(int id, CreateUpdateBlogDto dto);

        Task<int?> DeleteAsync(int id);
    }
}
