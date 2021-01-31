using AutoMapper;
using BidSystem.Common.Models;
using BidSystem.Server.DB.DBModels;
using BidSystem.Server.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BidSystem.Server.DB
{
    public class ItemStore : IItemStore
    {
        private readonly IMapper m_mapper;
        private readonly BidAppDBContext m_context;
        public ItemStore(IMapper mapper, BidAppDBContext context)
        {
            m_mapper = mapper;
            m_context = context;
        }

        public async Task<int> AddNewItem(BidItem item)
        {
            var itemModel = m_mapper.Map<Item>(item);
            await m_context.Items.AddAsync(itemModel);
            await m_context.SaveChangesAsync();
            return itemModel.ItemId;
        }

        public bool DeleteItem(int itemId)
        {
            var itemObj = m_context.Items.Find(itemId);
            if (itemObj == null)
            {
                return false;
                //log here
            }
            itemObj.IsDeleted = true;
            m_context.Entry(itemObj).Property(x => x.IsDeleted).IsModified = true;
            var result = m_context.SaveChanges();
            return true;
        }

        public async Task<List<BidItem>> FilterItemsByStatus(string[] itemStatus)
        {
            var list = new List<Item>();
            foreach (var st in itemStatus)
            {
                var item = await m_context.Items.Where(c => c.ItemStatus == Convert.ToInt32(st)).ToListAsync();
                list.AddRange(item);
            }
            //var itemList = await m_context.Items.Where(c => c.ItemStatus == itemStatus).ToListAsync();
            return m_mapper.Map<List<BidItem>>(list);
        }

        public async Task<List<BidItem>> GetAllActiveItems()
        {
            var itemList = await m_context.Items.Where(c => c.ItemStatus == (int)ItemStatus.ACTIVE).ToListAsync();
            return m_mapper.Map<List<BidItem>>(itemList);
        }

        public async Task<BidItem> GetItemByItemId(int itemId)
        {
            var item = await m_context.Items.FindAsync(itemId);
            var itemModel = m_mapper.Map<BidItem>(item);
            return itemModel;
        }

        public List<BidItem> GetItemListBidByMe(int userId)
        {
            var itemList = (from bid in m_context.Bids
                            join item in m_context.Items
                            on bid.ItemId equals item.ItemId
                            where bid.UserId == userId
                            select item).ToList();
            return m_mapper.Map<List<BidItem>>(itemList);
        }

        public BidItem UpdateItem(BidItem item)
        {
            var itemDBModel = m_mapper.Map<Item>(item);
            var result = m_context.Items.Update(itemDBModel);
            m_context.SaveChanges();
            var sdfsdf = result.CurrentValues;
            var test = m_mapper.Map<BidItem>(result.Entity);
            return test;

        }
    }
}
