import moment from "moment";
import useClasses from "../class/useClasses";
import Button from "../ui/components/Button";
import ButtonList from "../ui/components/ButtonList";
import { useEffect, useState } from "react";
import Error from "../ui/components/Error";
import { FadeLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import {
  todayEnded,
  todayStarted,
  todayTotal,
  todayUpcoming,
} from "../class/classSlice";

function TodayClasses() {
  const dispatch = useDispatch();

  const [newClassesArray, setNwClassesArray] = useState([]);
  const { classes, isLoading, error } = useClasses();
  dispatch(todayTotal(classes?.length));

  const [status, setStatus] = useState("all");
  function listButtonHandler(e) {
    if (e.target.id === "UPCOMING") {
      setStatus("upcoming");
    }
    if (e.target.id === "STARTED") {
      setStatus("started");
    }
    if (e.target.id === "ENDED") {
      setStatus("ended");
    }
    if (e.target.id === "ALL") {
      setStatus("all");
    }
  }

  useEffect(() => {
    const now = new Date();
    const newClassesArray = [];
    if (isLoading) return;

    classes.map((classData) => {
      const { startTime, duration } = classData;
      const classStartTime = new Date(
        `${new Date().toDateString()} ${startTime} GMT+0530 (India Standard Time)`,
      );
      const classEndTime = new Date(classStartTime);
      classEndTime.setTime(classEndTime.getTime() + duration * 3600 * 1000);

      if (now < classStartTime) {
        newClassesArray.push({ ...classData, status: "upcoming" });
      }
      if (classEndTime > now && now > classStartTime) {
        newClassesArray.push({ ...classData, status: "started" });
      }
      if (now > classEndTime) {
        newClassesArray.push({ ...classData, status: "ended" });
      }
    });
    setNwClassesArray(newClassesArray);
  }, [classes, isLoading]);

  useEffect(() => {
    if (!newClassesArray) return;

    dispatch(
      todayUpcoming(
        newClassesArray.filter((item) => item.status === "upcoming").length,
      ),
    );
    dispatch(
      todayStarted(
        newClassesArray.filter((item) => item.status === "started").length,
      ),
    );
    dispatch(
      todayEnded(
        newClassesArray.filter((item) => item.status === "ended").length,
      ),
    );
  }, [dispatch, newClassesArray]);

  return (
    <div className=" min-w-[42rem] grow rounded-md  border border-slate-800 p-4  pb-6  shadow-lg ">
      <div className=" flex items-center justify-between">
        <p className=" text-lg ">
          TODAY{"  "}
          <span className=" text-xs opacity-60">
            {new Date().toDateString()}
          </span>{" "}
        </p>
        <ButtonList
          data={[
            { label: "ALL" },
            { label: "UPCOMING" },
            { label: "STARTED" },
            { label: "ENDED" },
          ]}
          onClick={listButtonHandler}
        ></ButtonList>
      </div>

      <div
        className="mt-4 h-72  overflow-auto rounded-md border
       border-slate-700 "
      >
        {!isLoading ? (
          !error ? (
            <table className=" w-full  px-2 ">
              <thead className="">
                <tr className=" sticky top-0 z-40  bg-slate-700  ">
                  <th className=" "></th>
                  <th className="  px-2 py-3 text-left font-medium">Subject</th>
                  <th className="  px-2 text-left font-medium">Grade</th>
                  <th className="  px-2 text-left font-medium">Hall</th>
                  <th className="  px-2 text-left font-medium">Time</th>
                  <th className="  px-2font-medium ">Status</th>
                  <th className="  px-2 text-left"></th>
                </tr>
              </thead>
              <tbody className="  divide-y divide-slate-600 ">
                {newClassesArray.map((classData, index) => {
                  return (
                    <Row
                      filterStatus={status}
                      key={index}
                      classData={classData}
                    />
                  );
                })}
              </tbody>
            </table>
          ) : (
            <Error errorMsg={error.message} />
          )
        ) : (
          <div
            className="  my-2 flex  h-[30px] scale-[45%]   
           justify-center"
          >
            <FadeLoader color="#FFFFFF" />
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ classData, filterStatus }) {
  const [bajColor, setBajColor] = useState("bg-blue-600");
  const { subject, status, grade, avatar, hallNumber, startTime } = classData;

  const formatedclassTime = moment
    .tz(`2000-01-01T${startTime}Z`, "")
    .format("hh:mm A");

  useEffect(() => {
    if (status === "upcoming") {
      setBajColor("bg-blue-600");
    }
    if (status === "started") {
      setBajColor("bg-green-600");
    }
    if (status === "ended") {
      setBajColor("bg-red-600");
    }
  }, [status]);

  return (
    (filterStatus === status || filterStatus === "all") && (
      <tr className=" bg-dark-secondery text-sm">
        <td className="  pl-4">
          <div className=" flex h-9 w-9 items-center justify-center overflow-hidden rounded-full">
            <img className="h-full object-cover" src={avatar} alt="" />
          </div>
        </td>
        <td className="  px-2 py-3">
          <span className=" line-clamp-1 max-w-36">{subject}</span>
        </td>
        <td className=" px-2 py-3">{grade}</td>
        <td className=" px-2 py-3">{hallNumber}</td>
        <td className=" px-2 py-3">{formatedclassTime}</td>
        <td className="  px-2 py-3 text-center">
          <span
            className={`rounded-full ${bajColor} px-2 py-1 text-xs uppercase `}
          >
            {status}
          </span>
        </td>
        <td className="  flex justify-end gap-2 px-2 py-3 pr-4">
          <Button type="xsSecondery" icon="more_vert" />
        </td>
      </tr>
    )
  );
}
export default TodayClasses;
