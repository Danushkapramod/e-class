import { useQuery } from "@tanstack/react-query";

function useBackendSearch({queryFn,queryKey,query}){
    const {
      data,
      isLoading,
      isSuccess,
      error,
    } = useQuery({
      queryKey: queryKey,
      queryFn:({signal})=>queryFn({query,signal})
    });
return {data,isLoading,isSuccess, error,}
}
export default useBackendSearch;