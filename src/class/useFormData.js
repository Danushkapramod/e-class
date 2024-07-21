
import useOptions from "../option/useOptions";
import useTeachers from "../teacher/useTeachers";

function useFormData(){
    const { teachers, isLoading: teachersIsloading } = useTeachers();
    const { options:halls, isLoading: hallsIsloading } = useOptions('hall');
    const { options:subjects, isLoading: subjectsIsloading } = useOptions('subject');
    const { options:grades, isLoading: gradesIsloading } = useOptions('grade');

return {teachers,halls,subjects,grades,teachersIsloading,
        hallsIsloading,subjectsIsloading,gradesIsloading}

}

export default useFormData;