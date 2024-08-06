import axios from "axios";
import { BASE_URL } from "./apiData";
import {axiousWrapper } from "../utils/wrappers";


export const getAuth = axiousWrapper(()=>{
  return axios.get(`${BASE_URL}/users/me`, 
    {withCredentials: true,
      timeout: 6000,
    });
})

export const login = axiousWrapper((loginData)=>{
  return axios.post(`${BASE_URL}/users/login`,loginData,
      {withCredentials: true,
        timeout: 6000
      });
})

export const signUp = axiousWrapper((data)=>{
   return axios.post(`${BASE_URL}/users/signup`,data,
   {timeout: 6000}); 
})

export const verifyEmail = axiousWrapper((token)=>{
   return axios.get(`${BASE_URL}/users/verify-email?token=${token}`);
})

export const logOut = axiousWrapper(()=>{
   return axios.post(`${BASE_URL}/users/logout`,{},
    {withCredentials: true,timeout: 6000}
    ); 
})

export const changePassword = axiousWrapper((passwordData)=>{
   return axios.post(`${BASE_URL}/users/change-password`, passwordData,
      { withCredentials: true,
        timeout: 6000,
      },
    );
})

export const updateUserAvatar = axiousWrapper((newData)=>{
  const formData = new FormData();
  formData.append('oldAvatar',newData.avatarDbUrl)
  formData.append('avatar',newData.avatarFile)

  return axios.patch(`${BASE_URL}/users/me/update-avatar`, formData,{
    withCredentials:true,
    timeout:10000,
  });
})

export const updateAuther = axiousWrapper(async (newData)=>{
    return axios.patch(`${BASE_URL}/users/me/update`,newData,
      { withCredentials: true,
      },
    );
})

export const updateTeacher = axiousWrapper(({newData ,teacherId})=>{
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

export const resetPassword = axiousWrapper((data)=>{
  return axios.post(`${BASE_URL}/users/reset-password`,data,
      {withCredentials: true,
        timeout: 6000,
      },
    );
})

export const requestPasswordResetToken = axiousWrapper((data)=>{
  return axios.post(`${BASE_URL}/users/forgot-password`,data,
      { timeout: 6000},
    );
})

export const requestEmailResetToken = axiousWrapper((email)=>{
  return axios.post(`${BASE_URL}/users/change-email-token`,email,
      { withCredentials: true,
        timeout: 6000,
      },
    );
})

export const changeEmail = axiousWrapper((data)=>{
  return axios.post(`${BASE_URL}/users/change-email`,data,
      {withCredentials: true,
        timeout: 6000,
       },
    );
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