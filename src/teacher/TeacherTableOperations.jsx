import { useState } from "react";
import Filters from "../ui/components/Filters";
import { useSearchParams } from "react-router-dom";
import FilterField from "../ui/components/FilterField";
const subjects = ["Physics", "Chemistry", "Maths", "Biology", "ICT"];
export function TeacherFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filterCount, setFilterCount] = useState(null);
  const subjectFilterValue = searchParams.getAll("subject");
  const [subject, setSubject] = useState(subjectFilterValue);

  function filterHandler() {
    setSearchParams({ subject });
    setFilterCount([...subject].length);
  }

  function reset() {
    setSearchParams({});
    setFilterCount(null);
    setSubject([]);
  }
  return (
    <Filters
      filterCount={filterCount}
      onFilterHandler={filterHandler}
      reset={reset}
    >
      <FilterField
        name="Subject"
        data={subjects}
        value={subject}
        setValu={setSubject}
      />
    </Filters>
  );
}
