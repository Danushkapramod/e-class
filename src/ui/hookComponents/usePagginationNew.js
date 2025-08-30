import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

function usePagginationNew({setFun}){
 const [page, setPage] = useState(1);
 const [limit, setLimit] = useState(30);
 const location = useLocation();
 const url = useMemo(() => new URLSearchParams(location.search), [location.search]);
 const [, setParams] = useSearchParams()

 useEffect(()=>{
    url.set('page', page)
    url.set('limit', limit)
    if(setFun) {setFun(Object.fromEntries(url.entries()))}
    else {setParams(url.toString())}
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[page, limit, url, setParams ])
 
return { setPage, page, limit, setLimit }
}

export default usePagginationNew;

