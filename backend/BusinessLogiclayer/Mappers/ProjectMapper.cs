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
    public class ProjectMapper : Profile
    {
        private static readonly Dictionary<ProjectCategory, string> CategoryArMap = new()
        {
            { ProjectCategory.WebDevelopment, "تطوير مواقع الويب" },
            { ProjectCategory.MobileApps, "تطبيقات الموبايل" },
            { ProjectCategory.ECommerce, "التجارة الإلكترونية" },
            { ProjectCategory.Branding, "الهوية التجارية" },
            { ProjectCategory.SEO, "تحسين محركات البحث" },
            { ProjectCategory.SocialMedia, "إدارة وسائل التواصل الاجتماعي" },
            { ProjectCategory.MediaProduction, "الإنتاج الإعلامي" },
            { ProjectCategory.Photography, "التصوير الفوتوغرافي" }
        };


        public ProjectMapper()
        {
            CreateMap<Project, ProjectDto>()
                .ForMember(d => d.Category,
                    opt => opt.MapFrom(s => s.Category.ToString()))
                .ForMember(d => d.CategoryAr,
                    opt => opt.MapFrom(s =>
                        CategoryArMap.ContainsKey(s.Category)
                            ? CategoryArMap[s.Category]
                            : s.Category.ToString()
                    ));


            CreateMap<CreateUpdateDto, Project>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.ImageUrl, opt => opt.Ignore())
                .ForMember(x => x.Category,
                    opt => opt.MapFrom(s =>
                        Enum.IsDefined(typeof(ProjectCategory), s.Category)
                            ? (ProjectCategory)Enum.Parse(typeof(ProjectCategory), s.Category, true)
                            : ProjectCategory.WebDevelopment
                    ));

        }
    }
}
