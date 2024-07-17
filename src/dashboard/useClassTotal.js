import { useQuery } from '@tanstack/react-query';
import { getClassesCount } from '../services/apiClasses';

export default function useClassTotal() {

  const {data: classes} = useQuery({
    queryKey: ['classesCount'],
    queryFn:  getClassesCount,
  });

  return { classes };
}


