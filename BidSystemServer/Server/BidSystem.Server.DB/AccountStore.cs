using AutoMapper;
using BidSystem.Common.Models;
using BidSystem.Server.DB.DBModels;
using BidSystem.Server.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BidSystem.Server.DB
{
    public class AccountStore : IAccountStore
    {
        private readonly IMapper m_mapper;
        private readonly BidAppDBContext m_context;
        public AccountStore(IMapper mapper, BidAppDBContext context)
        {
            m_mapper = mapper;
            m_context = context;
        }

        public async Task<ServiceResponse<User>> Login(string username, string password)
        {
            ServiceResponse<User> response = new ServiceResponse<User>();
            var user = await m_context.BidUsers.FirstOrDefaultAsync(x => x.Email.ToLower().Equals(username.ToLower()));
           
            if (user == null)
            {
                response.Success = false;
                response.Message = "User not found.";
                return response;
            }
            var userModel = m_mapper.Map<User>(user);
            response.Data = userModel;           
            return response;
        }

        public async  Task<ServiceResponse<int>> Register(User user, string password)
        {

            var userModel = m_mapper.Map<BidUser>(user);
            await m_context.BidUsers.AddAsync(userModel);
            await m_context.SaveChangesAsync();
            ServiceResponse<int> response = new ServiceResponse<int>();
            response.Data = userModel.UserId;
            return response;
        }

        public async Task<bool> UserExists(string email)
        {
            if (await m_context.BidUsers.AnyAsync(x => x.Email.ToLower() == email.ToLower()))
            {
                return true;
            }
            return false;
        }
    }
}
