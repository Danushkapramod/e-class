import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createTeacher } from "../services_api/apiTeachers";
import toast from "react-hot-toast";

export default function useCreateTeacher(){
    const navigate = useNavigate();

    const queryClient = useQueryClient()

    const { isPending: isCreating, mutate } = useMutation({
        mutationFn: createTeacher,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["teachers"],
          });
          navigate(-1);
          toast.success('Teacher created successfully!');
        },
    
        onError: (err) => {
          console.log(err.message);
          toast.error("Failed to create teacher. Please try again.")
        },
      });

      return {isCreating, mutate}
}


