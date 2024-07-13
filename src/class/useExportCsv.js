import {  useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { exportToCsv } from "../services/apiAccets";

export default function useExportToCsv() {
  const { isLoading, mutate } = useMutation({
    mutationFn: exportToCsv,
    onSuccess: () => {
      //toast.success('Class deleted successfully!"');
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Failed to delete class. Please try again.");
    },
  });

  return { isLoading, mutate };
}
