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

    [HttpGet("{shortUrl}")]
    public ActionResult<Url> GetUrl(string shortUrl)
    {
        var foundUrl = _repo.GetUrl(shortUrl);
        if (foundUrl != null)
        {
            foundUrl.timesUsed += 1;
            return Redirect(foundUrl.LongUrl);
        }
        return NotFound("Url was not found");
    }

    [HttpPost]
    public ActionResult<Url> Create([FromBody] string longUrl)
    {
        Url newUrl = _repo.CreateUrl(longUrl);
        return CreatedAtAction(nameof(GetUrl), new { shortUrl = newUrl!.ShortUrl }, newUrl);
    }

    [HttpDelete]
    public IActionResult Delete([FromBody] string shortUrl)
    {
        return _repo.DeleteUrl(shortUrl)
        ? Ok()
        : NotFound();

    }

    [HttpPatch]
    public ActionResult<Url> Update([FromBody] UrlUpdateRequest urlUpdate)
    {
        return _repo.UpdateUrl(urlUpdate.shortUrl, urlUpdate.longUrl) is Url url
        ? url
        : NotFound("The url id was not found");
    }

}
