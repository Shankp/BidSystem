using System;
using System.Collections.Generic;
using System.Text;

namespace BidSystem.Common.Models
{
    public class UserDetail
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public DateTime? Dob { get; set; }
        public string Addess { get; set; }
        public string UserDescription { get; set; }
    }
}
