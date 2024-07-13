import { useEffect, useRef, useState } from 'react';
import Button from './Button';

// eslint-disable-next-line react/prop-types
function SelectItem({ bg, items, size, disabled, icon, btnTitle, onClick, buttonType }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleButton = useRef();

  useEffect(() => {
    function eventCallback(e) {
      if (e.target.closest('button')) return;
      if (e.target !== toggleButton.current) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('click', eventCallback);
    }
    return () => {
      document.removeEventListener('click', eventCallback);
    };
  }, [isOpen]);

  return (
    <div className=" relative ">
      <Button
        className="!border-bg--primary-200 !bg-black/10"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        type={buttonType || 'smallSecondery'}
        icon={icon || 'more_vert'}
      >
        {btnTitle}
      </Button>
      {isOpen && (
        <div
          className={`absolute left-0 z-50 mt-1 flex min-w-max animate-slideDown flex-col divide-y divide-bg--primary-100  rounded
                      text-text--primary shadow transition-all duration-200  ${bg ? bg : 'bg-white/10'}`}
        >
          {items.map((item, index) => {
            return (
              <Item
                disabled={disabled}
                item={item[0]}
                icon={item[1]}
                key={index}
                size={size}
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
function Item({ item, onClick, size, icon, disabled }) {
  if (size === 'medium') {
    return (
      <button
        disabled={disabled}
        className="px flex items-center gap-1 px-4 py-2  text-text--primary hover:bg-white/5"
        onClick={onClick}
        id={item}
      >
        <span className=" material-symbols-outlined scale-[0.80]">{icon}</span>
        {item}
      </button>
    );
  } else {
    return (
      <button
        disabled={disabled}
        className="flex items-center gap-1 px-3 py-1 text-sm text-text--primary hover:bg-white/5"
        onClick={onClick}
        id={item}
      >
        <span className=" material-symbols-outlined scale-[0.70]">{icon}</span>
        {item}
      </button>
    );
  }
}
export default SelectItem;
