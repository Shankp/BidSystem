using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BidSystem.Common.Interface;
using BidSystem.Common.Models;
using log4net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BidSystem.AspNet.Controllers
{

    [Route("/")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService m_accountservice;
        public readonly IUserDataServices m_userDataServices;
        private readonly ILogger s_log;
        public AccountController(IUserDataServices userDataServices, IAccountService accountservice, ILogger<AccountController> loggerController)
        {
            m_userDataServices = userDataServices;
            m_accountservice = accountservice;
            s_log = loggerController;
        }

        [HttpPost, Route("Register")]
        public ActionResult Register([FromBody]User user)
        {
            ServiceResponse<int> response = new ServiceResponse<int>();
            try
            {
                s_log.LogDebug("Register end point called.");
                response = m_accountservice.Register(user);
                if (!response.Success)
                {
                    s_log.LogDebug("Registering the user failed.");
                    return BadRequest(response);
                }
                return Ok(response);
            }
            catch (Exception e)
            {
                s_log.LogError("Logging Failed", e);
                response.Success = false;
                response.Message = "Registering Failed";
                return StatusCode(500, "Something went wrong when registering the user");
            }

        }

        [HttpPost, Route("Login")]
        public ActionResult Login([FromBody]User user)
        {
            ServiceResponse<string> response = new ServiceResponse<string>();
            try
            {
                s_log.LogDebug("Login end point called.");
                if (user.Email == null || user.Password == null)
                {
                    response.Success = false;
                    response.Message = "Invalid usename or password";
                    s_log.LogWarning(response.Message);
                }
                response = m_accountservice.Login(user.Email, user.Password);
                if (!response.Success)
                {
                    return BadRequest(response);
                }
                return Ok(response);
            }
            catch (Exception e)
            {
                s_log.LogError("Logging Failed", e);
                response.Success = false;
                response.Message = "Logging Failed";
                return StatusCode(500, "Something went wrong when logging");

            }

        }

        [Authorize]
        [HttpGet, Route("GetAllUserTypes")]
        public ActionResult GetUserTypeList()
        {
            try
            {
                s_log.LogDebug("GetAllUserTypes called.");
                var userTypeList = m_userDataServices.GetUsetTypes();
                return Ok(userTypeList);
            }
            catch (Exception e)
            {
                s_log.LogError("GetAllUserTypes Failed", e);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

        }

        [Authorize]
        [HttpGet, Route("GetUserType")]
        public ActionResult GetUserTypeForToken()
        {
            try
            {
                var authToken = HttpContext.Request.Headers["Authorization"];
                var userType = m_userDataServices.GetUserTypeByid(authToken);
                return Ok(userType);
            }
            catch (Exception e)
            {
                s_log.LogError("GetUserType Failed", e);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

        }

        [Authorize]
        [HttpGet, Route("UserValidate")]
        public ActionResult CheckUserIsValid()
        {
            try
            {
                return Ok(true);
            }
            catch (Exception e)
            {
                s_log.LogError("UserValidate Failed", e);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

        }
    }
}