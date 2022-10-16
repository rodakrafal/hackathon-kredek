using Application.Dtos;
using Application.Interfaces;
using Application.Services.Utilities;
using AutoMapper;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;
using System.Net;

namespace Application.Services
{
    public class AreaService : Service, IAreaService
    {
        private const double REF_X = 20037508.34;
        private const double REF_E = 2.7182818284;

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
                            a.Points.Select(p => new List<double>() {
                                ConvertReferenceSystemLongitude(p.XPosition),
                                ConvertReferenceSystemLatitude(p.YPosition)
                            }).ToList()
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

        private static double ConvertReferenceSystemLatitude(int latitude)
        {
            double lat = latitude / (REF_X / 180);
            double exponent = (Math.PI / 180) * lat;

            lat = Math.Atan(Math.Pow(REF_E, exponent));
            lat /= (Math.PI / 360);
            return lat - 90;
        }

        private static double ConvertReferenceSystemLongitude(int longitude)
        {
            return longitude * 180 / REF_X;
        }

        public ServiceResponse<string> GetArea(int x, int y)
        {
            ServiceResponse<string> response = new(HttpStatusCode.OK)
            {
                ResponseContent = 
                    PointInPolygon(new Point() { XPosition = x, YPosition = y }, area) 
                        ? "Inside" 
                        : "Outside"
            };

            return response;

        }
        public static bool PointInPolygon(Point p, List<Point> poly)
        {
            int n = poly.Count();

            poly.Add(new Point { XPosition = poly[0].XPosition, YPosition = poly[0].YPosition });
            Point[] v = poly.ToArray();

            int wn = 0;    // the winding number counter

            // loop through all edges of the polygon
            for (int i = 0; i < n; i++)
            {   // edge from V[i] to V[i+1]
                if (v[i].XPosition <= p.XPosition)
                {         // start y <= P.y
                    if (v[i + 1].XPosition > p.XPosition)      // an upward crossing
                        if (isLeft(v[i], v[i + 1], p) > 0)  // P left of edge
                            ++wn;            // have a valid up intersect
                }
                else
                {                       // start y > P.y (no test needed)
                    if (v[i + 1].XPosition <= p.XPosition)     // a downward crossing
                        if (isLeft(v[i], v[i + 1], p) < 0)  // P right of edge
                            --wn;            // have a valid down intersect
                }
            }
            if (wn != 0)
                return true;
            else
                return false;

        }

        public ServiceResponse<IDictionary<string, int>> GetAreaAppliancesUsage(int x, int y)
        {
            var point = new Point()
            {
                XPosition = x,
                YPosition = y
            };

            var areaId = GetAreaId(x, y);
            return GetAreaAppliancesUsage(areaId);
        }

        public ServiceResponse<IDictionary<string, int>> GetAreaAppliancesUsage(string name)
        {
            var point = Context.Areas.Where(a => a.Name == name).FirstOrDefault();
            if (point == null)
            {
                return new ServiceResponse<IDictionary<string, int>>(System.Net.HttpStatusCode.NotFound);
            }
            var dictionary = GetAreaAppliancesUsage(point.Id);
            return dictionary;
        }

        private static int isLeft(Point P0, Point P1, Point P2)
        {
            double calc = ((P1.YPosition - P0.YPosition) * (P2.XPosition - P0.XPosition)
                    - (P2.YPosition - P0.YPosition) * (P1.XPosition - P0.XPosition));
            if (calc > 0)
                return 1;
            else if (calc < 0)
                return -1;
            else
                return 0;
        }

        private ServiceResponse<IDictionary<string, int>> GetAreaAppliancesUsage(Guid areaId)
        {
            var dictionary = new Dictionary<Guid, int>();
            // var result = Context.Points.Include(x => x.ElectricityUsageRecord).Where(x => x.AreaId.Equals(areaId)).Where(x => x.ElectricityUsageRecord != null);
            var result = Context.ElectricityUsageRecords.Include(x => x.Point).Include(x => x.ElectricalAppliances).Where(x => x.Point.AreaId.Equals(areaId));
            foreach (var point in result)
            {
                foreach (var appliances in point.ElectricalAppliances)
                {
                    if (!dictionary.ContainsKey(appliances.CategoryId))
                    {
                        dictionary.Add(appliances.CategoryId, 0);
                    }
                    dictionary[appliances.CategoryId] += appliances.Amount;
                }
            }
            var res = dictionary.ToDictionary(k => Context.Categories.Find(k.Key).Name, k => Context.Categories.Find(k.Key).Usage*k.Value);
            return new ServiceResponse<IDictionary<string, int>>(System.Net.HttpStatusCode.OK, res);
        }

        public Guid GetAreaId(int x, int y)
        {
            Point p = new() { XPosition = x, YPosition = y };
            foreach (var area in Context.Areas.Include(x => x.Points))
            {
                if (PointInPolygon(p, area.Points.ToList()))
                {
                    return area.Id;
                }
            }

            return Guid.Empty;
        }

        public ServiceResponse<IEnumerable<string>> GetAreaNames()
        {
            var names = Context.Areas.Select(x => x.Name).ToList();
            var response = new ServiceResponse<IEnumerable<string>>(System.Net.HttpStatusCode.OK)
            {
                ResponseContent = names
            };
            return response;
        }
    }
}
