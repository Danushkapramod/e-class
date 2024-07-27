import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import Sort from '../ui/components/Sort';

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

function StudentTableOperations() {
  return <div></div>;
}

export function StudentFilter({ setQuery }) {
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
    setQuery(params.toString());
  }, [params, setQuery, isFilter]);

  return (
    <Sort
      settled={isFilter}
      sortData={sortData}
      icon="filter_alt"
      btnText={isFilter === 'none' ? 'all' : isFilter}
      setSort={setIsFilter}
    />
  );
}

export function StudentSearch({ setQuery }) {
  const [search, setSearch] = useState();
  const params = useMemo(() => new URLSearchParams(), []);

  useEffect(() => {
    if (!search) {
      params.delete('search');
    } else {
      params.set('search', search);
    }
  }, [search, params]);

  useEffect(() => {
    setQuery(params.toString());
  }, [params, search, setQuery]);

  return (
    <div className=" relative flex items-center">
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Find"
        className=" rounded border border-border-2 
          bg-bg--primary-200 px-8 py-[0.375rem] text-sm outline-none "
        type="text"
      />
      <span className="material-symbols-outlined absolute rounded-sm pl-2 text-lg ">search</span>
    </div>
  );
}

export default StudentTableOperations;
