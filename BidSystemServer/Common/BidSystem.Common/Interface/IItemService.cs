using BidSystem.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BidSystem.Common.Interface
{
    public interface IItemService
    {
        /// <summary>
        /// Add new Item to the bid system
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        int AddNewItem(BidItem item);
        BidItem GetItemByItemId(int itemId);
        List<BidItem> GetItemListBidByMe(int userId);
        List<BidItem> FilterItemsByStatus(ItemStatus itemStatus);//pagination should be added
        BidItem UpdateItemInfo(BidItem item);
        bool DeleteItem(int itemId);
    }
}
