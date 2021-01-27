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
    public class AccountController : ControllerBase
    {
        private readonly IAccountService m_accountservice;
        public readonly IUserDataServices m_userDataServices;
        public AccountController(IUserDataServices userDataServices, IAccountService accountservice)
        {
            m_userDataServices = userDataServices;
            m_accountservice = accountservice;
        }

        [HttpPost, Route("Register")]
        public ActionResult Register([FromBody]User user)
        {
            try
            {
                var response = m_accountservice.Register(user);
                if (!response.Success)
                {
                    return BadRequest(response);
                }
                return Ok(response);
            }
            catch (Exception e)
            {
                throw;
            }

        }

        [HttpPost, Route("Login")]
        public  ActionResult Login([FromBody]User user)
        {
            try
            {
                ServiceResponse<string> response = new ServiceResponse<string>();
                if (user.Email == null || user.Password == null)
                {
                    response.Success = false;
                    response.Message = "Invalid usename or password";
                   
                }
                response =  m_accountservice.Login(user.Email, user.Password);
                if (!response.Success)
                {
                    return BadRequest(response);
                }
                return Ok(response);
            }
            catch (Exception e)
            {
                throw;
            }

        }

        [Authorize]
        [HttpGet, Route("GetUserType")]
        public ActionResult GetUserRoles()
        {
            try
            {
                var userTypeList = m_userDataServices.GetUsetTypes();
                return Ok(userTypeList);
            }
            catch (Exception e)
            {
                throw;
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
                throw;
            }

        }
    }
}