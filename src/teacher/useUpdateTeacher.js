import { useMutation } from "@tanstack/react-query";
import { updateTeacher } from "../services/apiTeachers";
import toast from "react-hot-toast";

export default function useUpdateTeacher(){

    const { isPending: isUpdating, error, mutate,isSuccess } = useMutation({
        mutationFn: updateTeacher,
        onSuccess: () => {
          toast.success('Teacher updated successfully.');
        },
        onError: (err) => {
          console.log(err.message);
          toast.error("Failed to update Teacher. Please try again.")
        },
      });

      return {isUpdating,error, mutate,isSuccess} 
}