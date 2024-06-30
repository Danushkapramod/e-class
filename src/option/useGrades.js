import { useQuery } from "@tanstack/react-query";
import { getGrades} from "../services/apiOptions";

export default function useGrades(){
    
    const {
        data: grades,
        isLoading,
        error,
      } = useQuery({
        queryKey: ["grades"],
        queryFn:getGrades,
      });

    return {grades,isLoading,error}  
}

