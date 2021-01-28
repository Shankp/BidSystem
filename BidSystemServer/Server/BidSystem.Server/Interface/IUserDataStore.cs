using BidSystem.Common;
using BidSystem.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BidSystem.Server.Interface
{
    public interface IUserDataStore
    {
        List<UserRole> GetUsetTypes();

        User GetUserByEmail(string email);

        int GetUserTypeByid(int userId);
    }
}
