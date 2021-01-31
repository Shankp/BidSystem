using BidSystem.Common.Interface;
using BidSystem.Common.Models;
using BidSystem.Server.helper;
using BidSystem.Server.Interface;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace BidSystem.Server
{
    public class BidService : IBidService
    {
        public IBidStore m_bidStore;
        public IUserDataServices m_userDataService;
        public BidService(IBidStore bidStore, IUserDataServices userDataService)
        {
            m_bidStore = bidStore;
            m_userDataService = userDataService;
        }
        public ServiceResponse<int> AddNewBid(BidObj bid, string token)
        {
            ServiceResponse<int> response = new ServiceResponse<int>();
            //string userIdentifier = null;
            if (CheckBidExist(bid.ItemId, bid.UserId))
            {
                response.Success = false;
                response.Message = "A bid is already available.";
                return response;
            }

            //var handler = new JwtSecurityTokenHandler();
            //if (handler.CanValidateToken)
            //{
            //    var tokenVal = token.Substring(7);
            //    var Decordertoken = handler.ReadJwtToken(tokenVal);
            //    userIdentifier = Decordertoken.Payload["nameid"].ToString();
            //}
            var userIdentifier = ExtractValue.GetEmailFromToken(token);
            var user = m_userDataService.GetUserByEmail(userIdentifier);
            if (user != null)
            {
                bid.UserId = user.UserId;
                var result = m_bidStore.AddNewBid(bid);
                response.Data = result;
                response.Success = true;
                return response;
            }
            response.Success = false;
            return response;
        }

        public bool CheckBidExist(int itemId, int userId)
        {
            return m_bidStore.CheckBidExist(itemId, userId);
        }
    }
}
