import {  useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { exportToPdf } from "../services/apiAccets";

export default function useExportToPdf() {
  const { isLoading, mutate } = useMutation({
    mutationFn: exportToPdf,
    onSuccess: () => {
      //toast.success('Class deleted successfully!"');
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
  });

  return { isLoading, mutate };
}
