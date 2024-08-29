export default function GetShortUrl({ shortUrl }: UrlProps) {
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