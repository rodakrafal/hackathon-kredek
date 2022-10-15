using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class ElectricityUsageRecordInputModel
    {
        public int X { get; set; }

        public int Y { get; set; }

        public int YearlyUsage { get; set; }

        public List<Guid>? ElectricalAppliancesIds { get; set; }

        public bool Publish { get; set; } = false;
    }
}
