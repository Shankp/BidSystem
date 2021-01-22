using System;
using System.Collections.Generic;

#nullable disable

namespace BidSystem.Server.DB.DBModels
{
    public partial class UserDetail
    {
        public UserDetail()
        {
            BidUsers = new HashSet<BidUser>();
        }

        public int Id { get; set; }
        public string UserName { get; set; }
        public DateTime? Dob { get; set; }
        public string Addess { get; set; }
        public string UserDescription { get; set; }

        public virtual ICollection<BidUser> BidUsers { get; set; }
    }
}
