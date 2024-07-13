import { useEffect, useState } from "react";
import Button from "./Button";
//import SelectItem from "./SelectItem";

function Sort({ sortData, setSort, isSorted }) {
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState("none");

  useEffect(() => {
    setSort(select);
  }, [select, setSort]);

  useEffect(() => {
    function eventCallback(e) {
      if (e.target.closest("button")) return;
      // if (e.target !== toggleButton.current) {
      // }
      setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener("click", eventCallback);
    }
    return () => {
      document.removeEventListener("click", eventCallback);
    };
  }, [isOpen]);

  function selectHandler() {}
  return (
    <div className=" relative">
      <Button
        className={"!border-bg--primary-100 !text-text--primary"}
        onClick={() => setIsOpen(!isOpen)}
        type="smallSecondery"
        icon="sort"
      >
        Sort
      </Button>
      {isSorted ? (
        <div
          className="
             te bg-bg--secondery-2  absolute  right-0 top-0 flex h-4
              w-4 -translate-y-[50%] translate-x-[20%] items-center 
              justify-center   rounded-full text-sm "
        ></div>
      ) : null}
      {isOpen && (
        <div
          className={` absolute  right-0 z-50 mt-1 flex   
            flex-col divide-y
           divide-bg--primary-100 rounded border
           border-bg--primary-100 bg-bg--primary-300 `}
        >
          {sortData.map((item, index) => {
            return (
              <Item
                title={item.title}
                select={select}
                onClick={selectHandler}
                sortBy={item.sortBy}
                setSelect={setSelect}
                key={index}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function Item({ title, select, onClick, sortBy, setSelect }) {
  const selected = sortBy === select;
  return (
    <button
      className="flex w-44 items-center gap-1  px-2 py-1.5 text-sm hover:bg-white/5"
      onClick={() => {
        onClick(sortBy);
        setSelect(sortBy);
      }}
      id={title}
    >
      <span
        className={`material-symbols-outlined scale-75 
              ${selected ? "opacity-100" : "opacity-0"}`}
      >
        done
      </span>
      {title}
    </button>
  );
}

export default Sort;
