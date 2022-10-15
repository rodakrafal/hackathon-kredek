using Application.Interfaces;
using Application.Services.Utilities;
using AutoMapper;
using Domain.Models;
using Persistence;

namespace Application.Services
{
    public class ElectricityUsageRecordsService : Service, IElectricityUsageRecordsService
    {
        private readonly IElectricityUsageRecordStatsService _electricityUsageRecordStatsService;
        public ElectricityUsageRecordsService(
            DataContext context,
            IMapper mapper,
            IElectricityUsageRecordStatsService electricityUsageRecordStatsService) : base(context, mapper)
        {
            _electricityUsageRecordStatsService = electricityUsageRecordStatsService;
        }

        public ServiceResponse<IEnumerable<ElectricityUsageRecord>> GetElectricityUsageRecords()
        {
            var result = Context.ElectricityUsageRecords.ToList();
            return new ServiceResponse<IEnumerable<ElectricityUsageRecord>>(System.Net.HttpStatusCode.OK, result);
        }

        public ServiceResponse<ElectricityUsageRecordStats> AddElectricityUsageRecord(int x, int y, int yearlyUsage, List<Guid>? electricalApplianceIds, bool publish)
        {
            var point = new Point()
            {
                XPosition = x,
                YPosition = y,
            };

            var electricityRecord = new ElectricityUsageRecord()
            {
                YearlyUsage = yearlyUsage,
                ElectricalAppliances = new List<ElectricalAppliance>(),
                CreatedAt = DateTime.Now
            };

            if (publish)
            {
                point.AreaId = Context.Areas.First<Area>().Id;
                Context.Points.Add(point);
                electricityRecord.PointId = point.Id;
                Context.ElectricityUsageRecords.Add(electricityRecord);
                Context.SaveChanges();
            }

            var stats = _electricityUsageRecordStatsService.GetElectricityUsageRecordStats(electricityRecord);

            return new ServiceResponse<ElectricityUsageRecordStats>(System.Net.HttpStatusCode.OK, stats);
        }
    }
}
