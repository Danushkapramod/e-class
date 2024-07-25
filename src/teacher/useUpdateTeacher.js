import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateTeacher } from "../services/apiTeachers";
import { useNavigate } from "react-router-dom";

export default function useUpdateTeacher() {
  const navigate = useNavigate()
  const queqyClient = useQueryClient()
  const {
    isPending: isUpdating,
    error,
    mutate,
    isSuccess,
  } = useMutation({
    mutationFn: updateTeacher,
    onSuccess: () => {
      queqyClient.invalidateQueries({queryKey:['teachers']})
      toast.success("Teacher updated successfully.");
      navigate(-1)

    },
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
  });

  return { isUpdating, error, mutate, isSuccess };
}
