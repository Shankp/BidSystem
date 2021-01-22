using System;
using System.Collections.Generic;

#nullable disable

namespace BidSystem.Server.DB.DBModels
{
    public partial class UserType
    {
        public UserType()
        {
            BidUsers = new HashSet<BidUser>();
        }

        public int UserTypeId { get; set; }
        public string UserType1 { get; set; }

        public virtual ICollection<BidUser> BidUsers { get; set; }
    }
}
