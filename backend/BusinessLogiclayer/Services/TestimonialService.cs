using AutoMapper;
using BusinessLogiclayer.Dtos;
using BusinessLogiclayer.Entities;
using BusinessLogiclayer.RepoContracts;
using BusinessLogiclayer.ServicesContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.Services
{
  public class TestimonialService : ITestimonialService
  {
    private readonly IGenericRepo<Testimonial> _repo;
    private readonly IMapper _mapper;

    public TestimonialService(IGenericRepo<Testimonial> repo, IMapper mapper)
    {
      _repo = repo;
      _mapper = mapper;
    }

    public async Task<IEnumerable<TestimonialDto>> GetAllAsync()
    {
      var testimonials = await _repo.GetAllAsync();
      return _mapper.Map<IEnumerable<TestimonialDto>>(testimonials);
    }

    public async Task<TestimonialDto?> GetByIdAsync(int id)
    {
      var testimonial = await _repo.GetByIdAsync(id);
      return testimonial == null ? null : _mapper.Map<TestimonialDto>(testimonial);
    }

    public async Task<int?> CreateAsync(CreateUpdateTestimonialDto dto)
    {
      var testimonial = _mapper.Map<Testimonial>(dto);
      var id = await _repo.AddAsync(testimonial);
      return id == 0 ? null : id;
    }

    public async Task<int?> UpdateAsync(int id, CreateUpdateTestimonialDto dto)
    {
      var testimonial = await _repo.GetByIdAsync(id);
      if (testimonial == null) return null;

      _mapper.Map(dto, testimonial);
      var rows = await _repo.UpdateAsync(testimonial);
      return rows == 0 ? null : rows;
    }

    public async Task<int?> DeleteAsync(int id)
    {
      var testimonial = await _repo.GetByIdAsync(id);
      if (testimonial == null) return null;

      var rows = await _repo.RemoveAsync(id);
      return rows == 0 ? null : rows;
    }
  }
}
