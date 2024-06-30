import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getTableRowCount } from "../services/apiUtils";
import { useDispatch, useSelector } from "react-redux";
import { totalClasses } from "../class/classSlice";
import { totalTeachers } from "../teacher/teacherSlice";
import {
  totalGrades,
  totalHalls,
  totalOptions,
  totalSubjects,
} from "../option/optionSclice";

function Card() {
  const dispatch = useDispatch();
  const { totalClasses: classes } = useSelector((store) => store.class);
  const { totalTeachers: teachers } = useSelector((store) => store.teacher);
  const { totalOptions: options } = useSelector((store) => store.options);
  useEffect(() => {
    async function getCounts() {
      const classes = await getTableRowCount("classes");
      const teachers = await getTableRowCount("teachers");
      const halls = await getTableRowCount("halls");
      const subjects = await getTableRowCount("subjects");
      const grades = await getTableRowCount("grades");
      dispatch(totalClasses(classes));
      dispatch(totalTeachers(teachers));
      dispatch(totalHalls(halls));
      dispatch(totalSubjects(subjects));
      dispatch(totalGrades(grades));
      dispatch(totalOptions(halls + subjects + grades));
    }
    getCounts();
  }, [dispatch]);

  const cardsData = [
    {
      title: "classes",
      count: classes,
      to: "/app/classes",
      icon: "school",
    },
    {
      title: "Teachers",
      count: teachers,
      to: "/app/teachers",
      icon: "groups",
    },
    {
      title: "Options",
      count: options,
      to: "/app/options",
      icon: "style",
    },
  ];

  return (
    <div className="mt-4 flex gap-2">
      {cardsData.map((card, index) => {
        return <CardItem cardData={card} key={index} />;
      })}
    </div>
  );
}

function CardItem({ cardData }) {
  const { title, count, to, icon } = cardData;
  return (
    <div
      className="  grow rounded border border-b-4 border-slate-700
    border-b-blue-600  bg-dark-secondery p-4  px-6 shadow-md"
    >
      <div className="flex justify-between ">
        <span className=" material-symbols-outlined scale-150 text-blue-500">
          {icon}
        </span>
        <div className=" text-xl  uppercase">{title}</div>
      </div>
      <div className=" mt-2 h-px w-full bg-slate-300 opacity-50"></div>
      <div className="mt-4 flex justify-between">
        <div className=" text-2xl font-bold opacity-75">
          {String(count).padStart(2, "0")}
        </div>
        <Link
          to={to}
          className=" flex items-center gap-px rounded-full 
     bg-blue-600 py-1 pl-4 pr-2 text-sm shadow"
        >
          View
          <span className=" material-symbols-outlined scale-75">
            arrow_right_alt
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Card;
