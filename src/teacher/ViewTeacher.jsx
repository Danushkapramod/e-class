import { useNavigate, useParams } from 'react-router-dom';
import SelectItem from '../ui/components/SelectItem';
import Spinner from '../ui/components/Spinner';
import Error from '../ui/components/Error';
import useSetRoot from '../utils/setRoot';
import useDeleteTeacher from './useDeleteTeacher';
import useClasses from '../class/useClasses';
import useTeachers from './useTeachers';
import moment from 'moment/moment';
import useDeleteClass from '../class/useDeleteClass';
import DataLoader from '../ui/components/DataLoader';
import { useMemo } from 'react';

function ViewTeacher() {
  useSetRoot('view');
  const { id: teacherId } = useParams();
  const navigate = useNavigate();
  const { isDeleting, mutate } = useDeleteTeacher();
  const { teachers, isLoading, error } = useTeachers();
  const {
    classes,
    isLoading: classesisLoading,
    error: classesError,
  } = useClasses({ teacher: true });

  const teacherData = useMemo(() => {
    if (!teachers) return;
    return teachers.find((teacherData) => {
      return teacherData._id === teacherId;
    });
  }, [teacherId, teachers]);

  const classesData = useMemo(() => {
    if (!classes) return;
    return classes.filter((classData) => {
      return classData.teacher?._id === teacherData?._id;
    });
  }, [classes, teacherData?._id]);

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMsg={error.message} />;

  const { name, subject, phone, avatar } = teacherData || {};
  function onSelectHandler(selected) {
    if (selected === 'update') {
      navigate(`/app/teachers/${teacherId}/update`);
    }
    if (selected === 'delete') {
      mutate(teacherId);
      navigate(-1);
    }
  }

  return (
    <div className="mt-4 flex flex-wrap items-start gap-4">
      <div
        className=" relative flex w-full max-w-[30rem] flex-col items-center rounded-md border 
          border-bg--primary-100 p-8 shadow"
      >
        <div
          className=" items-centerw-32 flex aspect-square h-40 justify-center
         overflow-hidden rounded-full border-2 border-slate-300"
        >
          <img
            className="h-full object-cover"
            src={
              avatar
                ? avatar
                : 'https://kjvgesvqoblnntmvqaid.supabase.co/storage/v1/object/public/teacher-avatars/Darshana%20kulathilaka_lmH0A2Ftjn.png'
            }
          ></img>
        </div>

        <div className=" absolute right-4 top-4">
          <SelectItem
            btn="more_vert"
            disabled={isDeleting}
            onClick={onSelectHandler}
            items={[
              ['update', 'edit'],
              ['delete', 'delete'],
            ]}
          />
        </div>

        <div className="mt-8 flex w-full flex-col divide-y  divide-bg--primary-100 text-lg">
          <div className="flex w-full items-center justify-between px-2 py-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined scale-90 font-thin">person</span>
              <div className=" ">Teacher</div>
            </div>
            <div className=" basis-[62%]  capitalize">{name}</div>
          </div>

          <div className="flex w-full items-center justify-between   px-2 py-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined scale-90 font-thin">subject</span>
              <div>Subject</div>
            </div>
            <div className=" basis-[62%] capitalize">{subject}</div>
          </div>

          <div className="  flex w-full items-center justify-between   px-2 py-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined scale-90 font-thin">call</span>
              <div>Phone</div>
            </div>
            <div className=" basis-[62%] ">{phone}</div>
          </div>
        </div>
      </div>

      <div className=" max-w-[30rem] grow rounded-md border border-bg--primary-100 p-4 shadow-md ">
        <div className=" uppercase opacity-60">Classes</div>
        <ul className="mt-2 divide-y divide-border-2 overflow-hidden rounded bg-bg--primary-200 ">
          <DataLoader
            data={
              classesData.length > 0 ? (
                classesData.map((classData, index) => {
                  return <ClassItem classData={classData} key={index} />;
                })
              ) : (
                <div className="px-2 py-2">No classes yet</div>
              )
            }
            isLoading={classesisLoading}
            error={classesError}
          />
        </ul>
      </div>
    </div>
  );
}

function ClassItem({ classData }) {
  const navigate = useNavigate();
  const { isDeleting, mutate } = useDeleteClass();
  const {
    _id: classId,
    hall: hallNumber,
    avatar: class_poster,
    grade,
    startTime: classTime,
    day: classDay,
  } = classData;

  const formattedclassTime = moment('2000-01-01T' + classTime + 'Z').format('LT');

  function onSelectHandler(selected) {
    if (selected === 'update') {
      navigate(`/app/classes/${classId}/update`);
    }
    if (selected === 'view') {
      navigate(`/app/classes/${classId}`);
    }
    if (selected === 'delete') {
      mutate(classId);
    }
  }
  return (
    <li
      className=" flex h-fit justify-between   
    "
    >
      <div className="flex">
        <div className="flex aspect-square h-24 items-center justify-center overflow-hidden">
          <img className="  h-full object-cover " src={class_poster} alt="class-avatar" />
        </div>
        <div className="flex flex-col  p-2">
          <div className="  capitalize ">Grade {grade}</div>
          <div className=" mt-auto flex flex-col text-sm opacity-80">
            <span>{hallNumber}</span>
            <span>
              {classDay} {formattedclassTime}
            </span>
          </div>
        </div>
      </div>
      <div className="z-50 mr-9 mt-2">
        <div className=" absolute z-50">
          <SelectItem
            disabled={isDeleting}
            btn="more_vert"
            onClick={onSelectHandler}
            items={[
              ['update', 'edit'],
              ['delete', 'delete'],
              ['view', 'wysiwyg'],
            ]}
          />
        </div>
      </div>
    </li>
  );
}
export default ViewTeacher;
