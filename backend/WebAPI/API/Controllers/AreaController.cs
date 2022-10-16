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
    }
}
