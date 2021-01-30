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
            return m_itemStore.DeleteItem(itemId);
        }

        public List<BidItem> FilterItemsByStatus(string itemStatus)
        {
            string[] statusList = itemStatus.Split(",");
            //var status = (int)Enum.Parse(typeof(ItemStatus), itemStatus); ;
            return m_itemStore.FilterItemsByStatus(statusList).Result;
        }

        public List<BidItem> GetAllActiveItems()
        {
            return m_itemStore.GetAllActiveItems().Result;
        }

        public BidItem GetItemByItemId(int itemId)
        {
            return m_itemStore.GetItemByItemId(itemId).Result;
        }

        public List<BidItem> GetItemListBidByMe(int userId)
        {
            return m_itemStore.GetItemListBidByMe(userId);
        }

        public BidItem UpdateItemInfo(BidItem item)
        {
            return m_itemStore.UpdateItem(item);
        }
    }
}
