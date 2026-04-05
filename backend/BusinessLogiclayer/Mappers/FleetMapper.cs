using AutoMapper;
using BusinessLogiclayer.Dtos;
using BusinessLogiclayer.Entities;

namespace BusinessLogiclayer.Mappers
{
  public class FleetMapper : Profile
  {
    public FleetMapper()
    {
      // Fleet entity -> FleetDto  (Features populated manually in the service layer)
      CreateMap<Fleet, FleetDto>()
          .ForMember(d => d.Features, opt => opt.Ignore());

      // FleetFeature entity -> FleetFeatureDto
      CreateMap<FleetFeature, FleetFeatureDto>();

      // CreateFleetDto -> Fleet  (file URLs set manually after saving files)
      CreateMap<CreateFleetDto, Fleet>()
          .ForMember(x => x.Id, opt => opt.Ignore())
          .ForMember(x => x.ImageUrl, opt => opt.Ignore())
          .ForMember(x => x.Model3DUrl, opt => opt.Ignore())
          .ForMember(x => x.NameEn, opt => opt.MapFrom(s => s.NameEn))
          .ForMember(x => x.NameAr, opt => opt.MapFrom(s => s.NameAr))
          .ForMember(x => x.DescriptionEn, opt => opt.MapFrom(s => s.DescriptionEn))
          .ForMember(x => x.DescriptionAr, opt => opt.MapFrom(s => s.DescriptionAr))
          .ForMember(x => x.DetailedDescriptionEn, opt => opt.MapFrom(s => s.DetailedDescriptionEn ?? string.Empty))
          .ForMember(x => x.DetailedDescriptionAr, opt => opt.MapFrom(s => s.DetailedDescriptionAr ?? string.Empty));

      // EditFleetDto -> Fleet  (file URLs preserved unless new file supplied)
      CreateMap<EditFleetDto, Fleet>()
          .ForMember(x => x.Id, opt => opt.Ignore())
          .ForMember(x => x.ImageUrl, opt => opt.Ignore())
          .ForMember(x => x.Model3DUrl, opt => opt.Ignore())
          .ForMember(x => x.NameEn, opt => opt.MapFrom(s => s.NameEn))
          .ForMember(x => x.NameAr, opt => opt.MapFrom(s => s.NameAr))
          .ForMember(x => x.DescriptionEn, opt => opt.MapFrom(s => s.DescriptionEn))
          .ForMember(x => x.DescriptionAr, opt => opt.MapFrom(s => s.DescriptionAr))
          .ForMember(x => x.DetailedDescriptionEn, opt => opt.MapFrom(s => s.DetailedDescriptionEn))
          .ForMember(x => x.DetailedDescriptionAr, opt => opt.MapFrom(s => s.DetailedDescriptionAr));

      // CreateFleetFeatureDto -> FleetFeature  (Id and FleetId set manually)
      CreateMap<CreateFleetFeatureDto, FleetFeature>()
          .ForMember(x => x.Id, opt => opt.Ignore())
          .ForMember(x => x.FleetId, opt => opt.Ignore());
    }
  }
}
