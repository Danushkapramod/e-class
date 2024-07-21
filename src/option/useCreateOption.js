import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOption } from "../services/apiOptions";
import toast from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import { renewTokenMsg } from "../utils/tost";
export default function useCreateOption(queryKey) {
  const queryClient = useQueryClient();

  const {
    isPending: isCreating,
    mutate,
    isSuccess,
  } = useMutation({
    mutationFn: createOption,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
      if(data){toast.success("Item created successfully!")}
      else renewTokenMsg()
      
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Failed to create item. Please try again");
    },
  });
  return { isCreating, mutate, isSuccess };
}
