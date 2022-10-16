using Application.Dtos;
using Application.Services.Utilities;

namespace Application.Interfaces
{
    public interface IAreaService
    {
        public ServiceResponse<GeoJson> GetAreas();

        public ServiceResponse<string> GetArea(int x, int y);
        ServiceResponse<IDictionary<string, int>> GetAreaAppliancesUsage(int x, int y);
        ServiceResponse<IDictionary<string, int>> GetAreaAppliancesUsage(string name);
        public Guid GetAreaId(int x, int y);
    }
}