using Application.Interfaces;
using Application.Services.Utilities;
using AutoMapper;
using Domain.Models;
using Domain.ViewModels;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class CategoryService : Service, ICategoryService
    {
        public CategoryService(DataContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public ServiceResponse<IEnumerable<CategoryViewModel>> GetCategories()
        {
            var categories = Context.Categories.ToList();
            var categoriesViewModel = categories.Select(Mapper.Map<Category, CategoryViewModel>).ToList();
            return new ServiceResponse<IEnumerable<CategoryViewModel>>(System.Net.HttpStatusCode.OK, categoriesViewModel);
        }

        public ServiceResponse<Category> GetCategory(Guid categoryId)
        {
            var category = Context.Categories.FirstOrDefault(c => c.Id == categoryId);
            if (category == null)
            {
                return new ServiceResponse<Category>(System.Net.HttpStatusCode.NotFound);
            }
            return new ServiceResponse<Category>(System.Net.HttpStatusCode.OK, category);
        }
    }
}
