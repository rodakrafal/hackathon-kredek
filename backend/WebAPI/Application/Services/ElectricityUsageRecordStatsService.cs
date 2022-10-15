using Application.Interfaces;
using AutoMapper;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class ElectricityUsageRecordStatsService : Service, IElectricityUsageRecordStatsService
    {
        public ElectricityUsageRecordStatsService(DataContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public ElectricityUsageRecordStats GetElectricityUsageRecordStats(ElectricityUsageRecord electricityUsageRecord)
        {
            var average = Context.ElectricityUsageRecords
                .Include(x => x.Point)
                .Include(x => x.Point.Area)
                .Include(x => x.ElectricalAppliances)
                .Where(x => x.Point.AreaId == electricityUsageRecord.Point.AreaId)
                .ToList()
                .Where(x => GetElectricityUsageGrade(x) >= GetElectricityUsageGrade(electricityUsageRecord) * 0.9)
                .Where(x => GetElectricityUsageGrade(x) <= GetElectricityUsageGrade(electricityUsageRecord) * 1.1)
                .Average(x => x.YearlyUsage);

            return new ElectricityUsageRecordStats()
            {
                YearlyUsage = electricityUsageRecord.YearlyUsage,
                AverageYearlyUsage = (int)average
            };
        }

        private int GetElectricityUsageGrade(ElectricityUsageRecord record)
        {
            return record.ElectricalAppliances.Sum(x => x.Amount);
        }
    }
}
