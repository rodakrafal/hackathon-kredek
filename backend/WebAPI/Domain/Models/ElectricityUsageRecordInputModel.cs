namespace Domain.Models
{
    public class ElectricityUsageRecordInputModel
    {
        public int X { get; set; }

        public int Y { get; set; }

        public int YearlyUsage { get; set; }

        public List<ElectricalApplianceInputModel>? ElectricalAppliances { get; set; }

        public bool Publish { get; set; } = false;
    }
}
