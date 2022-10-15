using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Models;

public class Event
{
    public Guid Id { get; set; }
    public int XPosition { get; set; }
    public int YPosition { get; set; }
    public int UpVotes { get; set; }
    public int DownVotes { get; set; }
    public DateTime CreatedAt { get; set; }
    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = default!;
    public Guid AreaId { get; set; }
    public Area Area { get; set; } = default!;

}