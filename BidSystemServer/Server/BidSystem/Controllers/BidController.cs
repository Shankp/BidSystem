using System;
using BidSystem.Common.Interface;
using BidSystem.Common.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BidSystem.AspNet.Controllers
{
    [Route("/")]
    [ApiController]
    public class BidController : ControllerBase
    {
        public IBidService m_bidService;

        public BidController(IBidService bidService)
        {
            m_bidService = bidService;
        }

        [HttpPost, Route("AddBid")]
        public ActionResult AddnewBid([FromBody]BidObj bid)
        {
            try
            {
                var authToken = HttpContext.Request.Headers["Authorization"];
                var response = m_bidService.AddNewBid(bid, authToken);
                return Ok(response);
            }
            catch (Exception e)
            {
                throw;
            }

        }
    }
}