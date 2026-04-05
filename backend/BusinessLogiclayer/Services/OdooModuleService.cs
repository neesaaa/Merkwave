using AutoMapper;
using BusinessLogiclayer.Dtos;
using BusinessLogiclayer.Entities;
using BusinessLogiclayer.RepoContracts;
using BusinessLogiclayer.ServicesContracts;

namespace BusinessLogiclayer.Services
{
  public class OdooModuleService : IOdooModuleService
  {
    private readonly IGenericRepo<OdooModule> _repo;
    private readonly IMapper _mapper;
    private readonly FileService _fileService;

    public OdooModuleService(IGenericRepo<OdooModule> repo, IMapper mapper, FileService fileService)
    {
      _repo = repo;
      _mapper = mapper;
      _fileService = fileService;
    }

    public async Task<IEnumerable<OdooModuleDto>> GetAllAsync()
    {
      var modules = await _repo.GetAllAsync();
      return _mapper.Map<IEnumerable<OdooModuleDto>>(modules);
    }

    public async Task<OdooModuleDto?> GetByIdAsync(int id)
    {
      var module = await _repo.GetByIdAsync(id);
      return module == null ? null : _mapper.Map<OdooModuleDto>(module);
    }

    public async Task<int?> CreateAsync(CreateUpdateOdooModuleDto dto)
    {
      var module = _mapper.Map<OdooModule>(dto);
      if (dto.Image != null)
        module.ImageUrl = await _fileService.SaveImageAsync(dto.Image, "odoo-modules");
      var rows = await _repo.AddAsync(module);
      return rows == 0 ? null : rows;
    }

    public async Task<int?> UpdateAsync(int id, CreateUpdateOdooModuleDto dto)
    {
      var module = await _repo.GetByIdAsync(id);
      if (module == null) return null;
      var oldImageUrl = module.ImageUrl;
      _mapper.Map(dto, module);
      if (dto.Image != null)
      {
        await _fileService.DeleteImageAsync(oldImageUrl, "odoo-modules");
        module.ImageUrl = await _fileService.SaveImageAsync(dto.Image, "odoo-modules");
      }
      var rows = await _repo.UpdateAsync(module);
      return rows == 0 ? null : rows;
    }

    public async Task<int?> DeleteAsync(int id)
    {
      var module = await _repo.GetByIdAsync(id);
      if (module == null) return null;
      await _fileService.DeleteImageAsync(module.ImageUrl, "odoo-modules");
      var rows = await _repo.RemoveAsync(id);
      return rows == 0 ? null : rows;
    }
  }
}
