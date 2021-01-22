using BidSystem.Common.Interface;
using BidSystem.Common.Models;
using BidSystem.Server.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BidSystem.Server
{
    public class AccountService : IAccountService
    {
        private readonly IAccountStore m_accountStore;
        public AccountService(IAccountStore accountStore)
        {
            m_accountStore = accountStore;
        }
        public  ServiceResponse<string> Login(string username, string password)
        {
            ServiceResponse<string> response = new ServiceResponse<string>();
            var result =  m_accountStore.Login(username, password);
            if (result.Result.Success)
            {
                if (VerifyPasswordHash(password, result.Result.Data.PasswordHash, result.Result.Data.PasswordSalt))
                {
                    response.Success = true;
                    response.Message = "User exists.";
                    return response;
                }
            }
            response.Success = false;
            response.Message = "User does not exist.";
            return response;
        }

        public  ServiceResponse<int> Register(User user)
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

            return  m_accountStore.Register(user, user.Password).Result;
        }

        public bool UserExists(string email)
        {
            return m_accountStore.UserExists(email).Result;
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
