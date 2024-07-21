import { useQuery } from "@tanstack/react-query";
import {  getOptions } from "../services/apiOptions";

export default function useOptions(key) {
  const {
    data: options,
    isLoading,
    error,
  } = useQuery({
    queryKey: [key],
    queryFn:()=> getOptions(key),
  });

  return { options, isLoading, error };
}
