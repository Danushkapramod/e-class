import { useQuery } from "@tanstack/react-query";
import {  getSubItems } from "../services/apiOptions";

export default function useSubItems({key,category}) {
  const query = useQuery({
    queryKey: [key],
    queryFn:()=> getSubItems(category),
  });

  return query;
}
