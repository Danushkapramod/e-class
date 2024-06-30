import { useMutation } from "@tanstack/react-query";
import { useAddAlert } from "../utils/alerts";
import {  replaceImage} from "../services/apiUploadImages";

export default   function useReplaceImage(){
   const { addAlertFn } = useAddAlert();
   const {mutate,isPending} = useMutation({
      mutationFn:replaceImage,
      onSuccess:()=>{
      },   
      onError:(err)=>{
        addAlertFn({type:"error",message:err.message})
      } 
    })
    return{mutate,isPending} 
}
