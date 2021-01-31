using BidSystem.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BidSystem.Common.Interface
{
    public interface ISchedularService
    {
        List<BidObj> GetWinningBids();
    }
}
