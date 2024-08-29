import { UrlProps } from "../types";

 function handleDelete(shortUrl: string) {
    fetch("http://localhost:5277/api/Url", ({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shortUrl)
    })).catch((res) => (console.error(res)))

    setUrlPropsArray(UrlPropsArray.filter(url => url.shortUrl != shortUrl));
  }

  export default function GetDeleteButton({ shortUrl }: UrlProps) {
    return (
      <button onClick={() => handleDelete(shortUrl)}>🗑</button>
    )
  }