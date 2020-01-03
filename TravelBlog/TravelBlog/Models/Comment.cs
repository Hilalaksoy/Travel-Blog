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
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        [DisplayName("Yorum Tarihi"), DisplayFormat(DataFormatString = "{0:dd.MM.yyyy}", ApplyFormatInEditMode = true)]
        [Column(TypeName = "datetime2")]
        public DateTime CommentDate { get; set; }
        
        [StringLength(256)]
        [DataType(DataType.MultilineText)]
        [DisplayName("Yorum")]
        [Required(ErrorMessage ="Yorum metnini doldurmak zorundasınız.")]
        public string CommentText { get; set; }

        //0(Unlike) yada 1(Like) alabilir.
        public bool? IsLike { get; set; }

        [ForeignKey("Place")]
        public int PlaceId { get; set; }

        public bool Confirmed { get; set; }

        //ForeignKey
        public string ApplicationUserId { get; set; }

        public virtual Place Place { get; set; }

        public virtual ApplicationUser  ApplicationUser { get; set; }

    }
}
