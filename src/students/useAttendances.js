import { useQuery } from "@tanstack/react-query";
import { getAttendances } from "../services/apiClasses";

export default function useAttendances(classId) {
  const query = useQuery({
    queryKey: ["attendances", classId],
    queryFn:()=> getAttendances(classId),
  });
  return query
}
