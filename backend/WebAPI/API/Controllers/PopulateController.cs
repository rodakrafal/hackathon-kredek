using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PopulateController : ControllerBase
    {
        private readonly IPopulateService _populateService;
        private readonly IWebHostEnvironment _hostEnvironment;

        public PopulateController(IPopulateService populateService, IWebHostEnvironment hostEnvironment)
        {
            _populateService = populateService;
            _hostEnvironment = hostEnvironment;
        }

        [HttpPost("areas")]
        public IActionResult PopulateAreas()
        {
            _populateService.PopulateAreas(_hostEnvironment.WebRootPath);

            return Ok();
        }

        [HttpPost("categories")]
        public IActionResult PopulateCategories()
        {
            _populateService.PopulateCategories();
            
            return Ok();
        }
    }
}