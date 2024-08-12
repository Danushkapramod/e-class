import { useDispatch } from "react-redux";
import { getOptionsCount } from "../services/apiOptions";
import { totalClasses } from "../class/classSlice";
import { totalTeachers } from "../teacher/teacherSlice";
import { totalGrades, totalHalls,totalSubjects } from "../option/optionSclice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { setTotalStudents } from "../students/studentSlice";
import { getClassesCount } from "../services/apiClasses";
import { getTeachersCount } from "../services/apiTeachers";

function useTotals(){
   const dispatch = useDispatch();

    const { data: classes } = useQuery({
      queryKey: ['classesCount'],
      queryFn: () => getClassesCount(),
    });
  
    const { data: teachers } = useQuery({
      queryKey: ['teachersCount'],
      queryFn: () => getTeachersCount(),
    });
  
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
    const { data: students } = useQuery({
      queryKey: ['studentsCount'],
      queryFn: () => getOptionsCount('student'),
    });
  
    useEffect(() => {
      dispatch(totalClasses(classes));
      dispatch(totalTeachers(teachers));
      dispatch(setTotalStudents(students));
      dispatch(totalHalls(halls));
      dispatch(totalSubjects(subjects));
      dispatch(totalGrades(grades));
    }, [teachers, classes, halls,students ,subjects, grades, dispatch]);
  

return {classes,teachers,grades,subjects,halls,students}

}
export default useTotals;