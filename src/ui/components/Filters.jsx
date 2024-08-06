import { useRef, useState } from 'react';
import { Button } from './ButtonNew';
import AutoCloseWindow from './AutoCloseWindow';

function Filters({ children, filterCount, onFilterHandler, reset }) {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef(null);

  function filterHandler() {
    onFilterHandler();
    setIsOpen(false);
  }

  return (
    <div className="relative ">
      <div className="flex justify-center">
        <Button
          ref={btnRef}
          onClick={() => setIsOpen(!isOpen)}
          label="FILTERS"
          size="sm"
          icon="tune"
          variant="outline"
        />

        {filterCount ? (
          <div
            className="absolute right-0 top-0 flex  h-[18px] w-[18px] -translate-y-[50%]
             translate-x-[20%] items-center justify-center rounded-full bg-bg--secondery-2 text-xs"
          >
            {filterCount}
          </div>
        ) : null}
      </div>

      {isOpen && (
        <AutoCloseWindow refItems={btnRef.current} set={setIsOpen}>
          <div
            className="absolute right-0 top-10 z-50 flex flex-col 
             rounded border border-bg--primary-100 bg-bg--primary-400 px-2 py-2"
          >
            <div className="flex divide-x divide-border-2">{children}</div>
            <div className=" mt-4 flex justify-end gap-2 pr-2">
              <Button onClick={() => setIsOpen(false)} label="CLOSE" variant="outline" size="sm" />
              <Button onClick={reset} label="CLEAR" variant="outline" size="sm" />
              <Button onClick={filterHandler} label="APPLY" variant="primary" size="sm" />
            </div>
          </div>
        </AutoCloseWindow>
      )}
    </div>
  );
}

export default Filters;
