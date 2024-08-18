import { useMutation } from "@tanstack/react-query";
import { backup } from "../services/apiAccets";
import toast from "react-hot-toast";

function useBackup(){
    const query = useMutation({
      mutationFn:backup,
      onSuccess:()=>{
        toast.success("Backup Succesfully!")
      },
      onError: (err) => {
        console.log(err.message);
        toast.error("Failed to delete class. Please try again.");
      },
        
    })

return query

}

export default useBackup;
