import { UrlProps } from "./types";

export function shortenString(longUrl: string): string {
  const maxLength: number = 60;
  if (longUrl.length > maxLength) {
    return longUrl.substring(0, maxLength - 3) + "...";
  } else {
    return longUrl;
  }
}

export async function getUrls() :Promise<UrlProps[]> {
  return await fetch("http://localhost:5277/api/Url").then((res) => {
    return res.json();
  });
}

export async function updateUrl(shortUrlInput: string, longUrlInput : string) {
  const req = { shortUrl: shortUrlInput, longUrl: longUrlInput }
 return fetch("http://localhost:5277/api/Url", ({
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req)

  }))
}
