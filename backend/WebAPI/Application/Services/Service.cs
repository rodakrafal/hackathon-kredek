using AutoMapper;
using Persistence;

namespace Application.Services;

public class Service
{
    protected DataContext Context { get; }
    protected IMapper Mapper { get; }

    public Service(DataContext context, IMapper mapper)
    {
        Context = context;
        Mapper = mapper;
    }
}