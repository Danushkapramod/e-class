import { useMutation, useQueryClient } from "@tanstack/react-query"
import {  deleteSubject } from "../services/apiOptions";
import toast from "react-hot-toast";

export default function useDeleteSubject(){
    const queryClient = useQueryClient()

    const {isPending:isDeleting,mutate} = useMutation({
        mutationFn:deleteSubject,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['subjects'],
            })
            toast.success('Subject deleted successfully.');
        },
        onError:(err)=>{
            console.log(err.message);
            toast.error("Failed to delete item. Please try again")
        }
    })
    return {isDeleting,mutate}
}