// import { sendtoEditButton } from "../types";

import { sendToEditButton } from "../types";

export default function GetEditButton({isVisible, setIsVisible} : sendToEditButton) {
    
    return (
      <div>
        <button className="edit-button"  onClick={() => setIsVisible(!isVisible)}>🖉</button>
      </div>
    )
  }