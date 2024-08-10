using Backend.api.models;

namespace Backend.api.data;
public interface IUrlRepository
{
    public string? CreateUrl(string LongUrl);
    public Url? GetUrl(string shortUrl);
    public bool UpdateUrl(string shortUrl, string newLongUrl);
    public bool DeleteUrl(string shortUrl);
}
