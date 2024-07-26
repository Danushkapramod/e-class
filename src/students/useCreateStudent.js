import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudent } from "../services/apiStudents";
import toast from "react-hot-toast";

function useCreateStudent(){
    const queryClient = useQueryClient()
    const {isPending,isSuccess,mutate} = useMutation({
        mutationFn:createStudent,
        onSuccess:(data)=>{
            queryClient.invalidateQueries({
                queryKey:['students']
            })
         if(data){
            toast.success("Student created successfully!")
         }
        },
        onError:(err)=>{
            console.log(err.message);
            toast.error(err.message);
        }

    })
return {isPending,isSuccess,mutate}
}

export default useCreateStudent;