import { useEffect, useRef, useState } from "react";
import Button from "../ui/components/Button";
import { FadeLoader } from "react-spinners";
import Error from "../ui/components/Error";

export default function OptionTable({
  fieldName,
  data,
  isLoading,
  error,
  mutateCreate,
  mutateDelete,
  isDeleting,
  isSuccess,
  isCreating,
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const inputRef = useRef();
  const inputAddBtn = useRef();

  function addSubjectHandler() {
    setIsFormOpen(!isFormOpen);
  }

  useEffect(() => {
    function eventCallback(e) {
      if (e.target.closest("button")) return;
      if (e.target !== inputRef.current && e.target !== inputRef.inputAddBtn) {
        setIsFormOpen(false);
      }
    }

    if (isFormOpen) {
      inputRef.current.focus();
      document.addEventListener("click", eventCallback);
    }
    return () => {
      document.removeEventListener("click", eventCallback);
    };
  }, [isFormOpen]);

  useEffect(() => {
    setSubject("");
    if (isSuccess) setIsFormOpen(false);
  }, [isSuccess]);

  return (
    <div className="grow  basis-1 rounded  ">
      <div
        className=" flex items-center justify-between rounded-t 
        border-b border-slate-500
       bg-dark-secondery  px-2  py-2 pl-4 text-lg"
      >
        {fieldName}

        <button className="addButton">
          <Button onClick={addSubjectHandler} type="smallPrimary" icon="add">
            ADD
          </Button>
        </button>
      </div>
      <ul className="max-h-[70dvh]  divide-y divide-slate-700  overflow-auto rounded-b">
        {isFormOpen && (
          <li
            className="relative  flex items-center 
                      overflow-hidden bg-white/5 "
          >
            <input
              placeholder="add"
              ref={inputRef}
              onChange={(e) => setSubject(e.target.value)}
              value={subject}
              className=" w-full  bg-white/5 px-4 py-2 outline-none"
              type="text"
            />
            <div className=" absolute right-2 ">
              <Button
                ref={inputAddBtn}
                disabled={isCreating}
                onClick={() => mutateCreate(subject)}
                type="xsPrimary"
                icon="add"
              ></Button>
            </div>
          </li>
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
    <li
      className=" flex  justify-between bg-white/5
                      px-2 py-1.5"
    >
      <div className="flex items-center  gap-3">
        <span className=" text-sm opacity-50">
          {number < 10 ? "0" + number : number}
        </span>
        <span className="  capitalize opacity-80">{item[1]}</span>
      </div>

      <Button
        disabled={isDeleting}
        onClick={() => mutateDelete(item[0])}
        type="xsSecondery"
        icon="delete"
      />
    </li>
  );
}
