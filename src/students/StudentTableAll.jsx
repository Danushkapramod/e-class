// import { useContext, useEffect, useRef, useState } from 'react';
// import { Form } from 'react-router-dom';
// import { Controller, useForm } from 'react-hook-form';
// import { Button } from '../ui/components/ButtonNew';
// import DataLoader from '../ui/components/DataLoader';
// import Pagination from '../ui/components/Pagination';
// import SelectItem from '../ui/components/SelectItem';
// import Tooltip from '../ui/components/Potral';
// import { StdTableContext, TableProvider } from './TableContext';
// import { StudentFilter, StudentSearch } from './StudentTableOperations';
// import useUpdateStudent, { useUpdateManyStudents } from './useUpdateStudent';
// import { useAllStudents } from './useStudents';
// import useOColor from '../utils/getOColor';
// import Checkbox from '../ui/components/Checkbox';
// import useAppSetings from '../user/useAppSetings';
// import useUpdateAppSetings from '../user/useUpdateAppSetings';
// import { statusOptionsDefault } from '../services/apiAuth';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import useHide from '../user/useHide';
// import { getStudentsCount } from '../services/apiStudents';
// import { getOptionsCount } from '../services/apiOptions';

// // const statusOptions = [
// //   ['paid', 'paid'],
// //   ['unpaid', 'pending'],
// //   ['half', 'side_navigation'],
// //   ['free', 'published_with_changes'],
// // ];

// export default function StudentTableAll() {
//   return (
//     <TableProvider>
//       <div className=" flex min-w-[40rem]  grow flex-col shadow-md">
//         <div
//           className="flex w-full  flex-col justify-between gap-2
//            rounded-t bg-bg--primary-200 pb-2 pt-3 text-text--primary"
//         >
//           <TableNav />
//           <StatusForm />
//           <Operation />
//         </div>
//         <Table />
//       </div>
//     </TableProvider>
//   );
// }

// function TableNav() {
//   const { updatePaginationQuery } = useContext(StdTableContext);
//   const { data: students } = useQuery({
//     queryKey: ['studentsCount'],
//     queryFn: () => getOptionsCount('student'),
//   });
//   return (
//     <div className=" flex items-end justify-between px-2">
//       <StudentSearch />
//       <div className=" flex gap-2">
//         <StudentsOnTable />
//         <Pagination
//           getTotal={async () => await getStudentsCount()}
//           type="simple"
//           url={false}
//           limit={10}
//           set={updatePaginationQuery}
//           total={students}
//         />
//         <StudentFilter />
//       </div>
//     </div>
//   );
// }

// export function Operation() {
//   const { state, updateSelectedList } = useContext(StdTableContext);
//   const { students } = useAllStudents([
//     state.searchQuery,
//     state.filterQuery,
//     state.paginationQuery,
//   ]);
//   const { isPending: isDeleting, mutate: hideMany } = useHide('students');
//   const { isUpdating, mutate: updateMany } = useUpdateManyStudents();

//   function onDeletsHandler() {
//     hideMany({ endPoit: 'students/hide', idList: state.selectedList });
//   }
//   function onUpdateStatusHandler(selected) {
//     updateMany({ studentIds: state.selectedList, newData: { status: selected } });
//   }
//   function onSelect() {
//     const allIdList = students?.map((std) => std._id);
//     updateSelectedList('addAll', allIdList);
//   }

//   function onUnSelect() {
//     updateSelectedList('clear');
//   }
//   if (!state.selectedList?.length > 0) return null;
//   return (
//     <div className="flex h-12 w-full items-center gap-1.5 px-4">
//       <div className=" mr-2">
//         <Checkbox width="18px" id="stdAllSelect" trueCall={onSelect} falseCall={onUnSelect} />
//       </div>
//       <SelectItem
//         buttonSize="sm"
//         btnTitle="STATUS"
//         disabled={isUpdating}
//         onClick={onUpdateStatusHandler}
//         icon="currency_exchange"
//         items={state.statusOptions}
//       />
//       <Button
//         className="!border-border-2"
//         size="sm"
//         variant="outline"
//         disabled={isDeleting}
//         icon="delete"
//         onClick={onDeletsHandler}
//         label="DELETE"
//       />
//       <div className=" mb-1 ml-2 self-end text-sm text-text--secondery">
//         {state.selectedList.length.toString().padStart(2, '0')}
//         <span> selected</span>
//       </div>

//       <button
//         onClick={onUnSelect}
//         className=" material-symbols-outlined ml-auto flex aspect-square h-8
//         items-center justify-center rounded-full bg-bg--primary-300 text-lg"
//       >
//         close
//       </button>
//     </div>
//   );
// }

// function StudentsOnTable() {
//   const { state } = useContext(StdTableContext);
//   return <div className=" flex items-end px-2 text-sm">{`${state.totalStdOntable} results`}</div>;
// }

// function Table() {
//   const { data, isSuccess: appSetingsIsSuccess } = useAppSetings();
//   const { state, updateStatusOptions, updateFormState } = useContext(StdTableContext);
//   const { students, isLoading, error } = useAllStudents();

//   useEffect(() => {
//     if (appSetingsIsSuccess) updateStatusOptions(data?.students.statusOptions || {});
//   }, [appSetingsIsSuccess, data?.students.statusOptions]);

//   if (students?.length < 1) {
//     return '';
//   }
//   return (
//     <div className="fle flex-col border-t border-border-2">
//       <div className="z-0 max-h-[calc(100vh-18.75rem)] overflow-auto ">
//         <table className="text-smbg-bg--primary-200 w-full bg-bg--primary-200">
//           <thead>
//             <tr
//               className="sticky -top-[1px] z-10 border-b border-b-bg--primary-100
//               bg-bg--primary-200 py-2 text-base font-medium transition-all duration-100"
//             >
//               <th className=" w-1 px-4 py-2 text-start text-text--muted "></th>
//               <th className=" w-1  py-2 text-start text-text--muted ">#</th>
//               <th className="max-w-[130px] py-2 text-start ">ID</th>
//               <th className=" py-2 text-start ">Student name</th>
//               <th className="py-2 text-start ">Phone</th>
//               <th className=" flex gap-1 py-2 text-start ">
//                 <div>Status</div>
//                 <button
//                   onClick={() => updateFormState(!state.addFormIsOpen)}
//                   className="material-symbols-outlined scale-75 transition-all
//                   duration-100 hover:scale-[80%] active:rotate-90"
//                 >
//                   settings
//                 </button>
//               </th>
//               <th className="py-2 text-start"></th>
//             </tr>
//           </thead>
//           <tbody className=" divide-y divide-bg--primary-100">
//             <DataLoader
//               data={students?.map((student, index) => {
//                 return <TableRow key={student.studentId} student={{ ...student, index }} />;
//               })}
//               isLoading={isLoading}
//               error={error}
//               options={{ colSpan: '7' }}
//             />
//           </tbody>
//         </table>
//       </div>
//       <div className="h-4 w-full rounded-b bg-bg--primary-200"></div>
//     </div>
//   );
// }

// function TableRow({ student }) {
//   const theam = useOColor();
//   const { name, phone, status, studentId, index, _id } = student;
//   const { updateSelectedList, state } = useContext(StdTableContext);
//   const { isUpdating, isSuccess, mutate } = useUpdateStudent();
//   const [isEditing, setIsEditing] = useState();
//   const { mutate: hide, isPending: isDeleting } = useHide('students');
//   const [formState, setFormState] = useState({ name, phone });
//   const [isSelected, setIsSelected] = useState();
//   const ref1 = useRef();

//   useEffect(() => {
//     setIsSelected(state.selectedList?.includes(_id));
//   }, [state.selectedList, _id]);

//   useEffect(() => {
//     if (isEditing) ref1.current.focus();
//   }, [isEditing]);

//   useEffect(() => {
//     if (isSuccess) setIsEditing(false);
//   }, [isSuccess]);

//   function onStatusHandler(selected) {
//     mutate({ studentId: _id, newData: { status: selected } });
//   }
//   function onSubmitHandler() {
//     mutate({
//       studentId: _id,
//       newData: {
//         name: formState.name,
//         phone: formState.phone,
//       },
//     });
//   }

//   function onAddhandler() {
//     updateSelectedList('add', _id);
//   }

//   function onRemoveHandler() {
//     updateSelectedList('remove', _id);
//   }

//   function onSelectHandler(selected) {
//     if (selected === 'update') {
//       setIsEditing(!isEditing);
//     }

//     if (selected === 'delete') {
//       hide({ endPoit: 'students/hide', idList: [_id] });
//     }
//   }

//   const stdStatus = state.statusOptions?.find(({ option }) => option === status);
//   const bgColor = isSelected ? (theam ? 'bg-black/10' : 'bg-blue-50') : '';
//   return (
//     <tr className={`text-sm ${bgColor} `}>
//       <td className="relative px-4">
//         <div className=" flex items-center justify-center px-2">
//           <label htmlFor={_id} className="ho absolute rounded-full p-3 hover:bg-hover-1">
//             <Checkbox
//               id={_id}
//               trueCall={onAddhandler}
//               falseCall={onRemoveHandler}
//               _checked={isSelected}
//             />
//           </label>
//         </div>
//       </td>
//       <td className=" py-3 pr-6 text-text--muted ">{(index + 1).toString().padStart(2, '0')}</td>
//       <td className="py-3">{studentId}</td>
//       <td className="relative py-3 ">
//         {isEditing ? (
//           <div className=" flex items-center">
//             <input
//               ref={ref1}
//               onChange={(e) => setFormState({ ...formState, name: e.target.value })}
//               className=" w-max rounded border-border-1 bg-bg--primary-300 px-2 py-1.5 outline-none"
//               type="text"
//               value={formState.name}
//             />
//           </div>
//         ) : (
//           name
//         )}
//       </td>
//       <td className="relative py-3 ">
//         {isEditing ? (
//           <div className="flex  items-center">
//             <input
//               onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
//               className=" w-max rounded border border-border-1
//                bg-bg--primary-300 px-2 py-1.5 outline-none"
//               type="text"
//               value={formState.phone}
//             />
//           </div>
//         ) : (
//           phone
//         )}
//       </td>
//       <td className="gap-3 ">
//         <div className=" flex w-28 items-center gap-2">
//           <div
//             style={
//               stdStatus?.color
//                 ? { backgroundColor: stdStatus.color }
//                 : {
//                     border: '1px solid',
//                     borderColor: 'var(--color-border-2)',
//                     color: 'var(--color-text-primary)',
//                   }
//             }
//             className="w-full justify-between rounded-full px-3 py-1
//             text-center text-xs capitalize tracking-wider text-slate-100"
//           >
//             {status}
//           </div>
//           <SelectItem
//             disabled={isUpdating || isDeleting}
//             btn={
//               <span className="material-symbols-outlined px-1 text-lg text-text--muted">
//                 currency_exchange
//               </span>
//             }
//             onClick={onStatusHandler}
//             items={state.statusOptions
//               ?.filter((option) => option.option !== status)
//               .map((option) => [option.option])}
//           />
//         </div>
//       </td>
//       <td className=" w-1">
//         <div className=" flex w-24 items-center justify-between">
//           {!isEditing ? (
//             <SelectItem
//               btn="more_vert"
//               disabled={isUpdating || isDeleting}
//               onClick={onSelectHandler}
//               items={[
//                 ['update', 'edit'],
//                 ['delete', 'delete'],
//               ]}
//             />
//           ) : (
//             <Button onClick={onSubmitHandler} type="sm" label="SAVE" />
//           )}
//           {!isEditing ? (
//             <HoverInfo student={student} />
//           ) : (
//             <button
//               onClick={() => {
//                 setIsEditing(false);
//               }}
//               className=" material-symbols-outlined mr-3 flex aspect-square h-6
//                items-center justify-center rounded-full bg-bg--primary-300 text-lg"
//             >
//               close
//             </button>
//           )}
//         </div>
//       </td>
//     </tr>
//   );
// }

// function HoverInfo({ student }) {
//   const inforef = useRef();

//   const { studentId, status, statusChangedAt, createdAt } = student;
//   const [tooltipData, setTooltipData] = useState(null);

//   function showTooltip(event, student) {
//     const rect = event.target.getBoundingClientRect();
//     setTooltipData({
//       student,
//       position: {
//         top: rect.top + window.scrollY + rect.height,
//         left: rect.left + window.scrollX + rect.width,
//       },
//     });
//   }

//   useEffect(() => {
//     const ref = inforef.current;

//     function callback1(event) {
//       showTooltip(event, student);
//     }

//     function callback2() {
//       setTooltipData(null);
//     }
//     ref.addEventListener('mouseenter', callback1);
//     ref.addEventListener('mouseleave', callback2);
//     return () => {
//       ref.removeEventListener('mouseenter', callback1);
//       ref.removeEventListener('mouseleave', callback2);
//     };
//   }, [student]);

//   return (
//     <div className=" ">
//       <button
//         ref={inforef}
//         className=" material-symbols-outlined mr-2  px-1 text-xl font-light text-text--muted"
//       >
//         help
//       </button>

//       {tooltipData && (
//         <Tooltip position={tooltipData.position}>
//           <div
//             className="absolute right-4 z-20  w-60  max-w-56 rounded bg-bg--primary-500
//              p-4 text-sm text-text--primary"
//           >
//             <div className=" flex flex-col leading-loose">
//               <div className="flex justify-between">
//                 <p className="basis-[60%]">Student ID</p>:{' '}
//                 <p className="w-full pl-2"> {studentId}</p>
//               </div>
//               <div className="flex justify-between">
//                 <p className=" basis-[60%]">Joined</p>:
//                 <p className="w-full pl-2">{new Date(createdAt).toLocaleDateString()}</p>{' '}
//               </div>
//               <div className="flex  justify-between">
//                 <p className="basis-[60%]">Status</p>:
//                 <p className="w-full pl-2 capitalize"> {status}</p>
//               </div>
//               <div className="flex  justify-between">
//                 <p className="basis-[60%] ">Status At</p>:{' '}
//                 <p className="w-full pl-2">
//                   {' '}
//                   {statusChangedAt ? new Date(statusChangedAt).toLocaleString() : '----------'}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Tooltip>
//       )}
//     </div>
//   );
// }

// function StatusForm() {
//   const { mutate: setDefaultStatus } = useMutation({ mutationFn: statusOptionsDefault });
//   const { updateFormState, state, updateTempStatusList } = useContext(StdTableContext);
//   const { mutate, isPending } = useUpdateAppSetings();
//   const { setFocus, getValues, handleSubmit, control } = useForm();

//   useEffect(() => {
//     updateTempStatusList(state.statusOptions);
//   }, [state.statusOptions]);

//   useEffect(() => {
//     setFocus('name');
//   }, [setFocus]);

//   function onSubmit() {
//     mutate({ students: { statusOptions: state.tempStatusList } });
//   }
//   async function onDefault(e) {
//     await e.preventDefault();
//     setDefaultStatus();
//   }
//   if (!state.addFormIsOpen) return null;
//   return (
//     <Form
//       onSubmit={handleSubmit(onSubmit)}
//       control={control}
//       className=" flex items-center justify-between border-b border-t border-bg--primary-100 px-2 py-2"
//     >
//       <div className=" flex flex-wrap items-start gap-2">
//         <AddStatus />
//         <Button onClick={onDefault} variant="outline" size="sm" label="Default" />
//         {state.tempStatusList.map((option) => (
//           <StatusOption
//             control={control}
//             getValues={getValues}
//             key={option.option}
//             option={option}
//           />
//         ))}
//       </div>

//       <div className=" flex items-center gap-3 ">
//         <Button spinner={isPending} type="primary" label="SUBMIT" />
//         <button
//           onClick={(e) => {
//             e.preventDefault();
//             updateFormState(false);
//           }}
//           className=" material-symbols-outlined flex aspect-square h-8
//           items-center justify-center rounded-full bg-bg--primary-300 text-lg"
//         >
//           close
//         </button>
//       </div>
//     </Form>
//   );
// }

// function AddStatus() {
//   const { updateTempStatusList, state } = useContext(StdTableContext);
//   const [value, setValue] = useState();

//   function onSubmit(e) {
//     e.preventDefault();
//     updateTempStatusList([...state.tempStatusList, { option: value, color: '' }]);
//   }

//   return (
//     <div className=" flex gap-2">
//       <input
//         name="status"
//         onChange={(e) => setValue(e.target.value)}
//         value={value}
//         placeholder="Status"
//         className="rounded border border-border-2 bg-bg--primary-200 px-4 py-2 text-sm outline-none"
//         type="text"
//       />
//       <Button onClick={onSubmit} size="sm" label="ADD" icon="add" variant="outline" />
//     </div>
//   );
// }

// function StatusOption({ option: { option, color }, control }) {
//   const { updateTempStatusList, state } = useContext(StdTableContext);
//   const [_color, setColor] = useState(color);

//   useEffect(() => {
//     updateTempStatusList(
//       state.tempStatusList.map((item) => {
//         if (item.option === option) {
//           return { option, color: _color };
//         } else {
//           return item;
//         }
//       })
//     );
//   }, [_color, option]);

//   function deleteHandler(e) {
//     e.preventDefault();
//     updateTempStatusList(state.tempStatusList.filter((item) => item.option !== option));
//   }
//   return (
//     <div
//       style={{
//         backgroundColor: _color,
//         border: '1px solid',
//         borderColor: _color || 'var(--color-border-2)',
//       }}
//       className=" flex items-center gap-1 rounded px-2  pl-3 text-sm capitalize"
//     >
//       {option}
//       <div className="flex items-center">
//         <label
//           htmlFor={option}
//           className="material-symbols-outlined flex scale-[70%]
//           items-center justify-center rounded-full p-0.5 hover:scale-75"
//         >
//           format_color_fill
//         </label>
//         <Controller
//           id={option}
//           name={option}
//           control={control}
//           render={({ field }) => (
//             <input
//               {...field}
//               className="h-0 w-0 opacity-0"
//               onChange={(e) => {
//                 setColor(e.target.value);
//               }}
//               type="color"
//               name={option}
//               id={option}
//             />
//           )}
//         />
//         <button
//           onClick={deleteHandler}
//           className="material-symbols-outlined flex scale-[70%]
//           items-center justify-center rounded-full p-0.5  hover:scale-75"
//         >
//           delete
//         </button>
//       </div>
//     </div>
//   );
// }

import { useContext, useEffect, useRef, useState } from 'react';
import { Form } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../ui/components/ButtonNew';
import DataLoader from '../ui/components/DataLoader';
import Pagination from '../ui/components/Pagination';
import SelectItem from '../ui/components/SelectItem';
import Tooltip from '../ui/components/Potral';
import { StdTableContext, TableProvider } from './TableContext';
import { StudentFilter, StudentSearch } from './StudentTableOperations';
import useUpdateStudent, { useUpdateManyStudents } from './useUpdateStudent';
import { useAllStudents } from './useStudents';
import useOColor from '../utils/getOColor';
import Checkbox from '../ui/components/Checkbox';
import useAppSetings from '../user/useAppSetings';
import useUpdateAppSetings from '../user/useUpdateAppSetings';
import { statusOptionsDefault } from '../services/apiAuth';
import { useMutation, useQuery } from '@tanstack/react-query';
import useHide from '../user/useHide';
import { getStudentsCount } from '../services/apiStudents';
import { getOptionsCount } from '../services/apiOptions';
import { getSpecificDaysInMonth } from '../utils/formateDates&Times';
import useAttendances from './useAttendances';

// const statusOptions = [
//   ['paid', 'paid'],
//   ['unpaid', 'pending'],
//   ['half', 'side_navigation'],
//   ['free', 'published_with_changes'],
// ];

export default function StudentTableAll() {
  return (
    <TableProvider>
      <div className=" flex min-w-[40rem]  grow flex-col shadow-md">
        <div
          className="flex w-full  flex-col justify-between gap-2 
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

function TableNav() {
  const { updatePaginationQuery } = useContext(StdTableContext);
  const { data: students } = useQuery({
    queryKey: ['studentsCount'],
    queryFn: () => getOptionsCount('student'),
  });
  return (
    <div className=" flex items-end justify-between px-2">
      <StudentSearch />
      <div className=" flex gap-2">
        <StudentsOnTable />
        <Pagination
          getTotal={async () => await getStudentsCount()}
          type="simple"
          url={false}
          limit={10}
          set={updatePaginationQuery}
          total={students}
        />
        <StudentFilter />
      </div>
    </div>
  );
}

export function Operation() {
  const { state, updateSelectedList } = useContext(StdTableContext);
  const { students } = useAllStudents([
    state.searchQuery,
    state.filterQuery,
    state.paginationQuery,
  ]);
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
      <SelectItem
        buttonSize="sm"
        btnTitle="STATUS"
        disabled={isUpdating}
        onClick={onUpdateStatusHandler}
        icon="currency_exchange"
        items={state.statusOptions}
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

function StudentsOnTable() {
  const { state } = useContext(StdTableContext);
  return <div className=" flex items-end px-2 text-sm">{`${state.totalStdOntable} results`}</div>;
}

function DaysHeder() {
  const days = getSpecificDaysInMonth('Saturday').map((day) => day.toString().split(' ')[2]);
  return days.map((day) => {
    return (
      <div key={day} className="w-12 text-center">
        {day}
      </div>
    );
  });
}

function Table() {
  const { data, isSuccess: appSetingsIsSuccess } = useAppSetings();
  const { state, updateStatusOptions, updateFormState } = useContext(StdTableContext);
  const { students, isLoading, error } = useAllStudents();
  const { data: classAttendances } = useAttendances('66acbd360e266991ac1943d5');

  useEffect(() => {
    if (appSetingsIsSuccess) updateStatusOptions(data?.students.statusOptions || {});
  }, [appSetingsIsSuccess, data?.students.statusOptions]);

  if (students?.length < 1) {
    return '';
  }
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
              <th className=" flex h-10 items-center gap-10 ">
                <div className=" flex text-sm font-normal">
                  <DaysHeder />
                </div>

                <div className=" flex items-center">
                  <div>Status</div>
                  <button
                    onClick={() => updateFormState(!state.addFormIsOpen)}
                    className="material-symbols-outlined scale-75 transition-all 
                  duration-100 hover:scale-[80%] active:rotate-90"
                  >
                    settings
                  </button>
                </div>
              </th>
              <th className="py-2 text-start"></th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-bg--primary-100">
            <DataLoader
              data={students?.map((student, index) => {
                const attendances = classAttendances
                  .filter((attendance) => attendance.studentId === student._id)
                  .map((attendance) => {
                    return {
                      date: new Date(attendance.date).getDate().toString().padStart(2, '0'),
                      isPresent: attendance.isPresent,
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
  const days = getSpecificDaysInMonth('Saturday').map((day) => day.toString().split(' ')[2]);
  return days.map((date) => {
    const isPresent = attendances.some(
      (attendance) => attendance.date === date && attendance.isPresent
    );
    const key = `${id}-${date}`;
    return (
      <li key={key} className="flex w-12 justify-center">
        <Checkbox _checked={isPresent} id={key} />
      </li>
    );
  });
}

function TableRow({ student }) {
  const theam = useOColor();
  const { name, phone, status, studentId, attendances, index, _id } = student;
  const { updateSelectedList, state } = useContext(StdTableContext);
  const { isUpdating, isSuccess, mutate } = useUpdateStudent();
  const [isEditing, setIsEditing] = useState();
  const { mutate: hide, isPending: isDeleting } = useHide('students');
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
      hide({ endPoit: 'students/hide', idList: [_id] });
    }
  }

  const stdStatus = state.statusOptions?.find(({ option }) => option === status);
  const bgColor = isSelected ? (theam ? 'bg-black/10' : 'bg-blue-50') : '';
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
          <ul className=" flex items-center">
            <DaysChexboxes id={_id} attendances={attendances} />
          </ul>
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
      <td className="w-1">
        <div className=" flex w-24 items-center justify-between">
          {!isEditing ? (
            <SelectItem
              btn="more_vert"
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

function StatusForm() {
  const { mutate: setDefaultStatus } = useMutation({ mutationFn: statusOptionsDefault });
  const { updateFormState, state, updateTempStatusList } = useContext(StdTableContext);
  const { mutate, isPending } = useUpdateAppSetings();
  const { setFocus, getValues, handleSubmit, control } = useForm();

  useEffect(() => {
    updateTempStatusList(state.statusOptions);
  }, [state.statusOptions]);

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  function onSubmit() {
    mutate({ students: { statusOptions: state.tempStatusList } });
  }
  async function onDefault(e) {
    await e.preventDefault();
    setDefaultStatus();
  }
  if (!state.addFormIsOpen) return null;
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      className=" flex items-center justify-between border-b border-t border-bg--primary-100 px-2 py-2"
    >
      <div className=" flex flex-wrap items-start gap-2">
        <AddStatus />
        <Button onClick={onDefault} variant="outline" size="sm" label="Default" />
        {state.tempStatusList.map((option) => (
          <StatusOption
            control={control}
            getValues={getValues}
            key={option.option}
            option={option}
          />
        ))}
      </div>

      <div className=" flex items-center gap-3 ">
        <Button spinner={isPending} type="primary" label="SUBMIT" />
        <button
          onClick={(e) => {
            e.preventDefault();
            updateFormState(false);
          }}
          className=" material-symbols-outlined flex aspect-square h-8 
          items-center justify-center rounded-full bg-bg--primary-300 text-lg"
        >
          close
        </button>
      </div>
    </Form>
  );
}

function AddStatus() {
  const { updateTempStatusList, state } = useContext(StdTableContext);
  const [value, setValue] = useState();

  function onSubmit(e) {
    e.preventDefault();
    updateTempStatusList([...state.tempStatusList, { option: value, color: '' }]);
  }

  return (
    <div className=" flex gap-2">
      <input
        name="status"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder="Status"
        className="rounded border border-border-2 bg-bg--primary-200 px-4 py-2 text-sm outline-none"
        type="text"
      />
      <Button onClick={onSubmit} size="sm" label="ADD" icon="add" variant="outline" />
    </div>
  );
}

function StatusOption({ option: { option, color }, control }) {
  const { updateTempStatusList, state } = useContext(StdTableContext);
  const [_color, setColor] = useState(color);

  useEffect(() => {
    updateTempStatusList(
      state.tempStatusList.map((item) => {
        if (item.option === option) {
          return { option, color: _color };
        } else {
          return item;
        }
      })
    );
  }, [_color, option]);

  function deleteHandler(e) {
    e.preventDefault();
    updateTempStatusList(state.tempStatusList.filter((item) => item.option !== option));
  }
  return (
    <div
      style={{
        backgroundColor: _color,
        border: '1px solid',
        borderColor: _color || 'var(--color-border-2)',
      }}
      className=" flex items-center gap-1 rounded px-2  pl-3 text-sm capitalize"
    >
      {option}
      <div className="flex items-center">
        <label
          htmlFor={option}
          className="material-symbols-outlined flex scale-[70%] 
          items-center justify-center rounded-full p-0.5 hover:scale-75"
        >
          format_color_fill
        </label>
        <Controller
          id={option}
          name={option}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="h-0 w-0 opacity-0"
              onChange={(e) => {
                setColor(e.target.value);
              }}
              type="color"
              name={option}
              id={option}
            />
          )}
        />
        <button
          onClick={deleteHandler}
          className="material-symbols-outlined flex scale-[70%]
          items-center justify-center rounded-full p-0.5  hover:scale-75"
        >
          delete
        </button>
      </div>
    </div>
  );
}
