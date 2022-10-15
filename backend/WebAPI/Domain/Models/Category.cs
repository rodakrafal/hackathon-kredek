using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Models;

public class Category
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public ICollection<Event> Events { get; set; } = default!;
}