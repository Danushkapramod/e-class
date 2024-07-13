import { useState } from "react";
import Button from "./Button";

function Filters({ children, filterCount, onFilterHandler, reset }) {
  const [isOpen, setIsOpen] = useState(false);

  function filterHandler() {
    onFilterHandler();
    setIsOpen(false);
  }

  return (
    <div className="  ">
      <div className=" relative">
        <Button
          className={"border-bg--primary-100 !text-text--primary !shadow-sm"}
          onClick={() => setIsOpen(!isOpen)}
          type={"smallSecondery"}
          icon={"tune"}
        >
          filters
        </Button>

        {filterCount ? (
          <div
            className="
             te bg-bg--secondery-2  absolute  right-0 top-0 flex h-6
              w-6 -translate-y-[50%] translate-x-[20%] items-center 
              justify-center   rounded-full text-sm "
          >
            {filterCount}
          </div>
        ) : null}
      </div>

      {isOpen && (
        <div
          className="absolute inset-0 left-[50%] top-[50%] z-50 flex  h-fit w-[900px]  -translate-x-[50%] -translate-y-[50%]
                      flex-col rounded-lg border border-bg--primary-100 bg-bg--primary-400 px-2 py-4"
        >
          <div className=" grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-y-2 font-light">
            {children}
          </div>
          <div className=" mt-4 flex justify-end gap-2 pr-2">
            <Button onClick={() => setIsOpen(false)} type="smallSecondery">
              close
            </Button>
            <Button onClick={reset} type="smallSecondery">
              Clear
            </Button>
            <Button onClick={filterHandler} type="smallPrimary">
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filters;
