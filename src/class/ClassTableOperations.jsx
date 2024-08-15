import { useEffect, useState } from 'react';
import FilterField from '../ui/components/FilterField';
import Filters from '../ui/components/Filters';
import { useLocation, useSearchParams } from 'react-router-dom';
import Sort from '../ui/components/Sort';
import useOptions from '../option/useOptions';
import { Search } from '../ui/components/Search';
// const teachers = [
//   "Amila disanayake",
//   "Anurada perera",
//   "Kalum smpath",
//   "Sameera smpath",
// ];
// const subjects = ["Physics", "Chemistry", "Maths", "Biology", "ICT"];
// const grades = ["10", "11", "12", "13"];
// const halls = ["Hall-1", "Hall-2", "Hall-3", "Hall-4", "Hall-5"];
const days = ['Mondaya', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function ClassFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { options: subjects } = useOptions('subject');
  const { options: grades } = useOptions('grade');
  const { options: halls } = useOptions('hall');

  const [filterCount, setFilterCount] = useState(null);
  const [subject, setSubject] = useState(searchParams.getAll('subject'));
  const [grade, setGrade] = useState(searchParams.getAll('grade'));
  const [hall, setHall] = useState(searchParams.getAll('hall'));
  const [day, setDay] = useState(searchParams.getAll('day'));

  useEffect(() => {
    setFilterCount([...subject, ...grade, ...hall, ...day].length);
  }, [subject, grade, hall, day]);

  function filterHandler() {
    setSearchParams({ subject, grade, hall, day });
  }

  function reset() {
    setSearchParams({});
    setFilterCount(null);
    setDay([]);
    setGrade([]);
    setHall([]);
    setSubject([]);
  }

  return (
    <Filters filterCount={filterCount} onFilterHandler={filterHandler} reset={reset}>
      <FilterField
        name="Subject"
        data={subjects?.map((subject) => subject.subjectName)}
        value={subject}
        setValu={setSubject}
      />

      {grades?.length > 0 && (
        <FilterField
          name="Grade"
          data={grades?.map((grade) => grade.gradeName)}
          value={grade}
          setValu={setGrade}
        />
      )}

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

export function ClassSearch() {
  const searchFields = [
    { searchBy: 'Subject', fieldName: 'subject' },
    { searchBy: 'Grade', fieldName: 'grade' },
    { searchBy: 'Hall', fieldName: 'hall' },
    { searchBy: 'Day', fieldName: 'day' },
    { searchBy: 'Duration', fieldName: 'duration' },
  ];
  return <Search url initialSearchBy="subject" searchFields={searchFields} />;
}

export function ClassSort() {
  const location = useLocation({});
  const sortData = [
    {
      title: 'None',
      sortBy: 'none',
    },
    {
      title: 'Sort by Time',
      sortBy: 'startTime',
    },
    {
      title: 'Sort by Day',
      sortBy: 'day',
    },
    {
      title: 'Sort by Hall',
      sortBy: 'hall',
    },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const [isSorted, setIsSorted] = useState(false);
  const sortValue = searchParams.get('sort');
  const [sort, setSort] = useState(sortValue);

  useEffect(() => {
    let existParamsString = location.search.split('?')[1];
    if (!sort || sort === 'none') {
      existParamsString = existParamsString?.split('sort')[0];
      setSearchParams(existParamsString);
      setIsSorted(false);
    } else {
      if (location.search) {
        if (existParamsString?.includes('sort')) {
          existParamsString = existParamsString.split('sort')[0];
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
