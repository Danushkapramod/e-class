
import { getAllStudents, getStudents } from "../services/apiStudents";
import { useContext, useMemo } from "react";
import { StdTableContext } from './TableContext';
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function useAllStudents() {
  const{ state } = useContext(StdTableContext);

  const query = useMemo(()=>{ return {
    ...state.filterQuery, ...state.searchQuery, ...state.paginationQuery1}}
    ,[state,]
  )
  const {data: students, isLoading,isSuccess, error} =  useQuery({
    queryKey: ['students', 'allStudents', query],
    queryFn:({signal})=> getAllStudents({query, signal})
  })
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
