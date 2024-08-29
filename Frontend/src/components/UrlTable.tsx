import { getUrls } from "../utilFunctions";
import PostField from "./PostField";
import GetRow from "./GetRow";
import { useQuery } from "@tanstack/react-query";

export default function UrlTable() {



    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['repoData'],
        queryFn: getUrls
    })


    if(isPending || isFetching){
        return(
            <div>
                <p>
                    loading...
                </p>
            </div>
        )
    }

    if(error){
        return(
            <div>
                <p>
                    error: {error.message}
                </p>
            </div>
        )
    }

    return (
        <>
            <PostField />
            <div className="overflow-x-auto table__set-center">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Short url</th>
                            <th>Long url</th>
                            <th>Times Used</th>
                            <th>Id</th>
                            <th></th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map(props => <GetRow {...props} key={props.shortUrl}/>)}
                    </tbody>
                </table>
            </div>
        </>
    )
}