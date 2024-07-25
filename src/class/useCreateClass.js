import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClass } from "../services/apiClasses";
import toast from "react-hot-toast";

export default function useCreateClass(setIsSubmit) {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classes"],
      });
      setIsSubmit(true)
      toast.success("Class created successfully!");
  
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
  });
  return { isCreating, mutate };
}
