﻿using AutoMapper;
using BidSystem.Common.Models;
using BidSystem.Server.DB.DBModels;
using BidSystem.Server.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BidSystem.Server.DB
{
    public class SchedularStore : ISchedularStore
    {
        private readonly IMapper m_mapper;
        private readonly BidAppDBContext m_context;
        public SchedularStore(IMapper mapper, BidAppDBContext context)
        {
            m_mapper = mapper;
            m_context = context;
        }
        public List<BidObj> GetWinningBids()
        {
            var vsfg = ((from s in m_context.Bids
                       join d in m_context.Items
                       on s.ItemId equals d.ItemId
                       where d.ExpireTime <= DateTime.Now
                       select new BidObj
                       {
                           BidId=s.BidId,
                           BidValue=s.BidValue,
                           ItemId=s.ItemId,
                           UserId=s.UserId
                       }).ToList());



            throw new NotImplementedException();
        }
    }
}
