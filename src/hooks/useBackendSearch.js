import { useQuery } from "@tanstack/react-query";

function useBackendSearch({queryFn,queryKey,query}){
return  useQuery({
      queryKey: queryKey,
      queryFn:({signal})=>queryFn({query,signal})
    });

}
export default useBackendSearch;