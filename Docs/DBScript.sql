USE [master]
GO
/****** Object:  Database [BidAppDB]    Script Date: 1/31/2021 9:31:07 PM ******/
CREATE DATABASE [BidAppDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BidAppDB', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.SHNDB\MSSQL\DATA\BidAppDB.mdf' , SIZE = 4096KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'BidAppDB_log', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.SHNDB\MSSQL\DATA\BidAppDB_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [BidAppDB] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BidAppDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BidAppDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BidAppDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BidAppDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BidAppDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BidAppDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [BidAppDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [BidAppDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BidAppDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BidAppDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BidAppDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BidAppDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BidAppDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BidAppDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BidAppDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BidAppDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [BidAppDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BidAppDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BidAppDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BidAppDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BidAppDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BidAppDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [BidAppDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BidAppDB] SET RECOVERY FULL 
GO
ALTER DATABASE [BidAppDB] SET  MULTI_USER 
GO
ALTER DATABASE [BidAppDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BidAppDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BidAppDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BidAppDB] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [BidAppDB] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'BidAppDB', N'ON'
GO
USE [BidAppDB]
GO
/****** Object:  Table [dbo].[Bid]    Script Date: 1/31/2021 9:31:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Bid](
	[BidId] [int] IDENTITY(1,1) NOT NULL,
	[ItemId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[BidValue] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[BidId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[BidUser]    Script Date: 1/31/2021 9:31:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[BidUser](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Email] [varchar](250) NOT NULL,
	[PasswordHash] [varbinary](500) NOT NULL,
	[PasswordSalt] [varbinary](500) NOT NULL,
	[UserName] [varchar](250) NOT NULL,
	[DOB] [datetime] NULL,
	[UserAddress] [varchar](250) NULL,
	[UserDescription] [varchar](500) NULL,
	[UserType] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Item]    Script Date: 1/31/2021 9:31:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Item](
	[ItemId] [int] IDENTITY(1,1) NOT NULL,
	[ItemTitle] [varchar](250) NOT NULL,
	[ItemSubTitle] [varchar](250) NULL,
	[ItemDescription] [varchar](1000) NULL,
	[ImagePath] [varchar](500) NULL,
	[ItemStatus] [int] NOT NULL,
	[ExpireTime] [datetime] NULL,
	[StartingBid] [int] NOT NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[ItemId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[NotificationMessage]    Script Date: 1/31/2021 9:31:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[NotificationMessage](
	[NotificationId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[NotificationMessage] [varchar](500) NOT NULL,
	[NotificationStatus] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[NotificationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[UserSession]    Script Date: 1/31/2021 9:31:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserSession](
	[UserSessionId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[IsActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserSessionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[UserType]    Script Date: 1/31/2021 9:31:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[UserType](
	[UserTypeId] [int] IDENTITY(1,1) NOT NULL,
	[UserType] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[UserTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[BidUser] ON 

INSERT [dbo].[BidUser] ([UserId], [Email], [PasswordHash], [PasswordSalt], [UserName], [DOB], [UserAddress], [UserDescription], [UserType]) VALUES (1, N'admin@admin.com', 0xA58F732DEC05263B01C5699787B5381ECFD1D49A8D60243AAAB515F668CFC4B63190CCFC6D63A8CDB58BDC54D59DEC3A7A8271F5F8BB4AC3C4284A525980BA7D, 0x2A742E63C142974FEED3322813043166AAD2709D283AAB048F7E4EE1BBD614551D1159EB6F7DCCA71C33D92220D21204C8DC5822468FB6D2E46671E597C679D9A2CE65D626D230CE6979885DBC1F4D8BB619301D0890E475B905E1983491DB78188591EE8D9F6EE2DD1B132153FF571D5E465AB8DEE37C58FB01318100F55CA6, N'admin', NULL, NULL, NULL, 1)
SET IDENTITY_INSERT [dbo].[BidUser] OFF
SET IDENTITY_INSERT [dbo].[UserType] ON 

INSERT [dbo].[UserType] ([UserTypeId], [UserType]) VALUES (1, N'ADMIN')
INSERT [dbo].[UserType] ([UserTypeId], [UserType]) VALUES (2, N'REGISTEREDUSER')
SET IDENTITY_INSERT [dbo].[UserType] OFF
ALTER TABLE [dbo].[Bid]  WITH CHECK ADD FOREIGN KEY([ItemId])
REFERENCES [dbo].[Item] ([ItemId])
GO
ALTER TABLE [dbo].[Bid]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[BidUser] ([UserId])
GO
ALTER TABLE [dbo].[BidUser]  WITH CHECK ADD FOREIGN KEY([UserType])
REFERENCES [dbo].[UserType] ([UserTypeId])
GO
ALTER TABLE [dbo].[NotificationMessage]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[BidUser] ([UserId])
GO
ALTER TABLE [dbo].[UserSession]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[BidUser] ([UserId])
GO
USE [master]
GO
ALTER DATABASE [BidAppDB] SET  READ_WRITE 
GO
