import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateManyStudent, updateStudent } from "../services/apiStudents";

export default function useUpdateStudent() {
  const queqyClient = useQueryClient()
  const {
    isPending: isUpdating,
    error,
    mutate,
    isSuccess,
    status
  } = useMutation({
    mutationFn: updateStudent,
    onSuccess: (data) => {
      queqyClient.invalidateQueries({queryKey:['students']})
      if(data)toast.success("Status updated successfully.");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
  });

  return { isUpdating, error, mutate, isSuccess ,status};
}


export function useUpdateManyStudents() {
  const queqyClient = useQueryClient()
  const {
    isPending: isUpdating,
    error,
    mutate,
    isSuccess,
    status
  } = useMutation({
    mutationFn: updateManyStudent,
    onSuccess: (data) => {
      queqyClient.invalidateQueries({queryKey:['students']})
      if(data)toast.success("Status updated successfully.");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
  });

  return { isUpdating, error, mutate, isSuccess ,status};
}