using BusinessLogiclayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.ServicesContracts
{
    public interface IClientService
    {
        Task<bool> SendEmailAndSaveAsync(ClientDto dto);
        Task<IEnumerable<ClientDto>> GetAllAsync();
    }
}
