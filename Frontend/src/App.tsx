import { useEffect, useState } from 'react'
import "./index.css"
import { UrlProps } from './types';







export function shortenString(longUrl: string): string {
  const maxLength: number = 60;
  if (longUrl.length > maxLength) {
    return longUrl.substring(0, maxLength - 3) + "...";
  }
  else {
    return longUrl;
  }
}


function UrlBlocks() {
  const [UrlPropsArray, setUrlPropsArray] = useState<UrlProps[]>([]);

  useEffect(() => {
    fetch("http://localhost:5277/api/Url")
      .then(res => {
        return res.json()
      })
      .then((data) => {
        data.forEach((element:UrlProps) => {
          element.longUrl = shortenString(element.longUrl);
        });
        setUrlPropsArray(data);
      })
  }, [])


  function GetShortUrl({ shortUrl }: UrlProps) {
    const textToCopy = "http://localhost:5173/" + shortUrl;

    const handleCopy = () => {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          setShowMessage(true);
          setTimeout(() => setShowMessage(false), 1500); 
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
        });
    };

    const [showMessage, setShowMessage] = useState(false);
    return (
      <div className="relative">
        <p
          onClick={handleCopy}
          className=""
        >
          {textToCopy}
        </p>

        {showMessage && (
          <div className="copy-to-clipboard-message">
            📋 Text copied to clipboard
          </div>
        )}
      </div>
    );
  }

  function GetEditButton({indexor , setIsVisible }: sendtoEditButton) {
    //console.log(indexor);
    const index = indexor+1;
    const toggleVisibility = () => {
      const newVisibilityStates = [...isVisible];
      newVisibilityStates[index] = !newVisibilityStates[index];
      setIsVisible(newVisibilityStates);
    };
    return (
      <div>
        <button className="edit-button" onClick={toggleVisibility}>🖉</button>
      </div>
    )
  }
  let index = 0;
  const [isVisible, setIsVisible] = useState<boolean[]>(Array(UrlPropsArray.length).fill(false));
  interface sendtoEditButton {
    setIsVisible: React.Dispatch<React.SetStateAction<boolean[]>>
    indexor:number
  }

  function GetBlock(props: UrlProps) {
    const propLink = 'http://localhost:5277/api/Url/' + props.shortUrl;
    const indexor = index;
    const sendToButton:sendtoEditButton = {setIsVisible, indexor};
    
    index +=1;
    return (
      <tr key={props.shortUrl}>
        <td className='td__main td__shortUrl' >  <GetShortUrl {...props} /></td>
        <td className='th-max-width td__main td__longUrl'><a href={propLink} className='td__longUrl-link'> {props.longUrl}</a>
         {isVisible[index]&& <GetUpdatesBlock {...props} /> }
        </td>
        <td className='td__main'>{props.timesUsed}</td>

        <td className='td__main'  >{props.shortUrl}</td>
        <td className='td__edit'>
          <GetEditButton {...sendToButton} />
        </td>
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
              <th>Long url</th>
              <th>Times Used</th>
              <th>Id</th>
              <th></th>
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
      <h1 className="h1__heading" > My little url shortener </h1>
      <p>The website is used to store long urls and make them more easily accessible through a short url. Just paste the id after this website's domain and share it to anyone who can use it to be redirected to the stored url. </p>
      <br></br>
      <UrlBlocks />

    </>
  )
}

export default App
