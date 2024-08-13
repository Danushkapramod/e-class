
import { getAllStudents, getStudents } from "../services/apiStudents";
import useBackendSearch from "../hooks/useBackendSearch";
import { useContext, useEffect } from "react";
import { StdTableContext } from './TableContext';
import { useDispatch } from "react-redux";

export function useAllStudents(queries) {
  const{updateStdOntable} = useContext(StdTableContext)
  const dispatch = useDispatch() 
  const queryList = [...queries]

  let query = '';
  for(let i = 0; i < queryList.length; i++){
    if(queryList[i]){
      query =  queryList[i] + '&' + query
    } 
  }
 // const location = useLocation({});
  //const queryParams = query || location.search;

  const {data:students,isLoading,isSuccess, error,}= useBackendSearch({
    queryFn:getAllStudents,
    queryKey:['students',query],
    query:query
    
  }) 
   useEffect(()=>{
    updateStdOntable(students?.length || 0)
  },[dispatch, students])
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
    queryKey:['students',classId,query],
    query:{query,classId}
    
  })
  useEffect(()=>{
    updateStdOntable(students?.length || 0)
  },[dispatch, students])

  return { students, isSuccess, isLoading, error };
}
