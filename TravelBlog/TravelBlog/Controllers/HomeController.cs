using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using TravelBlog.Models;

namespace TravelBlog.Controllers
{
    public class HomeController : Controller
    {
        ApplicationDbContext db;
        public HomeController()
        {
            db = new ApplicationDbContext();
        }
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Blog()
        {
            foreach (var item in db.Places.ToList())
            {
                string filename = Path.GetFileName(item.Medias[0].ImagePath);
                var path = Path.Combine(@"C:\Users\Hilal\source\repos\TravelBlog\TravelBlog\Images", filename);
                Image image = Image.FromFile(path);
                var newImage = new Bitmap(500, 500);
                Graphics.FromImage(newImage).DrawImage(image, 0, 0, 500, 500);
                var pathResize = Path.Combine(@"C:\Users\Hilal\source\repos\TravelBlog\TravelBlog\Images\imageResize", filename);
                newImage.Save(pathResize);
            }

            return View(db.Places.ToList());
        }

        public ActionResult PlaceDetail(int id)
        {   
            if(db.Comments.Where(x => x.PlaceId == id).ToList().Count() == 0)
            {
                ViewBag.LikeCount = 0;
                ViewBag.DislikeCount = 0;
            }
            else
            {
                ViewBag.LikeCount = db.Comments.Where(x => x.IsLike == true && x.PlaceId == id
               ).Count();
                ViewBag.DislikeCount = db.Comments.Where(x => x.IsLike == false && x.PlaceId == id).Count();
            }
           
            return View(db.Places.Find(id));
        }

        [HttpPost]
        public ActionResult PlaceDetail(int id,FormCollection frm)
        {  //TODO: Comment eklenecek - partialview de olabilir. Eğer kullanıcı üye değil ise yorum ekleyemesin.

            string commentText = frm["CommentText"];
            string username = frm["UserName"];

            Place place = db.Places.Find(id);
            
            ApplicationUser user = db.Users.Where(x => x.UserName == username).SingleOrDefault();
            if(user != null)
            {
                Comment comment = new Comment();

                comment.PlaceId = place.Id;
                comment.CommentDate = DateTime.Now;
                comment.CommentText = commentText;
                comment.ApplicationUserId = user.Id;
                comment.Confirmed = false;

                int likeCount = db.Comments.Where(x => x.IsLike == true && x.PlaceId == id).Count();
                int dislikeCount = db.Comments.Where(x => x.IsLike == false && x.PlaceId == id).Count();

                if (Request["IsLike"].Contains("true"))
                {
                    comment.IsLike = true;
                    likeCount++;
                }
                else
                {
                    comment.IsLike = false;
                    dislikeCount++;
                }

                db.Comments.Add(comment);
                db.SaveChanges();

                ViewBag.LikeCount = likeCount;
                ViewBag.DislikeCount = dislikeCount;

                TempData["CommentMessage"] = "Yorumunuz onaylanma sürecine girmiştir.";
                

            }
            else
            {
                TempData["ErrorCommentMessage"] = "Kullanıcı adınızı lütfen doğru giriniz.!";
                
            }
         
            return RedirectToAction("PlaceDetail", "Home");
            
        }

        public ActionResult DetailImages(int id)
        {
            return View(db.Places.Find(id));
        }
    }
}