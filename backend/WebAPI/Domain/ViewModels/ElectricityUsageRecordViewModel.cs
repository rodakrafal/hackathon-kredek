using Domain.Models;

namespace Domain.ViewModels
{
    public class ElectricityUsageRecordViewModel
    {
        public int YearlyUsage { get; set; }
        public DateTime CreatedAt { get; set; }
        public int XPosition { get; set; }
        public int YPosition { get; set; }
        public string AreaName { get; set; } = string.Empty;
    }
}
