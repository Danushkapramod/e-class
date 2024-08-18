import { useEffect, useState } from 'react';
import Filters from '../ui/components/Filters';
import { useSearchParams } from 'react-router-dom';
import FilterField from '../ui/components/FilterField';
import { Search } from '../ui/components/Search';
import useSubItems from '../option/useSubIttems';

//const subjects = ['Physics', 'Chemistry', 'Maths', 'Biology', 'ICT'];

export function TeacherFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: subjects } = useSubItems({ key: 'subjects', category: 'subject' });
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
        data={subjects?.map((subject) => subject.itemName)}
        name="Subject"
        value={subject}
        setValu={setSubject}
      />
    </Filters>
  );
}

export function TeacherSearch() {
  const searchFields = [
    { searchBy: 'Name', fieldName: 'name' },
    { searchBy: 'Subject', fieldName: 'subject' },
    { searchBy: 'Phone', fieldName: 'phone' },
  ];
  return <Search url initialSearchBy="name" searchFields={searchFields} />;
}
