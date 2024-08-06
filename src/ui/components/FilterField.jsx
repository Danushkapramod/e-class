import { useEffect, useState } from 'react';
import useClientSearch from '../../hooks/useClientSearch';

export default function FilterField({ data, value, setValu, name }) {
  const { searchResults, setQuery } = useClientSearch(data, {
    type: 'list',
  });

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="min-w-[200px] border-bg--primary-100 px-2 py-2  text-text--primary">
      <p className=" px-3 pb-2 font-normal ">{name}</p>
      <div className=" z-20 w-full">
        <div className=" rounded">
          <div className=" relative flex w-fit  items-center">
            <span className=" material-symbols-outlined absolute scale-75 pl-2">search</span>
            <input
              className="w-full rounded border-b border-b-bg--primary-100 
              bg-bg--primary-200 py-1 pl-9 pr-4 text-sm shadow outline-none"
              onChange={handleSearch}
              type="text"
              placeholder={'search'}
            />
          </div>

          <ul className="h-40 touch-auto divide-y divide-bg--primary-100 overflow-auto rounded-b text-base ">
            {searchResults?.map((data, index) => {
              return <SearchOption key={index} value={value} setValu={setValu} data={data} />;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SearchOption({ data, setValu, value }) {
  const selected = value?.find((item) => item === data);
  const [select, setSelect] = useState();

  useEffect(() => {
    setSelect(selected);
  }, [selected, value]);

  return (
    <li
      onClick={() => {
        setSelect(!select);
        setValu(() => {
          if (select) {
            return [...value].filter((item) => item !== data);
          } else {
            return [...value, data];
          }
        });
      }}
      className=" cursor-pointer rounded-sm px-2 py-1 hover:bg-white/10 "
    >
      <div className=" flex items-center text-sm">
        <span
          className={`material-symbols-outlined scale-75 
            ${select ? 'opacity-100' : 'opacity-0'}`}
        >
          done
        </span>

        <span className=" text-text--secondery">{data}</span>
      </div>
    </li>
  );
}
