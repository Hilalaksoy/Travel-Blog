namespace TravelBlog.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using TravelBlog.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<TravelBlog.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(TravelBlog.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.

            /***********************************************************/

            //Role tablosuna admin, moderator ve normal rolleri eklenecektir.
            //Seed fonksiyonu ile tablolara veri eklerken store ve manager nesnelerine ihtiyaç duyulur.

            var roleStore = new RoleStore<IdentityRole>(context);
            var roleManager = new RoleManager<IdentityRole>(roleStore);

            if (!roleManager.RoleExists("admin"))
                roleManager.Create(new IdentityRole() { Name = "admin" });

            if (!roleManager.RoleExists("moderator"))
                roleManager.Create(new IdentityRole() { Name = "moderator" });

            if (!roleManager.RoleExists("normal"))
                roleManager.Create(new IdentityRole() { Name = "normal" });


            //Admin user oluşturma
            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new UserManager<ApplicationUser>(userStore);

            var adminUser = userManager.FindById("admin@admin.com");
            if (adminUser == null)
            {
                adminUser = new ApplicationUser()
                {
                    UserName = "admin@admin.com",
                    Email = "admin@admin.com",
                };
                userManager.Create(adminUser, "Admin1.");
            }
            if (!userManager.IsInRole(adminUser.Id, "admin"))
                userManager.AddToRole(adminUser.Id, "admin");

            //Moderator user oluşturma

            var moderatorUser = userManager.FindById("moderator@moderator.com");
            if (moderatorUser == null)
            {
                moderatorUser = new ApplicationUser()
                {
                    UserName = "moderator@moderator.com",
                    Email = "moderator@moderator.com"
                };
                userManager.Create(moderatorUser, "Moderator1.");
            }

            if (!userManager.IsInRole(moderatorUser.Id, "moderator"))
                userManager.AddToRole(moderatorUser.Id, "moderator");
        

        }
    }
}
