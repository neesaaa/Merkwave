using AutoMapper;
using BusinessLogiclayer.Dtos;
using BusinessLogiclayer.Entities;
using BusinessLogiclayer.RepoContracts;
using BusinessLogiclayer.ServicesContracts;

namespace BusinessLogiclayer.Services
{
  public class BrandLogoService : IBrandLogoService
  {
    private readonly IGenericRepo<BrandLogo> _repo;
    private readonly IMapper _mapper;
    private readonly FileService _fileService;

    public BrandLogoService(IGenericRepo<BrandLogo> repo, IMapper mapper, FileService fileService)
    {
      _repo = repo;
      _mapper = mapper;
      _fileService = fileService;
    }

    public async Task<IEnumerable<BrandLogoDto>> GetAllAsync()
    {
      var logos = await _repo.GetAllAsync();
      return _mapper.Map<IEnumerable<BrandLogoDto>>(logos);
    }

    public async Task<BrandLogoDto?> GetByIdAsync(int id)
    {
      var logo = await _repo.GetByIdAsync(id);
      return logo == null ? null : _mapper.Map<BrandLogoDto>(logo);
    }

    public async Task<int?> CreateAsync(CreateUpdateBrandLogoDto dto)
    {
      var logo = _mapper.Map<BrandLogo>(dto);
      if (dto.Image != null)
        logo.ImageUrl = await _fileService.SaveImageAsync(dto.Image, "brand-logos");
      var newId = await _repo.AddAsync(logo);
      return newId == 0 ? null : newId;
    }

    public async Task<int?> UpdateAsync(int id, CreateUpdateBrandLogoDto dto)
    {
      var logo = await _repo.GetByIdAsync(id);
      if (logo == null) return null;
      var oldImageUrl = logo.ImageUrl;
      _mapper.Map(dto, logo);
      if (dto.Image != null)
      {
        await _fileService.DeleteImageAsync(oldImageUrl, "brand-logos");
        logo.ImageUrl = await _fileService.SaveImageAsync(dto.Image, "brand-logos");
      }
      var rows = await _repo.UpdateAsync(logo);
      return rows == 0 ? null : rows;
    }

    public async Task<int?> DeleteAsync(int id)
    {
      var logo = await _repo.GetByIdAsync(id);
      if (logo == null) return null;
      await _fileService.DeleteImageAsync(logo.ImageUrl, "brand-logos");
      var rows = await _repo.RemoveAsync(id);
      return rows == 0 ? null : rows;
    }
  }
}
