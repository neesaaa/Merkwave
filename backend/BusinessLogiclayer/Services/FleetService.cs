using AutoMapper;
using BusinessLogiclayer.Dtos;
using BusinessLogiclayer.Entities;
using BusinessLogiclayer.RepoContracts;
using BusinessLogiclayer.ServicesContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogiclayer.Services
{
  public class FleetService : IFleetService
  {
    private readonly IGenericRepo<Fleet> _fleetRepo;
    private readonly IGenericRepo<FleetFeature> _featureRepo;
    private readonly IMapper _mapper;
    private readonly FileService _fileService;

    public FleetService(
        IGenericRepo<Fleet> fleetRepo,
        IGenericRepo<FleetFeature> featureRepo,
        IMapper mapper,
        FileService fileService)
    {
      _fleetRepo = fleetRepo;
      _featureRepo = featureRepo;
      _mapper = mapper;
      _fileService = fileService;
    }

    public async Task<IEnumerable<FleetDto>> GetAllAsync()
    {
      var fleets = await _fleetRepo.GetAllAsync();
      var allFeatures = await _featureRepo.GetAllAsync();

      var dtos = _mapper.Map<List<FleetDto>>(fleets);
      foreach (var dto in dtos)
      {
        dto.Features = _mapper.Map<List<FleetFeatureDto>>(
            allFeatures.Where(f => f.FleetId == dto.Id));
      }
      return dtos;
    }

    public async Task<FleetDto?> GetByIdAsync(int id)
    {
      var fleet = await _fleetRepo.GetByIdAsync(id);
      if (fleet == null) return null;

      var dto = _mapper.Map<FleetDto>(fleet);
      var allFeatures = await _featureRepo.GetAllAsync();
      dto.Features = _mapper.Map<List<FleetFeatureDto>>(
          allFeatures.Where(f => f.FleetId == id));
      return dto;
    }

    public async Task<int?> CreateAsync(CreateFleetDto dto)
    {
      if (dto == null) throw new ArgumentNullException(nameof(dto));

      var fleet = _mapper.Map<Fleet>(dto);

      if (dto.Image != null)
        fleet.ImageUrl = await _fileService.SaveImageAsync(dto.Image, "fleet-images");

      if (dto.Model3D != null)
        fleet.Model3DUrl = await _fileService.SaveImageAsync(dto.Model3D, "fleet-models");

      // AddAsync now returns the inserted row ID (via RETURNING id)
      var newFleetId = await _fleetRepo.AddAsync(fleet);
      if (newFleetId == 0) return null;

      if (dto.Features != null && dto.Features.Count > 0)
      {
        foreach (var featureDto in dto.Features)
        {
          var feature = _mapper.Map<FleetFeature>(featureDto);
          feature.FleetId = newFleetId;
          await _featureRepo.AddAsync(feature);
        }
      }

      return newFleetId;
    }

    public async Task<int?> UpdateAsync(int id, EditFleetDto dto)
    {
      var fleet = await _fleetRepo.GetByIdAsync(id);
      if (fleet == null) return null;

      var oldImageUrl = fleet.ImageUrl;
      var oldModel3DUrl = fleet.Model3DUrl;

      // Map text fields; URL fields are preserved by the mapper (Ignore)
      _mapper.Map(dto, fleet);

      if (dto.Image != null)
      {
        await _fileService.DeleteImageAsync(oldImageUrl, "fleet-images");
        fleet.ImageUrl = await _fileService.SaveImageAsync(dto.Image, "fleet-images");
      }
      else
      {
        // Restore the URL that mapper cleared (Ignore only prevents source→dest, not keeps dest)
        fleet.ImageUrl = oldImageUrl;
      }

      if (dto.Model3D != null)
      {
        await _fileService.DeleteImageAsync(oldModel3DUrl, "fleet-models");
        fleet.Model3DUrl = await _fileService.SaveImageAsync(dto.Model3D, "fleet-models");
      }
      else
      {
        fleet.Model3DUrl = oldModel3DUrl;
      }

      var rows = await _fleetRepo.UpdateAsync(fleet);
      if (rows == 0) return null;

      // Replace features: delete existing then insert new ones
      var allFeatures = await _featureRepo.GetAllAsync();
      var existingFeatures = allFeatures.Where(f => f.FleetId == id).ToList();
      foreach (var old in existingFeatures)
        await _featureRepo.RemoveAsync(old.Id);

      if (dto.Features != null && dto.Features.Count > 0)
      {
        foreach (var featureDto in dto.Features)
        {
          var feature = _mapper.Map<FleetFeature>(featureDto);
          feature.FleetId = id;
          await _featureRepo.AddAsync(feature);
        }
      }

      return rows;
    }

    public async Task<int?> DeleteAsync(int id)
    {
      var fleet = await _fleetRepo.GetByIdAsync(id);
      if (fleet == null) return null;

      // Delete all linked features first (FK)
      var allFeatures = await _featureRepo.GetAllAsync();
      foreach (var feature in allFeatures.Where(f => f.FleetId == id))
        await _featureRepo.RemoveAsync(feature.Id);

      // Delete physical files
      await _fileService.DeleteImageAsync(fleet.ImageUrl, "fleet-images");
      await _fileService.DeleteImageAsync(fleet.Model3DUrl, "fleet-models");

      var rows = await _fleetRepo.RemoveAsync(id);
      return rows == 0 ? null : rows;
    }
  }
}
