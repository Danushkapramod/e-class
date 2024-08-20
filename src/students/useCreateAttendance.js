import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createAttendance } from "../services/apiClasses";
import { useParams } from "react-router-dom";

export default function useCreateAttendance(){
    const { id } = useParams()
    const queryClient = useQueryClient()
    const query = useMutation({
        mutationFn:createAttendance,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['attendances',id]
            })
        },
        onError:(err)=>{
            console.log(err.message);
            toast.error(err.message);
        }
    })
return query
}
