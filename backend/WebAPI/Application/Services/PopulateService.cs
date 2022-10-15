using Application.Interfaces;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
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
        public void Populate(string path)
        {
            var filePath = Path.Combine(path, "geo_data.json");

            var text = File.ReadAllText(filePath);

            var data = JsonSerializer.Deserialize<List<Area>>(text);

            _dataContext.Points
                .RemoveRange(_dataContext.Points.ToArray());
            _dataContext
                .Areas.RemoveRange(_dataContext.Areas.ToArray());

            if (data is not null)
            {
                _dataContext.Areas
                    .AddRange(data.GroupBy(x => x.Name)
                        .Select(x => x.First())
                        .Distinct());
                _dataContext.SaveChanges();
            }
        }
    }
}
