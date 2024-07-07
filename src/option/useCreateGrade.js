import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGrade } from "../services/apiOptions";
import toast from "react-hot-toast";

export default function useCreateGrade() {
  const queryClient = useQueryClient();

  const {
    isPending: isCreating,
    mutate,
    isSuccess,
  } = useMutation({
    mutationFn: createGrade,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["grades"],
      });
      toast.success("Grade created successfully!");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Failed to create item. Please try again.");
    },
  });
  return { isCreating, mutate, isSuccess };
}
