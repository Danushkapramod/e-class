import { useQuery } from "@tanstack/react-query";

function useBackendSearch({queryFn,queryKey,query}){
    const {
      data,
      isLoading,
      isSuccess,
      error,
    } = useQuery({
      queryKey: [queryKey,query],
      queryFn:({signal})=>queryFn({queryParams:query,signal})
    });
return {data,isLoading,isSuccess, error,}
}
export default useBackendSearch;