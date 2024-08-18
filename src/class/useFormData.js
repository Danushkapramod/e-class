
import useSubItems from "../option/useSubIttems";
import useTeachers from "../teacher/useTeachers";

function useFormData(){
    const { teachers, isLoading: teachersIsloading } = useTeachers();
    const { data:halls, isLoading: hallsIsloading } = useSubItems({key:'halls',category:'hall'});
    const { data:subjects, isLoading: subjectsIsloading } = useSubItems({key:'subjects',category:'subject'});
    const { data:grades, isLoading: gradesIsloading } = useSubItems({key:'grades',category:'grade'});

return {teachers,halls,subjects,grades,teachersIsloading,
        hallsIsloading,subjectsIsloading,gradesIsloading}

}

export default useFormData;