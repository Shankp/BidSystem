using BidSystem.Common.Interface;
using BidSystem.Common.Models;
using BidSystem.Server.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BidSystem.Server
{
    public class AccountService : IAccountService
    {
        private readonly IConfiguration m_configuration;
        private readonly IAccountStore m_accountStore;
        public AccountService(IAccountStore accountStore, IConfiguration configuration)
        {
            m_accountStore = accountStore;
            m_configuration = configuration;
        }
        public ServiceResponse<string> Login(string email, string password)
        {
            ServiceResponse<string> response = new ServiceResponse<string>();
            var result = m_accountStore.Login(email, password);
            if (result.Result.Success)
            {
                if (VerifyPasswordHash(password, result.Result.Data.PasswordHash, result.Result.Data.PasswordSalt))
                {
                    response.Success = true;
                    response.Message = "User exists.";
                    response.Token = CreateToken(result.Result.Data);
                    return response;
                }
            }
            response.Success = false;
            response.Message = "User does not exist.";
            return response;
        }

        public ServiceResponse<int> Register(User user)
        {
            ServiceResponse<int> response = new ServiceResponse<int>();
            if (UserExists(user.Email))
            {
                response.Success = false;
                response.Message = "User already exists.";
                
                return response;
            }
            CreatePasswordHash(user.Password, out byte[] passwordHash, out byte[] passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            return m_accountStore.Register(user, user.Password).Result;
        }

        public bool UserExists(string email)
        {
            return m_accountStore.UserExists(email).Result;
        }

        private string CreateToken(User user)
        {
            //TODO:implement user data in one table to retrieve all at once
            List<Claim> claims = new List<Claim>{
                    new Claim(ClaimTypes.NameIdentifier, user.Email),
                    new Claim(ClaimTypes.Name, user.UserName)};

            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(m_configuration.GetSection("AppSettings:Token").Value));
            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                    {
                        return false;
                    }
                }
                return true;
            }
        }
    }
}
