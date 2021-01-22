using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace BidSystem.Server.DB.DBModels
{
    public partial class BidAppDBContext : DbContext
    {
        public BidAppDBContext()
        {
        }

        public BidAppDBContext(DbContextOptions<BidAppDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Bid> Bids { get; set; }
        public virtual DbSet<BidUser> BidUsers { get; set; }
        public virtual DbSet<Item> Items { get; set; }
        public virtual DbSet<UserDetail> UserDetails { get; set; }
        public virtual DbSet<UserType> UserTypes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=CL-SHANP\\SHNDB;Database=BidAppDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Bid>(entity =>
            {
                entity.ToTable("Bid");

                entity.Property(e => e.ExpireTime).HasColumnType("datetime");

                entity.HasOne(d => d.Item)
                    .WithMany(p => p.Bids)
                    .HasForeignKey(d => d.ItemId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Bid__ItemId__2D27B809");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Bids)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Bid__UserId__2E1BDC42");
            });

            modelBuilder.Entity<BidUser>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK__BidUser__1788CC4C1238FDE6");

                entity.ToTable("BidUser");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.PasswordHash)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsFixedLength(true);

                entity.Property(e => e.PasswordSalt)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsFixedLength(true);

                entity.HasOne(d => d.UserDetailNavigation)
                    .WithMany(p => p.BidUsers)
                    .HasForeignKey(d => d.UserDetail)
                    .HasConstraintName("FK__BidUser__UserDet__2A4B4B5E");

                entity.HasOne(d => d.UserTypeNavigation)
                    .WithMany(p => p.BidUsers)
                    .HasForeignKey(d => d.UserType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__BidUser__UserTyp__29572725");
            });

            modelBuilder.Entity<Item>(entity =>
            {
                entity.ToTable("Item");

                entity.Property(e => e.ImagePath)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.ItemDescription)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.ItemSubTitle)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.ItemTitle)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserDetail>(entity =>
            {
                entity.ToTable("UserDetail");

                entity.Property(e => e.Addess)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Dob)
                    .HasColumnType("datetime")
                    .HasColumnName("DOB");

                entity.Property(e => e.UserDescription)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserType>(entity =>
            {
                entity.ToTable("UserType");

                entity.Property(e => e.UserType1)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("UserType");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
