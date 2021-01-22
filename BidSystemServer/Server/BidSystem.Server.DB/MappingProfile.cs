using AutoMapper;
using BidSystem.Common;
using BidSystem.Common.Models;
using BidSystem.Server.DB.DBModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace BidSystem.Server.DB
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserType, UserRole>().ReverseMap();
            CreateMap<BidUser, User>().ReverseMap();
        }
    }
}
