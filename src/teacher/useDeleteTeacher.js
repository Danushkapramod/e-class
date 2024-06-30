import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTeacher } from "../services/apiTeachers";
import toast from "react-hot-toast";

export default function useDeleteTeacher(){

  const queryClient = useQueryClient();
    const { isLoading: isDeleting, mutate } = useMutation({
        mutationFn: deleteTeacher,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["teachers"],
          });
          toast.success('Teacher deleted successfully.');
        },
        onError: (err) => {
          console.log(err.message);
          toast.error("Failed to delete teacher. Please try again")
        },
      });

      return { isDeleting, mutate}
}