import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteTeacher } from "../services/apiTeachers";

export default function useDeleteTeacher() {
  const queryClient = useQueryClient();
  const query= useMutation({
    mutationFn: deleteTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["deletedTeachers"],
      });
      toast.success("Teacher deleted successfully.");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Failed to delete teacher. Please try again");
    },
  });

  return query
}
