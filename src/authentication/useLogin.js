import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/app/dashbord", { replace: true });
      toast.success("Login succesfully");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(`Error : ${err.message}`);
    },
  });
  return { mutate, isPending };
}
