import Spinner from "../ui/components/Spinner";
import Error from "../ui/components/Error";
import Button from "../ui/components/Button";
import useSetRoot from "../utils/setRoot";
import useTeachers from "./useTeachers";
import { useNavigate } from "react-router-dom";
import SelectItem from "../ui/components/SelectItem";
import { useSelector } from "react-redux";
import useDeleteTeacher from "./useDeleteTeacher";

function TeachersTable() {
  const { tableView } = useSelector((store) => store.teacher);
  useSetRoot("");

  const { teachers, isLoading, error } = useTeachers();
  if (isLoading) return <Spinner />;
  if (error) return <Error errorMsg={error.message} />;

  if (tableView === "card") {
    return (
      <div
        className=" mt-2 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))]
         rounded border
       border-slate-700 p-2 "
      >
        {teachers.map((teacherData, index) => {
          return <CardItem teacherData={teacherData} key={index} />;
        })}
      </div>
    );
  }

  if (tableView === "list") {
    return (
      <div className="mt-4 rounded border  border-slate-700">
        <table className="w-full divide-y divide-slate-600  px-2">
          <tr className="font-light opacity-70">
            <th className=" "></th>
            <th className="  px-2 py-3 text-left">Teacher</th>
            <th className="  px-2 text-left">Sybject</th>
            <th className="  px-2 text-left">Phone</th>
            <th className="  px-2 text-left"></th>
          </tr>
          {teachers.map((teacherData, index) => {
            return <TableRow teacherData={teacherData} key={index} />;
          })}
        </table>
      </div>
    );
  }
}

function CardItem({ teacherData }) {
  const navigate = useNavigate();
  const { isDeleting, mutate } = useDeleteTeacher();
  const { _id: teacherId, name, subject, avatar: image, phone } = teacherData;

  function onSelectHandler(e) {
    if (e.target.id === "update") {
      navigate(`/app/teachers/${teacherId}/update`);
    }
    if (e.target.id === "view") {
      navigate(`/app/teachers/${teacherId}`);
    }
    if (e.target.id === "delete") {
      mutate({ teacherId, avatarDbUrl: image });
    }
  }

  return (
    <div
      className="gr relative m-1 flex min-h-64 flex-grow 
                    flex-col items-center rounded  border  border-b-2
                 border-slate-700 border-b-blue-600 bg-dark-secondery 
                  px-2 py-4 shadow-md"
    >
      <div className=" absolute right-2 top-2 z-30">
        <SelectItem
          buttonType="xsSecondery"
          bg="bg-dark-primary"
          disabled={isDeleting}
          onClick={onSelectHandler}
          items={[
            ["update", "edit"],
            ["view", "wysiwyg"],
            ["delete", "delete"],
          ]}
        />
      </div>
      <div className=" h-24 w-24 overflow-hidden rounded-full border-2 border-slate-400">
        <img
          className="h-full object-cover"
          src={
            image
              ? image
              : "https://kjvgesvqoblnntmvqaid.supabase.co/storage/v1/object/public/teacher-avatars/Darshana%20kulathilaka_lmH0A2Ftjn.png"
          }
          alt="image"
        />
      </div>
      <p className=" mb-1 line-clamp-1 flex items-center gap-1 pt-2 ">
        <span className=" material-symbols-outlined scale-90 font-light ">
          person
        </span>
        <span className=" text-md pr-1">{name} </span>
      </p>
      <div className=" mt-2 space-y-1 text-center  ">
        <p className=" flex items-center gap-2 text-sm opacity-75">
          <span className=" material-symbols-outlined scale-90 font-light ">
            menu_book
          </span>
          {subject}
        </p>
        <p className=" flex items-center gap-2 text-sm opacity-75 ">
          <span className=" material-symbols-outlined scale-[60%]">call</span>
          {phone}
        </p>
      </div>
    </div>
  );
}

function TableRow({ teacherData }) {
  const { isDeleting, mutate } = useDeleteTeacher();
  const { teacherId, name, subject, image, phone } = teacherData;

  return (
    <tr className=" bg-dark-secondery">
      <td className="flex h-9 min-w-9 items-center justify-center overflow-hidden rounded-full pl-4">
        <img className="h-full object-cover" src={image} alt="" />
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
          onClick={() =>
            mutate({
              teacherId,
              avatarDbUrl: image,
            })
          }
          className=" text-red-400"
          type="xsSecondery"
          icon="delete"
        />
      </td>
    </tr>
  );
}

export default TeachersTable;
