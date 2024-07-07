import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGrade } from "../services_api/apiOptions";
import toast from "react-hot-toast";

export default function useDeleteGrade() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: deleteGrade,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["grades"],
      });
      toast.success("Grade deleted successfully.");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Failed to delete item. Please try again");
    },
  });
  return { isDeleting, mutate };
}
