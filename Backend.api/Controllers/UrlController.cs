using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Backend.api.Controllers;

[Route("api/[controller]")]
public class UrlController : Controller
{
    [HttpGet]
    public string GetHelloWorld()
    {
        return "Hello World!";
    }

}
