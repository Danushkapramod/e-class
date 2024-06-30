import { useMutation } from "@tanstack/react-query";
import { useAddAlert } from "../utils/alerts";
import { deleteImage } from "../services/apiUploadImages";


export default   function useDeleteImage(){
    const { addAlertFn } = useAddAlert();
   const {mutate,isPending,isSuccess} = useMutation({
      mutationFn:deleteImage,
      onSuccess:()=>{
     
      },
      onError:(err)=>{
        addAlertFn({type:"error",message:err.message})
      }
      
    })
    return{mutate,isPending,isSuccess} 
}
