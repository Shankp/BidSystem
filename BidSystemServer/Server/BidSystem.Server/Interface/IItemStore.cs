using BidSystem.Common.Models;
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
        Task<List<BidItem>> FilterItemsByStatus(int itemStatus);
        BidItem UpdateItem(BidItem item);
    }
}
