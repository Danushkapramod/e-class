import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateClass } from "../services/apiClasses";
import { useNavigate } from "react-router-dom";

export default function useUpdateClass() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { isPending: isUpdating, mutate } = useMutation({
    mutationFn: updateClass,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['classes']})
      toast.success("Class updated successfully!");
      navigate(-1)
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
  });

  return { isUpdating, mutate };
}
