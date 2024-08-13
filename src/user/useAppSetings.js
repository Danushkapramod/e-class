
import { useQuery } from "@tanstack/react-query";
import { getAppSetings } from "../services/apiAuth";

export default function  useAppSetings() {

  const query = useQuery({
    queryKey: ["appSettings"],
    queryFn:getAppSetings,
  });
  return query;
}
