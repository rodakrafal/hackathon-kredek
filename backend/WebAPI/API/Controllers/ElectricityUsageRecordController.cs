using Application.Interfaces;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ElectricityUsageRecordController : BaseController
    {
        private readonly IElectricityUsageRecordsService _electricityUsageRecordsService;

        public ElectricityUsageRecordController(IElectricityUsageRecordsService electricityUsageRecordsService)
        {
            _electricityUsageRecordsService = electricityUsageRecordsService;
        }

        [HttpGet]
        public IActionResult GetElectricityUsageRecords()
        {
            var result = _electricityUsageRecordsService.GetElectricityUsageRecords();
            return SendResponse(result);
        }

        [HttpPost]
        public IActionResult CreateElectricityUsageRecord([FromBody] ElectricityUsageRecordInputModel input)
        {
            var x = input.X;
            var y = input.Y;
            var yearlyUsage = input.YearlyUsage;
            var electricalAppliances = input.ElectricalAppliances;
            var publish = input.Publish;

            var result = _electricityUsageRecordsService.AddElectricityUsageRecord(x, y, yearlyUsage, electricalAppliances, publish);
            return SendResponse(result);
        }
    }
}
