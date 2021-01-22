using AutoMapper;
using BidSystem.Common;
using BidSystem.Server.DB.DBModels;
using BidSystem.Server.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BidSystem.Server.DB
{
    public class UserDataStore : IUserDataStore
    {
        private readonly IMapper m_mapper;
        private readonly BidAppDBContext m_context;
        public UserDataStore(IMapper mapper, BidAppDBContext context)
        {
            m_mapper = mapper;
            m_context = context;
        }
        public List<UserRole> GetUsetTypes()
        {
            try
            {
                var userTypes = m_context.UserTypes;
                var userTypeList = new List<UserRole>();
                foreach (var userType in userTypes)
                {
                    userTypeList.Add(m_mapper.Map<UserRole>(userType));
                }
                //using (var context = new BidAppDBContext())
                //{
                //    var result = context.UserTypes;
                //    foreach (var userType in result)
                //    {
                //        userTypeList.Add(m_mapper.Map<UserRole>(userType));
                //        //var sfsdfs=m_mapper.Map<UserRole>(userType);
                //        //userTypeList.Add(new
                //        //    UserRole
                //        //{
                //        //    UserTypeId = userType.UserTypeId,
                //        //    UserType1 = userType.UserType1
                //        //});
                //    }
                //}
                return userTypeList;
            }
            catch(Exception e)
            {
                //log here  and handle if needs
                throw;
            }          
        }
    }
}
