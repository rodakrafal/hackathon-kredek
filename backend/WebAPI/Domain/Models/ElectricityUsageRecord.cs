using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Models;

public class ElectricityUsageRecord
{
    public Guid Id { get; set; }
    public int YearlyUsage { get; set; }
    public DateTime CreatedAt { get; set; }
    public Guid PointId { get; set; }
    public Point Point { get; set; } = default!;
    public ICollection<ElectricalAppliance> ElectricalAppliances { get; set; } = default!;

}