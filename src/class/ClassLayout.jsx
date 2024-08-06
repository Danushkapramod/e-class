import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Exports from '../ui/components/Exports';
import { Button } from '../ui/components/ButtonNew';

function ClassLayout() {
  const { root } = useSelector((store) => store.global);

  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-end">
          <div className=" text-2xl text-text--secondery">Classes/</div>
          <span className=" text-base font-normal uppercase opacity-70">{root}</span>
        </div>

        <div className=" flex items-end gap-2">
          <Exports category="class" buttonSize="base" />
          <Button to="new" icon="add" label="ADD CLASS" />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default ClassLayout;
