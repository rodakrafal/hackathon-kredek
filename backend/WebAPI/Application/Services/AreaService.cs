using Application.Dtos;
using Application.Interfaces;
using Application.Services.Utilities;
using AutoMapper;
using Persistence;
using System.Linq;
using System.Net;

namespace Application.Services
{
    public class AreaService : Service, IAreaService
    {
        public AreaService(DataContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public ServiceResponse<GeoJson> GetAreas()
        {
            GeoJson json = new GeoJson()
            {
                Type = "FeatureCollection"
            };

            json.Features = Context.Areas.Select(a =>
                new Feature() {
                    Type = "Feature",
                    Properties = new Dictionary<string, string>() { { "name", a.Name } },
                    Geometry = new Geometry()
                    {
                        Type = "Polygon",
                        Coordinates = new List<List<List<double>>>() {
                                a.Points.Select(p => new List<double>() { p.XPosition, p.YPosition }).ToList()
                        }
                    }
                }
            ).ToList();

            ServiceResponse<GeoJson> response = new(HttpStatusCode.OK)
            {
                ResponseContent = json
            };
            return response;
        }
    }
}
