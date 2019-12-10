using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TravelBlog.Models
{
    public class Country
    {
        [Key]
        public int Id { get; set; }

        [StringLength(50)]
        [Required(ErrorMessage = "Bu alan zorunlu alandır.")]
        [DisplayName("Ülke")]
        public string CountryName { get; set; }

        public virtual ICollection<City> Cities { get; set; }
    }
}
