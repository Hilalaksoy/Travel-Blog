using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TravelBlog.Models;

namespace TravelBlog.Areas.Moderator.Controllers
{
    [Authorize(Roles = "moderator")]
    public class HomeController : Controller
    {
        ApplicationDbContext db;
        public HomeController()
        {
            db = new ApplicationDbContext();
        }
        // GET: Moderator/Home
        public ActionResult Index()
        {

            return View(db.Places.ToList());
        }

        [HttpGet]
        public ActionResult CommentConfirm(int id)
        {            
            return View(db.Places.Find(id));
        }
        [HttpPost]
        public ActionResult CommentConfirm(int id, Comment comment)
        {
            comment = db.Comments.Find(id);
            if(Request["Confirmed"].Contains("true"))
            {
                comment.Confirmed = true;
            }
            else
            {
                comment.Confirmed = false;
            }

            db.SaveChanges();
            return RedirectToAction("CommentConfirm","Home",new { id = comment.PlaceId});
        }
        public ActionResult DeleteComment(int id,Comment comment)
        {
            comment = db.Comments.Find(id);
            int placeId = comment.PlaceId;

            db.Comments.Remove(comment);
            db.SaveChanges();
            return RedirectToAction("CommentConfirm", "Home", new { id = placeId});
        }
    }
}