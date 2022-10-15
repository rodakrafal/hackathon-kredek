﻿using Application.Interfaces;
using Application.Services.Utilities;
using AutoMapper;
using Domain.Models;
using Domain.ViewModels;
using Microsoft.EntityFrameworkCore;
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

        public ServiceResponse<IEnumerable<ElectricityUsageRecordViewModel>> GetElectricityUsageRecords()
        {
            var records = Context.ElectricityUsageRecords.Include(x => x.Point).Include(x => x.Point.Area).ToList();
            var result = records.Select(Mapper.Map<ElectricityUsageRecord, ElectricityUsageRecordViewModel>).ToList();
            return new ServiceResponse<IEnumerable<ElectricityUsageRecordViewModel>>(System.Net.HttpStatusCode.OK, result);
        }

        public ServiceResponse<ElectricityUsageRecordStats> AddElectricityUsageRecord(int x, int y, int yearlyUsage, List<ElectricalApplianceInputModel>? electricalAppliancesInput, bool publish)
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

            var electricalAppliances = electricalAppliancesInput.Select(x => new ElectricalAppliance()
            {
                CategoryId = x.CategoryId,
                Amount = x.Amount,
                ElectricityUsageRecord = electricityRecord
            }).ToList();

            electricityRecord.ElectricalAppliances = electricalAppliances;

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