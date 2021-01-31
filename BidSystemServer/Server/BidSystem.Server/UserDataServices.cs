using BidSystem.Common;
using BidSystem.Common.Interface;
using BidSystem.Common.Models;
using BidSystem.Server.helper;
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

        public User GetUserByEmail(string email)
        {
            return m_userDataStore.GetUserByEmail(email);
        }

        public int GetUserTypeByid(string token)
        {
            var userIdentifier = ExtractValue.GetEmailFromToken(token);
            return m_userDataStore.GetUserByEmail(userIdentifier).UserType;       
        }

        public List<UserRole> GetUsetTypes()
        {
            return m_userDataStore.GetUsetTypes();
        }

        #region private 
        #endregion
    }
}
