using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Backend.api.data;
using Backend.api.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Backend.api.Controllers;

[Route("api/[controller]")]
public class UrlController(IUrlRepository repo) : Controller
{

    private readonly IUrlRepository _repo = repo;


    [HttpGet]
    public Url[] GetAllUrls()
    {
        return _repo.GetAll();
    }

    [HttpGet("/{shortUrl}")]
    public ActionResult<Url> GetUrl(string shortUrl)
    {
        return _repo.GetUrl(shortUrl) is Url foundUrl
        ? foundUrl
        : NotFound("Url was not found");
    }

    [HttpPost]
    public ActionResult<Url> Create(string longUrl)
    {
       
        Url newUrl = _repo.CreateUrl(longUrl);
        return CreatedAtAction(nameof(GetUrl), new { shortUrl = newUrl!.ShortUrl }, newUrl);
    }

}
