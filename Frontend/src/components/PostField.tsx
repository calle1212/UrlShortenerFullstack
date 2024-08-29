import { useState } from "react";
import { UrlProps } from "../types";
import { shortenString } from "../App";

export default function PostField() {
    const [input, setInput] = useState("");

    async function handlesubmit() {
      const response = await fetch("http://localhost:5277/api/Url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }.input)
      });
      const responseData: UrlProps = await response.json();
      responseData.longUrl = shortenString(responseData.longUrl);
      setUrlPropsArray([...UrlPropsArray, responseData]);
    }
    const handleChange = (e) => {
      setInput(e.target.value);
    };
    return (
      <div>
        <p>Please enter your long URL</p>

        <div className="submit-field__div">
          <input className="submit-field__field" placeholder="https://verylongwebsiteaddress.com/very/long/path" type="text" value={input} onChange={handleChange}></input>
          <button className="submit-field__button" type="submit" onClick={handlesubmit}>submit</button>
        </div>
      </div>
    )
  }