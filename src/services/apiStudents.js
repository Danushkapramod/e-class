import axios from "axios";
import { BASE_URL } from "./apiData";
import { axiousWrapper } from "../utils/wrappers";

export const createStudent = axiousWrapper((stdData)=>{
    return axios.post(`${BASE_URL}/students`, stdData,{
      withCredentials:true,
      timeout:10000
    });
})

export const getStudents = axiousWrapper(({query:{query,classId},signal})=>{
    let queryParams;
    query ? (queryParams = `?${query}`) : (queryParams = "");

      return axios.get(`${BASE_URL}/students/${classId}${queryParams}`,{
      withCredentials:true,
      signal,
      timeout:6000
    })
 }) 
 export const getAllStudents = axiousWrapper(({query,signal})=>{
  let queryParams;
  query ? (queryParams = `?${query}`) : (queryParams = "");

    return axios.get(`${BASE_URL}/students${queryParams}`,{
    withCredentials:true,
    signal,
    timeout:6000
  })
}) 
export const updateStudent = axiousWrapper(({studentId, newData })=>{
  return axios.patch(`${BASE_URL}/students/${studentId}`, newData,{
    withCredentials:true,
    timeout:10000
  });
})

export const updateManyStudent = axiousWrapper(({studentIds, newData })=>{
  return axios.post(`${BASE_URL}/students/updateMany`,{studentIds, newData },{
     withCredentials:true,
     timeout:10000
    });
})

export const deleteStudent = axiousWrapper((studentId)=>{
    return axios.delete(`${BASE_URL}/students/${studentId}`,{
      withCredentials:true,
      timeout:10000
    });
  })
  
export const deleteManyStudents = axiousWrapper((studentIds)=>{
  return axios.post(`${BASE_URL}/students/deleteMany`,studentIds,
    { withCredentials:true,
      timeout:10000
    });
})


export const getStudentsCount = axiousWrapper((classId)=>{
  if(!classId){
    return axios.get(`${BASE_URL}/students/total`,{
      withCredentials:true
    })
  }
  return axios.get(`${BASE_URL}/students/total/${classId}`,{
      withCredentials:true
  });
})
