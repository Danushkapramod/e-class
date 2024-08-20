
import { getAllStudents, getStudents } from "../services/apiStudents";
import useBackendSearch from "../hooks/useBackendSearch";
import { useCallback, useContext, useEffect} from "react";
import { StdTableContext } from './TableContext';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setPaginationQuery } from "./studentSlice";

export function useAllStudents() {
  const dispatch = useDispatch(); 
  const{updateStdOntable:_updateStdOntable,state} = useContext(StdTableContext);
  const updateStdOntable = useCallback(()=>_updateStdOntable,[_updateStdOntable])
  
  const {data:students,isLoading,isSuccess, error,}= useBackendSearch({
    queryFn:getAllStudents,
    queryKey:['allStudents',state.query],
    query:state.query
  }) 
   useEffect(()=>{
    updateStdOntable(students?.length || 0)
  },[dispatch, students,updateStdOntable  ])
  return { students, isSuccess, isLoading, error };
}

export function useStudentsInTeacher() {
  const { id: classId } = useParams();
  const dispatch = useDispatch() 
  const{state} = useContext(StdTableContext);
  const {paginationQuery} = useSelector((store)=>store.student) 
  
  const query = [paginationQuery, state.filterQuery, state.searchQuery]
  .filter((query)=> (query.split('=')[1] !== 'undefined') && query !== '' ).join('&')
  
  useEffect(()=>{
    if(state.paginationQuery){
      dispatch(setPaginationQuery(state.paginationQuery)) 
    }
  },[dispatch, state.paginationQuery])

  const {data:students,isLoading,isSuccess, error}= useBackendSearch({
    queryFn:getStudents,
    queryKey:['students',classId,query],
    query:{query:query,classId}
  })
  return { students, isSuccess, isLoading, error };
}
