import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  deleteSubItem } from "../services/apiOptions";
import toast from "react-hot-toast";

export default function useDeleteSubItem(key) {
  const queryClient = useQueryClient();

  const query= useMutation({
    mutationFn: deleteSubItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [key],
      });
      toast.success("Item deleted successfully.");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
  });
  return query;
}
