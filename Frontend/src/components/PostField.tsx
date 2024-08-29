import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function PostField() {
    const [input, setInput] = useState("");
    const queryClient = useQueryClient();


    const postUrlMutation = useMutation({
      mutationFn: async () => {
          const response = await fetch("http://localhost:5277/api/Url", ({
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ input }.input)
          }))
          return await response.json()
      },
      onMutate: () => { },
      onSettled: () => queryClient.invalidateQueries({ queryKey: ["repoData"] })
  })

    async function handlesubmit() {
      postUrlMutation.mutate();
    }
    const handleChange = (e:React.FormEvent<HTMLInputElement>) => {
      setInput(e.currentTarget.value);
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