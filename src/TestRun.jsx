import moment from "moment";

function TestRun() {
  const classStartTime = new Date(
    `${new Date().toDateString()} ${classTime} GMT+0530 (India Standard Time)`,
  );
  console.log(classStartTime);

  return null;
}
export default TestRun;
