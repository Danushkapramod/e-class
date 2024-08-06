import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Exports from '../ui/components/Exports';
import { Button } from '../ui/components/ButtonNew';

function TeacherLayout() {
  const { root } = useSelector((store) => store.global);

  return (
    <div className=" ">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-end">
          <div className=" text-2xl text-text--secondery">Teachers/</div>
          <span className=" text-base font-normal uppercase opacity-70">{root}</span>
        </div>
        <div className=" flex gap-2">
          <Exports category="teacher" buttonSize="base" />
          <Button to="new" icon="add" label="ADD TEACHER" />
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default TeacherLayout;
