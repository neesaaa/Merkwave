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
  public class TestimonialMapper : Profile
  {
    public TestimonialMapper()
    {
      CreateMap<Testimonial, TestimonialDto>();
      CreateMap<CreateUpdateTestimonialDto, Testimonial>()
          .ForMember(x => x.Id, opt => opt.Ignore());
    }
  }
}
