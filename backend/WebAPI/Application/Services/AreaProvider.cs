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
        private readonly IAreaService _areaService;
        public AreaProvider(DataContext context, IMapper mapper, IAreaService areaService) : base(context, mapper)
        {
            _areaService = areaService;
        }

        public Area GetArea(Point point)
        {
            var areaId = _areaService.GetAreaId(point.XPosition, point.YPosition);
            return Context.Areas.Find(areaId);
        }
    }
}
