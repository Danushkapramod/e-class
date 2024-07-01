import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAddAlert } from "../utils/alerts";
import { login } from "../services_api/apiAuth";

export function useLogin(){
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { addAlertFn } = useAddAlert();
    const {mutate,isPending} = useMutation({
        mutationFn:login,
        onSuccess:(user)=>{
            queryClient.setQueryData(["user"],user.user)
            navigate("/app/dashbord",{replace:true}); 
            addAlertFn({type:"succes",message:"Login succesfully"})
        },
        onError:(err)=>{
            console.log(err.message)
            addAlertFn({type:"error",message:"Provided email or password are incorrect"})

        }
    })
    return{mutate,isPending}
}
