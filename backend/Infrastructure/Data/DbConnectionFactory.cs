using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class DbConnectionFactory(IConfiguration _conf)
    {

        public IDbConnection CreateConnection()
        {
            return new NpgsqlConnection(_conf.GetConnectionString("DefaultConnection"));
        }

    }

}
