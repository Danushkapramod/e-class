import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { deleteClass } from "../services/apiClasses";

export default function useDeleteClass() {
  const queryClient = useQueryClient();

  const query= useMutation({
    mutationFn: deleteClass,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["deletedClasses"],
      });
      toast.success('Class deleted successfully!"');
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Failed to delete class. Please try again.");
    },
  });

  return query
}
