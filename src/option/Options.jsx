import OptionGrade from "./OptionGrade";
import OptionHall from "./OptionHall";
import OptionSubject from "./OptionSubject";

function Options() {
  return (
    <div className=" mt-4 flex flex-wrap justify-between gap-2 rounded p-2 ">
      <div className=" min-w-60 grow basis-1">
        <OptionSubject />
      </div>
      <div className=" min-w-60 grow basis-1">
        <OptionHall />
      </div>
      <div className=" min-w-60 grow basis-1">
        <OptionGrade />
      </div>
    </div>
  );
}

export default Options;
