using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace BidSystem.Server.helper
{
    public class ExtractValue
    {
        public static string GetEmailFromToken(string token)
        {
            string userIdentifier = null;
            var handler = new JwtSecurityTokenHandler();
            if (handler.CanValidateToken)
            {
                var tokenVal = token.Substring(7);
                var Decordertoken = handler.ReadJwtToken(tokenVal);
                 userIdentifier = Decordertoken.Payload["nameid"].ToString();
            }
            return userIdentifier;
        }
    }
}
