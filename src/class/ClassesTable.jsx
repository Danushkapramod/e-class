import useSetRoot from '../utils/setRoot';
import useClasses from './useClasses';
import SelectItem from '../ui/components/SelectItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useDeleteClass from './useDeleteClass';
import { setTableView } from './classSlice';
import AppNav from '../ui/layouts/AppNav';
import useClientSearch from '../hooks/useClientSearch';
import Pagination from '../ui/components/Pagination';
import { getClassesCount } from '../services/apiClasses';
import { useEffect } from 'react';
import { Button } from '../ui/components/ButtonNew';
import { formatLocalTime } from '../utils/formateDates&Times';
import DataLoader from '../ui/components/DataLoader';
import DeleteConfirmation from '../ui/components/DeleteConfirmation';
import { setDeleteConfirmation } from '../GlobalUiState';

export default function ClassesTable() {
  useSetRoot('');
  const navigate = useNavigate();
  const { isCreateClassOpen, tableView } = useSelector((store) => store.class);
  const { classes: data, isLoading, error } = useClasses();

  useEffect(() => {
    if (!isCreateClassOpen) return;
    navigate('new');
  }, [isCreateClassOpen, navigate]);

  const { searchResults: classes, setQuery } = useClientSearch(data, {
    type: 'obj',
    valueName: 'subject',
  });

  function setSearchQuery(e) {
    setQuery(e.target.value.trim());
  }
  return (
    <div>
      <AppNav
        type="class"
        setTableView={setTableView}
        tableView={tableView}
        onChange={setSearchQuery}
      />
      {tableView === 'card' ? (
        <div className=" mt-2 grid grow grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-2  rounded ">
          <DataLoader
            data={classes?.map((classData, index) => {
              return <CardItem classData={classData} key={index} />;
            })}
            isLoading={isLoading}
            error={error}
            options={{ grid: true }}
          />
        </div>
      ) : (
        <div className={`mt-2 overflow-hidden rounded `}>
          <table className="w-full divide-y-4 divide-bg--primary-200  px-2">
            <tr className="bg-bg--primary-200 text-text--secondery">
              <th className=" "></th>
              <th className="  px-2 py-3 text-left">Subject</th>
              <th className="  px-2 text-left">Teacher</th>
              <th className="  px-2 text-left">Grade</th>
              <th className="  px-2 text-left">Hall</th>
              <th className="  px-2 text-left">Day</th>
              <th className="  px-2 text-left">Time</th>
              <th className="  px-2 text-left"></th>
            </tr>
            <DataLoader
              data={classes?.map((classData, index) => {
                return <TableRow classData={classData} key={index} />;
              })}
              isLoading={isLoading}
              error={error}
              options={{ colSpan: '8' }}
            />
          </table>
        </div>
      )}
      <div className=" mb-10 mt-2 flex w-full flex-col items-center justify-center">
        <div className=" mb-4 h-[1px] w-full bg-bg--primary-100"></div>
        <Pagination getTotal={getClassesCount} />
      </div>
    </div>
  );
}

function CardItem({ classData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { deleteConfirmation } = useSelector((store) => store.global);
  const { isDeleting, mutate } = useDeleteClass();
  const { _id, teacher, subject, avatar, hall, startTime, grade, day } = classData;

  function onSelectHandler(selected) {
    if (selected === 'update') {
      navigate(`/app/classes/${_id}/update`);
    }
    if (selected === 'view') {
      navigate(`/app/classes/${_id}`);
    }
    if (selected === 'delete') {
      dispatch(setDeleteConfirmation(true));
    }
  }
  const handleDelete = () => {
    mutate(_id);
    dispatch(setDeleteConfirmation(false));
  };
  return (
    <div
      className="relative flex flex-grow flex-col items-center justify-center
       rounded-lg border  border-b-4 border-bg--primary-100 border-b-bg--secondery-2 
       bg-bg--primary-200 px-2 py-6 text-text--secondery shadow-md"
    >
      <div className="absolute right-2 top-2">
        <SelectItem
          disabled={isDeleting}
          btn="more_vert"
          buttonType="xsSecondery"
          onClick={onSelectHandler}
          items={[
            ['update', 'edit'],
            ['view', 'wysiwyg'],
            ['delete', 'delete'],
          ]}
        />
      </div>

      <div
        className="mb-2 flex h-20 w-20 items-center justify-center overflow-hidden
         rounded-full border-2 border-slate-300"
      >
        <img className="h-full object-cover" src={avatar} alt="image" />
      </div>
      <p className="line-clamp-1 px-3 text-lg capitalize text-text--primary">{subject}</p>
      <div className=" text-center text-text--secondery">
        <p className=" flex items-center text-center capitalize">
          {!teacher ? (
            <span>---------</span>
          ) : (
            <span className="w-full text-center">{teacher?.name}</span>
          )}
        </p>
        <p className="text-sm">Grade {grade}</p>
        <p className="text-sm">{hall}</p>

        <p className=" text-sm">
          <span className=" capitalize">{day}</span> {formatLocalTime(startTime)}
        </p>
      </div>
      <DeleteConfirmation
        show={deleteConfirmation}
        onClose={() => dispatch(setDeleteConfirmation(false))}
        onConfirm={handleDelete}
      />
    </div>
  );
}

function TableRow({ classData }) {
  const dispatch = useDispatch();
  const { deleteConfirmation } = useSelector((store) => store.global);
  const { mutate } = useDeleteClass();
  const { _id, teacher, subject, avatar, hall, startTime, grade, day } = classData;

  const handleDelete = () => {
    mutate(_id);
    dispatch(setDeleteConfirmation(false));
  };

  return (
    <>
      <tr className="shadow-sm">
        <td className="pl-4">
          <div className="flex h-9 w-9 min-w-9 items-center justify-center overflow-hidden rounded-full ">
            <img className="h-full object-cover" src={avatar} alt="" />
          </div>
        </td>
        <td className=" max-w-38 px-2 py-3 capitalize">{subject}</td>
        <td className=" max-w-44  px-2  py-3 capitalize">
          {!teacher ? '---------' : teacher?.name}
        </td>
        <td className=" px-2 py-3">{grade}</td>
        <td className=" px-2 py-3">{hall}</td>
        <td className="  px-2 py-3 capitalize">{day}</td>
        <td className=" px-2 py-3">{formatLocalTime(startTime)}</td>
        <td className="flex px-2 py-3 pr-4">
          <div className="flex  w-full  items-center justify-end gap-2">
            <Button
              to={`${_id}/update`}
              className="rounded"
              size="xs"
              icon="edit"
              variant="outline"
              label="UPDATE"
            />
            <Button
              to={`${_id}`}
              className="rounded"
              size="xs"
              icon="wysiwyg"
              variant="outline"
              label="VIEW"
            />
            <Button
              onClick={() => dispatch(setDeleteConfirmation(true))}
              className="rounded"
              size="xs"
              icon="delete"
              variant="outline"
            />
          </div>
        </td>
      </tr>
      <DeleteConfirmation
        show={deleteConfirmation}
        onClose={() => dispatch(setDeleteConfirmation(false))}
        onConfirm={handleDelete}
      />
    </>
  );
}

// function CardItem1({ classData }) {
//   const navigate = useNavigate();
//   const { isDeleting, mutate } = useDeleteClass();

//   const {
//     _id,
//     teacher,
//     subject,
//     avatar,
//     hall,
//     startTime,
//     grade,
//     day,
//   } = classData;

//   function onSelectHandler(e) {
//     if (selected === "update") {
//       navigate(`/app/classes/${_id}/update`);
//     }
//     if (selected === "view") {
//       navigate(`/app/classes/${_id}`);
//     }
//     if (selected === "delete") {
//       mutate(_id);
//     }
//   }
//   const formatedstartTime = moment
//     .tz(`2000-01-01T${startTime}Z`, "Asia")
//     .format("hh:mm A");

//   return (
//     <div
//       className=" relative m-1 flex  flex-grow flex-col
//                    items-center justify-center rounded border border-b-[3px]  border-slate-700
//                  border-b-blue-600 bg-dark-secondery  shadow-md "
//     >
//       <div className="  absolute right-2 top-2">
//         <SelectItem
//           disabled={isDeleting}
//           buttonType="xsSecondery"
//           bg="bg-neutral-900"
//           onClick={onSelectHandler}
//           items={[
//             ["update", "edit"],
//             ["delete", "delete"],
//             ["view", "wysiwyg"],
//           ]}
//         />
//       </div>

//       <div className="relative ">
//         <div
//           className="  flex  h-32 w-full  items-center justify-center overflow-hidden
//        rounded-t  object-cover  object-center
//        "
//         >
//           <img className=" w-full opacity-80 " src={avatar} alt="image" />
//         </div>
//         <div
//           className="absolute bottom-0  flex h-8 w-full items-center  bg-black/50
//         px-4  backdrop-blur "
//         >
//           <p className=" line-clamp-1 text-lg  capitalize ">{subject}</p>
//         </div>
//       </div>

//       <div className=" flex w-full  flex-col items-start px-4  py-3 text-center opacity-70  ">
//         <p className=" flex items-center">{teacher}</p>
//         <p className="text-sm">Grade {grade}</p>
//         <p className="text-sm">{hall}</p>

//         <p className=" text-sm">
//           {day} {formatedstartTime}
//         </p>
//       </div>
//     </div>
//   );
// }
