using BusinessLogiclayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.ServicesContracts
{
  public interface ITestimonialService
  {
    Task<IEnumerable<TestimonialDto>> GetAllAsync();

    Task<TestimonialDto?> GetByIdAsync(int id);

    Task<int?> CreateAsync(CreateUpdateTestimonialDto dto);

    Task<int?> UpdateAsync(int id, CreateUpdateTestimonialDto dto);

    Task<int?> DeleteAsync(int id);
  }
}
