import { useState } from "react";
import Button from "../components/Button";
import SearchField from "../components/SearchField";

function useSelect(initial, data) {
  const [select, setSelect] = useState(false);
  const [value, setValue] = useState(initial);
  const [valueId, setValueId] = useState(null);

  return (
    <div className="relative basis-2/3">
      <button
        onClick={(e) => {
          e.preventDefault();
          setSelect(!select);
        }}
        className=" first-letter: mb-1 flex  w-full
                items-center justify-center rounded
               border border-slate-700 bg-white/10 px-3 py-2"
      >
        {value}
        <span className=" material-symbols-outlined scale-75">unfold_more</span>
      </button>
      {select && (
        <div className=" absolute z-20 w-full">
          <div className=" rounded  border border-slate-700  bg-dark-primary">
            <div>
              <SearchField className="w-full rounded-b-none border-0 bg-white/[0.05] py-2" />
              <div className=" absolute right-1 top-1">
                <Button type="smallSecondery" icon="add">
                  ADD
                </Button>
              </div>
            </div>

            <ul
              onClick={(e) => {
                setSelect(false);
                setValueId(e.target.getAttribute("data-teacherId"));

                setValue(e.target.getAttribute("data-value"));
              }}
              className=" w-full4  mt-2 rounded-b text-base font-light"
            >
              {teachers.map((teacher, index) => {
                return (
                  <li
                    data-Value={teacher.name}
                    data-teacherId={teacher.id}
                    key={index}
                    className="cursor-pointer px-3 py-1 hover:bg-white/10 "
                  >
                    {teacher.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default useSelect;
