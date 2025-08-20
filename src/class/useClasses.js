import { useQuery } from '@tanstack/react-query';
import { getClasses  } from '../services/apiClasses';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export default function useClasses() {
  const location = useLocation();
  const {pagginationQuery} = useSelector((store)=>store.class)

  const queryParams = useMemo(() => {
    const urlParams = Object.fromEntries(new URLSearchParams(location.search).entries());
    return { ...pagginationQuery, ...urlParams, teacher: true };
  }, [pagginationQuery, location.search]);

  const {
    data: classes,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ['classes', queryParams],
    queryFn: ({signal}) =>  getClasses({signal,queryParams })
  });
  return { classes, isLoading, error, isSuccess };
}


