using Application.Interfaces;
using AutoMapper;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class AreaProvider : Service, IAreaProvider
    {
        public AreaProvider(DataContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public Area GetArea(Point point)
        {
            return Context.Areas.Include(x => x.Points).ToArray().MinBy(x => (x.Points.First().XPosition - point.XPosition) * (x.Points.First().XPosition - point.XPosition) 
            + (x.Points.First().YPosition - point.YPosition) * (x.Points.First().YPosition - point.YPosition));
        }
    }
}
