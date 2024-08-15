import { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Sort from '../ui/components/Sort';
import { StdTableContext } from './TableContext';
import { Search } from '../ui/components/Search';

const sortData = [
  {
    title: 'All',
    sortBy: 'none',
  },
  {
    title: 'Paid',
    sortBy: 'paid',
  },
  {
    title: 'Unpaid',
    sortBy: 'unpaid',
  },

  {
    title: 'Free',
    sortBy: 'free',
  },
];

export function StudentFilter() {
  const { updateFlterhQuery } = useContext(StdTableContext);
  const dispatch = useDispatch();
  const [isFilter, setIsFilter] = useState();
  const params = useMemo(() => new URLSearchParams(), []);

  useEffect(() => {
    if (isFilter === 'none') {
      params.delete('status');
    } else {
      params.set('status', isFilter);
    }
  }, [dispatch, isFilter, params]);

  useEffect(() => {
    updateFlterhQuery(params.toString());
  }, [params, isFilter]);

  return (
    <Sort
      settled={isFilter}
      sortData={sortData}
      icon="filter_alt"
      btnText={isFilter === 'none' ? 'All' : isFilter?.charAt(0).toUpperCase() + isFilter?.slice(1)}
      setSort={setIsFilter}
    />
  );
}

export function StudentSearch() {
  const searchFields = [
    { searchBy: 'Name', fieldName: 'name' },
    { searchBy: 'ID', fieldName: 'studentId' },
    { searchBy: 'Phone', fieldName: 'phone' },
  ];
  const { updateSearchQuery } = useContext(StdTableContext);
  return <Search setFn={updateSearchQuery} initialSearchBy="name" searchFields={searchFields} />;
}
