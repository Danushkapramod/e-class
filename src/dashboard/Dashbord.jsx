import Example from "../ui/components/PieChartWithPaddingAngle";
import Card from "./Card";
import TodayClasses from "./TodayClasses";

function Dashbord() {
  return (
    <div className=" flex flex-col ">
      <div className=" mt text-2xl opacity-70">Dashbord</div>

      <Card />
      <div className="mt-6 flex gap-2">
        <TodayClasses />
        <Example />
      </div>
    </div>
  );
}

export default Dashbord;
