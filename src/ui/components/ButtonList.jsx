import { useState } from "react";

function ButtonList({ data, onClick }) {
  const [active, setActive] = useState(data[0]);
  return (
    <div
      onClick={onClick}
      className=" rounded border border-slate-800 bg-white/5 px-0.5 py-0.5 text-sm shadow-sm"
    >
      {data.map((item, index) => {
        const isActive = item.label === active.label;
        return (
          <button
            id={item.label}
            onClick={() => setActive(item)}
            className={`${isActive ? " bg-blue-600" : ""} rounded px-2.5 py-1   transition-all duration-200`}
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
