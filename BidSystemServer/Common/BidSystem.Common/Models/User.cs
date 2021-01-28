using System;
using System.Collections.Generic;
using System.Text;

namespace BidSystem.Common.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string UserName { get; set; }
        public DateTime? Dob { get; set; }
        public string UserAddress { get; set; }
        public string UserDescription { get; set; }
        public int UserType { get; set; }

        public string Password { get; set; }


    }
}
