import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import AutoCloseWindow from './AutoCloseWindow';
//import SelectItem from "./SelectItem";

function Sort({ settled, sortData, icon, btnText, setSort, isSorted, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState('none');
  const btnRef = useRef();

  useEffect(() => {
    setSort(select);
  }, [select, setSort]);

  useEffect(() => {
    setIsOpen(false);
  }, [settled]);

  function optionClick() {
    setIsOpen(!isOpen);
  }

  function selectHandler() {}

  return (
    <div className=" relative">
      <div ref={btnRef}>
        <Button
          className={className ? className : `!border-bg--primary-100 !text-text--primary`}
          onClick={optionClick}
          type="smallSecondery"
          icon={icon || 'sort'}
        >
          {btnText || 'Sort'}
        </Button>
      </div>
      {isSorted ? (
        <div
          className="
             te absolute right-0 top-0 flex aspect-square h-3
              -translate-y-[50%] translate-x-[20%] items-center justify-center 
              rounded-full   bg-bg--secondery-2 text-sm "
        ></div>
      ) : null}
      {isOpen && (
        <AutoCloseWindow
          set={setIsOpen}
          refItems={btnRef.current}
          className={` absolute  right-0 z-50 mt-1 flex   
            flex-col divide-y
           divide-bg--primary-100 rounded border
           border-bg--primary-100 bg-bg--primary-500 `}
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
        </AutoCloseWindow>
      )}
    </div>
  );
}

function Item({ title, select, onClick, sortBy, setSelect }) {
  const selected = sortBy === select;

  function clickHandler() {
    onClick(sortBy);
    setSelect(sortBy);
  }

  return (
    <button
      className="flex w-44 items-center gap-1  px-2 py-1.5 text-sm hover:bg-white/5"
      onClick={clickHandler}
      id={title}
    >
      <span
        className={`material-symbols-outlined scale-75 ${selected ? 'opacity-100' : 'opacity-0'}`}
      >
        done
      </span>
      {title}
    </button>
  );
}

export default Sort;
