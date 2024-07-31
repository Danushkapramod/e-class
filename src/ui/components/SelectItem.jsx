import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import AutoCloseWindow from './AutoCloseWindow';
import Tooltip from './Potral';

// eslint-disable-next-line react/prop-types
function SelectItem({
  width = 128,
  bg,
  items,
  size,
  btn,
  disabled,
  icon,
  btnTitle,
  isSuccess,
  onClick,
  buttonType,
}) {
  const [tooltipData, setTooltipData] = useState();
  const btnRef = useRef();

  useEffect(() => {
    if (isSuccess) setTooltipData(null);
  }, [isSuccess]);

  function showTooltip(e) {
    const btpRect = e.target.getBoundingClientRect();
    setTooltipData({
      position: {
        top: btpRect.top + window.scrollY + btpRect.height,
        left: btpRect.left + window.scrollX - width,
      },
    });
  }
  function optionClick(e) {
    if (!tooltipData) {
      showTooltip(e);
    } else {
      setTooltipData(null);
    }
  }

  return (
    <>
      {btn ? (
        <button ref={btnRef} className="m-0 p-0" disabled={disabled} onClick={optionClick}>
          {btn}
        </button>
      ) : (
        <div ref={btnRef}>
          <Button
            className="!border-border-2  "
            disabled={disabled}
            onClick={optionClick}
            type={buttonType || 'smallSecondery'}
            icon={icon || 'more_vert'}
          >
            {btnTitle}
          </Button>
        </div>
      )}
      {tooltipData && (
        <Tooltip position={tooltipData.position}>
          <AutoCloseWindow
            refItems={btnRef.current}
            set={setTooltipData}
            className={` mt-2 flex  min-w-32 animate-slideDown flex-col rounded 
              text-text--primary shadow-xl transition-all duration-200 
            ${bg ? bg : 'bg-bg--primary-500'} ${width ? width + `w-[${width}px]` : 'w-max'}`}
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
          </AutoCloseWindow>
        </Tooltip>
      )}
    </>
  );
}

// eslint-disable-next-line react/prop-types
function Item({ item, onClick, size, icon, disabled }) {
  if (size === 'medium') {
    return (
      <button
        disabled={disabled}
        className="px flex items-center gap-1 px-4 py-2  text-text--primary hover:bg-white/5"
        onClick={() => onClick(item)}
      >
        <span className=" material-symbols-outlined scale-[0.80]">{icon}</span>
        {item}
      </button>
    );
  } else {
    return (
      <button
        disabled={disabled}
        className=" flex items-center gap-1 px-3 py-1 text-sm capitalize text-text--primary hover:bg-white/5"
        onClick={() => onClick(item)}
      >
        <span
          onClick={() => onClick(item)}
          className=" material-symbols-outlined text-lg font-light"
        >
          {icon}
        </span>
        {item}
      </button>
    );
  }
}
export default SelectItem;
