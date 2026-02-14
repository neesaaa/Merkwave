using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.Dtos
{
    public record LoginDto(string UserName, string Password)
    {
        public LoginDto() : this(string.Empty, string.Empty)
        {
        }
    }
}
