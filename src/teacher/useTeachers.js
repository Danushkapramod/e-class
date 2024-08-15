import { useQuery } from "@tanstack/react-query";
import { getTeachers } from "../services/apiTeachers";
import { useLocation } from "react-router-dom";

export default function useTeachers(query) {
  const location = useLocation({});
  const queryParams = query || location.search;
 
  const {
    data: teachers,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["teachers", queryParams],
    queryFn: ({signal}) => getTeachers({signal,queryParams}),
  });
  return { teachers, isSuccess, isLoading, error };
}
