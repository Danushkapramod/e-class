import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClass } from "../services/apiClasses";
import toast from "react-hot-toast";

export default function useDeleteClass(){
    const queryClient = useQueryClient();
  
    const { isLoading: isDeleting, mutate } = useMutation({
      mutationFn: deleteClass,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["classes"],
        });
        toast.success('Class deleted successfully!"');
      },
      onError: (err) => {
        console.log(err.message);
        toast.error("Failed to delete class. Please try again.")
      },
    });

    return {isDeleting, mutate}
}