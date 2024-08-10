import { useState } from 'react'

interface UrlProps {
  longUrl: string;
  shortUrl: string;
  timesUsed: number;
}





function EditButton({id}){
  return (
  <button> Edit </button>
  )
}

function UrlBlocks() {
  //const UrlPropsArray: UrlProps[] = [];
  const [UrlPropsArray, setUrlPropsArray] = useState<UrlProps[]>([]);
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


  function getBlock(props: UrlProps) {
    return (
      <tr>
        <td>{props.shortUrl}</td>
        <td>{props.longUrl}</td>
        <td>{props.timesUsed}</td>
        <td> <EditButton id= {props.shortUrl}/> </td>
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
