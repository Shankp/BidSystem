using System;
using System.Collections.Generic;
using System.Text;

namespace BidSystem.Common.Models
{
    public class BidObj
    {
        public int BidId { get; set; }
        public int ItemId { get; set; }
        public int UserId { get; set; }
        public DateTime ExpireTime { get; set; }
        public int BidValue { get; set; }
    }
}
