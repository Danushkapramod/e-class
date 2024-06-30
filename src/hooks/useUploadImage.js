import { useMutation } from "@tanstack/react-query";
import { useAddAlert } from "../utils/alerts";
import { getURL, uploadImage } from "../services/apiUploadImages";
import { useState } from "react";


export default   function useUploadImage(){
  const [imageUrl, setImageUrl] = useState();
   const { addAlertFn } = useAddAlert();
   const {mutate,isPending} = useMutation({
      mutationFn:uploadImage,
      onSuccess:(data)=>{
       const [bucketName,fileName] = data.fullPath.split("/")
       const newImageUrl =  getURL(bucketName,fileName)
       setImageUrl(newImageUrl); 
      },
      
      onError:(err)=>{
        addAlertFn({type:"error",message:err.message})
      }
      
    })
    return{mutate,isPending,imageUrl} 
}
