import { useEffect, useState } from 'react'
import "./index.css"

interface UrlProps {
  longUrl: string;
  shortUrl: string;
  timesUsed: number;
}


function ShortenString(longUrl: string): string {
  const maxLength: number = 80;
  if (longUrl.length > maxLength) {
    return longUrl.substring(0, maxLength - 3) + "...";
  }
  else {
    return longUrl;
  }
}


function UrlBlocks() {
  //const UrlPropsArray: UrlProps[] = [];
  const [UrlPropsArray, setUrlPropsArray] = useState<UrlProps[]>([]);

  useEffect(() => {
    fetch("http://localhost:5277/api/Url")
      .then(res => {
        return res.json()
      })
      .then((data) => {
        console.log(data);
        data.forEach(element => {
          element.longUrl = ShortenString(element.longUrl);
        });
        setUrlPropsArray(data);
      })
  }, [])

  function PostField() {
    const [input, setInput] = useState("");

    async function handlesubmit() {
      const response = await fetch("http://localhost:5277/api/Url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }.input)
      });
      const responseData: UrlProps = await response.json();
      console.log(responseData);
      responseData.longUrl = ShortenString(responseData.longUrl);
      setUrlPropsArray([...UrlPropsArray, responseData]);
    }
    const handleChange = (e) => {
      setInput(e.target.value);
    };
    return (
      <div>
                  <p>Please enter your long URL</p>

        <div className="submit-field__div">
          <input className="submit-field__field" placeholder="https://verylongwebsiteaddress.com/very/long/path" type="text" value={input} onChange={handleChange}></input>
          <button type="submit" onClick={handlesubmit}>submit</button>
        </div>
      </div>
    )
  }

  function DeleteBlock(shortUrl: string) {
    console.log(shortUrl);
    fetch("http://localhost:5277/api/Url", ({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shortUrl)
    })).catch((res) => (console.error(res)))

    setUrlPropsArray(UrlPropsArray.filter(url => url.shortUrl != shortUrl));
  }

  function handleUpdate(shortUrlInput: string, longUrlInput: string) {
    const req = { shortUrl: shortUrlInput, longUrl: longUrlInput }
    fetch("http://localhost:5277/api/Url", ({
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req)

    })).catch((res) => (console.error(res)))
    //setUrlPropsArray(UrlPropsArray.filter(url => url.shortUrl != shortUrl));
    const arrElements = [...UrlPropsArray];
    const foundUrl = arrElements.find(a => a.shortUrl == shortUrlInput)
    if (foundUrl != undefined) {
      longUrlInput = ShortenString(longUrlInput);
      foundUrl.longUrl = longUrlInput;
      console.log(arrElements);
      setUrlPropsArray(arrElements);
    }
  }

  function GetUpdatesBlock({ shortUrl }: UrlProps) {
    //console.log(typeof propsInput.shortUrl); // Should output 'string'

    const [input, setInput] = useState("");
    const handleChange = (e) => {
      setInput(e.target.value);
    };
    return (
      <div>
        <button onClick={() => DeleteBlock(shortUrl)}>Delete</button> <br></br>
        <input type="text" value={input} onChange={handleChange}></input>
        <button onClick={() => handleUpdate(shortUrl, { input }.input)}> Update Url</button>
      </div>
    )
  }

  function GetBlock(props: UrlProps) {
    return (
      <tr key={props.shortUrl}>
        <td>{props.shortUrl}</td>
        <td className='th-max-width'>{props.longUrl}</td>
        <td>{props.timesUsed}</td>
        <td>
          <details>
            <summary>Edit</summary>
            <GetUpdatesBlock {...props} />
          </details>
        </td>
      </tr>
    )
  }
  return (
    <>
      <PostField />
      <div className="overflow-x-auto table__set-center">
        <table className="table">
          <thead>
            <tr>
              <th>Shortened Url</th>
              <th>Long Url</th>
              <th>Times Used</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {UrlPropsArray.map(GetBlock)}
          </tbody>
        </table>
      </div>
    </>
  )
}

function App() {
  const urlPath = window.location.pathname;
  if (urlPath != "/") {
    window.location.href = "http://localhost:5277/api/Url" + urlPath;
    return (<></>)
  }
  return (
    <>
      <h1 className="h1__heading"> My little url shortener </h1>
      <UrlBlocks />
    </>
  )
}

export default App
