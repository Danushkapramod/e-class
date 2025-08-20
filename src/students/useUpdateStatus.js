import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "../services/apiStudents";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useUpdateStatus() {
    const {id} = useParams()
    const queqyClient = useQueryClient()
    const query = useMutation({
      mutationFn: updateStatus,
      onSuccess: (data) => {
        queqyClient.invalidateQueries({queryKey:['students', id]})
        if(data)toast.success("Status updated successfully.");
      },
      onError: (err) => {
        console.log(err.message);
        toast.error(err.message);
      },
    });
  
    return query;
  }