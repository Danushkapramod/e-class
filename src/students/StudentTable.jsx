import { useContext, useEffect, useRef, useState } from 'react';
import { Form, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/components/ButtonNew';
import DataLoader from '../ui/components/DataLoader';
import Exports from '../ui/components/Exports';
import Pagination from '../ui/components/Pagination';
import SelectItem from '../ui/components/SelectItem';
import Tooltip from '../ui/components/Potral';
import { StdTableContext, TableProvider } from './TableContext';
import { StudentFilter, StudentSearch } from './StudentTableOperations';
import useCreateStudent from './useCreateStudent';
import useDeleteStudent from './useDeleteStudent';
import useUpdateStudent, { useUpdateManyStudents } from './useUpdateStudent';
import { useStudentsInTeacher } from './useStudents';
import useOColor from '../utils/getOColor';
import { getStudentsCount } from '../services/apiStudents';
import Checkbox from '../ui/components/Checkbox';
import useAppSetings from '../user/useAppSetings';
import useHide from '../user/useHide';

// const statusOptions = [
//   ['paid', 'paid'],
//   ['unpaid', 'pending'],
//   ['half', 'side_navigation'],
//   ['free', 'published_with_changes'],
// ];

export default function StudentTable() {
  return (
    <TableProvider>
      <div className=" flex min-w-[40rem]  grow flex-col shadow-md">
        <div
          className="flex w-full  flex-col justify-between gap-2 
           rounded-t bg-bg--primary-200 pb-2 pt-3 text-text--primary"
        >
          <TableNav />
          <StdForm />
          <Operation />
        </div>
        <Table />
      </div>
    </TableProvider>
  );
}

function TableNav() {
  const { id } = useParams();
  const { state, updateFormState, updatePaginationQuery } = useContext(StdTableContext);
  return (
    <div className=" flex items-end justify-between px-2">
      <StudentSearch />
      <div className=" flex gap-2">
        <StudentsOnTable />
        <Pagination
          type="simple"
          url={false}
          limit={10}
          set={updatePaginationQuery}
          getTotal={() => getStudentsCount(id)}
        />
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
        <Button
          label="ADD STUDENT"
          onClick={() => updateFormState(!state.addFormIsOpen)}
          size="sm"
        />
      </div>
    </div>
  );
}

export function Operation() {
  const { id: classId } = useParams();
  const { state, updateSelectedList } = useContext(StdTableContext);
  const { students } = useStudentsInTeacher(
    [state.searchQuery, state.filterQuery, state.paginationQuery],
    classId
  );
  const { isPending: isDeleting, mutate: hideMany } = useHide('students');
  const { isUpdating, mutate: updateMany } = useUpdateManyStudents();

  function onDeletsHandler() {
    hideMany({ endPoit: 'students/hide', idList: state.selectedList });
  }
  function onUpdateStatusHandler(selected) {
    updateMany({ studentIds: state.selectedList, newData: { status: selected } });
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

function StudentsOnTable() {
  const { state } = useContext(StdTableContext);
  return <div className=" flex items-end px-2 text-sm">{`${state.totalStdOntable} results`}</div>;
}

function Table() {
  const { id: classId } = useParams();
  const { state, updateStatusOptions } = useContext(StdTableContext);
  const { data, isSuccess: appSetingsIsSuccess } = useAppSetings();
  const { students, isLoading, error } = useStudentsInTeacher(
    [state.searchQuery, state.filterQuery, state.paginationQuery],
    classId
  );

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
              <th className=" w-1 px-4 py-2 text-start text-text--muted "></th>
              <th className=" w-1  py-2 text-start text-text--muted ">#</th>
              <th className="max-w-[130px] py-2 text-start ">ID</th>
              <th className=" py-2 text-start ">Student name</th>
              <th className="py-2 text-start ">Phone</th>
              <th className=" py-2 text-start ">Status</th>
              <th className="py-2 text-start"></th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-bg--primary-100">
            <DataLoader
              data={students?.map((student, index) => {
                return <TableRow key={student.studentId} student={{ ...student, index }} />;
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

function TableRow({ student }) {
  const theam = useOColor();
  const { name, phone, status, studentId, index, _id } = student;
  const { updateSelectedList, state } = useContext(StdTableContext);
  const { isUpdating, isSuccess, mutate, status: _status } = useUpdateStudent();
  const { isDeleting, mutate: deleteStudent, status: __status } = useDeleteStudent();
  const [isEditing, setIsEditing] = useState();
  const [formState, setFormState] = useState({ name, phone });
  const [isSelected, setIsSelected] = useState();
  const ref1 = useRef();

  useEffect(() => {
    setIsSelected(state.selectedList?.includes(_id));
  }, [state.selectedList, _id]);

  useEffect(() => {
    if (isEditing) ref1.current.focus();
  }, [isEditing]);

  useEffect(() => {
    if (isSuccess) setIsEditing(false);
  }, [isSuccess]);

  function onStatusHandler(selected) {
    mutate({ studentId: _id, newData: { status: selected } });
  }
  function onSubmitHandler() {
    mutate({
      studentId: _id,
      newData: {
        name: formState.name,
        phone: formState.phone,
      },
    });
  }

  function onAddhandler() {
    updateSelectedList('add', _id);
  }

  function onRemoveHandler() {
    updateSelectedList('remove', _id);
  }

  function onSelectHandler(selected) {
    if (selected === 'update') {
      setIsEditing(!isEditing);
    }

    if (selected === 'delete') {
      deleteStudent(_id);
    }
  }

  const stdStatus = state.statusOptions?.find(({ option }) => option === status);
  const bgColor = isSelected ? (theam ? 'bg-black/10' : 'bg-blue-50') : '';
  return (
    <tr className={`text-sm ${bgColor}`}>
      <td className="relative px-4">
        <div className=" flex items-center justify-center px-2">
          <label htmlFor={_id} className="hover:bg-hover-1 ho absolute rounded-full p-3">
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
      <td className="gap-3 ">
        <div className=" flex w-28 items-center gap-2">
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
            isSuccess={_status || __status}
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
      </td>
      <td className=" w-1">
        <div className=" flex w-24 items-center justify-between">
          {!isEditing ? (
            <SelectItem
              btn="more_vert"
              isSuccess={_status || __status}
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
            <HoverInfo student={student} />
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

function HoverInfo({ student }) {
  const inforef = useRef();

  const { studentId, status, statusChangedAt, createdAt } = student;
  const [tooltipData, setTooltipData] = useState(null);

  function showTooltip(event, student) {
    const rect = event.target.getBoundingClientRect();
    setTooltipData({
      student,
      position: {
        top: rect.top + window.scrollY + rect.height,
        left: rect.left + window.scrollX + rect.width,
      },
    });
  }

  useEffect(() => {
    const ref = inforef.current;

    function callback1(event) {
      showTooltip(event, student);
    }

    function callback2() {
      setTooltipData(null);
    }
    ref.addEventListener('mouseenter', callback1);
    ref.addEventListener('mouseleave', callback2);
    return () => {
      ref.removeEventListener('mouseenter', callback1);
      ref.removeEventListener('mouseleave', callback2);
    };
  }, [student]);

  return (
    <div className=" ">
      <button
        ref={inforef}
        className=" material-symbols-outlined mr-2  px-1 text-xl font-light text-text--muted"
      >
        help
      </button>

      {tooltipData && (
        <Tooltip position={tooltipData.position}>
          <div
            className="absolute right-4 z-20  w-60  max-w-56 rounded bg-bg--primary-500 
             p-4 text-sm text-text--primary"
          >
            <div className=" flex flex-col leading-loose">
              <div className="flex justify-between">
                <p className="basis-[60%]">Student ID</p>:{' '}
                <p className="w-full pl-2"> {studentId}</p>
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
                  {' '}
                  {statusChangedAt ? new Date(statusChangedAt).toLocaleString() : '----------'}
                </p>
              </div>
            </div>
          </div>
        </Tooltip>
      )}
    </div>
  );
}

function StdForm() {
  const { id } = useParams();
  const { updateFormState, state } = useContext(StdTableContext);
  const { isPending, mutate } = useCreateStudent();
  const { setValue, setFocus, watch, handleSubmit, register, control } = useForm();

  useEffect(() => {
    setFocus('name');
  }, [setFocus, state.addFormIsOpen]);

  function onSubmit(data) {
    if (!id) return;
    mutate(
      { ...data, classId: id },
      {
        onSettled: () => {
          setValue('name', '');
          setValue('phone', '');
          setValue('gmail', '');
          setFocus('name');
        },
      }
    );
  }
  if (!state.addFormIsOpen) return null;
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      className=" flex items-center justify-between border-b border-t border-bg--primary-100 px-2 py-2"
    >
      <div className=" flex items-end gap-2">
        <input
          {...register('name')}
          name="name"
          placeholder="Name"
          className="rounded border border-border-2 bg-bg--primary-200 px-4 py-2 text-sm outline-none"
          type="text"
        />
        <input
          {...register('phone')}
          name="phone"
          placeholder="Phone"
          className="  rounded border border-border-2 bg-bg--primary-200 px-4 py-2 text-sm outline-none"
          type="text"
        />
        {watch('sendQr_gmail') && (
          <input
            {...register('gmail')}
            name="gmail"
            placeholder="Gmail"
            className="  rounded border border-border-2 bg-bg--primary-200 px-4 py-2 text-sm outline-none"
            type="email"
          />
        )}

        <div className=" flex flex-col justify-center  text-sm">
          <div className="text-gray-400">SEND-QR</div>
          <div className=" flex gap-2">
            <div className=" flex items-center">
              <input
                {...register('sendQr_whatsapp')}
                id="checkbox"
                name="sendQr_whatsapp"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded  text-blue-600 
                accent-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="checkbox" className="ms-2 text-sm font-medium text-gray-400 ">
                Whatsapp
              </label>
            </div>

            <div className=" flex items-center">
              <input
                {...register('sendQr_gmail')}
                id="checkbox"
                name="sendQr_gmail"
                type="checkbox"
                className="h-4 w-4 rounded  text-blue-600
                 accent-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="checkbox" className="ms-2 text-sm font-medium text-gray-400 ">
                Gmail
              </label>
            </div>
          </div>
        </div>
        <input
          {...register('status')}
          value="unpaid"
          name="status"
          type="text"
          className="hidden"
        />
      </div>

      <div className=" flex items-center gap-3 ">
        <Button spinner={isPending} type="primary" label="SUBMIT" />
        <button
          onClick={(e) => {
            e.preventDefault();
            updateFormState(false);
          }}
          className=" material-symbols-outlined flex aspect-square h-8 items-center justify-center
               rounded-full bg-bg--primary-300  text-lg"
        >
          close
        </button>
      </div>
    </Form>
  );
}
