export default function UrlTable() {
    const [UrlPropsArray, setUrlPropsArray] = useState<UrlProps[]>([]);
  
    useEffect(() => {
      fetch("http://localhost:5277/api/Url")
        .then(res => {
          return res.json()
        })
        .then((data) => {
          data.forEach((element: UrlProps) => {
            element.longUrl = shortenString(element.longUrl);
          });
          setUrlPropsArray(data);
        })
    }, [])
  
  
  
  
  
    let index = 0;
    const [isVisible, setIsVisible] = useState<boolean[]>(Array(UrlPropsArray.length).fill(false));
  
  
   
  
  
  
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
              {UrlPropsArray.map(GetRow)}
            </tbody>
          </table>
        </div>
      </>
    )
  }