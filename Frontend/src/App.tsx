import "./index.css"
import UrlTable from './components/UrlTable';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



function App() {
  const urlPath = window.location.pathname;
  if (urlPath != "/") {
    window.location.href = "http://localhost:5277/api/Url" + urlPath;
    return (<></>)
  }
  
  const queryClient = new QueryClient()
  return (
    <>
      <h1 className="h1__heading" > My little url shortener </h1>
      <p>The website is used to store long urls and make them more easily accessible through a short url. Just paste the id after this website's domain and share it to anyone who can use it to be redirected to the stored url. </p>
      <br></br>

      <QueryClientProvider client={queryClient}>
      <UrlTable />
      </QueryClientProvider>

    </>
  )
}

export default App
