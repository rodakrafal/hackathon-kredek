using Application.Interfaces;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class ElectricityUsageRecordStatsService : IElectricityUsageRecordStatsService
    {
        public ElectricityUsageRecordStats GetElectricityUsageRecordStats(ElectricityUsageRecord electricityUsageRecord)
        {
            return new ElectricityUsageRecordStats()
            {
                YearlyUsage = electricityUsageRecord.YearlyUsage,
                AverageYearlyUsage = electricityUsageRecord.YearlyUsage
            };
        }
    }
}
