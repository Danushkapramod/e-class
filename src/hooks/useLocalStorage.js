import { useEffect, useState } from "react";

function useLocalStorage(key,initialValue){
    const[currentValu,setCurrenValue] = useState(initialValue)

    useEffect(()=>{
         const value =localStorage.getItem(key);
         setCurrenValue(()=>value?JSON.parse(value):initialValue)
    },[initialValue, key, ])

    function setValue(value){
        localStorage.setItem(key,JSON.stringify(value));
        setCurrenValue(value)
    }

return[ currentValu,setValue]
}

export default useLocalStorage;