import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut } from "../services/apiLogin";
import { useNavigate } from "react-router-dom";
import { useAddAlert } from "../utils/alerts";

export function useLogout(){
    const queryClient = useQueryClient()
    const { addAlertFn } = useAddAlert();
    const navigate = useNavigate()

    const {mutate,isLoading} = useMutation({
    mutationFn:logOut,
    onSuccess:()=>{
        queryClient.removeQueries();
        navigate("/login" ,{replace:true})
        addAlertFn({type:"succes",message:"Logout succesfully"})
    },
    onError:(err)=>{
        console.log(err.message);
    }
})

return {mutate,isLoading}
}

