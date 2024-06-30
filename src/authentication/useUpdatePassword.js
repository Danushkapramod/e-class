import { useMutation} from "@tanstack/react-query";
import {  updatePassword } from "../services/apiLogin";

import { useAddAlert } from "../utils/alerts";
export function useUpdatePassword(){
    const { addAlertFn } = useAddAlert();
    const {mutate,isPending} = useMutation({
    mutationFn:updatePassword,
    onSuccess:()=>{
        addAlertFn({type:"succes",message:"Password updated successfully"})
    },
    onError:(err)=>{
        console.log(err.message);
        addAlertFn({type:"error",message:err.message})
    }
})

return {mutate,isPending}
}

