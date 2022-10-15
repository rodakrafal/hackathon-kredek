using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Models;

public class Point 
{
    public Guid Id { get; set; }
    public int XPosition { get; set; }
    public int YPosition { get; set; }
    public Guid AreaId { get; set; }
    public Area Area { get; set; } = default!;
}