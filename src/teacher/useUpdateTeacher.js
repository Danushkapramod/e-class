import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateTeacher } from "../services/apiTeachers";

export default function useUpdateTeacher() {
  const {
    isPending: isUpdating,
    error,
    mutate,
    isSuccess,
  } = useMutation({
    mutationFn: updateTeacher,
    onSuccess: () => {
      toast.success("Teacher updated successfully.");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Failed to update Teacher. Please try again.");
    },
  });

  return { isUpdating, error, mutate, isSuccess };
}
