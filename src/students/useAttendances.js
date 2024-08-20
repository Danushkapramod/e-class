import { useQuery } from "@tanstack/react-query";
import { getAttendances } from "../services/apiClasses";
import { useParams } from "react-router-dom";

export default function useAttendances(_classId) {
  const {id} = useParams()  
  const classId = _classId || id
  const query = useQuery({
    queryKey: ["attendances", classId],
    queryFn:()=> getAttendances(classId),
  });
  return query
}
