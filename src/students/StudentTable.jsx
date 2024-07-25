import { useState } from 'react';
import Button from '../ui/components/Button';
import useCreateStudent from './useCreateStudent';
import useStudents from './useStudents';
import { useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';

function StudentTable() {
  const [fIsopen, setFIsOpen] = useState(false);

  return (
    <div className=" flex min-w-[30rem] max-w-[80rem] grow flex-col  ">
      <div
        className="flex w-full  flex-col justify-between gap-2 rounded-t 
        border border-bg--primary-100 
        bg-bg--primary-200 pb-2 pt-3 text-text--primary"
      >
        <div className=" flex items-end justify-between px-2">
          <div className=" relative flex items-center">
            <input
              placeholder="Find"
              className=" rounded border border-border-2 
              bg-bg--primary-200 px-8 py-[0.375rem] text-sm outline-none "
              type="text"
            />
            <span className="material-symbols-outlined absolute rounded-sm pl-2 text-lg ">
              search
            </span>
          </div>
          <div className=" flex gap-1">
            <button
              className=" flex items-center gap-1 rounded border border-border-2 
             bg-white/5 py-1 pl-2 pr-3 text-sm "
            >
              <span className=" material-symbols-outlined text-base">filter_alt</span>
              Filter
            </button>

            <button
              onClick={() => setFIsOpen(!fIsopen)}
              className="rounded bg-blue-600 px-6 py-[4px] 
                text-sm uppercase text-slate-100 hover:bg-blue-700"
            >
              ADD Student
            </button>
          </div>
        </div>

        {fIsopen && <StdForm set={setFIsOpen} />}
      </div>
      <Table />
    </div>
  );
}

function Table() {
  const { students, isLoading } = useStudents();
  return (
    <div className="max-h-[30rem]  overflow-auto rounded-b bg-bg--primary-200 ">
      <table
        className=" w-full rounded-b border-b border-l border-r 
         border-bg--primary-100 bg-bg--primary-200 text-sm"
      >
        <thead>
          <tr
            className="sticky -top-[1px]  bg-bg--primary-200 py-2 text-base
             font-medium shadow transition-all duration-100"
          >
            <th className=" w-1 py-2 pr-6 text-start "></th>
            <th className="max-w-[130px] py-2 text-start ">#ID</th>
            <th className=" py-2 text-start ">Student name</th>
            <th className="py-2 text-start ">Phone</th>
            <th className=" py-2 text-start ">Statu</th>
            <th className=" py-2 text-start "></th>
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

function TableRow({ student }) {
  const { name, phone, studentId, index } = student;
  return (
    <tr className="">
      <td className="  px-4 py-2 pr-6 ">{(index + 1).toString().padStart(2, '0')}</td>
      <td className="   py-2">{studentId}</td>
      <td className="  py-2 ">{name}</td>
      <td className=" py-2 ">{phone}</td>
      <td className="  py-3 ">
        <span className=" rounded-full bg-orange-600 px-3 py-1 text-xs tracking-wider">Unpaid</span>
      </td>
      <td className=" ">
        <button className=" material-symbols-outlined flex items-center  px-1 text-xl">
          more_vert
        </button>
      </td>
    </tr>
  );
}

function StdForm({ set }) {
  const { isPending, mutate } = useCreateStudent();
  const { setValue, handleSubmit, register, control } = useForm();

  function onSubmit(data) {
    mutate(data, {
      onSettled: () => {
        setValue('name', '');
        setValue('phone', '');
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
        <div>
          <input
            {...register('name')}
            name="name"
            placeholder="Name"
            className="  rounded border border-border-2 
                bg-bg--primary-200 px-4 py-2 text-sm outline-none"
            type="text"
          />
        </div>
        <div>
          <input
            {...register('phone')}
            name="phone"
            placeholder="Phone"
            className="  rounded border border-border-2 bg-bg--primary-200 px-4 py-2 text-sm outline-none"
            type="text"
          />
        </div>
        <div className=" flex items-center">
          <input
            {...register('sendQr')}
            id="checkbox"
            name="sendQr"
            type="checkbox"
            defaultChecked
            className="h-4 w-4 rounded border-gray-300 bg-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="checkbox" className="ms-2 text-sm font-medium text-gray-400 ">
            send-qr
          </label>
        </div>
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
