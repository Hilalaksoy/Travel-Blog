using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TravelBlog.Models;

namespace TravelBlog.Areas.Admin.Controllers
{
    [Authorize(Roles = "admin")]
    public class HomeController : Controller
    {
        ApplicationDbContext db;
        public HomeController()
        {
            db = new ApplicationDbContext();
        }

        // GET: Admin/Home
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult AddPost()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AddPost(FormCollection frm)
        {

            Place place = new Place();

            string placeName = frm["placeName"];
            string placeText = frm["placeText"];
            string address = frm["Address"];

            place.PlaceName = placeName;
            place.PlaceText = placeText;
            place.Address = address;
            place.CreatedDate = DateTime.Now;


            db.Places.Add(place);
            db.SaveChanges();

            ViewBag.Message = "Ekleme işlemi başarılı bir şekilde gerçekleşmiştir !! \n Lütfen bu gezi yazısı için en az bir adet resim yükleyiniz..";
            return View();
        }

        public ActionResult AddImage()
        {
            //List<Place> geziler = db.Places.ToList();

            //ViewBag.Geziler = new SelectList(geziler, "Id", "PlaceName");
            return View();

        }

        [HttpPost]
        public ActionResult AddImage(Media media, int id)
        {
            //Image Upload

            //string fileName = Path.GetFileNameWithoutExtension(db.Medias.FirstOrDefault(x => x.Place.Id == x.PlaceId).ImageFile.FileName);
            //var q1 = from p in db.Places
            //         join m in db.Medias on p.Id equals m.PlaceId
            //         select new
            //         {
            //             m.ImagePath
            //         };

            /*************/

            string fileName = Path.GetFileNameWithoutExtension(media.ImageFile.FileName);

            string extension = Path.GetExtension(media.ImageFile.FileName);

            fileName = fileName + DateTime.Now.ToString("yymmssfff") + extension;

            media.ImagePath = "~/Images/" + fileName;
            fileName = Path.Combine(Server.MapPath("~/Images/"), fileName);
            media.PlaceId = id;

            media.ImageFile.SaveAs(fileName);
            db.Medias.Add(media);
            db.SaveChanges();

            return RedirectToAction("BlogPosts", "Home");
        }

        [HttpGet]
        public ActionResult PostDetail(int id)
        {
            //ViewData["Gezi"] = db.Places.Where(x => x.Id == id).ToList(); 
            return View(db.Places.Find(id));
        }

        //Blog yazıları
        public ActionResult BlogPosts()
        {
            return View(db.Places.ToList());
        }

        public ActionResult DeletePost(int id)
        {
            db.Places.Remove(db.Places.Find(id));
            db.SaveChanges();

            return RedirectToAction("BlogPosts", "Home");
        }
        [HttpGet]
        public ActionResult UpdatePost(int? id)
        {
            return View(db.Places.Find(id));
        }

        [HttpPost]
        public ActionResult UpdatePost(Place p)
        {
            Place place = db.Places.Where(k => k.Id == p.Id).SingleOrDefault();
            place.PlaceName = p.PlaceName;
            place.PlaceText = p.PlaceText;
            place.Address = p.Address;
            place.CreatedDate = DateTime.Now;


            db.SaveChanges();
            ViewBag.UpdateMessage = p.PlaceName + " isimli gezi yazısı güncellendi.";
            //return RedirectToAction("PostDetail","Home", new { id = p.Id });
            return View();
        }

        public ActionResult DisplayImages(int id)
        {
            return View(db.Places.Find(id));
        }

        public ActionResult DeleteImage(int id)
        {
            Media media = db.Medias.Find(id);
            int placeId = media.PlaceId;

            string filename = Path.GetFileName(media.ImagePath);
            var path = Path.Combine(@"C:\Users\Hilal\source\repos\TravelBlog\TravelBlog\Images", filename);

            FileInfo fi = new FileInfo(path);  //delete from Images folder
            fi.Refresh();

            if (fi.Exists)
            {
                fi.Delete();
                db.Medias.Remove(media);
                db.SaveChanges();
            }
            else
            {
                ViewBag.ErrorMessage = "Resim klasörde bulunmamaktadır.";
            }
            return RedirectToAction("DisplayImages", "Home", new { id = placeId });
        }
    }
}