using Application.Dtos;
using Application.Interfaces;
using Application.Services.Utilities;
using AutoMapper;
using Domain.Models;
using Persistence;
using System.Linq;
using System.Net;

namespace Application.Services
{
    public class AreaService : Service, IAreaService
    {
        private const double REF_X = 20037508.34;
        private const double REF_E = 2.7182818284;

        List<Point> area = new List<Point>()
        {
            new Point() {XPosition = 0, YPosition = 0},
            new Point() {XPosition = 4, YPosition = 2},
            new Point() {XPosition = 10, YPosition = 0},
            new Point() {XPosition = 10, YPosition = 10},
            new Point() {XPosition = 0, YPosition = 10},
            new Point() {XPosition = 0, YPosition = 0},
        };

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
                                ConvertReferenceSystemLatitude(p.YPosition),
                                ConvertReferenceSystemLongitude(p.XPosition) 
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
    }
}
