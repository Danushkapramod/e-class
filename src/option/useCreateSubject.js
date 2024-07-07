import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubject } from "../services_api/apiOptions";
import toast from "react-hot-toast";

export default function useCreateSubject() {
  const queryClient = useQueryClient();

  const {
    isPending: isCreating,
    mutate,
    isSuccess,
  } = useMutation({
    mutationFn: createSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });
      toast.success("Subject created successfully!");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Failed to create item. Please try again");
    },
  });
  return { isCreating, mutate, isSuccess };
}
