import { useEffect, useState } from "react";
import FilterField from "../ui/components/FilterField";
import Filters from "../ui/components/Filters";
import { useLocation, useSearchParams } from "react-router-dom";
import useTeachers from "../teacher/useTeachers";

import useGrades from "../option/useGrades";
import useHalls from "../option/useHalls";
import useSubjects from "../option/useSubjects";
import Sort from "../ui/components/Sort";
// const teachers = [
//   "Amila disanayake",
//   "Anurada perera",
//   "Kalum smpath",
//   "Sameera smpath",
// ];
// const subjects = ["Physics", "Chemistry", "Maths", "Biology", "ICT"];
// const grades = ["10", "11", "12", "13"];
// const halls = ["Hall-1", "Hall-2", "Hall-3", "Hall-4", "Hall-5"];
const days = [
  "Mondaya",
  "Tuesday",
  "Wednesday",
  "Tuesday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function ClassFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { teachers } = useTeachers({});
  const { subjects } = useSubjects();
  const { grades } = useGrades();
  const { halls } = useHalls();

  const [filterCount, setFilterCount] = useState(null);
  const subjectFilterValue = searchParams.getAll("subject");
  const teacherFilterValue = searchParams.getAll("teacher");
  const gradeFilterValue = searchParams.getAll("grade");
  const hallFilterValue = searchParams.getAll("hall");
  const dayFilterValue = searchParams.getAll("day");

  const [subject, setSubject] = useState(subjectFilterValue);
  const [teacher, setTeacher] = useState(teacherFilterValue);
  const [grade, setGrade] = useState(gradeFilterValue);
  const [hall, setHall] = useState(hallFilterValue);
  const [day, setDay] = useState(dayFilterValue);

  function filterHandler() {
    setSearchParams({
      teacher,
      subject,
      grade,
      hallNumber: hall,
      classDay: day,
    });
    setFilterCount([...teacher, ...subject, ...grade, ...hall, ...day].length);
  }

  function reset() {
    setSearchParams({});
    setFilterCount(null);
    setDay([]);
    setGrade([]);
    setHall([]);
    setSubject([]);
    setTeacher([]);
  }

  return (
    <Filters
      filterCount={filterCount}
      onFilterHandler={filterHandler}
      reset={reset}
    >
      <FilterField
        name="Subject"
        data={subjects?.map((subject) => subject.subjectName)}
        value={subject}
        setValu={setSubject}
      />

      <FilterField
        name="Teacher"
        data={teachers?.map((teacher) => teacher.name)}
        value={teacher}
        setValu={setTeacher}
      />

      <FilterField
        name="Grade"
        data={grades?.map((grade) => grade.gradeName)}
        value={grade}
        setValu={setGrade}
      />

      <FilterField
        name="Hall"
        data={halls?.map((hall) => hall.hallName)}
        value={hall}
        setValu={setHall}
      />

      <FilterField name="Day" data={days} value={day} setValu={setDay} />
    </Filters>
  );
}

export function ClassSort() {
  const location = useLocation({});
  const sortData = [
    {
      title: "None",
      sortBy: "none",
    },
    {
      title: "Sort by Time",
      sortBy: "classTime",
    },
    {
      title: "Sort by Day",
      sortBy: "classDay",
    },
    {
      title: "Sort by Hall",
      sortBy: "hallNumber",
    },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const [isSorted, setIsSorted] = useState(false);
  const sortValue = searchParams.get("sort");
  const [sort, setSort] = useState(sortValue);

  useEffect(() => {
    let existParamsString = location.search.split("?")[1];
    if (!sort || sort === "none") {
      existParamsString = existParamsString?.split("sort")[0];
      setSearchParams(existParamsString);
      setIsSorted(false);
    } else {
      if (location.search) {
        if (existParamsString?.includes("sort")) {
          existParamsString = existParamsString.split("sort")[0];
        }
        const newParamsString = `${existParamsString}&sort=${sort}`;
        setSearchParams(newParamsString);
        setIsSorted(true);
      } else {
        setSearchParams(`sort=${sort}`);
        setIsSorted(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  return <Sort sortData={sortData} isSorted={isSorted} setSort={setSort} />;
}
