import { useQueryClient, useMutation } from "@tanstack/react-query";
import { UrlProps } from "../types";

export default function GetDeleteButton({ shortUrl }: UrlProps) {
  const queryClient = useQueryClient();


    const postUrlMutation = useMutation({
      mutationFn: async () => {
          const response = await fetch("http://localhost:5277/api/Url", ({
              method: "DELETE",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(shortUrl)
          }))
          return await response.json()
      },
      onMutate: () => { },
      onSettled: () => queryClient.invalidateQueries({ queryKey: ["repoData"] })
  })
  
  return (
    <button onClick={() => postUrlMutation.mutate()}>🗑</button>
  )
}