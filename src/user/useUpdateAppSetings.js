
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppSetings} from "../services/apiAuth";
import toast from "react-hot-toast";

export default function useUpdateAppSetings() {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: updateAppSetings,
    onSuccess: () => {
      queryClient.invalidateQueries("appSettings");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
  });
  return query;
}
