import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import SearchField from "./SearchField";
import { FadeLoader } from "react-spinners";
import useClientSearch from "../../hooks/useClientSearch";
import { useSelector } from "react-redux";

function Select({
  initial,
  data,
  setValue,
  search,
  add,
  setValueId,
  idName,
  isLoading,
  valueName,
  showValue,
}) {
  const { theme } = useSelector((store) => store.global);
  const { searchResults, setQuery } = useClientSearch(data, {
    type: "obj",
    valueName: valueName,
  });

  let displayData;
  const [select, setSelect] = useState(false);
  const [value, setValue_] = useState(initial);

  const toggleButton = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const inputRefValue = inputRef.current;

    function eventCallback(e) {
      if (e.target.closest("button")) return;
      if (e.target !== inputRef.current) {
        setSelect(false);
      }
    }
    function inputCallback(e) {
      e.stopPropagation();
    }

    if (select) {
      document.addEventListener("click", eventCallback);
      inputRefValue.addEventListener("click", inputCallback);

      return () => {
        document.removeEventListener("click", eventCallback);
        inputRefValue.removeEventListener("click", inputCallback);
      };
    }
  }, [select]);

  if (searchResults) {
    displayData = searchResults.map((data, index) => {
      return (
        <li
          data-value={data[valueName || "name"]}
          data-valueId={data[idName || "id"]}
          key={index}
          className={`cursor-pointer  px-3 py-1 ${theme === "dark" ? "hover:bg-white/5" : "hover:bg-black/5"}`}
        >
          {data[valueName || "name"]}
        </li>
      );
    });
  }

  return (
    <div className="relative ">
      <button
        onClick={(e) => {
          e.preventDefault();
          setSelect(!select);
        }}
        className="flex justify-center rounded-sm bg-bg--primary-100 px-3 py-[8px]"
      >
        {value}
        <div className="material-symbols-outlined scale-75">unfold_more</div>
      </button>
      {select && (
        <div className="absolute right-0 z-20 w-full min-w-max text-text--primary">
          <div className=" rounded border border-bg--primary-100  bg-bg--primary-400">
            <div>
              {search && (
                <div ref={inputRef}>
                  <SearchField
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-b-none border-0 !bg-bg--primary-200 py-2"
                  />
                </div>
              )}
              <div className=" absolute right-1 top-1">
                {add && (
                  <button ref={toggleButton}>
                    <Button
                      to={add.to}
                      onClick={add.onClick}
                      type="smallSecondery"
                      icon="add"
                    >
                      ADD
                    </Button>
                  </button>
                )}
              </div>
            </div>

            <ul
              onClick={(e) => {
                setSelect(false);
                if (setValueId) {
                  setValueId(e.target.getAttribute("data-valueId"));
                }
                if (showValue) {
                  setValue_(e.target.getAttribute("data-value"));
                }

                setValue(e.target.getAttribute("data-value"));
              }}
              className=" mt-2 max-h-60 w-full   divide-y divide-bg--primary-100 overflow-auto  rounded-b text-base "
            >
              {!isLoading ? (
                displayData
              ) : (
                <div className=" my-2 flex h-[30px]  scale-[45%]  items-center justify-center">
                  <FadeLoader color="#FFFFFF" />
                </div>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Select;
