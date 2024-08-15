import { useEffect, useMemo, useState } from 'react';
import Select from './Select';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

Search.propTypes = {
  setFn: PropTypes.func,
  url: PropTypes.bool,
  inputComp: PropTypes.element,
  initialSearchBy: PropTypes.string,
  searchFields: PropTypes.shape({
    searchBy: PropTypes.string,
    fieldName: PropTypes.string,
  }),
};

Search.defaultProps = {
  searchFields: [],
};

export function Search({ url, searchFields, setFn, inputComp, initialSearchBy }) {
  const [search, setSearch] = useState();
  const [searchBy, setSearchBy] = useState(initialSearchBy);
  // eslint-disable-next-line no-unused-vars
  const [_, setParams] = useSearchParams();
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
    if (url) setParams(params.toString());
    if (setFn) setFn(params.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, search]);

  return (
    <div className=" relative flex items-center rounded border border-border-2">
      {inputComp ? (
        { inputComp }
      ) : (
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Find"
          className=" w-48 rounded bg-bg--primary-200 px-8 py-[0.375rem] text-sm outline-none "
          type="text"
        />
      )}
      <span className="material-symbols-outlined absolute rounded-sm pl-2 text-lg ">search</span>
      <div className=" h-[1.8rem]">
        <Select
          className="flex h-full items-center"
          setValueId={setSearchBy}
          data={searchFields}
          showValue={true}
          initial={searchFields[0].searchBy}
          idName="fieldName"
          valueName="searchBy"
        />
      </div>
    </div>
  );
}
