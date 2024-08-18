import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  createSubItem } from "../services/apiOptions";
import toast from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import { renewTokenMsg } from "../utils/tost";


export default function useCreateSubItem(queryKey) {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: createSubItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
      if(data){toast.success("Item created successfully!")}
      else renewTokenMsg()
    },
    
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
  });
  return query;
}
