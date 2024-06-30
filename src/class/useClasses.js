import { useQuery } from "@tanstack/react-query";

//import { useLocation } from "react-router-dom";
import { getClasses } from "../services_api/apiClasses";
import { useLocation } from "react-router-dom";

export default function useClasses(query){
  const location = useLocation({});
  let queryParams ={}
//   const searchParams = new URLSearchParams(location.search);
//  

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

    if(query){
      queryParams = query
    }else{
      queryParams = location.search
    }


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

