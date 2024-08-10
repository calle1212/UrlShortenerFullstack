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
        var id = _repo.CreateUrl("google.se");
        return _repo.GetUrl(id).LongUrl;
    }

}
