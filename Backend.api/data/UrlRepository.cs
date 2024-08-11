using System.Resources;
using Backend.api.models;
using Microsoft.VisualBasic;

namespace Backend.api.data;
public class UrlRepository : IUrlRepository
{
    private readonly Dictionary<string, Url> _urls = new();

    public Url? CreateUrl(string LongUrl)
    {
        var guid = Guid.NewGuid().ToString().Replace("-", "")[0..6];
        Url newUrl = new Url(LongUrl, guid);
        return _urls.TryAdd(guid, newUrl) ? newUrl : null;
    }

    public Url? GetUrl(string shortUrl)
    {
        return _urls.TryGetValue(shortUrl, out var url)
        ? url
        : null;
    }

    public Url? UpdateUrl(string shortUrl, string newLongUrl)
    {
        if (_urls.TryGetValue(shortUrl, out var url))
        {
            url.LongUrl = newLongUrl;
            return url;
        }
        return null;
    }

    public bool DeleteUrl(string shortUrl)
    {
        return _urls.Remove(shortUrl);
    }

    public Url[] GetAll() {
        return _urls.Select(pair => pair.Value).ToArray();
    }

}
