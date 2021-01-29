using BidSystem.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BidSystem.Common.Interface
{
    public interface IBidService
    {
        ServiceResponse<int> AddNewBid(BidObj bid, string token);

        bool CheckBidExist(int itemId, int userId);
        
    }
}
