import axios from "axios";
import { BASE_URL } from "../services/apiData";
import {  useSearchParams } from "react-router-dom";
import { useMutation} from "@tanstack/react-query";
import { useEffect } from "react";


async function fetchTokens(code) {
    console.log(code);
    
  if (code) {
     const res = await axios.post(
     `${BASE_URL}/services/drive-oauth-signup`,
       { code },
      { withCredentials: true }
   );
   return res.data
  }
}

function useSingupDrive(){
const [params, setParams] = useSearchParams();

const {mutate,data,isPending} = useMutation({
    mutationFn:()=>fetchTokens(params.get('code')),
    onSuccess:()=>setParams('')
})
useEffect(() => {
    if (params.get('code'))  mutate(); 
  }, [params,mutate]);

return {data,isPending}
}
export default useSingupDrive;