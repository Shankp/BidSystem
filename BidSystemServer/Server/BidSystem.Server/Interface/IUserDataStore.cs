using BidSystem.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace BidSystem.Server.Interface
{
    public interface IUserDataStore
    {
        public List<UserRole> GetUsetTypes();
    }
}
