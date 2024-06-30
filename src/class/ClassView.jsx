import { useNavigate, useParams } from "react-router-dom";
import SelectItem from "../ui/components/SelectItem";
import Spinner from "../ui/components/Spinner";
import Error from "../ui/components/Error";
import moment from "moment";
import useSetRoot from "../utils/setRoot";
import useDeleteClass from "./useDeleteClass";
import Button from "../ui/components/Button";
import useClasses from "./useClasses";

function ClassView() {
  useSetRoot("view");
  const { id } = useParams();
  const navigate = useNavigate();

  const { isDeleting, mutate } = useDeleteClass();
  const { classes, error, isSuccess } = useClasses();
  if (!isSuccess) return <Spinner />;
  if (error) return <Error errorMsg={error.message} />;

  const classData = classes.filter((classData) => {
    return classData._id === id;
  });
  const {
    teacher,
    subject,
    duration,
    avatar: class_poster,
    hall: hallNumber,
    startTime: classTime,
    grade,
    day: classDay,
  } = classData[0];

  function onSelectHandler(e) {
    if (e.target.id === "update") {
      navigate(`/app/classes/${id}/update`);
    }
    if (e.target.id === "delete") {
      mutate(id);
      navigate(-1);
    }
  }

  const formatedclassTime = moment
    .tz(`2000-01-01T${classTime}Z`, "Asia")
    .format("hh:mm A");

  return (
    <>
      <div
        className=" relative mt-4 flex w-[28rem] flex-col items-center 
      rounded-lg border border-slate-700 bg-dark-primary p-8 "
      >
        <div
          className="items-centerw-24  flex h-24 w-24 justify-center overflow-hidden
         rounded-full  border-2 border-slate-300"
        >
          <img className="h-full object-cover" src={class_poster}></img>
        </div>

        <div className=" absolute right-4 top-4">
          <SelectItem
            disabled={isDeleting}
            onClick={onSelectHandler}
            items={[
              ["update", "edit"],
              ["delete", "delete"],
            ]}
          />
        </div>

        <div className=" mt-4 flex w-full flex-col  divide-y   divide-slate-700">
          <div className="flex w-full items-center justify-between   px-2 py-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined scale-90 font-thin">
                subject
              </span>
              <div>Subject</div>
            </div>
            <div className=" basis-[62%] capitalize">{subject}</div>
          </div>
          <div className="flex w-full items-center justify-between px-2 py-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined scale-90 font-thin">
                person
              </span>
              <div>Teacher</div>
            </div>

            <div className=" basis-[62%] capitalize">
              <Button
                to={`/app/teachers/${teacher?._id}`}
                icon="east"
                type="link"
              >
                {teacher?.name}
              </Button>
            </div>
          </div>
          <div className="  flex w-full items-center justify-between   px-2 py-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined scale-90 font-thin">
                grade
              </span>
              <div>Grade</div>
            </div>

            <div className=" basis-[62%] ">{grade}</div>
          </div>

          <div className="  flex w-full items-center justify-between   px-2 py-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined scale-90 font-thin">
                house
              </span>
              <div>Hall</div>
            </div>
            <div className="basis-[62%]">{hallNumber}</div>
          </div>
          <div className="  flex w-full items-center justify-between   px-2 py-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined scale-90 font-thin">
                today
              </span>
              <div>Day</div>
            </div>
            <div className=" basis-[62%] capitalize">{classDay}</div>
          </div>
          <div className="  flex w-full items-center justify-between   px-2 py-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined scale-90 font-thin">
                schedule
              </span>
              <div>Time</div>
            </div>
            <div className="basis-[62%]">{formatedclassTime}</div>
          </div>
          <div className="  flex w-full items-center justify-between   px-2 py-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined scale-90 font-thin">
                timelapse
              </span>
              <div>Duraation</div>
            </div>
            <div className="basis-[62%]">{duration} Hours</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClassView;
