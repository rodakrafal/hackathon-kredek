using Application.Interfaces;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json;
using Domain.Models;

namespace Application.Services
{
    public class PopulateService : IPopulateService
    {
        private readonly DataContext _dataContext;

        public PopulateService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public void PopulateAreas(string dataPath)
        {
            var filePath = Path.Combine(dataPath, "geo_data.json");

            var text = File.ReadAllText(filePath);

            var data = JsonSerializer.Deserialize<List<Area>>(text);

            _dataContext.Points
                .RemoveRange(_dataContext.Points.ToArray());
            _dataContext
                .Areas.RemoveRange(_dataContext.Areas.ToArray());

            if (data is not null)
            {
                var areas = data.GroupBy(x => x.Name)
                        .Select(x => x.First())
                        .Distinct()
                        .ToList();
                _dataContext.Areas
                    .AddRange(areas);
                _dataContext.SaveChanges();
            }
        }

        public void PopulateCategoriesAndAppliances()
        {
            var categories = new List<Category>
            {
                new()
                {
                    Name = "Komputer stacjonarny",
                    Usage = 5
                },
                new()
                {
                    Name = "Laptop",
                    Usage = 0
                },
                new()
                {
                    Name = "Telewizor",
                    Usage = 0
                },
                new()
                {
                    Name = "",
                    Usage = 0
                },
                new()
                {
                    Name = "",
                    Usage = 0
                },
                new()
                {
                    Name = "",
                    Usage = 0
                },
                new()
                {
                    Name = "",
                    Usage = 0
                },
            };
        }
    }
}
