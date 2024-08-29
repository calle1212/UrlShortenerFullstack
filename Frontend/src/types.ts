export interface UrlProps {
    longUrl: string;
    shortUrl: string;
    timesUsed: number;
  }

  export interface sendtoEditButton {
    setIsVisible: React.Dispatch<React.SetStateAction<boolean[]>>
    indexor: number
  }