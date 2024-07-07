import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { changeEmail } from "../services_api/apiAuth";

export function useChangeEmail(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: changeEmail,
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      toast.success("Email changed successfully");
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
  });
  return { mutate, isPending, error };
}
