using AutoMapper;
using BusinessLogiclayer.Dtos;
using BusinessLogiclayer.Entities;

namespace BusinessLogiclayer.Mappers
{
  public class BrandLogoMapper : Profile
  {
    public BrandLogoMapper()
    {
      CreateMap<BrandLogo, BrandLogoDto>();
      CreateMap<CreateUpdateBrandLogoDto, BrandLogo>()
          .ForMember(x => x.Id, opt => opt.Ignore())
          .ForMember(x => x.ImageUrl, opt => opt.Ignore());
    }
  }
}
