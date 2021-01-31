using BidSystem.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BidSystem.Server.Interface
{
    public interface ISchedularStore
    {
        List<BidObj> GetWinningBids();
    }
}
