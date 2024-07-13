import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#41B06E', '#DD761C'];

export default function Example() {
  const { todayUpcoming, todayStarted, todayEnded, todayTotal } = useSelector(
    (store) => store.class
  );

  const data = [
    { name: `${todayUpcoming} Upcoming`, value: todayUpcoming },
    { name: `${todayStarted} Started`, value: todayStarted },
    { name: `${todayEnded}  Ended`, value: todayEnded },
  ];

  return (
    <div
      className="relative flex min-w-72 max-w-80 grow justify-center 
             rounded-lg  bg-bg--primary-200 p-2 shadow-md"
    >
      <div className=" absolute pt-2 text-lg font-medium uppercase">Classes Summery</div>
      <div className=" absolute  top-[42%] flex flex-col items-center  pt-2">
        Total <span>{todayTotal}</span>
      </div>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="55%"
            innerRadius={65}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={3}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} stroke={COLORS[index]} />
            ))}
          </Pie>

          <Legend iconSize={0} verticalAlign="bottom" iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
