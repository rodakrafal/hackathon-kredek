using Application.Core;
using Application.Interfaces;
using Application.Services;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        // Add DataContext
        services.AddDbContext<DataContext>(opt => 
        {
            opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
        });

        // Add cors
        var origins = configuration.GetSection("AllowedOrigins").Get<string[]>();
        services.AddCors(opt =>
        {
            opt.AddPolicy("CorsPolicy", builder =>
                builder.AllowAnyMethod()
                .AllowAnyHeader()
                .WithOrigins(origins));
        });

        // Add services, validators, automapper etc...
        services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);
        services.AddScoped<IPopulateService, PopulateService>();
        services.AddScoped<IElectricityUsageRecordsService, ElectricityUsageRecordsService>();
        services.AddScoped<IElectricityUsageRecordStatsService, ElectricityUsageRecordStatsService>();
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<IAreaProvider, AreaProvider>();
        services.AddScoped<IAreaService, AreaService>();

        return services;
    }
}