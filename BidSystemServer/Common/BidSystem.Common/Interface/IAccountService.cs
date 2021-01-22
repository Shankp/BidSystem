using BidSystem.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BidSystem.Common.Interface
{
    public interface IAccountService
    {
        ServiceResponse<int> Register(User user);
        ServiceResponse<string> Login(string username, string password);
        bool UserExists(string email);
    }
}
