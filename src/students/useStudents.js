import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getStudents } from "../services/apiStudents";

export default function useStudents(query) {
  const location = useLocation({});
  const queryParams = query || location.search;
 
  const {
    data: students,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["students", queryParams],
    queryFn: () => getStudents(queryParams),
  });
  return { students, isSuccess, isLoading, error };
}
