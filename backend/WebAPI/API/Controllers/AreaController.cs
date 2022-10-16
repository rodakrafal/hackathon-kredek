using Microsoft.AspNetCore.Mvc;
using Application.Dtos;
using Application.Interfaces;

namespace API.Controllers
{
    public class AreaController : BaseController
    {
        IAreaService _areaService;

        public AreaController(IAreaService areaService)
        {
            _areaService = areaService;
        }

        [HttpGet]
        public IActionResult GetAreas()
        {
            var response = _areaService.GetAreas();

            return SendResponse<GeoJson>(response);
        }

        [HttpGet("area-name")]
        public IActionResult GetArea([FromQuery] int x, [FromQuery] int y)
        {
            var response = _areaService.GetArea(x, y);

            return SendResponse<string>(response);
        }

        [HttpGet("coords")]
        public IActionResult GetAreaAppliancesUsage(int x, int y)
        {
            return SendResponse<IDictionary<string, int>>(_areaService.GetAreaAppliancesUsage(x, y));
        }

        [HttpGet("name")]
        public IActionResult GetAreaAppliancesUsage(string name)
        {
            return SendResponse<IDictionary<string, int>>(_areaService.GetAreaAppliancesUsage(name));
        }
    }
}
