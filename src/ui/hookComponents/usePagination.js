import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

function usePagination({ limit = 20,type, getTotal, url = true, set, total }){
    const pageLimit = limit;
    const location = useLocation();
    const newParams = useMemo(() => new URLSearchParams(location.search), [location]);
  
    const [, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [btnList, setBtnList] = useState();
    const [_total, setTotal] = useState();
    const oldP_L = useRef({ page: parseInt(currentPage), limit: parseInt(pageLimit) });
  
    useEffect(() => {
      (async () => {
        const _total = total ? total : await getTotal();
        const pageCount = Math.ceil(_total / pageLimit);
        setPageCount(pageCount);
        setTotal(_total);
      })();
    }, [pageLimit]);
  
    useEffect(() => {
      if (oldP_L.current.page !== currentPage || oldP_L.current.limit !== pageLimit) {
        if (url) {
          newParams.set('page', currentPage);
          newParams.set('limit', pageLimit);
          oldP_L.current = { page: parseInt(currentPage), limit: parseInt(pageLimit) };
          setSearchParams(newParams);
        } else if (set) {
          set(`page=${currentPage}&limit=${pageLimit}`);
        }
      }
  
      if (!newParams.has('page') || !newParams.has('limit')) {
        if (url) {
          if (!newParams.has('page')) newParams.set('page', currentPage);
          if (!newParams.has('limit')) newParams.set('limit', pageLimit);
        } else if (set) {
          set(`page=${currentPage}&limit=${pageLimit}`);
        }
  
        oldP_L.current = { page: parseInt(currentPage), limit: parseInt(pageLimit) };
        setSearchParams(newParams);
      }
    }, [currentPage, pageLimit]);
  
    useEffect(() => {
      let buttons = [];
      if (currentPage > 3) {
        for (let i = 1; i < 6 && i <= pageCount; i++) {
          buttons.push(currentPage - 3 + i);
          setBtnList(buttons);
        }
      }
  
      if (currentPage < 3) {
        for (let i = 1; i <= 5 && i <= pageCount; i++) {
          buttons.push(i);
          setBtnList(buttons);
        }
      }
    }, [currentPage, pageCount]);

    return {pageCount,currentPage,limit,type,_total,btnList,setCurrentPage}

}

export default usePagination;