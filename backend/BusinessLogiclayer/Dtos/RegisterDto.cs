using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogiclayer.Dtos
{
    public  record  RegisterDto(string UserName, string Password)
    {
        public RegisterDto() : this(string.Empty, string.Empty)
        {
        }
    }
}
