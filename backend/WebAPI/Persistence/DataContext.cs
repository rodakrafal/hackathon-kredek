using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DbSet<Area> Areas { get; set; } = default!;
    public DbSet<Point> Points { get; set; } = default!;
    public DbSet<Event> Events { get; set; } = default!;
    public DbSet<Category> Categories { get; set; } = default!;
}