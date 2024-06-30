import { useMutation, useQueryClient} from "@tanstack/react-query";
import {  update } from "../services/apiLogin";

import { useAddAlert } from "../utils/alerts";
export function useUpdate(){
    const { addAlertFn } = useAddAlert();
    const queryClient = useQueryClient()  
    const {mutate,isPending} = useMutation({
    mutationFn:update,
    onSuccess:()=>{
        queryClient.invalidateQueries({
            queryKey:['user']
        })
        addAlertFn({type:"succes",message:"Profile data updated succesfully"})
    },
    onError:(err)=>{
        console.log(err.message);
        addAlertFn({type:"error",message:err.message})
    }
})

return {mutate,isPending}
}

