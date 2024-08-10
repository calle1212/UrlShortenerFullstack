using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Backend.api.data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Backend.api.Controllers;

[Route("api/[controller]")]
public class UrlController(IUrlRepository repo) : Controller
{

    private readonly IUrlRepository _repo = repo;


    [HttpGet]
    public string GetHelloWorld()
    {
        return "Hello World!";
    }

}
