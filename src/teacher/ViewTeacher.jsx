import { useNavigate, useParams } from "react-router-dom";
import SelectItem from "../ui/components/SelectItem";
import Spinner from "../ui/components/Spinner";
import Error from "../ui/components/Error";
import useSetRoot from "../utils/setRoot";
import useDeleteTeacher from "./useDeleteTeacher";
import useClasses from "../class/useClasses";
import useTeachers from "./useTeachers";
import moment from "moment/moment";
import useDeleteClass from "../class/useDeleteClass";
import { FadeLoader } from "react-spinners";

function ViewTeacher() {
  useSetRoot("view");
  const { id: teacherId } = useParams();
  const navigate = useNavigate();
  const { isDeleting, mutate } = useDeleteTeacher();
  const { teachers, isLoading, error } = useTeachers();
  const {
    classes,
    isLoading: classesisLoading,
    error: classesError,
  } = useClasses();

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMsg={error.message} />;

  const teacherData = teachers.filter((teacherData) => {
    return teacherData._id === teacherId;
  });

  const classesData = classes?.filter((classData) => {
    return classData.teacher?._id === teacherData[0]?._id;
  });

  const { name, subject, phone, avatar } = teacherData[0];

  function onSelectHandler(e) {
    if (e.target.id === "update") {
      navigate(`/app/teachers/${teacherId}/update`);
    }
    if (e.target.id === "delete") {
      mutate(teacherId);
      navigate(-1);
    }
  }

  return (
    <div className="mt-4 flex flex-wrap items-start gap-4">
      <div
        className=" relative  flex w-[25rem] flex-col items-center 
      rounded-lg border border-slate-700 bg-dark-primary p-8 "
      >
        <div
          className=" items-centerw-32 flex h-32 w-32 justify-center
         overflow-hidden rounded-full border-2 border-slate-300"
        >
          <img
            className="h-full object-cover"
            src={
              avatar
                ? avatar
                : "https://kjvgesvqoblnntmvqaid.supabase.co/storage/v1/object/public/teacher-avatars/Darshana%20kulathilaka_lmH0A2Ftjn.png"
            }
          ></img>
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
          <div className="flex w-full items-center justify-between px-2 py-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined scale-90 font-thin">
                person
              </span>
              <div>Teacher</div>
            </div>
            <div className=" basis-[62%] capitalize">{name}</div>
          </div>

          <div className="flex w-full items-center justify-between   px-2 py-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined scale-90 font-thin">
                subject
              </span>
              <div>Subject</div>
            </div>
            <div className=" basis-[62%] capitalize">{subject}</div>
          </div>

          <div className="  flex w-full items-center justify-between   px-2 py-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined scale-90 font-thin">
                call
              </span>
              <div>Phone</div>
            </div>
            <div className=" basis-[62%] ">{phone}</div>
          </div>
        </div>
      </div>

      <div className=" max-w-[28rem] grow rounded-lg border border-slate-700 bg-dark-primary p-4 ">
        <div className=" uppercase opacity-60">Classes</div>
        <ul
          className="mt-2 divide-y-2 divide-slate-700 overflow-hidden
          rounded bg-white/10"
        >
          {!classesisLoading ? (
            classesError ? (
              classesError.message
            ) : !classesData?.length ? (
              <div className="px-2 py-2">No classes yet</div>
            ) : (
              classesData?.map((classData, index) => {
                return <ClassItem classData={classData} key={index} />;
              })
            )
          ) : (
            <div className=" my-2 flex h-[30px]  scale-[45%]  items-center justify-center">
              <FadeLoader color="#FFFFFF" />
            </div>
          )}
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

  const formattedclassTime = moment("2000-01-01T" + classTime + "Z").format(
    "LT",
  );

  function onSelectHandler(e) {
    if (e.target.id === "update") {
      navigate(`/app/classes/${classId}/update`);
    }
    if (e.target.id === "view") {
      navigate(`/app/classes/${classId}`);
    }
    if (e.target.id === "delete") {
      mutate(classId);
    }
  }
  return (
    <li
      className="  flex h-fit justify-between  
    "
    >
      <div className="flex">
        <div className="flex h-24 w-24  items-center justify-center overflow-hidden ">
          <img
            className="  h-full object-cover "
            src={class_poster}
            alt="class-avatar"
          />
        </div>
        <div className="flex flex-col  p-2">
          <div className=" text-lg capitalize ">Grade {grade}</div>
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
            buttonType="xsSecondery"
            bg="bg-dark-primary"
            onClick={onSelectHandler}
            items={[
              ["update", "edit"],
              ["delete", "delete"],
              ["view", "wysiwyg"],
            ]}
          />
        </div>
      </div>
    </li>
  );
}
export default ViewTeacher;
