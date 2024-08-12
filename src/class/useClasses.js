import { useQuery } from '@tanstack/react-query';
import { getClasses, getClassesWithoutTeacher } from '../services/apiClasses';
import { useLocation } from 'react-router-dom';

export default function useClasses(options) {
  const location = useLocation();
  let queryParams = options?.query || location.search

  const {
    data: classes,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ['classes', queryParams],
    queryFn: () => options.teacher?getClasses(queryParams) :
     getClassesWithoutTeacher(queryParams),
  });

  return { classes, isLoading, error, isSuccess };
}


