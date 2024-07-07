import { useQuery } from "@tanstack/react-query";
import { getHalls } from "../services_api/apiOptions";

export default function useHalls() {
  const {
    data: halls,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["halls"],
    queryFn: getHalls,
  });

  return { halls, isLoading, error };
}
