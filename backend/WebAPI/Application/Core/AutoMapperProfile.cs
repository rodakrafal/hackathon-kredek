using AutoMapper;
using Domain.Models;
using Domain.ViewModels;

namespace Application.Core;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        // Create maps   
        CreateMap<Category, CategoryViewModel>();
        CreateMap<ElectricityUsageRecord, ElectricityUsageRecordViewModel>()
            .ForMember(d => d.XPosition, opt => opt.MapFrom(c => c.Point.XPosition))
            .ForMember(d => d.YPosition, opt => opt.MapFrom(c => c.Point.YPosition))
            .ForMember(d => d.AreaName, opt => opt.MapFrom(c => c.Point.Area.Name));
    }
}