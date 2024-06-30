import { useState } from "react";

// eslint-disable-next-line react/prop-types
function Alert({ type, children }) {
  const [open, setOpen] = useState(true);

  const timerId = setTimeout(() => {
    setOpen(false);
    return () => clearTimeout(timerId);
  }, 3000);

  let icon;
  let theme;

  const succes = ` border-green-700 bg-green-900 text-white`;
  const error = ` border-red-700 bg-red-700 text-white `;
  const warning = ` border-yellow-700 bg-yellow-900 text-white`;

  if (type === "succes") {
    icon = "task_alt";
    theme = succes;
  }
  if (type === "error") {
    icon = "error";
    theme = error;
  }
  if (type === "warning") {
    icon = "warning";
    theme = warning;
  }

  return (
    <div
      className={`${open ? " animate-alert-in" : "animate-disappearr"}   
                   flex max-w-[40rem]  items-center rounded 
                   border px-6 py-3 font-light 
                  
                  ${theme}`}
    >
      <span className=" material-symbols-outlined pr-3">{icon}</span>
      {children}
      <button onClick={() => setOpen(false)} className="flex items-center ">
        <span className=" material-symbols-outlined ml-3">close</span>
      </button>
    </div>
  );
}

export default Alert;
