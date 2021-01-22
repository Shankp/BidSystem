using BidSystem.Common.Interface;
using BidSystem.Common.Models;
using BidSystem.Server.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BidSystem.Server
{
    public class ItemService : IItemService
    {
        public IItemStore m_itemStore;
        public ItemService(IItemStore itemStore)
        {
            m_itemStore = itemStore;
        }
        public int AddNewItem(BidItem item)
        {
            return m_itemStore.AddNewItem(item).Result;
        }

        public bool DeleteItem(int itemId)
        {
            throw new NotImplementedException();
        }

        public List<BidItem> FilterItemsByStatus(ItemStatus itemStatus)
        {
            throw new NotImplementedException();
        }

        public BidItem GetItemByItemId(int itemId)
        {
            return m_itemStore.GetItemByItemId(itemId).Result;
        }

        public List<BidItem> GetItemListBidByMe(int userId)
        {
            throw new NotImplementedException();
        }

        public BidItem UpdateItemInfo(BidItem item)
        {
            throw new NotImplementedException();
        }
    }
}
