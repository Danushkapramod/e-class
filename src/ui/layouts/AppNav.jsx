function AppNav({ children }) {
  return (
    <div
      className="z-40 mt-2 flex items-center rounded border border-border-1 
      bg-bg--primary-200 px-[6px] py-[5px] text-text--primary shadow-neumorphism"
    >
      {children}
    </div>
  );
}

function Right({ children }) {
  return <div className="flex w-full justify-end gap-2">{children}</div>;
}
function Left({ children }) {
  return <div className="flex w-full justify-start gap-2">{children}</div>;
}
AppNav.Right = Right;
AppNav.Left = Left;

export default AppNav;
