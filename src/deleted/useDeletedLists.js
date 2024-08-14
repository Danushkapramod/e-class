import { useEffect, useState } from "react";
import useRestore from "../user/useRestore";
import useDeletedItems from "./useDeleted";


function useDeletedLists(){
  const [alldeleted, setAllDeleted] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [categoryBy, setCategoryBy] = useState('none');
  const { mutate: restoreTeachers, isPending: rs1 } = useRestore('teachers');
  const { mutate: restoreStudents, isPending: rs2 } = useRestore('students');
  const { mutate: restoreClasses, isPending: rs3 } = useRestore('classes');
  
  const { data: _teachers, isLoading: teacherLoading } = useDeletedItems({
    queryKey: 'deletedTeachers',
    endPoint: 'teachers/hidden',
  });
  const { data: _students, isLoading: studentLoading } = useDeletedItems({
    queryKey: 'deletedStudents',
    endPoint: 'students/hidden',
  });
  const { data: _classes, isLoading: classLoading } = useDeletedItems({
    queryKey: 'deletedClasses',
    endPoint: 'classes/hidden',
  });

  useEffect(() => {
    if (_students) {
      setStudents(
        _students.map((item) => {
          return { ...item, category: 'student' };
        })
      );
    }
  }, [_students]);

  useEffect(() => {
    if (_classes) {
      setClasses(
        _classes.map((item) => {
          return { ...item, category: 'class' };
        })
      );
    }
  }, [_classes]);

  useEffect(() => {
    if (_teachers) {
      setTeachers(
        _teachers.map((item) => {
          return { ...item, category: 'teacher' };
        })
      );
    }
  }, [_teachers]);

  useEffect(() => {
    if (teachers || students || classes) {
      const finalList = [...classes, ...teachers, ...students]
        .filter((item) => (categoryBy === 'none' ? item : categoryBy === item.category))
        .sort((a, b) => new Date(b.hiddenAt) - new Date(a.hiddenAt));

      setAllDeleted(finalList);
    }
  }, [categoryBy, classes, students, teachers]);
return {classes,students,teachers,alldeleted,setCategoryBy,restoreTeachers,restoreClasses,restoreStudents,
      isRestoring:rs1|| rs2|| rs3 ,isloading:teacherLoading || studentLoading || classLoading}

}

export default useDeletedLists;