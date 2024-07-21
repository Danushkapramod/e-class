import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signUp } from "../services/apiAuth";

export default function useSignup() {
  const { mutate, isPending ,isSuccess,error} = useMutation({
    mutationFn:signUp,
    onSuccess: () => {
      toast.success("Accout succesfully created! Please verify the email addres")
      
    },
    onError: (err) => {
      toast.error(`Error: ${err.message}`)
    },
  });
  return { mutate, isPending ,isSuccess,error};
}
