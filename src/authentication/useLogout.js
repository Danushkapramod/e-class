import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logOut } from "../services_api/apiAuth";


export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.removeQueries();      
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  return { mutate, isLoading };
}
