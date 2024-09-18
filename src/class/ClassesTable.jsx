import useClasses from './useClasses';
import SelectItem from '../ui/components/SelectItem';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPagginationQuery, setTableView } from './classSlice';
import AppNav from '../ui/layouts/AppNav';
import { getClassesCount } from '../services/apiClasses';
import { useEffect, useRef } from 'react';
import { Button } from '../ui/components/ButtonNew';
import { formatLocalTime } from '../utils/formateDates&Times';
import DataLoader from '../ui/components/DataLoader';
import DeleteConfirmation from '../ui/components/DeleteConfirmation';
import { setDeleteConfirmation } from '../GlobalUiState';
import Exports from '../ui/components/Exports';
import useHide from '../user/useHide';
import { useQuery } from '@tanstack/react-query';
import { ClassFilter, ClassSearch, ClassSort } from './ClassTableOperations';
import usePagginationNew from '../ui/hookComponents/usePagginationNew';
import PagginationNew from '../ui/components/PagginationNew';

export default function ClassesTable() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isCreateClassOpen, tableView } = useSelector((store) => store.class);
  const { classes, isLoading, error } = useClasses({ teacher: true });

  useEffect(() => {
    if (!isCreateClassOpen) return;
    navigate('new');
  }, [isCreateClassOpen, navigate]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-end">
          <div className=" text-2xl text-text--secondery">Classes</div>
          <span className=" text-base font-normal uppercase opacity-70">{id}</span>
        </div>

        <div className=" flex items-end gap-2">
          <Exports category="class" buttonSize="base" />
          <Button to="new" icon="add" label="ADD CLASS" />
        </div>
      </div>
      <Nav />
      {tableView === 'card' ? (
        <div className=" mt-2 grid grow grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-2  rounded ">
          <DataLoader
            data={classes?.map((classData) => {
              return <CardItem classData={classData} key={classData._id} />;
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
              <tr className="  text-text--secondery">
                <th className=" rounded "></th>
                <th className="  px-2 py-3 text-left">Subject</th>
                <th className="  px-2 text-left">Teacher</th>
                <th className="  px-2 text-left">Grade</th>
                <th className="  px-2 text-left">Hall</th>
                <th className="  px-2 text-left">Day</th>
                <th className="  px-2 text-left">Time</th>
                <th className="  px-2 text-left"></th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-border-4 bg-bg--primary-200">
              <DataLoader
                data={classes?.map((classData) => {
                  return <TableRow classData={classData} key={classData._id} />;
                })}
                isLoading={isLoading}
                error={error}
                options={{ colSpan: '8' }}
              />
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function Nav() {
  const dispatch = useDispatch();
  const { tableView } = useSelector((store) => store.class);
  const { setPage, page, limit, setLimit } = usePagginationNew({
    setFun: (query) => dispatch(setPagginationQuery(query)),
  });

  const { data: classesCount } = useQuery({
    queryKey: ['classesCount'],
    queryFn: () => getClassesCount(),
  });

  function handleView() {
    if (tableView === 'list') dispatch(setTableView('card'));
    if (tableView === 'card') dispatch(setTableView('list'));
  }
  return (
    <AppNav>
      <AppNav.Left>
        <ClassSearch />
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
        <Button
          onClick={handleView}
          variant="outline"
          size="sm"
          icon={tableView === 'list' ? 'format_list_bulleted' : 'grid_view'}
        />
      </AppNav.Right>
    </AppNav>
  );
}

function CardItem({ classData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { deleteConfirmation } = useSelector((store) => store.global);
  const { mutate: hide, isPending: isDeleting } = useHide('classes');
  const { _id, teacher, subject, avatar, hall, startTime, grade, day } = classData;
  const hiddenId = useRef(_id);

  function onSelectHandler(selected) {
    if (selected === 'update') {
      navigate(`/app/classes/${_id}/update`);
    }
    if (selected === 'view') {
      navigate(`/app/classes/${_id}`);
    }
    if (selected === 'delete') {
      hiddenId.current = _id;
      dispatch(setDeleteConfirmation(_id));
    }
  }
  const handleDelete = () => {
    hide({ endPoit: 'classes/hide', idList: [deleteConfirmation] });
    dispatch(setDeleteConfirmation(null));
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
          btn={
            <span className=" material-symbols-outlined flex scale-[80%] items-center">
              more_vert
            </span>
          }
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
        onClose={() => dispatch(setDeleteConfirmation(null))}
        onConfirm={handleDelete}
      />
    </div>
  );
}

function TableRow({ classData }) {
  const dispatch = useDispatch();
  const { deleteConfirmation } = useSelector((store) => store.global);
  const { mutate: hide } = useHide('classes');
  const { _id, teacher, subject, avatar, hall, startTime, grade, day } = classData;

  const handleDelete = () => {
    hide({ endPoit: 'classes/hide', idList: [deleteConfirmation] });
    dispatch(setDeleteConfirmation(null));
  };

  return (
    <>
      <tr>
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
              onClick={() => dispatch(setDeleteConfirmation(_id))}
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
        onClose={() => dispatch(setDeleteConfirmation(null))}
        onConfirm={handleDelete}
      />
    </>
  );
}
