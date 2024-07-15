import { useEffect, useState } from 'react';
import Filters from '../ui/components/Filters';
import { useSearchParams } from 'react-router-dom';
import FilterField from '../ui/components/FilterField';
import useSubjects from '../option/useSubjects';

//const subjects = ['Physics', 'Chemistry', 'Maths', 'Biology', 'ICT'];

export function TeacherFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { subjects } = useSubjects();
  const [filterCount, setFilterCount] = useState(null);
  const subjectFilterValue = searchParams.getAll('subject');
  const [subject, setSubject] = useState(subjectFilterValue);

  useEffect(() => {
    setFilterCount(subject.length);
  }, [subject]);

  function filterHandler() {
    setSearchParams({ subject: subject.map((sub) => sub.toLowerCase()) });
  }

  function reset() {
    setSearchParams({});
    setFilterCount(null);
    setSubject([]);
  }
  return (
    <Filters filterCount={filterCount} onFilterHandler={filterHandler} reset={reset}>
      <FilterField
        data={subjects?.map((subject) => subject.subjectName)}
        name="Subject"
        value={subject}
        setValu={setSubject}
      />
    </Filters>
  );
}
