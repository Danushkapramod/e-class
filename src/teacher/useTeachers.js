import { useQuery } from "@tanstack/react-query";
//import { useLocation } from "react-router-dom";
import { getTeachers } from "../services_api/apiTeachers";


export default function useTeachers(queryParams){

//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     let queryParams = {};
//     if(!query){

//     for (const [key, value] of searchParams.entries()) {
//         // eslint-disable-next-line no-prototype-builtins
//         if (queryParams.hasOwnProperty(key)) {
//             if (Array.isArray(queryParams[key])) {
//                 queryParams[key].push(value);
//             } else {
//                 queryParams[key] = [queryParams[key], value];
//             }
//         } else {
//             queryParams[key] = value;
//         }
//     }
// }
  
// if(query) queryParams = query

    const {
        data: teachers,
        isLoading,
        isSuccess,
        error,
      } = useQuery({
        queryKey: ["teachers",queryParams ],
        queryFn: ()=>getTeachers(queryParams),
      });

    return {teachers,isSuccess,isLoading,error}  

    }