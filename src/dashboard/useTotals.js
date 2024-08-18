import { getOptionsCount, getSubItemCount } from "../services/apiOptions";
import { useQuery } from "@tanstack/react-query";
import { getClassesCount } from "../services/apiClasses";
import { getTeachersCount } from "../services/apiTeachers";

function useTotals(){
    const { data: classes } = useQuery({
      queryKey: ['classesCount'],
      queryFn: () => getClassesCount(),
    });
  
    const { data: teachers } = useQuery({
      queryKey: ['teachersCount'],
      queryFn: () => getTeachersCount(),
    });
  
    const { data:subItems} = useQuery({
      queryKey: ['subItemsCount'],
      queryFn: () => getSubItemCount(),
    });
   
    const { data: students } = useQuery({
      queryKey: ['studentsCount'],
      queryFn: () => getOptionsCount('student'),
    });
  
return {classes,teachers,subItems,students}

}
export default useTotals;