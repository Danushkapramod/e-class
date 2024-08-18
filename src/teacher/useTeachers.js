import { useQuery } from "@tanstack/react-query";
import { getTeachers } from "../services/apiTeachers";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setQueryParams } from "./teacherSlice";

export default function useTeachers(queries) {
  const dispatch = useDispatch() 
  const location = useLocation();
  const {queryParams} = useSelector((store)=>store.teacher)
  
  useEffect(()=>{
    if(queries || location.search){
      let query = queries || location.search
     dispatch(setQueryParams(query)) 
    }
  },[dispatch, location.search, queries])

  const {
    data: teachers,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["teachers", queryParams],
    queryFn: ({signal}) => getTeachers({signal,queryParams}),
  });
  return { teachers, isSuccess, isLoading, error };
}
