using System;
using System.Collections.Generic;
using System.Text;

namespace BidSystem.Common.Models
{
    public class BidItem
    {
        public int ItemId { get; set; }
        public string ItemTitle { get; set; }
        public string ItemSubTitle { get; set; }
        public string ItemDescription { get; set; }
        public string ImagePath { get; set; }
        public int ItemStatus { get; set; }
        public DateTime? ExpireTime { get; set; }
        public int StartingBid { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
