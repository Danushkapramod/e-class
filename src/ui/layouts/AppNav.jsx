import { useDispatch } from 'react-redux';
import { ClassFilter, ClassSort } from '../../class/ClassTableOperations';
import { TeacherFilter } from '../../teacher/TeacherTableOperations';
import Button from '../components/Button';
import SearchField from '../components/SearchField';

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
      className="border-border-1 shadow-neumorphism z-40 mt-2 flex items-center justify-between rounded
                   border  bg-bg--primary-300 px-1 py-1  text-text--primary"
    >
      <SearchField className={'!shadow-sm'} onChange={onChange} />
      <div className="flex gap-2 ">
        <Filter />
        {type === 'class' && <ClassSort />}
        <Button
          className={'!border-bg--primary-100 !text-text--primary !shadow-sm'}
          onClick={handleView}
          type="smallSecondery"
          icon={view}
        />
      </div>
    </div>
  );
}

export default AppNav;
