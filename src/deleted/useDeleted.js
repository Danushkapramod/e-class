import { useQuery } from "@tanstack/react-query";
import { getDeletedItems } from "../services/apiAuth";


function useDeletedItems({queryKey,endPoint}){
    const query = useQuery({
        queryKey:[queryKey],
        queryFn:()=>getDeletedItems(endPoint)
    })
    return query
}

export default useDeletedItems;