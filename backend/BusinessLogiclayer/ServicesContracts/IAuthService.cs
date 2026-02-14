using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.ServicesContracts
{
    public interface IAuthService
    {
        Task<bool> RegisterAsync(string userName, string password);

        Task<string?> LoginAsync(string userName, string password);
    }
}
