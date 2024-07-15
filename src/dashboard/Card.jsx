import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { totalClasses } from '../class/classSlice';
import { totalTeachers } from '../teacher/teacherSlice';
import { totalGrades, totalHalls, totalOptions, totalSubjects } from '../option/optionSclice';
import { getTeachersCount } from '../services/apiTeachers';
import { getOptionsCount } from '../services/apiOptions';
import { getClassesCount } from '../services/apiClasses';

function Card() {
  const dispatch = useDispatch();
  const { totalClasses: classes } = useSelector((store) => store.class);
  const { totalTeachers: teachers } = useSelector((store) => store.teacher);
  const { totalOptions: options } = useSelector((store) => store.options);
  useEffect(() => {
    async function getCounts() {
      const classes = await getClassesCount();
      dispatch(totalClasses(classes));
      const teachers = await getTeachersCount();
      dispatch(totalTeachers(teachers));
      const halls = await getOptionsCount('hall');
      dispatch(totalHalls(halls));
      const subjects = await getOptionsCount('subject');
      dispatch(totalSubjects(subjects));
      const grades = await getOptionsCount('grade');
      dispatch(totalGrades(grades));
      dispatch(totalOptions(halls + subjects + grades));
    }
    getCounts();
  }, [dispatch]);

  const cardsData = [
    {
      title: 'classes',
      count: classes,
      to: '/app/classes',
      icon: 'school',
    },
    {
      title: 'Teachers',
      count: teachers,
      to: '/app/teachers',
      icon: 'groups',
    },
    {
      title: 'Options',
      count: options,
      to: '/app/options',
      icon: 'style',
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
      className="grow rounded-md border-b-4 border-b-bg--secondery-1
       bg-bg--primary-200 p-4 px-6 text-text--option-1 shadow-md"
    >
      <div className="flex justify-between ">
        <span className=" material-symbols-outlined  scale-150">{icon}</span>
        <div className=" text-xl uppercase ">{title}</div>
      </div>
      <div className=" mt-2 h-px  w-full bg-bg--secondery-1"></div>
      <div className="mt-4 flex justify-between">
        <div className=" text-2xl font-bold ">{String(count).padStart(2, '0')}</div>
        <Link
          to={to}
          className="flex items-center gap-px rounded-full bg-[#005fd8]
           py-1 pl-4 pr-2 text-sm text-white shadow"
        >
          View
          <span className=" material-symbols-outlined scale-75">arrow_right_alt</span>
        </Link>
      </div>
    </div>
  );
}

export default Card;
