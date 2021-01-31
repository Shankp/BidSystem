using System;
using System.IO;
using BidSystem.Common.Interface;
using BidSystem.Common.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BidSystem.AspNet.Controllers
{
    [Route("/")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        public IItemService m_itemService;
        private readonly ILogger s_log;
        public ItemController(IItemService itemService, ILogger<AccountController> loggerController)
        {
            m_itemService = itemService;
            s_log = loggerController;
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
                s_log.LogError("Adding new item Failed", e);
                return StatusCode(StatusCodes.Status500InternalServerError);
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
                s_log.LogError("Get item By id Failed", e);
                return StatusCode(StatusCodes.Status500InternalServerError);
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
                s_log.LogError("GetItemListByStatus Failed", e);
                return StatusCode(500, "Something went wrong when filtering item list by status");
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
                s_log.LogError("Updating Item Failed", e);
                return StatusCode(StatusCodes.Status500InternalServerError);
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
                s_log.LogError("Get All Active Items Failed", e);
                return StatusCode(StatusCodes.Status500InternalServerError);
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
                s_log.LogError("GetItemListBidByMe Failed", e);
                return StatusCode(StatusCodes.Status500InternalServerError);
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
                s_log.LogError("DeleteItem Failed", e);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [Authorize]
        [HttpPost, Route("UploadItem")]
        public ActionResult PostUploadItem([FromForm] FileModel file)
        {
            try
            {
                //var postedFile = Request.Form.Files[0];
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", file.FileName);

                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    //file.FormFile.CopyTo(stream);
                }

                return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception e)
            {
                s_log.LogError("UploadItem Failed", e);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }


}
