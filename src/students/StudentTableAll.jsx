import { useContext, useMemo } from 'react';
import { Button } from '../ui/components/ButtonNew';
import DataLoader from '../ui/components/DataLoader';
import SelectItem from '../ui/components/SelectItem';
import { StdTableContext, TableProvider } from './TableContext';
import { StudentSearch } from './StudentTableOperations';
import { useAllStudents } from './useStudents';
import Checkbox from '../ui/components/Checkbox';
import { useQuery } from '@tanstack/react-query';
import useHide from '../user/useHide';
import { getStudentsCount } from '../services/apiStudents';
import useStudentRow from './useStudentRow';
import HoverInfo from '../ui/components/HoverInfo';
import StatusForm from './StatusLabelEditForm';
import PagginationNew from '../ui/components/PagginationNew';
import { useNavigate, useParams } from 'react-router-dom';
import usePagginationNew from '../ui/hookComponents/usePagginationNew';

export default function StudentTableAll() {
  return (
    <TableProvider>
      <div className=" flex min-w-[40rem]  grow flex-col shadow-md">
        <div
          className="flex w-full flex-col justify-between gap-2 
           rounded-t bg-bg--primary-200 pb-2 pt-3 text-text--primary"
        >
          <TableNav />
          <StatusForm />
          <Operation />
        </div>
        <Table />
      </div>
    </TableProvider>
  );
}
const statusOptions = [['payment labels']];

function TableNav() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updatePaginationQuery1, state, updateStatusForm } = useContext(StdTableContext);

  const { page, limit, setPage } = usePagginationNew({
    setFun: updatePaginationQuery1,
  });

  const { data: studentsCount } = useQuery({
    queryKey: ['studentCount', id],
    queryFn: () => getStudentsCount(id),
  });

  function onSelectHandler(selected) {
    if (selected === 'payment labels') {
      updateStatusForm(!state.statusFormIsOpen);
    }
  }
  function onAddStudentHandler() {
    navigate('new');
  }
  return (
    <div className=" flex items-end justify-between px-2">
      <StudentSearch />
      <div className=" flex items-end gap-2">
        <PagginationNew page={page} limit={limit} setPage={setPage} total={studentsCount} />
        <Button label="ADD STUDENT" onClick={onAddStudentHandler} size="sm" />
        <SelectItem
          btn={
            <span className="material-symbols-outlined mx-1 flex scale-95 items-end p-1 transition-all duration-100 active:rotate-90">
              settings
            </span>
          }
          items={statusOptions}
          onClick={onSelectHandler}
        />
      </div>
    </div>
  );
}

export function Operation() {
  const { state, updateSelectedList } = useContext(StdTableContext);
  const { students } = useAllStudents();
  const { isPending: isDeleting, mutate: hideMany } = useHide('students');

  function onDeletsHandler() {
    hideMany({ endPoit: 'students/hide', idList: state.selectedList });
  }
  function onSelect() {
    const allIdList = students?.map((std) => std._id);
    updateSelectedList('addAll', allIdList);
  }
  function onUnSelect() {
    updateSelectedList('clear');
  }
  function onAddClass() {}
  if (!state.selectedList?.length > 0) return null;
  return (
    <div className="flex h-12 w-full items-center gap-1.5 px-4">
      <div className=" mr-2">
        <Checkbox width="18px" id="stdAllSelect" trueCall={onSelect} falseCall={onUnSelect} />
      </div>
      <Button
        className="!border-border-2"
        size="sm"
        variant="outline"
        disabled={isDeleting}
        icon="delete"
        onClick={onAddClass}
        label="ADD CLASS"
      />
      <Button
        className="!border-border-2"
        size="sm"
        variant="outline"
        disabled={isDeleting}
        icon="delete"
        onClick={onDeletsHandler}
        label="DELETE"
      />
      <div className=" mb-1 ml-2 self-end text-sm text-text--secondery">
        {state.selectedList.length.toString().padStart(2, '0')}
        <span> selected</span>
      </div>

      <button
        onClick={onUnSelect}
        className=" material-symbols-outlined ml-auto flex aspect-square h-8 
        items-center justify-center rounded-full bg-bg--primary-300 text-lg"
      >
        close
      </button>
    </div>
  );
}

function Table() {
  const { students, isLoading, error } = useAllStudents();
  const rowsHtml = useMemo(() => {
    return (
      <DataLoader
        data={students?.map((student, index) => {
          return <TableRow key={student.studentId} student={{ ...student, index }} />;
        })}
        isLoading={isLoading}
        error={error}
        options={{ colSpan: '7' }}
      />
    );
  }, [error, isLoading, students]);

  if (students?.length < 1) return null;
  return (
    <div className="fle flex-col border-t border-border-2">
      <div className="z-0 max-h-[calc(100vh-18.75rem)] overflow-auto ">
        <table className="text-smbg-bg--primary-200 w-full bg-bg--primary-200">
          <thead>
            <tr
              className="sticky -top-[1px] z-10 border-b border-b-bg--primary-100 
              bg-bg--primary-200 py-2 text-base font-medium transition-all duration-100"
            >
              <th className=" w-1 px-4  text-start text-text--muted "></th>
              <th className=" w-1 text-start text-text--muted ">#</th>
              <th className="max-w-[130px] py-2 text-start ">ID</th>
              <th className=" text-start ">Student name</th>
              <th className=" text-start ">Phone</th>
              <th className="py-2 text-start"></th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-bg--primary-100">{rowsHtml}</tbody>
        </table>
      </div>
      <div className="h-4 w-full rounded-b bg-bg--primary-200"></div>
    </div>
  );
}

function TableRow({ student }) {
  const { isSelected, onAddhandler, onRemoveHandler, onSelectHandler, isUpdating, isDeleting } =
    useStudentRow(student);

  const { name, phone, studentId, index, _id } = student;
  const bgColor = isSelected ? 'bg-hilight-1' : null;
  return (
    <tr className={`text-sm ${bgColor} `}>
      <td className="relative px-4">
        <div className=" flex items-center justify-center px-2">
          <label htmlFor={_id} className="ho absolute rounded-full p-3 hover:bg-hover-1">
            <Checkbox
              id={_id}
              trueCall={onAddhandler}
              falseCall={onRemoveHandler}
              _checked={isSelected}
            />
          </label>
        </div>
      </td>
      <td className=" py-3 pr-6 text-text--muted ">{(index + 1).toString().padStart(2, '0')}</td>
      <td className="py-3">{studentId}</td>
      <td className="relative py-3">{name}</td>
      <td className="relative py-3">{phone}</td>
      <td className="w-1">
        <div className=" flex w-24 items-center justify-between">
          <SelectItem
            btn={
              <span className=" material-symbols-outlined flex scale-[80%] items-center">
                more_vert
              </span>
            }
            disabled={isUpdating || isDeleting}
            onClick={onSelectHandler}
            items={[
              ['update', 'edit'],
              ['delete', 'delete'],
            ]}
          />
          <Info student={student} />
        </div>
      </td>
    </tr>
  );
}

function Info({ student }) {
  const { studentId, status, statusChangedAt, createdAt } = student;
  return (
    <HoverInfo>
      <HoverInfo.Icon>
        <span className=" material-symbols-outlined z-40 mr-2 cursor-default px-1 text-xl font-light text-text--muted">
          help
        </span>
      </HoverInfo.Icon>
      <HoverInfo.Content>
        <div className="absolute right-4 z-20  w-60  max-w-56 rounded bg-bg--primary-500 p-4 text-sm text-text--primary">
          <div className=" flex flex-col leading-loose">
            <div className="flex justify-between">
              <p className="basis-[60%]">Student ID</p>: <p className="w-full pl-2"> {studentId}</p>
            </div>
            <div className="flex justify-between">
              <p className=" basis-[60%]">Joined</p>:
              <p className="w-full pl-2">{new Date(createdAt).toLocaleDateString()}</p>{' '}
            </div>
            <div className="flex  justify-between">
              <p className="basis-[60%]">Status</p>:
              <p className="w-full pl-2 capitalize"> {status}</p>
            </div>
            <div className="flex  justify-between">
              <p className="basis-[60%] ">Status At</p>:{' '}
              <p className="w-full pl-2">
                {statusChangedAt ? new Date(statusChangedAt).toLocaleString() : '----------'}
              </p>
            </div>
          </div>
        </div>
      </HoverInfo.Content>
    </HoverInfo>
  );
}
