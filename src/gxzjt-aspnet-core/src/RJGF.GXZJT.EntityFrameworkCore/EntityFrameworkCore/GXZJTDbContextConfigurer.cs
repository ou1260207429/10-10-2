using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace RJGF.GXZJT.EntityFrameworkCore
{
    public static class GXZJTDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<GXZJTDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<GXZJTDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
