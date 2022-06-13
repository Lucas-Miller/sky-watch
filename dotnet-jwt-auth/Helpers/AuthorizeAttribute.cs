// This is a custom attribute that is used on controller methods that require
// an authenticated user.

namespace WebApi.Helpers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WebApi.Entities;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AuthorizeAttribute : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {   // User is authorized via jwtMiddleware 
        var user = (User)context.HttpContext.Items["User"];
        if(user == null)
        { // If not authorized, return an error json result
            context.Result = new JsonResult(new { message = "User is not authorized" }) {StatusCode = StatusCodes.Status401Unauthorized };
        }
    }
}