using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace TravelBlog.Models
{
    public class Media
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage ="Bu alan zorunludur.")]
        [DisplayName("Resim Yükle")]
        public string ImagePath { get; set; }

        [ForeignKey("Place")]
        public int PlaceId { get; set; }

        public virtual Place Place { get; set; }

        [NotMapped]
        public HttpPostedFileBase ImageFile { get; set; }
    }
}
