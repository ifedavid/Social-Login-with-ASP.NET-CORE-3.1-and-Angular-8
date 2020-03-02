using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AngularAndNetCoreAuth.Models
{
    /// <summary>
    /// Defines the Properties and methods of a User
    /// </summary>
    public class UserData
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }


        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string EmailAddress { get; set; }

        public string PictureUrl { get; set; }

        [Required]
        public string Provider { get; set; }

        public string Fullname()
        {
            return FirstName + " " + LastName;
        }
    }
}
