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
        [Required(ErrorMessage ="Lütfen başlık bilgisini doldurunuz.")]
        public string PlaceName { get; set; }

        [StringLength(5000)]
        [Required(ErrorMessage ="Lütfen blog metnini doldurunuz.")]
        public string PlaceText { get; set; }

        [DisplayName("Eklenme Tarihi"), DisplayFormat(DataFormatString = "{0:dd.MM.yyyy}", ApplyFormatInEditMode = true)]
        [Column(TypeName = "datetime2")]
        public DateTime CreatedDate { get; set; }

        public virtual ICollection<Media> Medias { get; set; }

        public virtual Address Address { get; set; } //Bire-bir ilişki  

    }
}
