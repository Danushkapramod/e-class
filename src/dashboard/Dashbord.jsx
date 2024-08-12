//import { test } from "../test";
import Example from '../ui/components/PieChartWithPaddingAngle';
import Card from './Card';
import TodayClasses from './TodayClasses';

function Dashbord() {
  return (
    <div className=" mt flex flex-col ">
      <div className="text-2xl text-text--secondery">Dashbord</div>
      <div className=" mx-auto flex w-full max-w-[1400px] flex-col items-stretch">
        <Card />
        <div className="mt-6 flex gap-2">
          <TodayClasses />
          <Example />
        </div>
      </div>
    </div>
  );
}

export default Dashbord;
