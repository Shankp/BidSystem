using BidSystem.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BidSystem.Server.Interface
{
    public interface IAccountStore
    {
        Task<ServiceResponse<int>> Register(User user, string password);
        Task<ServiceResponse<User>> Login(string username, string password);
        Task<bool> UserExists(string email);
    }
}
