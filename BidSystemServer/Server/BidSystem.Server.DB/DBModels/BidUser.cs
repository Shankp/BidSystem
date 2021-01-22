using System;
using System.Collections.Generic;

#nullable disable

namespace BidSystem.Server.DB.DBModels
{
    public partial class BidUser
    {
        public BidUser()
        {
            Bids = new HashSet<Bid>();
        }

        public int UserId { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public int UserType { get; set; }
        public int? UserDetail { get; set; }

        public virtual UserDetail UserDetailNavigation { get; set; }
        public virtual UserType UserTypeNavigation { get; set; }
        public virtual ICollection<Bid> Bids { get; set; }
    }
}
