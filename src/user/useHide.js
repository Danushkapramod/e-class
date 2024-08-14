
import { useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { hideItem } from "../services/apiAuth";

export default function useHide(queryKey) {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn:hideItem,
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
