using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Models;

public class Category
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public int Usage { get; set; }
    public ICollection<ElectricityUsageRecord> ElectricityUsageRecords { get; set; } = default!;
}