import { useQuery } from "@tanstack/react-query";
import { getTeachersCount } from "../services/apiTeachers";

function useTeachersTotal(){
  const {data: teachers} = useQuery({
    queryKey: ['teachersCount'],
    queryFn:  getTeachersCount,
  });
  return {  teachers };
}

export default useTeachersTotal;