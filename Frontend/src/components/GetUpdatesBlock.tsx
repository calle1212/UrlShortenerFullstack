import { UrlProps } from "../types";

function handleUpdate(shortUrlInput: string, longUrlInput: string) {
    const req = { shortUrl: shortUrlInput, longUrl: longUrlInput }
    fetch("http://localhost:5277/api/Url", ({
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req)

    })).catch((res) => (console.error(res)))
    const arrElements = [...UrlPropsArray];
    const foundUrl = arrElements.find(a => a.shortUrl == shortUrlInput)
    if (foundUrl != undefined) {
      longUrlInput = shortenString(longUrlInput);
      foundUrl.longUrl = longUrlInput;
      setUrlPropsArray(arrElements);
    }
  }

  export default function GetUpdatesBlock({ shortUrl }: UrlProps) {

    const [input, setInput] = useState("");
    const handleChange = (e) => {
      setInput(e.target.value);
    };
    return (
      <div className='update-field__div'>
        <input type="text" value={input} onChange={handleChange}></input>
        <button className='update-field__button' onClick={() => handleUpdate(shortUrl, { input }.input)}>Update</button>
      </div>
    )
  }