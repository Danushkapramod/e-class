import { useEffect, useState } from "react";
import useClientSearch from "../../hooks/useClientSearch";

export default function FilterField({ data, value, setValu, name }) {
  const { searchResults, setQuery } = useClientSearch(data, {
    type: "list",
  });

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="border-x border-slate-800 px-2  py-2">
      <p className=" px-3 pb-2 font-normal opacity-75">{name}</p>
      <div className=" z-20 w-full">
        <div className=" rounded bg-dark-primary ">
          <div className=" relative flex w-fit  items-center">
            <span
              className=" material-symbols-outlined absolute
             scale-75 pl-2"
            >
              search
            </span>
            <input
              onChange={handleSearch}
              className={` w-full rounded-sm border border-slate-700 bg-white/10 
             py-1 pl-9 pr-4 text-sm outline-none`}
              type="text"
              placeholder={"search"}
            />
          </div>

          <ul
            className=" mt-2  h-40 touch-auto divide-y 
               divide-slate-800 overflow-auto rounded-b text-base 
               font-light"
          >
            {searchResults?.map((data, index) => {
              return (
                <SearchOption
                  key={index}
                  value={value}
                  setValu={setValu}
                  data={data}
                />
              );
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
            ${select ? "opacity-100" : "opacity-0"}`}
        >
          done
        </span>

        <span className=" opacity-75">{data}</span>
      </div>
    </li>
  );
}
