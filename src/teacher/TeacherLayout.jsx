import { Outlet } from "react-router-dom";
import Button from "../ui/components/Button";
import { useSelector } from "react-redux";

function TeacherLayout() {
  const { root } = useSelector((store) => store.global);

  return (
    <div className=" ">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-end">
          <div className=" text-text--secondery text-2xl">Teachers/</div>
          <span className=" text-base font-normal uppercase opacity-70">
            {root}
          </span>
        </div>
        <Button to="new" type="primary" icon="add">
          Add Teacher
        </Button>
      </div>
      <Outlet />
    </div>
  );
}

export default TeacherLayout;
