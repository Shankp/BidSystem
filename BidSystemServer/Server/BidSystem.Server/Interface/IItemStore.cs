﻿using BidSystem.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BidSystem.Server.Interface
{
    public interface IItemStore
    {
        Task<int> AddNewItem(BidItem item);
        Task<BidItem> GetItemByItemId(int itemId);
        Task<List<BidItem>> FilterItemsByStatus(string[] itemStatus);
        BidItem UpdateItem(BidItem item);
        Task<List<BidItem>> GetAllActiveItems();
        List<BidItem> GetItemListBidByMe(int userId);
        bool DeleteItem(int itemId);
    }
}
