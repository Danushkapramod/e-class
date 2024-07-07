import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { requestPasswordResetToken } from "../services/apiAuth";

export function useRequestResetToken() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: requestPasswordResetToken,
    onSuccess: () => {
      toast.success("token sended successfully");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
  });
  return { mutate, isPending, error };
}
