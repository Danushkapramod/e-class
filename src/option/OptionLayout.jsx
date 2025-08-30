import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function OptionLayout() {
  const { root } = useSelector((store) => store.global);
  return (
    <div className=" ">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-end">
          <div className=" text-2xl placeholder:opacity-70">Options</div>
          <span className=" text-base font-normal uppercase opacity-70">{root}</span>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default OptionLayout;
