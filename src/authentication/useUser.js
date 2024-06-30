import { useQuery } from "@tanstack/react-query";
import { getUser} from "../services/apiLogin";
export function useUser(){
    const {isLoading,data:user} = useQuery({
        queryKey:['user'],
        queryFn:getUser
    }) 
return{isLoading,user}
}
