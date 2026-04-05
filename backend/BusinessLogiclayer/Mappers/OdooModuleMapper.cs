using AutoMapper;
using BusinessLogiclayer.Dtos;
using BusinessLogiclayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.Mappers
{
  public class OdooModuleMapper : Profile
  {
    public OdooModuleMapper()
    {
      CreateMap<OdooModule, OdooModuleDto>();

      CreateMap<CreateUpdateOdooModuleDto, OdooModule>()
          .ForMember(x => x.Id, opt => opt.Ignore())
          .ForMember(x => x.ImageUrl, opt => opt.Ignore());
    }
  }
}
