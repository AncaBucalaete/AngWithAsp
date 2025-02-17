using ECommerceAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerceAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }

        public DbSet<Player> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ✅ Seed initial data
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Laptop", Price = 999.99M, Description = "High-performance laptop" },
                new Product { Id = 2, Name = "Smartphone", Price = 599.99M, Description = "Latest smartphone model" },
                new Product { Id = 3, Name = "Headphones", Price = 199.99M, Description = "Noise-canceling headphones" }
            );
        }
    }
}
