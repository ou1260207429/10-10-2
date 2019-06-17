using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using RJGF.GXZJT.Configuration;
using RJGF.GXZJT.Web;

namespace RJGF.GXZJT.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class GXZJTDbContextFactory : IDesignTimeDbContextFactory<GXZJTDbContext>
    {
        public GXZJTDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<GXZJTDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            GXZJTDbContextConfigurer.Configure(builder, configuration.GetConnectionString(GXZJTConsts.ConnectionStringName));

            return new GXZJTDbContext(builder.Options);
        }
    }
}
