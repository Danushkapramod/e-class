import { useState } from 'react';

function ButtonList({ data, onClick }) {
  const [active, setActive] = useState(data[0]);
  return (
    <div
      onClick={onClick}
      className=" rounded  border border-bg--primary-100 bg-black/5 px-0.5 py-0.5 text-sm shadow-sm"
    >
      {data.map((item, index) => {
        const isActive = item.label === active.label;
        return (
          <button
            id={item.label}
            onClick={() => {
              setActive(item);
              onClick(item.label);
            }}
            className={`${isActive ? ' bg-bg--secondery-1 !text-slate-200' : ''} rounded px-2.5 py-1   transition-all duration-200`}
            key={index}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export default ButtonList;
