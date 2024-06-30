import { useEffect, useRef, useState } from "react";
import Button from "./Button";

// eslint-disable-next-line react/prop-types
function SelectItem({ bg, items, disabled, onClick, buttonType }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleButton = useRef();

  useEffect(() => {
    function eventCallback(e) {
      if (e.target.closest("button")) return;
      if (e.target !== toggleButton.current) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("click", eventCallback);
    }
    return () => {
      document.removeEventListener("click", eventCallback);
    };
  }, [isOpen]);

  return (
    <div className=" relative">
      <Button
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        type={buttonType || "smallSecondery"}
        icon="more_vert"
      ></Button>
      {isOpen && (
        <div
          className={` absolute  right-0 z-50 mt-1 flex  animate-slideDown flex-col divide-y divide-slate-700 rounded border
           border-slate-700 transition-all duration-200  ${bg ? bg : "bg-white/10"}`}
        >
          {items.map((item, index) => {
            return (
              <Item
                disabled={disabled}
                item={item[0]}
                icon={item[1]}
                key={index}
                onClick={onClick}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function Item({ item, onClick, icon, disabled }) {
  return (
    <button
      disabled={disabled}
      className="flex items-center gap-1  px-3 py-1 text-sm hover:bg-white/5"
      onClick={onClick}
      id={item}
    >
      <span className=" material-symbols-outlined  scale-[0.70]">{icon}</span>
      {item}
    </button>
  );
}
export default SelectItem;
