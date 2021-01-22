using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BidSystem.Common.Interface;
using BidSystem.Common.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BidSystem.AspNet.Controllers
{
    [Route("/")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        public IItemService m_itemService;
        public ItemController(IItemService itemService)
        {
            m_itemService = itemService;
        }

        [HttpPost, Route("AddItem")]
        public int AddNewitem([FromBody]BidItem item)
        {
            try
            {
                return m_itemService.AddNewItem(item);
            }
            catch (Exception e)
            {
                throw;
            }
        }

        [HttpGet, Route("GetItemById")]
        public BidItem AddNewitem([FromQuery]int itemId)
        {
            try
            {
                return m_itemService.GetItemByItemId(itemId);
            }
            catch (Exception e)
            {
                throw;
            }
        }

    }
}