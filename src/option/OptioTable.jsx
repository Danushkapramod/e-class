import { useEffect, useRef, useState } from 'react';
import { FadeLoader } from 'react-spinners';
import Error from '../ui/components/Error';
import useOColor from '../utils/getOColor';
import { Button } from '../ui/components/ButtonNew';
import AutoCloseWindow from '../ui/components/AutoCloseWindow';

export default function OptionTable({
  fieldName,
  data = [],
  isLoading,
  error,
  mutateCreate,
  mutateDelete,
  isDeleting,
  isSuccess,
  isCreating,
}) {
  const theme = useOColor();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const inputRef = useRef();
  const inputAddBtn = useRef();

  function addSubjectHandler() {
    setIsFormOpen(!isFormOpen);
  }

  useEffect(() => {
    setSubject('');
    if (isSuccess) setIsFormOpen(false);
  }, [isSuccess]);

  return (
    <div className="grow basis-1 rounded  shadow-neumorphism">
      <div
        className=" flex items-center justify-between rounded-t border-b
                    border-b-bg--primary-100  bg-bg--primary-200  px-2 py-2 pl-4 text-lg"
      >
        {fieldName}
        <Button ref={inputAddBtn} onClick={addSubjectHandler} label="ADD" size="sm" icon="add" />
      </div>

      <ul
        className={`max-h-[70dvh]  divide-y divide-bg--primary-100 overflow-auto 
         rounded-b  ${!theme ? 'bg-white/80' : 'bg-white/[0.03]'}`}
      >
        {isFormOpen && (
          <AutoCloseWindow refItems={inputAddBtn.current} set={setIsFormOpen}>
            <li className="relative flex items-center overflow-hidden bg-white/5 ">
              <input
                placeholder="add"
                ref={inputRef}
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
                className=" flex  h-full w-full bg-bg--primary-100 px-4 py-3 outline"
                type="text"
              />

              <div className=" absolute right-2 ">
                <Button
                  disabled={isCreating}
                  onClick={() => mutateCreate(subject)}
                  size="xs"
                  icon="add"
                />
              </div>
            </li>
          </AutoCloseWindow>
        )}

        {isLoading ? (
          <div className=" flex scale-50 justify-center">
            <FadeLoader color="#36d7b7" />
          </div>
        ) : error ? (
          <Error errorMsg={error.message} />
        ) : (
          data.map((item, index) => {
            return (
              <Row
                isDeleting={isDeleting}
                mutateDelete={mutateDelete}
                item={item}
                number={index + 1}
                key={index}
              />
            );
          })
        )}
      </ul>
    </div>
  );
}

function Row({ isDeleting, item, number, mutateDelete }) {
  return (
    <li className="flex justify-between px-2 py-1.5">
      <div className="flex items-center  gap-3">
        <span className=" text-sm opacity-50">{number < 10 ? '0' + number : number}</span>
        <span className="  capitalize opacity-80">{item[1]}</span>
      </div>

      <Button
        disabled={isDeleting}
        onClick={() => mutateDelete(item[0])}
        size="xs"
        variant="outline"
        icon="delete"
      />
    </li>
  );
}
