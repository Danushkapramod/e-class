import { useDispatch } from 'react-redux';
import { ClassFilter, ClassSort } from '../../class/ClassTableOperations';
import { TeacherFilter } from '../../teacher/TeacherTableOperations';
import SearchField from '../components/SearchField';
import { Button } from '../components/ButtonNew';

function AppNav({ type, tableView, setTableView, onChange }) {
  const dispatch = useDispatch();
  let Filter, view;
  if (type === 'class') Filter = ClassFilter;
  if (type === 'teacher') Filter = TeacherFilter;

  if (tableView === 'card') view = 'grid_view';
  if (tableView === 'list') view = 'format_list_bulleted';

  function handleView() {
    if (tableView === 'list') dispatch(setTableView('card'));
    if (tableView === 'card') dispatch(setTableView('list'));
  }
  return (
    <div
      className=" z-40 mt-2 flex items-center justify-between rounded border border-border-1 bg-bg--primary-200
                    px-[6px] py-[6px] text-text--primary shadow-neumorphism"
    >
      <SearchField className="!shadow-sm" onChange={onChange} />
      <div className="flex items-center gap-2">
        <Filter />
        {type === 'class' && <ClassSort />}

        <Button onClick={handleView} variant="outline" size="sm" icon={view} />
      </div>
    </div>
  );
}

export default AppNav;
