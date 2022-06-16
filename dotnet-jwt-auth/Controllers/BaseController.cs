// Base controller from which all other controllers inherrit from

namespace WebApi.Controllers;

using Microsoft.AspNetCore.Mvc;
using WebApi.Entities;

[Controller]
public abstract class BaseController : ControllerBase
{
    public Account Account => (Account)HttpContext.Items["Account"];
}