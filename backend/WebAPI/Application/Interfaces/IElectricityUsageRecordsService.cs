using Application.Services.Utilities;
using Domain.Models;
using Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IElectricityUsageRecordsService
    {
        ServiceResponse<IEnumerable<ElectricityUsageRecordViewModel>> GetElectricityUsageRecords();
        ServiceResponse<ElectricityUsageRecordStats> AddElectricityUsageRecord(int x, int y, int yearlyUsage, List<ElectricalApplianceInputModel>? electricalApplianceIds, bool publish);
    }
}
