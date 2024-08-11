import { useEffect, useState } from 'react'

interface UrlProps {
  longUrl: string;
  shortUrl: string;
  timesUsed: number;
}







function UrlBlocks() {
  //const UrlPropsArray: UrlProps[] = [];
  const [UrlPropsArray, setUrlPropsArray] = useState<UrlProps[]>([]);

  useEffect(()=> {
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
        body: JSON.stringify({input}.input)
      });
      const responseData:UrlProps = await response.json();
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

  function DeleteBlock(shortUrl:string){
    console.log(shortUrl);
    fetch("http://localhost:5277/api/Url", ({
      method: "DELETE",
      headers : {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(shortUrl)
    })).catch((res) => (console.error(res)))
    
    setUrlPropsArray(UrlPropsArray.filter(url => url.shortUrl != shortUrl));
  }

  function getBlock(props: UrlProps) {
    return (
      <tr key={props.shortUrl}>
        <td>{props.shortUrl}</td>
        <td>{props.longUrl}</td>
        <td>{props.timesUsed}</td>
        <td> 
          <details>
            <summary>Edit</summary>
          <button key={props.shortUrl} onClick={() => DeleteBlock(props.shortUrl)}>Delete</button> <br></br>
          <button> Update Url</button>
          </details>
          </td>
      </tr>
    )
  }
  return (
    <>
    <PostField/>
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
      {UrlPropsArray.map(getBlock)}
      </tbody>
    </table>
    </>
  )
}

function App() {
  const urlPath = window.location.pathname;
  if (urlPath == "/google") {
    window.location.href = "http://google.se";
    return (<></>)
  }
  return (
    <>
      <UrlBlocks />
    </>
  )
}

export default App
