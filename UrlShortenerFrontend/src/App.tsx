import { useEffect, useState } from 'react'

interface UrlProps {
  longUrl: string;
  shortUrl: string;
  timesUsed: number;
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
      setUrlPropsArray([...UrlPropsArray, responseData])
    }
    const handleChange = (e) => {
      setInput(e.target.value);
    };
    return (
      <div>
        <input type="text" value={input} onChange={handleChange}></input>
        <button type="submit" onClick={handlesubmit}>submit</button>
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
    foundUrl.longUrl = longUrlInput;
    console.log(arrElements);
    setUrlPropsArray(arrElements);
  }

  function GetUpdatesBlock({shortUrl}:UrlProps) {
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
        <td>{props.longUrl}</td>
        <td>{props.timesUsed}</td>
        <td>
          <details>
            <summary>Edit</summary>
            <GetUpdatesBlock {...props}  />
          </details>
        </td>
      </tr>
    )
  }
  return (
    <>
      <PostField />
      <table>
        <thead>
          <tr>
            <th>Shortened Url</th>
            <th>Long Url</th>
            <th>Times Used</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {UrlPropsArray.map(GetBlock)}
        </tbody>
      </table>
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
      <UrlBlocks />
    </>
  )
}

export default App
