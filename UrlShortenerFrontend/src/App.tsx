//import { useState } from 'react'

interface UrlProps {
  longUrl: string;
  shortUrl: string;
  timesUsed: number;
}

const mockUrlPropsArray: UrlProps[] = [{ "longUrl": "https://www.google.se/", "shortUrl": "goog", "timesUsed": 0 }, { "longUrl": "https://www.salt.dev/", "shortUrl": "salt", "timesUsed": 0 }]

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

function EditButton({id}){
  return (
  <button> Edit </button>
  )
}

function UrlBlocks() {
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
    <table>
      <tr>
        <th>Long Url</th>
        <th>Shortened Url</th>
        <th>Times Used</th>
        <th>Edit</th>
      </tr>
      {mockUrlPropsArray.map(getBlock)}
    </table>
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
      <PostField />
      <p>hejehej</p>
      <UrlBlocks />
    </>
  )
}

export default App
