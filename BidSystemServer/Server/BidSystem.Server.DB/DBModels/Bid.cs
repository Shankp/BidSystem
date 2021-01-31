using System;
using System.Collections.Generic;

#nullable disable

namespace BidSystem.Server.DB.DBModels
{
    public partial class Bid
    {
        public int BidId { get; set; }
        public int ItemId { get; set; }
        public int UserId { get; set; }
        public int BidValue { get; set; }

        public virtual Item Item { get; set; }
        public virtual BidUser User { get; set; }
    }
}
