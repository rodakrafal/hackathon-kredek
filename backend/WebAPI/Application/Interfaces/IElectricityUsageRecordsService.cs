using Application.Services.Utilities;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IElectricityUsageRecordsService
    {
        ServiceResponse<IEnumerable<ElectricityUsageRecord>> GetElectricityUsageRecords();
        ServiceResponse<ElectricityUsageRecordStats> AddElectricityUsageRecord(int x, int y, int yearlyUsage, List<Guid>? electricalApplianceIds, bool publish);
    }
}
