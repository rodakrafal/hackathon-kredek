using Application.Services.Utilities;
using Domain.Models;
using Domain.ViewModels;

namespace Application.Interfaces
{
    public interface ICategoryService
    {
        ServiceResponse<IEnumerable<CategoryViewModel>> GetCategories();
        ServiceResponse<Category> GetCategory(Guid categoryId);
    }
}
