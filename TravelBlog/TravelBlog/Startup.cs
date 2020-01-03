using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TravelBlog.Startup))]
namespace TravelBlog
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
