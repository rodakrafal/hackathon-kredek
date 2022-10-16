using Application.Dtos;
using Application.Services.Utilities;

namespace Application.Interfaces
{
    public interface IAreaService
    {
        public ServiceResponse<GeoJson> GetAreas();

        public ServiceResponse<string> GetArea(int x, int y);
    }
}