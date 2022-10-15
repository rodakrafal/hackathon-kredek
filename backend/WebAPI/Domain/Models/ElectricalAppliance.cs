namespace Domain.Models
{
    public class ElectricalAppliance
    {
        public Guid Id { get; set; }
        public Guid CategoryId { get; set; }
        public Guid ElectricityUsageRecordId { get; set; }
        public int Amount { get; set; }
        public Category Category { get; set; } = default!;
        public ElectricityUsageRecord ElectricityUsageRecord { get; set; } = default!;
    }
}
