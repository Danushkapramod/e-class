import { useQuery } from '@tanstack/react-query';
import { getClasses, getClassesWithoutTeacher } from '../services/apiClasses';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setQueryParams } from './classSlice';


export default function useClasses(options) {
  const dispatch = useDispatch() 
  const location = useLocation();
  const {queryParams} = useSelector((store)=>store.class)
  
  useEffect(()=>{
      let query = options?.query || location.search
     dispatch(setQueryParams(query)) 
  },[dispatch, location.search, options?.query])
 

  const {
    data: classes,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ['classes', queryParams],
    queryFn: ({signal}) => options.teacher?getClasses({signal,queryParams}) :
     getClassesWithoutTeacher({signal,queryParams}),
  });

  return { classes, isLoading, error, isSuccess };
}


