import { Link } from 'react-router-dom';

import useTotals from './useTotals';
function Card() {
  const { classes, teachers, subItems, students } = useTotals();

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
      title: 'Students',
      count: students,
      to: '/app/students',
      icon: 'settings_accessibility',
    },
    {
      title: 'Options',
      count: subItems?.subjects + subItems?.halls + subItems?.grades,
      to: '/app/options',
      icon: 'style',
    },
  ];

  return (
    <div className="mt-4 flex w-full gap-2">
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
