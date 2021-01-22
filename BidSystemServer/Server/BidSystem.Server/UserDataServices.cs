using BidSystem.Common;
using BidSystem.Common.Interface;
using BidSystem.Server.Interface;
using System;
using System.Collections.Generic;

namespace BidSystem.Server
{
    public class UserDataServices : IUserDataServices
    {
        public readonly IUserDataStore m_userDataStore;
        public UserDataServices(IUserDataStore userDataStore)
        {
            m_userDataStore = userDataStore;
        }
        public List<UserRole> GetUsetTypes()
        {
            return m_userDataStore.GetUsetTypes();           
        }

        #region private 
        #endregion
    }
}
