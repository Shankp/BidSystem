using System;
using System.Collections.Generic;

#nullable disable

namespace BidSystem.Server.DB.DBModels
{
    public partial class Item
    {
        public Item()
        {
            Bids = new HashSet<Bid>();
        }

        public int ItemId { get; set; }
        public string ItemTitle { get; set; }
        public string ItemSubTitle { get; set; }
        public string ItemDescription { get; set; }
        public string ImagePath { get; set; }
        public int ItemStatus { get; set; }
        public DateTime? ExpireTime { get; set; }
        public int? MaxBidValue { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual ICollection<Bid> Bids { get; set; }
    }
}
