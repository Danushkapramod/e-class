import { useContext, useEffect } from 'react';
import { Button } from '../ui/components/ButtonNew';
import DataLoader from '../ui/components/DataLoader';
import Exports from '../ui/components/Exports';
import SelectItem from '../ui/components/SelectItem';
import { StdTableContext, TableProvider } from './TableContext';
import { StudentFilter, StudentSearch } from './StudentTableOperations';
import { useStudentsInTeacher } from './useStudents';
import Checkbox from '../ui/components/Checkbox';
import useAppSetings from '../user/useAppSetings';
import useHide from '../user/useHide';
import { useQuery } from '@tanstack/react-query';
import { getSpecificDaysInMonth } from '../utils/formateDates&Times';
import useAttendances from './useAttendances';
import useClasses from '../class/useClasses';
import useCreateAttendance from './useCreateAttendance';
import toast from 'react-hot-toast';
import { CircleSpinner } from 'react-spinners-kit';
import useStudentRow from './useStudentRow';
import HoverInfo from '../ui/components/HoverInfo';
import { getStudentsCount } from '../services/apiStudents';
import PagginationNew from '../ui/components/PagginationNew';
import usePagginationNew from '../ui/hookComponents/usePagginationNew';
import { useParams } from 'react-router-dom';
import { useUpdateStatus } from './useUpdateStatus';

export default function StudentTable() {
  return (
    <TableProvider>
      <div className="flex min-w-[40rem] grow flex-col text-text--primary shadow-md">
        <div className="flex flex-col gap-2 rounded-t bg-bg--primary-200 pb-2 pt-3">
          <TableNav />
          <Operation />
        </div>
        <Table />
      </div>
    </TableProvider>
  );
}

function TableNav() {
  const { id } = useParams();
  const { data: studentsCount } = useQuery({
    queryKey: ['studentCount', id],
    queryFn: () => getStudentsCount(id),
  });

  const { setClassData, updatePaginationQuery } = useContext(StdTableContext);
  const { page, limit, setPage } = usePagginationNew({ setFun: updatePaginationQuery });
  const { classes } = useClasses();
  const classData = classes?.find((classData) => classData._id === id);

  useEffect(() => {
    if (classes) setClassData(classData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classData, classes]);

  return (
    <div className=" flex items-end justify-between px-2">
      <div className=" flex items-end gap-4">
        <StudentSearch />
        <div className=" text-sm">{new Date().toDateString()}</div>
      </div>
      <div className=" flex gap-2">
        <PagginationNew page={page} limit={limit} setPage={setPage} total={studentsCount} />
        <Exports
          classId={id}
          size="small"
          category="student"
          btnType="smallSecondery"
          items={[
            ['Payments Sheet', 'edit'],
            ['Export to PDF', 'wysiwyg'],
            ['Export to CSV', 'delete'],
          ]}
        />
        <StudentFilter />
      </div>
    </div>
  );
}

export function Operation() {
  const { id: classId } = useParams();
  const { state, updateSelectedList } = useContext(StdTableContext);
  const { students } = useStudentsInTeacher();
  const { isPending: isDeleting, mutate: hideMany } = useHide('students');
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateStatus();

  function onDeletsHandler() {
    hideMany({ endPoit: 'students/hide', idList: state.selectedList });
  }
  function onUpdateStatusHandler(selected) {
    updateStatus({
      studentIds: state.selectedList,
      newData: { status: selected },
      classId: classId,
    });
  }
  function onSelect() {
    const allIdList = students?.map((std) => std._id);
    updateSelectedList('addAll', allIdList);
  }
  function onUnSelect() {
    updateSelectedList('clear');
  }

  if (!state.selectedList?.length > 0) return null;
  return (
    <div className="flex h-12 w-full items-center gap-1.5 px-4">
      <div className=" mr-2">
        <Checkbox width="18px" id="stdAllSelect" trueCall={onSelect} falseCall={onUnSelect} />
      </div>
      <Exports
        classId={classId}
        selected={state.selectedList}
        size="small"
        category="student"
        btnType="smallSecondery"
        items={[
          ['Payments Sheet', 'edit'],
          ['Export to PDF', 'wysiwyg'],
          ['Export to CSV', 'delete'],
        ]}
      />
      <SelectItem
        buttonSize="sm"
        btnTitle="STATUS"
        disabled={isUpdating}
        onClick={onUpdateStatusHandler}
        icon="currency_exchange"
        items={state.statusOptions?.map((option) => [option.option])}
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
        items-center justify-center rounded-full bg-bg--primary-300  text-lg"
      >
        close
      </button>
    </div>
  );
}

function DaysHeder() {
  const { state } = useContext(StdTableContext);
  const classDay = state.classData.day?.charAt(0).toUpperCase() + state.classData.day?.slice(1);
  const days = classDay
    ? getSpecificDaysInMonth(classDay).map((day) => day.toString().split(' ')[2])
    : [];

  return (
    <ul className=" flex text-sm font-normal">
      {days.map((day) => (
        <li key={day} className="w-10 text-center">
          {day}
        </li>
      ))}
    </ul>
  );
}

function Table() {
  const { updateStatusOptions } = useContext(StdTableContext);
  const { data, isSuccess: appSetingsIsSuccess } = useAppSetings();
  const { students, isLoading, error } = useStudentsInTeacher();
  const { data: classAttendances } = useAttendances();

  useEffect(() => {
    if (appSetingsIsSuccess) updateStatusOptions(data?.students.statusOptions || {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appSetingsIsSuccess, data?.students.statusOptions]);

  if (students?.length < 1) {
    return '';
  }
  return (
    <div className=" fle flex-col border-t border-border-2">
      <div className="z-0 max-h-[calc(100vh-18.75rem)] overflow-auto ">
        <table className=" text-smbg-bg--primary-200 w-full bg-bg--primary-200">
          <thead>
            <tr
              className="sticky -top-[1px] z-10 border-b border-b-bg--primary-100 
              bg-bg--primary-200 py-2 text-base font-medium transition-all duration-100"
            >
              <th className=" w-1 px-4 text-start text-text--muted"></th>
              <th className=" w-1 text-start text-text--muted">#</th>
              <th className="max-w-[130px] py-2 text-start ">ID</th>
              <th className="text-start">Student name</th>
              <th className="text-start">Phone</th>
              <th className=" flex h-10 items-center gap-10 ">
                <DaysHeder />
                Payment
              </th>
              <th className="py-2 text-start"></th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-bg--primary-100">
            <DataLoader
              data={students?.map((student, index) => {
                const attendances = classAttendances
                  ?.filter(({ studentId }) => studentId === student._id)
                  .map(({ date, isPresent }) => {
                    return {
                      date: new Date(date).getDate().toString().padStart(2, '0'),
                      isPresent,
                    };
                  });
                return (
                  <TableRow key={student.studentId} student={{ ...student, index, attendances }} />
                );
              })}
              isLoading={isLoading}
              error={error}
              options={{ colSpan: '7' }}
            />
          </tbody>
        </table>
      </div>
      <div className="h-4 w-full rounded-b bg-bg--primary-200"></div>
    </div>
  );
}

function DaysChexboxes({ id, attendances }) {
  const { state } = useContext(StdTableContext);
  const classDay = state.classData.day?.charAt(0).toUpperCase() + state.classData.day?.slice(1);
  const days = classDay ? getSpecificDaysInMonth(classDay) : [];

  return (
    <ul className=" flex items-center">
      {days.map((date) => {
        const isPresent = attendances?.some(
          (attendance) => attendance.date === date.toString().split(' ')[2] && attendance.isPresent
        );
        return (
          <CheckBoxWithSpinner date={date} isPresent={isPresent} id={id} key={`${id}-${date}`} />
        );
      })}
    </ul>
  );
}

function CheckBoxWithSpinner({ isPresent, id, date }) {
  const { state } = useContext(StdTableContext);
  const { mutate: create, isPending: isCreating } = useCreateAttendance();

  const isActive =
    date.toString().split(' ')[2] === new Date().getDate().toString().padStart(2, '0');
  function onCreate() {
    if (isActive) {
      const attendanceBody = {
        studentId: id,
        classId: state.classData._id,
        isPresent: true,
      };
      if (!isPresent) create(attendanceBody);
    } else {
      toast.error("Only today's attendance can be update!");
    }
  }
  return (
    <li className={`flex w-10 justify-center ${!isActive && !isPresent && 'opacity-50'}`}>
      {!isCreating ? (
        <Checkbox
          trueCall={onCreate}
          _checked={isPresent}
          disabled={isCreating}
          id={`${id}-${date}`}
        />
      ) : (
        <CircleSpinner size={13} />
      )}
    </li>
  );
}

function TableRow({ student }) {
  const {
    ref1,
    isEditing,
    setIsEditing,
    formState,
    setFormState,
    isSelected,
    onStatusHandler,
    onSubmitHandler,
    onAddhandler,
    onRemoveHandler,
    onSelectHandler,
    isUpdating,
    isDeleting,
    state,
  } = useStudentRow(student);

  const { name, phone, class: classes, studentId, attendances, index, _id } = student;
  const status = classes?.find((classData) => classData.classId === state.classData._id)?.status;
  const stdStatus = state.statusOptions?.find(({ option }) => option === status);
  const bgColor = isSelected ? 'bg-hilight-1' : null;
  return (
    <tr className={`text-sm ${bgColor}`}>
      <td className="relative px-4">
        <div className=" flex items-center justify-center px-2">
          <label htmlFor={_id} className=" absolute rounded-full p-3 hover:bg-hover-1">
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
      <td className="relative py-3 ">
        {isEditing ? (
          <div className=" flex items-center">
            <input
              ref={ref1}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              className=" w-max rounded border-border-1 bg-bg--primary-300 px-2 py-1.5 outline-none"
              type="text"
              value={formState.name}
            />
          </div>
        ) : (
          name
        )}
      </td>
      <td className="relative py-3 ">
        {isEditing ? (
          <div className="flex  items-center">
            <input
              onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
              className=" w-max rounded border border-border-1
               bg-bg--primary-300 px-2 py-1.5 outline-none"
              type="text"
              value={formState.phone}
            />
          </div>
        ) : (
          phone
        )}
      </td>
      <td className="w-[32rem]">
        <div className=" flex items-center  gap-8">
          <DaysChexboxes id={_id} attendances={attendances} />
          <div className=" flex min-w-28 items-center gap-2">
            <div
              style={
                stdStatus?.color
                  ? { backgroundColor: stdStatus.color }
                  : {
                      border: '1px solid',
                      borderColor: 'var(--color-border-2)',
                      color: 'var(--color-text-primary)',
                    }
              }
              className="w-full justify-between rounded-full px-3 py-1 
            text-center text-xs capitalize tracking-wider text-slate-100"
            >
              {status}
            </div>
            <SelectItem
              disabled={isUpdating || isDeleting}
              btn={
                <span className="material-symbols-outlined px-1 text-lg text-text--muted">
                  currency_exchange
                </span>
              }
              onClick={onStatusHandler}
              items={state.statusOptions
                ?.filter((option) => option.option !== status)
                .map((option) => [option.option])}
            />
          </div>
        </div>
      </td>
      <td className=" w-1">
        <div className=" flex w-24 items-center justify-between">
          {!isEditing ? (
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
          ) : (
            <Button onClick={onSubmitHandler} type="sm" label="SAVE" />
          )}
          {!isEditing ? (
            <Info student={student} />
          ) : (
            <button
              onClick={() => {
                setIsEditing(false);
              }}
              className=" material-symbols-outlined mr-3 flex aspect-square h-6
               items-center justify-center rounded-full bg-bg--primary-300 text-lg"
            >
              close
            </button>
          )}
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
