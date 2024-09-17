import { useQuery } from '@tanstack/react-query';
import { getClasses  } from '../services/apiClasses';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { setQueryParams } from './classSlice';

export default function useClasses() {
  const dispatch = useDispatch() 
  const location = useLocation();
  const {queryParams} = useSelector((store)=>store.class)
  const url = useMemo(()=> 
    new URLSearchParams(location.search),[location.search]
  )
  useEffect(()=>{
     dispatch(setQueryParams(Object.fromEntries(url.entries()))) 
  },[dispatch, location.search, url])
 
  const {
    data: classes,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ['classes', queryParams],
    queryFn: ({signal}) => getClasses({signal,queryParams})
  });
  return { classes, isLoading, error, isSuccess };
}


