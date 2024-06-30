import { useMutation, useQueryClient } from "@tanstack/react-query"
import {  deleteHall } from "../services/apiOptions";
import toast from "react-hot-toast";


export default function useDeleteHall(){
    const queryClient = useQueryClient()

    const {isPending:isDeleting,mutate} = useMutation({
        mutationFn:deleteHall,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['halls'],
            })
            toast.success('Hall deleted successfully.');
        },
        onError:(err)=>{
            console.log(err.message);
            toast.error("Failed to delete item. Please try again")
        }
    })
    return {isDeleting,mutate}
}