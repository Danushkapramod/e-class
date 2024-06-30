import { Outlet } from "react-router-dom";
import Button from "../ui/components/Button";
import { useSelector } from "react-redux";
import AppNav from "../ui/layouts/AppNav";
import { setTableView } from "./classSlice";

function ClassLayout() {
  const { tableView } = useSelector((store) => store.class);
  const { root } = useSelector((store) => store.global);

  return (
    <div className=" ">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-end">
          <div className=" text-2xl opacity-70">Classes/</div>
          <span className=" text-base font-normal uppercase opacity-70">
            {root}
          </span>
        </div>
        <Button to="new" type="primary" icon="add">
          Add class
        </Button>
      </div>
      <AppNav type="class" setTableView={setTableView} tableView={tableView} />
      <Outlet />
    </div>
  );
}

export default ClassLayout;
