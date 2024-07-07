import { useQuery } from "@tanstack/react-query";
import { getSubjects } from "../services/apiOptions";

export default function useSubjects() {
  const {
    data: subjects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
  });

  return { subjects, isLoading, error };
}
