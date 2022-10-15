using AutoMapper;
using Domain.Models;

namespace Application.Core;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        // Create maps   
        CreateMap<Category, CategoryViewModel>();
    }
}