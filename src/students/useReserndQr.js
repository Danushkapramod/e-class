import { useMutation} from "@tanstack/react-query";
import { resedQr } from "../services/apiStudents";
import toast from "react-hot-toast";

export function useResedQr() {
    const query = useMutation({
      mutationFn: resedQr,
      onSuccess: () => {
        toast.success("Qr-code sended successfully.");
      },
      onError: (err) => {
        console.log(err.message);
        toast.error(err.message);
      },
    });
  
    return query;
  }