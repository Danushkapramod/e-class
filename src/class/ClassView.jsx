import { useNavigate, useParams } from 'react-router-dom';
import SelectItem from '../ui/components/SelectItem';
import Spinner from '../ui/components/Spinner';
import Error from '../ui/components/Error';
import useSetRoot from '../utils/setRoot';
import useDeleteClass from './useDeleteClass';
import useClasses from './useClasses';
import StudentTable from '../students/StudentTable';
import { useMemo } from 'react';
import { Button } from '../ui/components/ButtonNew';
import { formatLocalTime } from '../utils/formateDates&Times';

function ClassView() {
  useSetRoot('view');
  const { id } = useParams();
  const navigate = useNavigate();

  const { isDeleting, mutate } = useDeleteClass();
  const { classes, error, isLoading } = useClasses();

  const classData = useMemo(() => {
    return classes?.find((classData) => classData._id === id);
  }, [classes, id]);

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMsg={error.message} />;

  const { subject, teacher, duration, avatar, charging, hall, startTime, grade, day } = classData;

  function onSelectHandler(selected) {
    if (selected === 'update') {
      navigate(`/app/classes/${id}/update`);
    }
    if (selected === 'delete') {
      mutate(id);
      navigate(-1);
    }
  }

  return (
    <div className="mt-2">
      <div className=" mb-4 flex h-[5.625rem] w-full gap-4 rounded bg-bg--primary-200 p-2 shadow-md">
        <img className=" aspect-square h-full overflow-hidden" src={avatar} alt="avatar" />
        <div className="flex grow flex-col justify-between text-sm capitalize">
          <div className="flex">
            <span className=" basis-20">Subject </span> <span>: {subject}</span>
          </div>
          <div className="flex">
            <span className=" basis-20">Teacher</span>{' '}
            <span className=" flex items-center gap-1">
              :{' '}
              <Button
                to={`/app/teachers/${teacher?._id}`}
                label={teacher?.name}
                size="link"
                variant="link"
              />
            </span>
          </div>
          <div className="flex">
            <span className=" basis-20">Grade</span> <span>: {grade}</span>
          </div>
        </div>

        <div className=" flex grow flex-col justify-between text-sm">
          <div className=" flex">
            <span className=" basis-14">Hall</span> <span>: {hall}</span>
          </div>
          <div className="flex capitalize">
            <span className=" basis-14">Date</span> <span>: {day}</span>
          </div>
          <div className="flex">
            <span className=" basis-14">Time</span> <span>: {formatLocalTime(startTime)}</span>
          </div>
        </div>

        <div className=" flex grow flex-col justify-between text-sm">
          <div className=" flex">
            <span className=" basis-20">Duration </span> <span>: {duration} hours</span>
          </div>
          <div className="flex">
            <span className=" basis-20">Charging </span> <span>: LKR {charging}</span>
          </div>
          <div className="flex">
            <span className=" basis-20"></span> <span></span>
          </div>
        </div>
        <SelectItem
          disabled={isDeleting}
          onClick={onSelectHandler}
          btn="more_vert"
          buttonType="xsSecondery"
          items={[
            ['update', 'edit'],
            ['delete', 'delete'],
          ]}
        />
      </div>

      <StudentTable />
    </div>
  );
}

export default ClassView;

{
  /* <div
        className=" relative flex min-w-[24rem] max-w-[28rem] grow  flex-col items-center 
           rounded-md bg-bg--primary-200 p-8 shadow-md "
      >
        <div
          className="items-centerw-24  flex h-24 w-24 justify-center overflow-hidden
         rounded-full border-2 border-slate-300"
        >
          <img className="h-full object-cover" src={class_poster}></img>
        </div>

        <div className=" absolute right-4 top-4">
          <SelectItem
            disabled={isDeleting}
            onClick={onSelectHandler}
            items={[
              ['update', 'edit'],
              ['delete', 'delete'],
            ]}
          />
        </div>

        <div className=" mt-4 flex w-full flex-col divide-y divide-bg--primary-100">
          <div className="flex w-full  items-center justify-between   px-2 py-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined scale-90 font-thin">subject</span>
              <div>Subject</div>
            </div>
            <div className=" basis-[62%] capitalize">{subject}</div>
          </div>
          <div className="flex w-full items-center justify-between px-2 py-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined scale-90 font-thin">person</span>
              <div>Teacher</div>
            </div>

            <div className=" basis-[62%] capitalize">
              <Button to={`/app/teachers/${teacher?._id}`} icon="east" type="link">
                {teacher?.name}
              </Button>
            </div>
          </div>
          <div className="  flex w-full items-center justify-between   px-2 py-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined scale-90 font-thin">grade</span>
              <div>Grade</div>
            </div>

            <div className=" basis-[62%] ">{grade}</div>
          </div>

          <div className="  flex w-full items-center justify-between   px-2 py-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined scale-90 font-thin">house</span>
              <div>Hall</div>
            </div>
            <div className="basis-[62%]">{hallNumber}</div>
          </div>
          <div className="  flex w-full items-center justify-between   px-2 py-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined scale-90 font-thin">today</span>
              <div>Day</div>
            </div>
            <div className=" basis-[62%] capitalize">{classDay}</div>
          </div>
          <div className="  flex w-full items-center justify-between   px-2 py-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined scale-90 font-thin">schedule</span>
              <div>Time</div>
            </div>
            <div className="basis-[62%]">{formatedclassTime}</div>
          </div>
          <div className="  flex w-full items-center justify-between   px-2 py-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined scale-90 font-thin">timelapse</span>
              <div>Duraation</div>
            </div>
            <div className="basis-[62%]">{duration} Hours</div>
          </div>
        </div>
      </div> */
}
