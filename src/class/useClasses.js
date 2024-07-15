import { useQuery } from '@tanstack/react-query';
import { getClasses } from '../services/apiClasses';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function useClasses(query) {
  const location = useLocation();
  const [queryParams, setQueryParams] = useState();

  useEffect(() => {
    setQueryParams(query || location.search);
  }, [location.search, query]);

  console.log(queryParams);

  const {
    data: classes,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ['classes', queryParams],
    queryFn: () => getClasses(queryParams),
  });

  return { classes, isLoading, error, isSuccess };
}


