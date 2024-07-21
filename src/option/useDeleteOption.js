import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOption } from "../services/apiOptions";
import toast from "react-hot-toast";

export default function useDeleteOption(queryKey) {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: deleteOption,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
      toast.success("Item deleted successfully.");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Failed to delete item. Please try again");
    },
  });
  return { isDeleting, mutate };
}
