using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BidSystem.Common.Interface
{
    public interface IUserDataServices
    {
        public List<UserRole> GetUsetTypes();
    }
}
