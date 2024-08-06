import { useState } from 'react';
import SearchField from './SearchField';
import { FadeLoader } from 'react-spinners';
import useClientSearch from '../../hooks/useClientSearch';
import { useSelector } from 'react-redux';
import AutoCloseWindow from './AutoCloseWindow';
import { Button } from './ButtonNew';

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
  className,
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
    <AutoCloseWindow className="relative h-full" set={setIsOpen}>
      <button
        onClick={optionClick}
        className={`${className} mr-0.5 flex justify-center rounded-sm bg-optinal-1 px-2 py-[8px] text-sm`}
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
                    className="w-full rounded-b-none !border-b border-l-0 border-r-0 border-t-0 !bg-bg--primary-300 py-1.5"
                  />
                </div>
              )}
              <div className=" absolute right-1 top-1">
                {add && (
                  <Button
                    to={add.to}
                    onClick={add.onClick}
                    label="ADD"
                    size="xs"
                    variant="outline"
                    icon="add"
                  />
                )}
              </div>
            </div>
            <ul className=" max-h-60 w-full overflow-auto rounded text-sm ">
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
      className={`cursor-pointer bg-bg--primary-500 px-3 py-1.5 ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}
    >
      {value}
    </li>
  );
}

export default Select;
