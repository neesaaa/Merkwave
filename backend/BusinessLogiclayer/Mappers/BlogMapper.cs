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
    public class BlogMapper : Profile
    {
        public BlogMapper()
        {
            CreateMap<Blog, BlogDetailedDto>();
            CreateMap<Blog, BlogDto>();
            CreateMap<CreateUpdateBlogDto, Blog>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.ImageUrl, opt => opt.Ignore());
        }
    }
}
