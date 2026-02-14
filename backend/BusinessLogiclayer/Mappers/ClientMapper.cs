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
    public class ClientMapper:Profile
    {
        public ClientMapper() {
            CreateMap<Client, ClientDto>();

            CreateMap<ClientDto, Client>()
                .ForMember(x => x.CreatedAt,
                    opt => opt.MapFrom(_ => DateTime.UtcNow));

        }
    }
}
