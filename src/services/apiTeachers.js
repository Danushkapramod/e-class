import axios from "axios";
import { BASE_URL } from "./apiData";
import { axiousWrapper } from "../utils/wrappers";

export const getTeachers = axiousWrapper((queryParams)=>{
  let query;
  queryParams ? query = queryParams : query = "";
   return axios.get(`${BASE_URL}/teachers${query}`,{
    withCredentials:true,
    timeout:6000
  });
})

export const createTeacher = axiousWrapper((teacherData)=>{
    const formData = new FormData();
    Object.entries(teacherData).forEach(([key, value]) => {
        formData.append(key, value); 
    });

    if (!teacherData.avatar) {
        formData.delete('avatar') 
      }
    return axios.post(`${BASE_URL}/teachers`,formData,{
        withCredentials:true,
        timeout:10000
    });
})


export const updateTeacher = axiousWrapper(({teacherId, newData })=>{
  const formData = new FormData();
    Object.entries(newData).forEach(([key, value]) => {
     if (key !== 'avatarFile' && key !== 'avatarDbUrl' && key !== 'avatar') { 
       formData.append(key, value);
     }
   });
   
   if (newData.avatarFile && newData.avatarDbUrl) {
     formData.append('avatar', newData.avatarFile); 
     formData.append('oldAvatar', newData.avatarDbUrl); 

   }else if (newData.avatarFile) {
     formData.append('avatar', newData.avatarFile); 
   }
   return axios.patch(`${BASE_URL}/teachers/${teacherId}`, formData,{
      withCredentials:true,
      timeout:10000,
    });
})

export const deleteTeacher = axiousWrapper((teacherId)=>{
  return axios.delete(`${BASE_URL}/teachers/${teacherId}`,{
    withCredentials:true,
    timeout:10000
   });
})

export const getTeachersCount = axiousWrapper(()=>{
  return axios.get(`${BASE_URL}/teachers/total`,{
      withCredentials:true
    });
})




// function formDataToObject(formData) {
//   const obj = {};
//   formData.forEach((value, key) => {
//     // If the key already exists, convert the value to an array
//     if (obj.hasOwnProperty(key)) {
//       obj[key] = [].concat(obj[key], value);
//     } else {
//       obj[key] = value;
//     }
//   });
//   return obj;
// }
