import { useDispatch } from "react-redux";
import { getClassesCount } from "../services/apiClasses";
import { getTeachersCount } from "../services/apiTeachers";
import { getOptionsCount } from "../services/apiOptions";
import { totalClasses } from "../class/classSlice";
import { totalTeachers } from "../teacher/teacherSlice";
import { totalGrades, totalHalls, totalOptions, totalSubjects } from "../option/optionSclice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useClassTotal from "./useClassTotal";
import useTeachersTotal from "./useTeachersTotal";


function useTotals(){
   const dispatch = useDispatch();
   const {classes} = useClassTotal()
   const {teachers} = useTeachersTotal()
    
  
    const { data: grades } = useQuery({
      queryKey: ['gradesCount'],
      queryFn: () => getOptionsCount('grade'),
    });
  
    const { data: subjects } = useQuery({
      queryKey: ['subjectsCount'],
      queryFn: () => getOptionsCount('subject'),
    });
  
    const { data: halls } = useQuery({
      queryKey: ['hallsCount'],
      queryFn: () => getOptionsCount('hall'),
    });
  
    useEffect(() => {
      dispatch(totalClasses(classes));
      dispatch(totalTeachers(teachers));
  
      dispatch(totalHalls(halls));
      dispatch(totalSubjects(subjects));
      dispatch(totalGrades(grades));
      dispatch(totalOptions(halls + subjects + grades));
    }, [teachers, classes, halls, subjects, grades, dispatch]);
  

return {classes,teachers,grades,subjects,halls}

}
export default useTotals;