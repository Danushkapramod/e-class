import useSetRoot from '../utils/setRoot';
import useTeachers from './useTeachers';
import { useNavigate } from 'react-router-dom';
import SelectItem from '../ui/components/SelectItem';
import { useDispatch, useSelector } from 'react-redux';
import AppNav from '../ui/layouts/AppNav';
import { setTableView } from './teacherSlice';
import useClientSearch from '../hooks/useClientSearch';
import { Button } from '../ui/components/ButtonNew';
import DataLoader from '../ui/components/DataLoader';
import DeleteConfirmation from '../ui/components/DeleteConfirmation';
import { setDeleteConfirmation } from '../GlobalUiState';
import useHide from '../user/useHide';

function TeachersTable() {
  useSetRoot('');

  const { tableView } = useSelector((store) => store.teacher);
  const { teachers: data, isLoading, error } = useTeachers();
  const { searchResults: teachers, setQuery } = useClientSearch(data, {
    type: 'obj',
    valueName: 'name',
  });

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
          <DataLoader
            data={teachers?.map((teacherData) => {
              return <CardItem teacherData={teacherData} key={teacherData._id} />;
            })}
            isLoading={isLoading}
            error={error}
            options={{ grid: true }}
          />
        </div>
      ) : (
        <div className="mt-2 overflow-hidden rounded border border-bg--primary-200 shadow">
          <table className="w-full px-2">
            <thead>
              <tr className=" text-text--secondery">
                <th className=" "></th>
                <th className="  px-2 py-3 text-left">Teacher</th>
                <th className="  px-2 text-left">Sybject</th>
                <th className="  px-2 text-left">Phone</th>
                <th className="  px-2 text-left"></th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-border-4 bg-bg--primary-200">
              <DataLoader
                data={teachers?.map((teacherData) => {
                  return <TableRow teacherData={teacherData} key={teacherData._id} />;
                })}
                isLoading={isLoading}
                error={error}
                options={{ colSpan: '5' }}
              />
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function CardItem({ teacherData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { deleteConfirmation } = useSelector((store) => store.global);
  const { _id, name, subject, avatar, phone } = teacherData;
  const { mutate: hide, isPending: isDeleting } = useHide('teachers');

  function onSelectHandler(selected) {
    if (selected === 'update') {
      navigate(`/app/teachers/${_id}/update`);
    }
    if (selected === 'view') {
      navigate(`/app/teachers/${_id}`);
    }
    if (selected === 'delete') {
      dispatch(setDeleteConfirmation(_id));
    }
  }
  const handleDelete = () => {
    hide({ endPoit: 'teachers/hide', idList: [deleteConfirmation] });
    dispatch(setDeleteConfirmation(null));
  };

  return (
    <div
      className="relative flex min-h-64 flex-grow flex-col items-center rounded-lg border border-b-4 
      border-bg--primary-100 border-b-bg--secondery-2 bg-bg--primary-200 px-2 py-4 text-text--secondery shadow-md "
    >
      <div className="absolute right-2 top-2 z-30">
        <SelectItem
          btn={<span className=" material-symbols-outlined scale-[80%]">more_vert</span>}
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
      <DeleteConfirmation
        show={deleteConfirmation}
        onClose={() => dispatch(setDeleteConfirmation(null))}
        onConfirm={handleDelete}
      />
    </div>
  );
}

function TableRow({ teacherData }) {
  const dispatch = useDispatch();
  const { deleteConfirmation } = useSelector((store) => store.global);
  const { mutate: hide, isPending: isDeleting } = useHide('teachers');
  const { _id, name, subject, avatar, phone } = teacherData;

  const handleDelete = () => {
    hide({ endPoit: 'teachers/hide', idList: [deleteConfirmation] });
    dispatch(setDeleteConfirmation(null));
  };
  return (
    <>
      <tr>
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
          <Button to={`${_id}/update`} variant="outline" size="xs" label="UPDATE" icon="edit" />
          <Button to={`${_id}`} variant="outline" size="xs" icon="wysiwyg" label="VIEW" />
          <Button
            variant="outline"
            disabled={isDeleting}
            onClick={() => dispatch(setDeleteConfirmation(_id))}
            size="xs"
            icon="delete"
          />
        </td>
      </tr>
      <DeleteConfirmation
        show={deleteConfirmation}
        onClose={() => dispatch(setDeleteConfirmation(null))}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default TeachersTable;
