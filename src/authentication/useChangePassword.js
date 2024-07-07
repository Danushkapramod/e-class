import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { changePassword } from "../services/apiAuth";

export function useChangePassword() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully");

    },
    onError: (err) => {
      console.log(err.message);
      toast.error(`Error : ${err.message}`);
    },
  });
  return { mutate, isPending, error };
}
