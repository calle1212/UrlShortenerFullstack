using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.api.models
{
    public record UrlUpdateRequest
    {
        public string shortUrl {get; init;}
        public string longUrl {get; init;}
    }
}