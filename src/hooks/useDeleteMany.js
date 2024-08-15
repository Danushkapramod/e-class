import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletedMany } from "../services/apiAuth";
import toast from "react-hot-toast";

export function useDeleteMany(queykey) {
    const queryClient = useQueryClient();
    const query= useMutation({
      mutationFn: deletedMany,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [queykey],
        });
        toast.success("Items deleted successfully.");
      },
      onError: (err) => {
        console.log(err.message);
        toast.error(err.message);
      },
    });
  
    return query
  }
  