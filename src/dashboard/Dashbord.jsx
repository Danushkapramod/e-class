//import { test } from "../test";
import Example from "../ui/components/PieChartWithPaddingAngle";
import Card from "./Card";
import TodayClasses from "./TodayClasses";

function Dashbord() {
  return (
    <div className=" flex flex-col ">
      <div className=" mt text-2xl  text-text--secondery">Dashbord</div>

      <Card />
      <div className="mt-6 flex gap-2">
        <TodayClasses />
        <Example />
      </div>
      {/* <div>
        <button onClick={()=>test}>Click</button>
      </div> */}
    </div>
  );
}

export default Dashbord;
