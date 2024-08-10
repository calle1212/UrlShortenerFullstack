//import { useState } from 'react'

interface UrlProps {
  longUrl: string;
  shortUrl: string;
  timesUsed: number;
}

const mockUrlPropsArray: UrlProps[] = [{"longUrl": "https://www.google.se/", "shortUrl": "goog", "timesUsed": 0}, {"longUrl": "https://www.salt.dev/", "shortUrl": "salt", "timesUsed": 0}]

function PostField() {
  function handlePost() {
    
  }
  return (
    <div>
  <input></input>
  <button onClick={handlePost}>submit</button>
  </div>
)
}

function UrlBlocks(){
  function getBlock(props:UrlProps){
    return(
      <div>
        <p>{props.longUrl}</p>
        <p>{props.shortUrl}</p>
        <p>{props.timesUsed}</p>
      </div>
    )
  }
  return (
    <div>
      {mockUrlPropsArray.map(getBlock)}
    </div>
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
      <h1>{urlPath}</h1>
      <PostField/>
      <p>hejehej</p>
      <UrlBlocks/>
    </>
  )
}

export default App
