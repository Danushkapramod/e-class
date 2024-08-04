
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAuther } from "../services/apiAuth";
import toast from "react-hot-toast";

export default function useUpdateAvatar() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateAuther,
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
  });
  return { mutate, isPending };
}
