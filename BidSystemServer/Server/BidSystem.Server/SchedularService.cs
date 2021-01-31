using BidSystem.Common.Interface;
using BidSystem.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BidSystem.Server
{
    public class SchedularService : ISchedularService
    {
        public List<BidObj> GetWinningBids()
        {
            return new List<BidObj>();
        }
    }
}
