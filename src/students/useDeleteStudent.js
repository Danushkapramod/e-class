import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteManyStudents, deleteStudent } from "../services/apiStudents";

export default function useDeleteStudent() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate,isSuccess,status } = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
      toast.success("Student deleted successfully.");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
  });

  return { isDeleting, mutate,isSuccess,status  };
}


export function useDeleteManyStudents() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate,isSuccess,status } = useMutation({
    mutationFn: deleteManyStudents,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
      toast.success("Students deleted successfully.");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
  });

  return { isDeleting, mutate,isSuccess,status  };
}
