import { useEffect } from "react";

 export function useFormState({key,getFun,setFun,watch,get = true,set = true}){
    const watching = watch();

    useEffect(() => {
        if(!set) return
        localStorage.setItem(key, JSON.stringify(getFun()));
      }, [getFun, key, set, watching]);
      
    useEffect(() => {
      if(!get)return  
      const values =  JSON.parse(localStorage.getItem(key))
      Object.keys(values).forEach(key => {
        setFun(key,values.key)
       });
      }, [get, key, setFun]);
    
}

export default useFormState;