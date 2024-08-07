import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getStudents } from "../services/apiStudents";
import useBackendSearch from "../hooks/useBackendSearch";
import { useContext, useEffect } from "react";
import { StdTableContext } from './TableContext';
import { useDispatch } from "react-redux";

export default function useStudents(query) {
  const location = useLocation({});
  const queryParams = query || location.search;

  const {
    data: students,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["students", queryParams],
    queryFn: () => getStudents({ queryParams}),
  })

  return { students, isSuccess, isLoading, error };
}

export function useStudentsInTeacher(queries,classId) {
  const{updateStdOntable} = useContext(StdTableContext)
  const dispatch = useDispatch() 
  const queryList = [...queries]

  let query = '';
  for(let i = 0; i < queryList.length; i++){
    if(queryList[i]){
      query =  queryList[i] + '&' + query
    } 
  }
  const {data:students,isLoading,isSuccess, error,}= useBackendSearch({
    queryFn:getStudents,
    queryKey:'students',
    query:{query,classId}
    
  })
  useEffect(()=>{
    updateStdOntable(students?.length || 0)
  },[dispatch, students])

  return { students, isSuccess, isLoading, error };
}
