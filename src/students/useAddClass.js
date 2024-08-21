import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateManyStudentClass } from "../services/apiStudents";
import toast from "react-hot-toast";

export function useAddClass() {
    const queqyClient = useQueryClient()
    const query = useMutation({
      mutationFn:updateManyStudentClass,
      onSuccess: (data) => {
        queqyClient.invalidateQueries({queryKey:['students']})
        if(data)toast.success("Class added successfully.");
      },
      onError: (err) => {
        console.log(err.message);
        toast.error(err.message);
      },
    });
  
    return query;
  }