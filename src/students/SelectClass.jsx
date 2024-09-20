import { useDispatch } from 'react-redux';
import { setPagginationQuery } from '../class/classSlice';
import { getClassesCount } from '../services/apiClasses';
import { Button } from '../ui/components/ButtonNew';
import { formatLocalTime } from '../utils/formateDates&Times';
import DataLoader from '../ui/components/DataLoader';
import { useQuery } from '@tanstack/react-query';
import { ClassFilter, ClassSearch, ClassSort } from '../class/ClassTableOperations';
import usePagginationNew from '../ui/hookComponents/usePagginationNew';
import PagginationNew from '../ui/components/PagginationNew';
import useClasses from '../class/useClasses';
import AppNav from '../ui/layouts/AppNav';
import Checkbox from '../ui/components/Checkbox';

export default function SelectClass({ selected, setSelected, close }) {
  const { classes, isLoading, error } = useClasses();

  return (
    <div className=" flex h-full flex-col">
      <Nav />
      <div className="mt-2 overflow-hidden rounded border border-bg--primary-200 shadow">
        <table className="w-full px-2">
          <thead>
            <tr className="  text-text--secondery">
              <th className="  px-2 "></th>
              <th className=" rounded "></th>
              <th className="  px-2 py-3 text-left">Subject</th>
              <th className="  px-2 text-left">Teacher</th>
              <th className="  px-2 text-left">Grade</th>
              <th className="  px-2 text-left">Hall</th>
              <th className="  px-2 text-left">Day</th>
              <th className="  px-2 text-left">Time</th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-border-4 bg-bg--primary-200">
            <DataLoader
              data={classes?.map((classData) => {
                return (
                  <TableRow
                    key={classData._id}
                    classData={classData}
                    selected={selected}
                    setSelected={setSelected}
                  />
                );
              })}
              isLoading={isLoading}
              error={error}
              options={{ colSpan: '8' }}
            />
          </tbody>
        </table>
      </div>
      <div className="mt-auto flex justify-end gap-2 p-1">
        <Button
          onClick={() => {
            close(false);
          }}
          variant="outline"
          label="Close"
        />
        <div className={`flex gap-2 ${!selected.length && 'opacity-50'}`}>
          <Button
            disabled={!selected.length}
            onClick={() => setSelected([])}
            variant="outline"
            label="Clear"
          />
          <Button onClick={() => close(false)} disabled={!selected.length} label="Select" />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  const dispatch = useDispatch();
  const { setPage, page, limit, setLimit } = usePagginationNew({
    setFun: (query) => dispatch(setPagginationQuery(query)),
  });

  const { data: classesCount } = useQuery({
    queryKey: ['classesCount'],
    queryFn: () => getClassesCount(),
  });

  return (
    <AppNav>
      <AppNav.Left>
        <ClassSearch />
        <p>Select class</p>
      </AppNav.Left>
      <AppNav.Right>
        <PagginationNew
          setPage={setPage}
          page={page}
          setLimit={setLimit}
          limit={limit}
          total={classesCount}
        />
        <ClassFilter />
        <ClassSort />
      </AppNav.Right>
    </AppNav>
  );
}

function TableRow({ selected, setSelected, classData }) {
  const { _id, teacher, subject, avatar, hall, startTime, grade, day } = classData;

  const handleSelect = () => {
    const items = selected.includes(classData)
      ? selected.filter((item) => item._id !== _id)
      : [...selected, classData];
    setSelected(items);
  };

  const isSelected = selected.find(({ _id }) => _id === classData._id);
  return (
    <tr
      onClick={handleSelect}
      className={` cursor-pointer select-none ${isSelected && 'bg-hilight-1'}`}
    >
      <td className="pl-4">
        <Checkbox _checked={isSelected} />
      </td>
      <td>
        <div className="flex h-9 w-9 min-w-9 items-center justify-center overflow-hidden rounded-full ">
          <img className="h-full object-cover" src={avatar} alt="" />
        </div>
      </td>
      <td className=" max-w-38 px-2 py-3 capitalize">{subject}</td>
      <td className=" max-w-44  px-2  py-3 capitalize">{teacher?.name}</td>
      <td className=" px-2 py-3">{grade}</td>
      <td className=" px-2 py-3">{hall}</td>
      <td className="  px-2 py-3 capitalize">{day}</td>
      <td className=" px-2 py-3">{formatLocalTime(startTime)}</td>
    </tr>
  );
}
