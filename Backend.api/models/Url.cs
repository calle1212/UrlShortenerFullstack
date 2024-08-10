using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.api.models;
public class Url
{
    public  string LongUrl {get; set;}
    public  string ShortUrl {get; init;}
    public  int timesUsed {get; set;} = 0;

    public Url(string longUrl, string shortUrl)
    {
        LongUrl = longUrl;
        ShortUrl = shortUrl;
    }
}
