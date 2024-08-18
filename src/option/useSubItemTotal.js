import { useQuery } from "@tanstack/react-query";
import {  getOptionsCount } from "../services/apiOptions";

export default function useSubItemTotal({key,category}) {
  const query = useQuery({
    queryKey: [key],
    queryFn:()=> getOptionsCount(category),
  });

  return query;
}
