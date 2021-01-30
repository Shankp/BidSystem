using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BidSystem.Common.Interface;
using BidSystem.Common.Models;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
        [HttpPost, Route("AddItem")]
        public ActionResult AddNewitem([FromBody]BidItem item)
        {
            try
            {
                return Ok(m_itemService.AddNewItem(item));
            }
            catch (Exception e)
            {
                throw;
            }
        }

        [Authorize]
        [HttpGet, Route("GetItemById")]
        public ActionResult GetItemById([FromQuery]int itemId)
        {
            try
            {
                return Ok(m_itemService.GetItemByItemId(itemId));
            }
            catch (Exception e)
            {
                throw;
            }
        }

        [Authorize]
        [HttpGet, Route("GetItemListByStatus")]
        public ActionResult FilterItemByStatus([FromQuery]string itemStatus)
        {
            try
            {
                if (!string.IsNullOrEmpty(itemStatus))
                {
                    return Ok(m_itemService.FilterItemsByStatus(itemStatus));
                }
                return BadRequest("Empty or null received as status param");

            }
            catch (Exception e)
            {
                return StatusCode(500, "Something went wrong when logging");
            }
        }

        [Authorize]
        [HttpPost, Route("UpdateItem")]
        public ActionResult UpdateItem([FromBody]BidItem item)
        {
            try
            {
                return Ok(m_itemService.UpdateItemInfo(item));
            }
            catch (Exception e)
            {
                throw;
            }
        }

        [HttpGet, Route("GetAllActiveItems")]
        public ActionResult GetAllActiveBidItem()
        {
            try
            {
                return Ok(m_itemService.GetAllActiveItems());
            }
            catch (Exception e)
            {
                throw;
            }
        }

        [HttpGet, Route("GetItemListBidByMe")]
        public ActionResult GetItemListBidByMe([FromQuery]int userId)
        {
            try
            {
                return Ok(m_itemService.GetItemListBidByMe(userId));
            }
            catch (Exception e)
            {
                throw;
            }
        }

        [Authorize]
        [HttpDelete, Route("Deleteitem")]
        public ActionResult DeleteItem([FromQuery]int itemId)
        {
            try
            {
                return Ok(m_itemService.DeleteItem(itemId));
            }
            catch (Exception e)
            {
                throw;
            }
        }


    }
}