import { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import Sort from '../ui/components/Sort';
import Select from '../ui/components/Select';
import { StdTableContext } from './TableContext';

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
      btnText={isFilter === 'none' ? 'all' : isFilter}
      setSort={setIsFilter}
    />
  );
}

export function StudentSearch() {
  const { updateSearchQuery } = useContext(StdTableContext);
  const [search, setSearch] = useState();
  const [searchBy, setSearchBy] = useState('name');
  const params = useMemo(() => new URLSearchParams(), []);

  useEffect(() => {
    if (!search) {
      params.delete('search');
      params.delete('field');
    } else {
      params.set('search', search);
      params.set('field', searchBy);
    }
  }, [search, params, searchBy]);

  useEffect(() => {
    updateSearchQuery(params.toString());
  }, [params, search]);

  return (
    <div className=" relative flex items-center rounded border border-border-2">
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Find"
        className=" w-48 bg-bg--primary-200 px-8 py-[0.375rem] text-sm outline-none "
        type="text"
      />
      <span className="material-symbols-outlined absolute rounded-sm pl-2 text-lg ">search</span>
      <div className=" h-[1.8rem]">
        <Select
          className="flex h-full items-center"
          setValueId={setSearchBy}
          data={[
            { searchBy: 'ID', fieldName: 'studentId' },
            { searchBy: 'Name', fieldName: 'name' },
            { searchBy: 'Phone', fieldName: 'phone' },
          ]}
          showValue={true}
          initial="Name"
          idName="fieldName"
          valueName="searchBy"
        />
      </div>
    </div>
  );
}

export default StudentTableOperations;
