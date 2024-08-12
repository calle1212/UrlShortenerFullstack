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
        //console.log(data);
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
          <button className="submit-field__button" type="submit" onClick={handlesubmit}>submit</button>
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
      <div className='update-field__div'>
        <input type="text" value={input} onChange={handleChange}></input>
        <button className='update-field__button' onClick={() => handleUpdate(shortUrl, { input }.input)}>Update</button>
      </div>
    )
  }

  function GetDeleteButton({ shortUrl }: UrlProps) {
    return (
      <button onClick={() => DeleteBlock(shortUrl)}>🗑</button>
    )
  }

  function GetEditButton({ shortUrl }: UrlProps) {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };
    return (
      <button className="edit-button" onClick={toggleVisibility}>🖉</button>

    )
  }

  function handleCopy(textToCopy:string) {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log('Text copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  function GetBlock(props: UrlProps) {
    const propLink = 'http://localhost:5277/api/Url/' + props.shortUrl;
    const shortUrl = "http://localhost:5173/" + props.shortUrl;
    const divContainerId = "id__" + shortUrl

    return (
      <tr key={props.shortUrl}>
        <td className='td__main td__shortUrl' onClick={()=> handleCopy(shortUrl)}>  {shortUrl} 📋</td>
        <td className='td__main'  >{props.shortUrl}</td>
        <td className='th-max-width td__main td__longUrl'><a href={propLink} className='td__longUrl-link'> {props.longUrl}</a>
          <div className={"update-field__container "+ divContainerId} ><GetUpdatesBlock {...props} /> </div>
        </td>
        <td className='td__main'>{props.timesUsed}</td>
        {/* <td className='td__edit'>
          <GetEditButton {...props} />
        </td> */}
        <td className='td__edit'>
          <GetDeleteButton {...props} />
        </td>
      </tr>
    )
  }
  return (
    <>
      <PostField />
      <div className="overflow-x-auto table__set-center">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Short url</th>
              <th>Id</th>
              <th>Long url</th>
              <th>Times Used</th>
              <th></th>
              
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
      <p>The website is used to store long urls and make them more easily accessible through a short url. Just paste the id after this website's domain and share it to anyone who can use it to be redirected to the stored url. </p>
      <br></br>
      <UrlBlocks />

    </>
  )
}

export default App
