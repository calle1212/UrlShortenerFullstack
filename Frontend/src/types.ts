export interface UrlProps {
    longUrl: string;
    shortUrl: string;
    timesUsed: number;
  }

  export interface sendtoEditButton {
    setIsVisible: React.Dispatch<React.SetStateAction<boolean[]>>
    indexor: number
  }

  export interface arrayPropsInterface {
    UrlPropsArray: UrlProps[],
    setUrlPropsArray: React.Dispatch<React.SetStateAction<UrlProps[]>>
}

export interface sendToComponent {
    props : UrlProps,
    setters : arrayPropsInterface
}

export interface sendToUpdateBlock {
    isVisible : boolean,
    props : UrlProps
}

export interface sendToEditButton {
    isVisible : boolean ,
    setIsVisible : React.Dispatch<React.SetStateAction<boolean>>
}