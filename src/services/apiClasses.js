import axios from "axios";
import { BASE_URL } from "./apiData";
import { axiousWrapper } from "../utils/wrappers";

export const getClasses = axiousWrapper((queryParams)=>{
   let query;
    queryParams ? (query = `&${queryParams.split("?")[1]}`) : (query = "");
    return axios.get(`${BASE_URL}/classes?teacher=true${query}`,{
      withCredentials:true,
      timeout:6000
    });
})


export const getClassesCount = axiousWrapper(()=>{
   return axios.get(`${BASE_URL}/classes/total`,{
      withCredentials:true
  });
})
 
export const createClass = axiousWrapper(classData=>{
    const formData = new FormData();
    Object.entries(classData).forEach(([key, value]) => {
       formData.append(key, value); 
    });
    if (!classData.avatar) {
       formData.delete('avatar') 
     }
     return axios.post(`${BASE_URL}/classes`,formData,{
        withCredentials:true,
        timeout:10000
     });
})


export const updateClass = axiousWrapper(({ classId, newData })=>{
  const formData = new FormData();
     Object.entries(newData).forEach(([key, value]) => {
      if (key !== 'avatarFile' && key !== 'avatarDbUrl'
         && key !== 'teacherId' && key !== 'avatar') { 
        formData.append(key, value);
      }
    });
    
    if (newData.avatarFile && newData.avatarDbUrl) {
      formData.append('avatar', newData.avatarFile); 
      formData.append('oldAvatar', newData.avatarDbUrl); 

    }else if (newData.avatarFile) {
      formData.append('avatar', newData.avatarFile); 
    }
    return axios.patch(`${BASE_URL}/classes/${classId}`, formData,{
        withCredentials:true,
        timeout:10000,
    });
})

export const deleteClass =  axiousWrapper((classId)=>{
  return axios.delete(`${BASE_URL}/classes/${classId}`,{
      withCredentials:true,
      timeout:10000
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
