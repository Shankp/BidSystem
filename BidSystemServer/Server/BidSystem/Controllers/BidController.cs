using System;
using BidSystem.Common.Interface;
using BidSystem.Common.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BidSystem.AspNet.Controllers
{
    [Route("/")]
    [ApiController]
    public class BidController : ControllerBase
    {
        private readonly ILogger s_log;
        public IBidService m_bidService;

        public BidController(IBidService bidService, ILogger<BidController> loggerController)
        {
            m_bidService = bidService;
            s_log = loggerController;
        }

        [HttpPost, Route("AddBid")]
        public ActionResult AddnewBid([FromBody]BidObj bid)
        {
            ServiceResponse<int> response = new ServiceResponse<int>();
            try
            {
                var authToken = HttpContext.Request.Headers["Authorization"];
                response = m_bidService.AddNewBid(bid, authToken);
                return Ok(response);
            }
            catch (Exception e)
            {
                s_log.LogError("Adding new Bid failed.", e);
                response.Success = false;
                response.Message = "Adding new bid failed";
                return StatusCode(500, "Something went wrong when Adding new bid");
            }

        }
    }
}