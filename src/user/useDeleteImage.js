import { useMutation } from "@tanstack/react-query";
import { updateAuther } from "../services_api/apiAuth";
import toast from "react-hot-toast";

export default function useDeleteImage() {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: updateAuther,
    onSuccess: () => {},
    onError: () => {
      toast.error("Failed to delete avatar. Please try again.");
    },
  });
  return { mutate, isPending, isSuccess };
}
