import "./index.css"
import UrlTable from './components/UrlTable';







export function shortenString(longUrl: string): string {
  const maxLength: number = 60;
  if (longUrl.length > maxLength) {
    return longUrl.substring(0, maxLength - 3) + "...";
  }
  else {
    return longUrl;
  }
}

function App() {
  const urlPath = window.location.pathname;
  if (urlPath != "/") {
    window.location.href = "http://localhost:5277/api/Url" + urlPath;
    return (<></>)
  }
  return (
    <>
      <h1 className="h1__heading" > My little url shortener </h1>
      <p>The website is used to store long urls and make them more easily accessible through a short url. Just paste the id after this website's domain and share it to anyone who can use it to be redirected to the stored url. </p>
      <br></br>
      <UrlTable />

    </>
  )
}

export default App
