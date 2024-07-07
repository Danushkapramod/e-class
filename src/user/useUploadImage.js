import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAuther } from "../services/apiAuth";
import toast from "react-hot-toast";

export default function useUploadImage() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateAuther,
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Failed to upload avatar. Please try again.");
    },
  });
  return { mutate, isPending };
}
