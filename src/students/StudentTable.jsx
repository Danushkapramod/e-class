import { useEffect, useRef, useState } from 'react';
import Button from '../ui/components/Button';
import useCreateStudent from './useCreateStudent';
import { useStudentsInTeacher } from './useStudents';
import { useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';
import SelectItem from '../ui/components/SelectItem';
import Tooltip from '../ui/components/Potral';
import useUpdateStudent from './useUpdateStudent';
import useDeleteStudent from './useDeleteStudent';
import { StudentFilter, StudentSearch } from './StudentTableOperations';
import { useSelector } from 'react-redux';

function StudentTable() {
  const [searchQuery, setSearchQuery] = useState();
  const [filterQuery, setFilterQuery] = useState();
  const [fIsopen, setFIsOpen] = useState(false);

  return (
    <div className=" flex min-w-[30rem] max-w-[80rem] grow flex-col  ">
      <div
        className="flex w-full  flex-col justify-between gap-2 rounded-t 
        border border-bg--primary-100 
        bg-bg--primary-200 pb-2 pt-3 text-text--primary"
      >
        <div className=" flex items-end justify-between px-2">
          <StudentSearch setQuery={setSearchQuery} />
          <div className=" flex gap-2">
            <StudentsOnTable />
            <StudentFilter setQuery={setFilterQuery} />
            <button
              onClick={() => setFIsOpen(!fIsopen)}
              className="rounded bg-blue-600 px-6 
                text-sm uppercase text-slate-100 hover:bg-blue-700"
            >
              ADD Student
            </button>
          </div>
        </div>

        {fIsopen && <StdForm set={setFIsOpen} />}
      </div>
      <Table queries={[searchQuery, filterQuery]} />
    </div>
  );
}

function StudentsOnTable() {
  const { totalStudentsOntable } = useSelector((store) => store.student);
  return <div className=" flex items-end px-2 text-sm">{totalStudentsOntable} results</div>;
}

function Table({ queries }) {
  const { students, isLoading } = useStudentsInTeacher(queries);

  return (
    <div className=" z-0 max-h-[30rem] overflow-auto rounded-b  ">
      <table
        className=" text-smbg-bg--primary-200 w-full rounded-b border-b border-l 
         border-r border-bg--primary-100 bg-bg--primary-200"
      >
        <thead>
          <tr
            className="sticky -top-[1px] z-10  bg-bg--primary-200 py-2 text-base
             font-medium shadow transition-all duration-100"
          >
            <th className=" w-1 py-2 pr-6 text-start "></th>
            <th className="max-w-[130px] py-2 text-start ">#ID</th>
            <th className=" py-2 text-start ">Student name</th>
            <th className="py-2 text-start ">Phone</th>
            <th className=" py-2 text-start ">Statu</th>
            <th className="py-2 text-start"></th>
          </tr>
        </thead>
        <tbody className=" divide-y divide-bg--primary-100">
          {!isLoading
            ? students?.map((student, index) => {
                return <TableRow key={index} student={{ ...student, index }} />;
              })
            : ''}
        </tbody>
      </table>
    </div>
  );
}

const statusOptions = [
  ['paid', 'paid'],
  ['unpaid', 'pending'],
  ['half', 'side_navigation'],
  ['free', 'published_with_changes'],
];

function TableRow({ student }) {
  const { name, phone, status, studentId, index, _id } = student;

  const { isUpdating, isSuccess, mutate, status: _status } = useUpdateStudent();
  const { isDeleting, mutate: deleteStudent, status: __status } = useDeleteStudent();
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState({ name, phone });
  const ref1 = useRef();

  useEffect(() => {
    if (isEditing) ref1.current.focus();
  }, [isEditing]);

  function onStatusHandler(e) {
    mutate({ studentId: _id, newData: { status: e.target.id } });
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

  useEffect(() => {
    if (isSuccess) setIsEditing(false);
  }, [isSuccess]);

  function onSelectHandler(e) {
    if (e.target.id === 'update') {
      setIsEditing(!isEditing);
    }

    if (e.target.id === 'delete') {
      deleteStudent(_id);
    }
  }

  let color;
  if (status === 'paid') color = 'bg-green-600';
  if (status === 'unpaid') color = 'bg-orange-600';
  if (status === 'free') color = 'bg-slate-600';
  if (status === 'half') color = 'bg-sky-600';
  return (
    <tr className=" text-sm">
      <td className="px-4 py-3 pr-6 ">{(index + 1).toString().padStart(2, '0')}</td>
      <td className="py-3">{studentId}</td>
      <td className="relative py-3 ">
        {isEditing ? (
          <div className=" flex items-center">
            <input
              ref={ref1}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              className=" w-max rounded border-border-1 bg-bg--primary-300
                        px-2 py-1.5 outline-none"
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
              className=" w-max rounded border  border-border-1
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
        <div className=" flex w-24 items-center gap-2">
          <div
            className={`${color} w-full justify-between rounded-full px-3 py-1  text-center text-xs capitalize tracking-wider text-slate-100`}
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
            items={statusOptions.filter((option) => option[0] !== status)}
          />
        </div>
      </td>
      <td className=" w-1">
        <div className=" flex w-24 items-center justify-between">
          {!isEditing ? (
            <SelectItem
              isSuccess={_status || __status}
              disabled={isUpdating || isDeleting}
              buttonType="xsSecondery"
              onClick={onSelectHandler}
              items={[
                ['update', 'edit'],
                ['delete', 'delete'],
              ]}
            />
          ) : (
            <Button onClick={onSubmitHandler} type="smallPrimary">
              Save
            </Button>
          )}
          {!isEditing ? (
            <HoverInfo student={student} />
          ) : (
            <button
              onClick={() => {
                setIsEditing(false);
              }}
              className=" material-symbols-outlined mr-3 flex aspect-square h-6 items-center justify-center
             rounded-full bg-bg--primary-300  text-lg"
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
                  {new Date(statusChangedAt).toLocaleString() || '-----'}
                </p>
              </div>
            </div>
          </div>
        </Tooltip>
      )}
    </div>
  );
}

function StdForm({ set }) {
  const { isPending, mutate } = useCreateStudent();
  const { setValue, setFocus, watch, handleSubmit, register, control } = useForm();

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  function onSubmit(data) {
    mutate(data, {
      onSettled: () => {
        setValue('name', '');
        setValue('phone', '');
        setFocus('name');
      },
    });
  }
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
          className="  rounded border border-border-2 
                bg-bg--primary-200 px-4 py-2 text-sm outline-none"
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
                className="h-4 w-4 rounded border-gray-300 bg-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
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
                className="h-4 w-4 rounded border-gray-300 bg-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
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
        <Button disabled={isPending} spinner={isPending} type="primary">
          Submit
        </Button>
        <button className=" ">
          <div
            onClick={(e) => {
              e.preventDefault();
              set(false);
            }}
            className=" material-symbols-outlined flex aspect-square h-8 items-center justify-center
               rounded-full bg-bg--primary-300  text-lg"
          >
            close
          </div>
        </button>
      </div>
    </Form>
  );
}

export default StudentTable;
