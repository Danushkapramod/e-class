import { useState } from 'react';
import Button from './Button';
import SearchField from './SearchField';
import { FadeLoader } from 'react-spinners';
import useClientSearch from '../../hooks/useClientSearch';
import { useSelector } from 'react-redux';
import AutoCloseWindow from './AutoCloseWindow';

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
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue_] = useState(initial);

  const { searchResults, setQuery } = useClientSearch(data, {
    type: 'obj',
    valueName: valueName,
  });

  function optionClick(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  return (
    <AutoCloseWindow set={setIsOpen}>
      <div className="relative h-full">
        <button
          onClick={optionClick}
          className="mr-0.5 flex justify-center rounded-sm  bg-optinal-1 px-2 py-[8px]"
        >
          {value}
          <div className="material-symbols-outlined scale-75">unfold_more</div>
        </button>
        {isOpen && (
          <div className="absolute right-0 z-20 mt-2 w-full min-w-max text-text--primary">
            <div className=" rounded border border-bg--primary-100  bg-bg--primary-400">
              <div>
                {search && (
                  <div>
                    <SearchField
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full rounded-b-none border-0 !bg-bg--primary-200 py-2"
                    />
                  </div>
                )}
                <div className=" absolute right-1 top-1">
                  {add && (
                    <button>
                      <Button to={add.to} onClick={add.onClick} type="smallSecondery" icon="add">
                        ADD
                      </Button>
                    </button>
                  )}
                </div>
              </div>
              <ul className=" mt-2 max-h-60 w-full   divide-y divide-bg--primary-100 overflow-auto  rounded-b text-base ">
                {!isLoading ? (
                  searchResults.map((data, index) => {
                    return (
                      <SelectOption
                        value={data[valueName]}
                        key={index}
                        valueId={data[idName]}
                        showValue={showValue}
                        setValue_={setValue_}
                        setValue={setValue}
                        setValueId={setValueId}
                        setIsOpen={setIsOpen}
                      />
                    );
                  })
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
    </AutoCloseWindow>
  );
}

function SelectOption({ value, valueId, setIsOpen, setValueId, setValue, showValue, setValue_ }) {
  const { theme } = useSelector((store) => store.global);
  function clickHandler() {
    if (setValueId) {
      setValueId(valueId);
    }
    if (showValue) {
      setValue_(value);
    }
    if (setValue) {
      setValue(value);
    }
    setIsOpen(false);
  }

  return (
    <li
      onClick={clickHandler}
      className={`cursor-pointer  px-3 py-1 ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}
    >
      {value}
    </li>
  );
}

export default Select;
