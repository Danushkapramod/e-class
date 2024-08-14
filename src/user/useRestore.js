
import { useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {  restoreItem } from "../services/apiAuth";

export default function useRestore(queryKey) {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn:restoreItem,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
  });
  return query;
}
