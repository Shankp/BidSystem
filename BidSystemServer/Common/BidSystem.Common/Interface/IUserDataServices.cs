using BidSystem.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BidSystem.Common.Interface
{
    public interface IUserDataServices
    {
        List<UserRole> GetUsetTypes();

        User GetUserByEmail(string email);

        int GetUserTypeByid(string token);
    }
}
