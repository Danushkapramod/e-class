import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

function Pagination({ limit = 20, getTotal, url = true, set, type }) {
  const pageLimit = limit;
  const location = useLocation();
  const newParams = useMemo(() => new URLSearchParams(location.search), [location]);

  const [, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [btnList, setBtnList] = useState();
  const [total, setTotal] = useState();
  const oldP_L = useRef({ page: parseInt(currentPage), limit: parseInt(pageLimit) });

  useEffect(() => {
    (async () => {
      const total = await getTotal();
      const pageCount = Math.ceil(total / pageLimit);
      setPageCount(pageCount);
      setTotal(total);
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

  function clickHandler(pageNo) {
    setCurrentPage(() => (pageNo < 1 ? 1 : pageNo > pageCount ? pageCount : pageNo));
  }

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

  if (type === 'simple') {
    return (
      pageCount > 1 && (
        <div>
          <div className=" flex items-end gap-1 ">
            <div className="mr-1  text-sm">
              <span>
                {currentPage * limit - (limit - 1)} - {currentPage * limit}
              </span>
              <span className="mx-0.5"> of </span>
              {total}
            </div>
            <Block onClick={() => clickHandler(currentPage - 1)} type="sideSimple">
              <span className="material-symbols-outlined text-2xl">chevron_left</span>
            </Block>
            <Block onClick={() => clickHandler(currentPage + 1)} type="sideSimple">
              <span className="material-symbols-outlined text-2xl">chevron_right</span>
            </Block>
          </div>
        </div>
      )
    );
  }

  return (
    pageCount > 1 && (
      <div>
        <div className=" flex gap-1 ">
          <Block onClick={() => clickHandler(currentPage - 1)} type="sides">
            <span className="material-symbols-outlined text-lg">arrow_back_ios</span>
          </Block>

          {btnList?.map((number) => {
            return (
              <Block curPage={currentPage} onClick={() => clickHandler(number)} key={number}>
                {number}
              </Block>
            );
          })}

          {pageCount > 5 && pageCount - currentPage > 2 && <Block>...</Block>}
          {pageCount > 5 && pageCount - currentPage > 2 && (
            <Block curPage={currentPage} onClick={() => clickHandler(pageCount)}>
              {pageCount}
            </Block>
          )}
          <Block onClick={() => clickHandler(currentPage + 1)} type="sides">
            <span className="material-symbols-outlined text-lg">arrow_forward_ios</span>
          </Block>
        </div>
      </div>
    )
  );
}

function Block({ children, onClick, type, curPage }) {
  const active = curPage?.toString() === children?.toString();

  if (type === 'sides') {
    return (
      <button
        onClick={onClick}
        className="flex items-center justify-center rounded-sm border
        border-bg--primary-100 px-3 shadow  hover:bg-bg--primary-200 "
      >
        {children}
      </button>
    );
  } else if (type === 'sideSimple') {
    return (
      <button
        onClick={onClick}
        className="flex items-center justify-center rounded-sm
          px-1 shadow  hover:bg-bg--primary-100 "
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className={`rounded-sm border border-bg--primary-100 px-4 py-2 
        shadow hover:bg-bg--primary-200 ${active ? '!border-slate-400 bg-bg--primary-100' : ''}`}
      >
        {children}
      </button>
    );
  }
}

export default Pagination;
