import { useMutation } from "@tanstack/react-query";
import { updateClass } from "../services/apiClasses";
import toast from "react-hot-toast";

export default function useUpdateClass(){

    const { isPending: isUpdating, mutate } = useMutation({
        mutationFn: updateClass,
        onSuccess: () => {
        toast.success('Class updated successfully!')
        },
        onError: (err) => {
          console.log(err.message);
          toast.error("Failed to update class. Please try again.")
        },
      });

      return {isUpdating, mutate }
}