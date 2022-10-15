using System.Net;
using Application.Services.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseController : ControllerBase
{
    protected IActionResult SendResponse(ServiceResponse response)
    {
        return response.StatusCode switch
        {
            HttpStatusCode.OK => NoContent(),
            HttpStatusCode.Unauthorized => Unauthorized(),
            HttpStatusCode.Forbidden => Forbid(),
            HttpStatusCode.NotFound => NotFound(),
            _ => BadRequest(new { Errors = response.Errors })
        };
    }

    protected IActionResult SendResponse<T>(ServiceResponse<T> response)
    {
        return response.StatusCode switch
        {
            HttpStatusCode.OK => Ok(response.ResponseContent),
            HttpStatusCode.Unauthorized => Unauthorized(),
            HttpStatusCode.Forbidden => Forbid(),
            HttpStatusCode.NotFound => NotFound(),
            _ => BadRequest(new { Errors = new { response.Errors } })
        };
    }
}