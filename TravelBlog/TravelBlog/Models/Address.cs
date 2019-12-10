using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TravelBlog.Models
{
    public class Address
    {
        
        [ForeignKey("Place")]
        public int Id { get; set; }

        [ForeignKey("County")]
        public int CountyId { get; set; }

        public virtual County County { get; set; } //Bire-çok ilişki

        public virtual Place Place { get; set; } //Bire-bir ilişki
    }
}
