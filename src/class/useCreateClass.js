import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createClass } from "../services/apiClasses";
import toast from "react-hot-toast";

export default function useCreateClass() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classes"],
      });
      navigate("/app/classes");
      toast.success("Class created successfully!");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Failed to create class. Please try again.");
    },
  });
  return { isCreating, mutate };
}
