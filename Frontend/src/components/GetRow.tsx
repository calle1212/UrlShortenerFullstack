import { useState } from "react";
import { sendToUpdateBlock, UrlProps } from "../types";
import GetDeleteButton from "./DeleteBlock";
import GetEditButton from "./GetEditButton";
import GetShortUrl from "./GetShortUrl";
import GetUpdatesBlock from "./GetUpdatesBlock";

export default function GetRow(props: UrlProps) {
    const [isVisible , setIsVisible] = useState(false);
    const propLink = 'http://localhost:5277/api/Url/' + props.shortUrl;

    const sendToUpdateBlock : sendToUpdateBlock = {isVisible, props}
    const sendToEditButton  = {isVisible , setIsVisible}



    return (
        <tr >
            <td className='td__main td__shortUrl' >  <GetShortUrl {...props} /></td>
            <td className='th-max-width td__main td__longUrl'><a href={propLink} className='td__longUrl-link'> {props.longUrl}</a>
                {<GetUpdatesBlock {...sendToUpdateBlock} />}
            </td>
            <td className='td__main'>{props.timesUsed}</td>

            <td className='td__main'  >{props.shortUrl}</td>
            <td className='td__edit'>
                <GetEditButton {...sendToEditButton} />
            </td>
            <td className='td__edit'>
                <GetDeleteButton {...props} />
            </td>
        </tr>
    )
}