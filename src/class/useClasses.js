import { useQuery } from "@tanstack/react-query";

//import { useLocation } from "react-router-dom";
import { getClasses } from "../services_api/apiClasses";

export default function useClasses(queryParams = {}){
//   const location = useLocation({});
//   const searchParams = new URLSearchParams(location.search);
//   let queryParams ={}

// if(!query){
//   for (const [key, value] of searchParams.entries()) {
//       if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
//           if (Array.isArray(queryParams[key])) {
//               queryParams[key].push(value);
//           } else {
//               queryParams[key] = [queryParams[key], value];
//           }
//       } else {
//           queryParams[key] = value;
//       }
//   }
// }

// if(query) queryParams = query


    const {
        data: classes,
        isLoading,
        isSuccess,
        error,
      } = useQuery({
        queryKey: ["classes",queryParams],
        queryFn: ()=>getClasses(queryParams),
      });

    return {classes,isLoading,error,isSuccess}  
}

