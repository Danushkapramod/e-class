import { useQuery } from "@tanstack/react-query";
import { getAuth } from "../services_api/apiAuth";

export function useAuther(){
    const {isLoading,data:auther,error} = useQuery({
        queryKey:['user'],
        queryFn:getAuth,
    }) 
return{isLoading,auther,error}
}
