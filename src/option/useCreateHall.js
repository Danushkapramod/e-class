import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHall } from "../services_api/apiOptions";
import toast from "react-hot-toast";

export default function useCreateHall() {
  const queryClient = useQueryClient();

  const {
    isPending: isCreating,
    mutate,
    isSuccess,
  } = useMutation({
    mutationFn: createHall,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["halls"],
      });
      toast.success("Hall created successfully!");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Failed to create item. Please try again");
    },
  });
  return { isCreating, mutate, isSuccess };
}
