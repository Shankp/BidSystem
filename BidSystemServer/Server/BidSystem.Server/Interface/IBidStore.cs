using BidSystem.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BidSystem.Server.Interface
{
    public interface IBidStore
    {
        int AddNewBid(BidObj bid);

        bool CheckBidExist(int itemId, int userId);
    }
}
