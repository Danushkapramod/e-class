import Spinner from '../ui/components/Spinner';
import Error from '../ui/components/Error';
import Button from '../ui/components/Button';
import useSetRoot from '../utils/setRoot';
import useTeachers from './useTeachers';
import { useNavigate } from 'react-router-dom';
import SelectItem from '../ui/components/SelectItem';
import { useSelector } from 'react-redux';
import useDeleteTeacher from './useDeleteTeacher';
import AppNav from '../ui/layouts/AppNav';
import { setTableView } from './teacherSlice';
import useClientSearch from '../hooks/useClientSearch';
import { getTeachersCount } from '../services/apiTeachers';
import Pagination from '../ui/components/Pagination';

function TeachersTable() {
  const { tableView } = useSelector((store) => store.teacher);
  const { teachers: data, isLoading, error } = useTeachers();
  const { searchResults: teachers, setQuery } = useClientSearch(data, {
    type: 'obj',
    valueName: 'name',
  });
  useSetRoot('');

  function setSearchQuery(e) {
    setQuery(e.target.value.trim());
  }
  return (
    <>
      <AppNav
        type="teacher"
        setTableView={setTableView}
        tableView={tableView}
        onChange={setSearchQuery}
      />
      {tableView === 'card' ? (
        <div className=" mt-2 grid grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-2 rounded">
          {!isLoading ? (
            error ? (
              <Error errorMsg={error.message} />
            ) : (
              teachers?.map((teacherData, index) => {
                return <CardItem teacherData={teacherData} key={index} />;
              })
            )
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner />
            </div>
          )}
        </div>
      ) : (
        <div className={`mt-4 overflow-hidden rounded`}>
          <table className="w-full divide-y-4 divide-bg--primary-200 px-2">
            <tr className="bg-bg--primary-200 text-text--secondery">
              <th className=" "></th>
              <th className="  px-2 py-3 text-left">Teacher</th>
              <th className="  px-2 text-left">Sybject</th>
              <th className="  px-2 text-left">Phone</th>
              <th className="  px-2 text-left"></th>
            </tr>
            {teachers?.map((teacherData, index) => {
              return <TableRow teacherData={teacherData} key={index} />;
            })}
          </table>
        </div>
      )}
      {
        <div className=" mb-10 mt-2 flex w-full flex-col items-center justify-center">
          <div className=" mb-4 h-[1px] w-full bg-bg--primary-100"></div>
          <Pagination getTotal={getTeachersCount} />
        </div>
      }
    </>
  );
}

function CardItem({ teacherData }) {
  const navigate = useNavigate();
  const { isDeleting, mutate } = useDeleteTeacher();
  const { _id: teacherId, name, subject, avatar, phone } = teacherData;

  function onSelectHandler(e) {
    if (e.target.id === 'update') {
      navigate(`/app/teachers/${teacherId}/update`);
    }
    if (e.target.id === 'view') {
      navigate(`/app/teachers/${teacherId}`);
    }
    if (e.target.id === 'delete') {
      mutate({ teacherId, avatarDbUrl: avatar });
    }
  }

  return (
    <div
      className="relative flex min-h-64 flex-grow flex-col
                 items-center rounded-lg border border-b-4  border-bg--primary-100
                 border-b-bg--secondery-2 bg-bg--primary-200 px-2 py-4 text-text--secondery shadow-md "
    >
      <div className="absolute right-2 top-2 z-30">
        <SelectItem
          buttonType="xsSecondery"
          bg="bg-dark-primary"
          disabled={isDeleting}
          onClick={onSelectHandler}
          items={[
            ['update', 'edit'],
            ['view', 'wysiwyg'],
            ['delete', 'delete'],
          ]}
        />
      </div>
      <div className=" h-24 w-24 overflow-hidden rounded-full border-2 border-slate-400">
        <img
          className="h-full object-cover"
          alt="avatar"
          src={
            avatar
              ? avatar
              : 'https://kjvgesvqoblnntmvqaid.supabase.co/storage/v1/object/public/teacher-avatars/Darshana%20kulathilaka_lmH0A2Ftjn.png'
          }
        />
      </div>
      <p className=" mb-1 line-clamp-1 flex items-center gap-1 pt-2 ">
        <span className=" material-symbols-outlined scale-90 font-light ">person</span>
        <span className=" text-md pr-1 capitalize text-text--primary">{name} </span>
      </p>
      <div className=" mt-2 space-y-1 text-center text-text--secondery">
        <p className=" flex items-center gap-2 text-sm capitalize ">
          <span className=" material-symbols-outlined scale-90 font-light ">menu_book</span>
          {subject}
        </p>
        <p className=" flex items-center gap-2 text-sm  ">
          <span className=" material-symbols-outlined scale-[60%]">call</span>
          {phone}
        </p>
      </div>
    </div>
  );
}

function TableRow({ teacherData }) {
  const { isDeleting, mutate } = useDeleteTeacher();
  const { _id: teacherId, name, subject, avatar, phone } = teacherData;

  return (
    <tr className="">
      <td className="pl-4">
        <div className="flex h-9 w-9 min-w-9 items-center justify-center overflow-hidden rounded-full ">
          <img
            className="h-full object-cover"
            src={
              avatar
                ? avatar
                : 'https://kjvgesvqoblnntmvqaid.supabase.co/storage/v1/object/public/teacher-avatars/Darshana%20kulathilaka_lmH0A2Ftjn.png'
            }
            alt=""
          />
        </div>
      </td>
      <td className=" max-w-44 px-2  py-3 capitalize">{name}</td>
      <td className=" max-w-38 px-2 py-3 capitalize">{subject}</td>
      <td className=" px-2 py-3">{phone}</td>
      <td className="flex justify-end gap-2 px-2 py-3 pr-4">
        <Button to={`${teacherId}/update`} type="xsSecondery" icon="edit">
          Updte
        </Button>
        <Button to={`${teacherId}`} type="xsSecondery" icon="wysiwyg">
          view
        </Button>
        <Button
          disabled={isDeleting}
          onClick={() => mutate({ teacherId, avatarDbUrl: avatar })}
          className=" text-red-400"
          type="xsSecondery"
          icon="delete"
        />
      </td>
    </tr>
  );
}

export default TeachersTable;
