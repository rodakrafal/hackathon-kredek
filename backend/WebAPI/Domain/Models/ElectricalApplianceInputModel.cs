using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class ElectricalApplianceInputModel
    {
        public Guid CategoryId { get; set; }
        public int Amount { get; set; }
    }
}
