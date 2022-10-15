using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Models;

public class Area
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public ICollection<Point> Points { get; set; } = default!;
    public ICollection<ElectricityUsageRecord> ElectricityUsagesRecords { get; set; } = default!;
}