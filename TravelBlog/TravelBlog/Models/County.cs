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
    public class County
    {
        [Key]
        public int Id { get; set; }

        [StringLength(50)]
        [DisplayName("İlçe")]
        [Required(ErrorMessage = "Bu alan zorunlu alandır.")]
        public string CountyName { get; set; }

        [ForeignKey("City")]
        public int CityId { get; set; }

        public virtual City City { get; set; }

        public virtual ICollection<Address> Addresses { get; set; }
    }
}
