namespace Domain.Models
{
    public class ElectricalAppliance
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public int Amount { get; set; }
        public Category Category { get; set; }
    }
}
