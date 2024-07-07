import { useQuery } from '@tanstack/react-query';
import { getClasses } from '../services/apiClasses';
import { useLocation } from 'react-router-dom';

export default function useClasses(query) {
  const location = useLocation({});
  let queryParams = '';

  query ? (queryParams = query) : (queryParams = location.search);
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


