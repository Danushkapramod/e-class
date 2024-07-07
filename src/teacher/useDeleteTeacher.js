import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteTeacher } from "../services_api/apiTeachers";

export default function useDeleteTeacher() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
      toast.success("Teacher deleted successfully.");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Failed to delete teacher. Please try again");
    },
  });

  return { isDeleting, mutate };
}
