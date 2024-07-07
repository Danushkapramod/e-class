import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { requestEmailResetToken } from "../services/apiAuth";

export function useRequestResetPin(onSuccessCallback) {
  const { mutate, isPending, error } = useMutation({
    mutationFn: requestEmailResetToken,
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
      toast.success("pin sended successfully");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(`Error : ${err.message}`);
    },
  });
  return { mutate, isPending, error};
}
