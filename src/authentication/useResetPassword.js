import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { resetPassword } from "../services_api/apiAuth";

export function useResetPassword() {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      toast.success("Password changed successfully");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
  });
  return { mutate, isPending, error };
}
