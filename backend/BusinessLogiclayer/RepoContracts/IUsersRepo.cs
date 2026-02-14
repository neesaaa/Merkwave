using BusinessLogiclayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.RepoContracts
{
    public interface IUsersRepo
    {
        Task<ApplicationUser?> GetByUserNameAsync(string userName);

        Task<ApplicationUser?> GetByIdAsync(Guid id);

        Task<bool> ExistsAsync(string userName);

        Task<int> CreateAsync(ApplicationUser user);
    }
}
