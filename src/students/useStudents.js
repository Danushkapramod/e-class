
import { getAllStudents, getStudents, getStudentsCount } from "../services/apiStudents";
import useBackendSearch from "../hooks/useBackendSearch";
import { useCallback, useContext, useEffect, useMemo, useState} from "react";
import { StdTableContext } from './TableContext';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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
  const{ state } = useContext(StdTableContext);

  const query = useMemo(()=>{ return {
    ...state.filterQuery, ...state.searchQuery, ...state.paginationQuery}}
    ,[state]
  )

  const {data: students, isLoading,isSuccess, error} =  useQuery({
    queryKey: ['students',classId, query],
    queryFn:({signal})=> getStudents({query,classId, signal})
  })
  return { students, isSuccess, isLoading, error };
}
