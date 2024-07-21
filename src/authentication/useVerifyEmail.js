import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { verifyEmail } from "../services/apiAuth";

export function useVerifyEmail() {
  const { mutate, isPending, isError, isSuccess, error, } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      toast.success("Your account has been successfully verified.");
    },
    onError: (err) => {
      console.error("Verification error:", err);
      toast.error(err.message || "An error occurred during verification.");
    },
  });

  return { mutate,isPending ,  isError, isSuccess, error };
}
