import { useDispatch } from "react-redux";
import { ClassFilter, ClassSort } from "../../class/ClassTableOperations";
import { TeacherFilter } from "../../teacher/TeacherTableOperations";
import Button from "../components/Button";
import SearchField from "../components/SearchField";

function AppNav({ type, tableView, setTableView }) {
  const dispatch = useDispatch();
  let Filter, view;
  if (type === "class") Filter = ClassFilter;
  if (type === "teacher") Filter = TeacherFilter;

  if (tableView === "card") view = "grid_view";
  if (tableView === "list") view = "format_list_bulleted";

  function handleView() {
    if (tableView === "list") dispatch(setTableView("card"));
    if (tableView === "card") dispatch(setTableView("list"));
  }
  return (
    <div
      className="z-40 mt-4 flex items-center justify-between  rounded
                    border border-gray-700 px-2   py-2 "
    >
      <SearchField />
      <div className="flex gap-2 ">
        <Filter />
        {type === "class" && <ClassSort />}
        <Button onClick={handleView} type="smallSecondery" icon={view} />
      </div>
    </div>
  );
}

export default AppNav;
