using AutoMapper;
using BidSystem.Common.Models;
using BidSystem.Server.DB.DBModels;
using BidSystem.Server.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BidSystem.Server.DB
{
    public class BidStore: IBidStore
    {
        private readonly IMapper m_mapper;
        private readonly BidAppDBContext m_context;
        public BidStore(IMapper mapper, BidAppDBContext context)
        {
            m_mapper = mapper;
            m_context = context;
        }

        public int AddNewBid(BidObj bid)
        {
            var bidDBObj = m_mapper.Map<Bid>(bid);
            m_context.Bids.Add(bidDBObj);
            return m_context.SaveChanges();          
        }

        public bool CheckBidExist(int itemId, int userId)
        {
            var isExist = m_context.Bids.Any(c => c.ItemId == itemId && c.UserId == userId);
            return isExist;
        }
    }
}
