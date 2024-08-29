import { useState } from "react";
import { sendToUpdateBlock, } from "../types";
import { } from "../utilFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function GetUpdatesBlock({ isVisible, props }: sendToUpdateBlock) {
    const queryClient = useQueryClient();
    const [input, setInput] = useState("");

    const updateUrlMutation = useMutation({
        mutationFn: async () => {
            const req = { shortUrl: props.shortUrl, longUrl: input }
            const response = await fetch("http://localhost:5277/api/Url", ({
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req)
            }))
            return await response.json()
        },
        onMutate: () => { },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["repoData"] })
    })

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value);
    };
    return (

        <div className='update-field__div'>
            {isVisible &&
            <>
            <input type="text" value={input} onChange={handleChange}></input>
            <button className='update-field__button' onClick={() => updateUrlMutation.mutate()}>Update</button>
            </>
            }
        </div>
    )
}