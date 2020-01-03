using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TravelBlog.Models
{
    public class Place
    {
        [Key]
        public int Id { get; set; }

        [StringLength(100)]
        [DisplayName("Gezi Başlığı")]
        [Required(ErrorMessage ="Lütfen başlık bilgisini doldurunuz.")]
        public string PlaceName { get; set; }

        
        [DisplayName("Gezi Yazısı")]
        [DataType(DataType.MultilineText)]
        [Required(ErrorMessage ="Lütfen gezi metnini doldurunuz.")]
        public string PlaceText { get; set; }

        [DisplayName("Eklenme Tarihi"), DisplayFormat(DataFormatString = "{0:dd.MM.yyyy}", ApplyFormatInEditMode = true)]
        [Column(TypeName = "datetime2")]
        public DateTime CreatedDate { get; set; }

        [StringLength(100)]
        [DisplayName("Adres")]
        [Required(ErrorMessage = "Lütfen adres bilgisini giriniz.")]
        public string Address { get; set; }

        public virtual IList<Media> Medias { get; set; }

        public virtual IList<Comment> Comments { get; set; }


    }
}
