using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos
{
    public class Feature
    {
        public string Type { get; set; } = default!;

        public Geometry Geometry { get; set; } = default!;

        public Dictionary<string, string> Properties { get; set; } = default!;
    }
}
