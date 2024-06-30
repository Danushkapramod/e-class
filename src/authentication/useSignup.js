import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/apiLogin";
import { useAddAlert } from "../utils/alerts";


export default function useSignup(){

   const { addAlertFn } = useAddAlert();
   const {mutate,isPending} = useMutation({
      mutationFn:signup,
      onSuccess:()=>{
        addAlertFn({type:"succes",
        message:"Accout succesfully created! Please verify the email addres."})
      },
      onError:(err)=>{
        addAlertFn({type:"error",message:err.message})
      }
      
    })
    return{mutate,isPending} 
}
