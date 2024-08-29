import { sendtoEditButton, UrlProps } from "../types";
import GetDeleteButton from "./DeleteBlock";
import GetEditButton from "./GetEditButton";
import GetShortUrl from "./GetShortUrl";
import GetUpdatesBlock from "./GetUpdatesBlock";

export default function GetRow(props: UrlProps) {
    const propLink = 'http://localhost:5277/api/Url/' + props.shortUrl;
    const indexor = index;
    const sendToButton: sendtoEditButton = { setIsVisible, indexor };

    index += 1;
    return (
      <tr key={props.shortUrl}>
        <td className='td__main td__shortUrl' >  <GetShortUrl {...props} /></td>
        <td className='th-max-width td__main td__longUrl'><a href={propLink} className='td__longUrl-link'> {props.longUrl}</a>
          {isVisible[index] && <GetUpdatesBlock {...props} />}
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