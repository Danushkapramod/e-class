import { Outlet } from "react-router-dom";
import Button from "../ui/components/Button";
import { useSelector } from "react-redux";
import AppNav from "../ui/layouts/AppNav";
import { setTableView } from "./teacherSlice";

function TeacherLayout() {
  const { tableView } = useSelector((store) => store.teacher);

  const { root } = useSelector((store) => store.global);
  return (
    <div className=" ">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-end">
          <div className=" text-2xl opacity-70">Teachers/</div>
          <span className=" text-base font-normal uppercase opacity-70">
            {root}
          </span>
        </div>
        <Button to="new" type="primary" icon="add">
          Add Teacher
        </Button>
      </div>
      <AppNav
        type="teacher"
        setTableView={setTableView}
        tableView={tableView}
      />
      <Outlet />
    </div>
  );
}

export default TeacherLayout;
