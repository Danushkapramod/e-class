import axios from "axios";
import { BASE_URL } from "./apiData";
import { deleteFile} from "./apiUploads";



export async function getTeachers(queryParams) {
  try {
    let query;
    queryParams ? query = queryParams : query = "";
    const response = await axios.get(`${BASE_URL}/teachers${query}`,{
      withCredentials:true,
      timeout:6000
    });
    return response.data.body.teachers;
  
  } catch (error) {
    if (error.response) {
    
      console.error('Error Data:', error.response.data);
      throw new Error('Failed to fetch teachers. Server responded with error.');
    } else if (error.request) {

      console.error('No response received:', error.request);
      throw new Error('Failed to fetch teachers. No response received from server.');
    } else {
   
      console.error('Error during request setup:', error.message);
      throw new Error('Failed to fetch teachers. Request setup error.');
    }
  }
}

export async function createTeacher(teacherData) {
  try {
      const formData = new FormData();
      Object.entries(teacherData).forEach(([key, value]) => {
         formData.append(key, value); 
      });
  
      if (!teacherData.avatar) {
         formData.delete('avatar') 
       }
      const response = await axios.post(`${BASE_URL}/teachers`,formData,{
          withCredentials:true,
          timeout:10000
       });
       return response.data
    } catch (apiError) {
      console.error('Error saving teacher data:', apiError);
      throw new Error('Failed to save teacher data. Please try again.');
    }
  
}

function formDataToObject(formData) {
  const obj = {};
  formData.forEach((value, key) => {
    // If the key already exists, convert the value to an array
    if (obj.hasOwnProperty(key)) {
      obj[key] = [].concat(obj[key], value);
    } else {
      obj[key] = value;
    }
  });
  return obj;
}


export async function updateTeacher({teacherId, newData }) {
  try {
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
    await axios.patch(`${BASE_URL}/teachers/${teacherId}`, formData,{
       withCredentials:true,
       timeout:10000,
     });
     
    } catch (apiError) {
      console.error('Error updating teacher data:', apiError);
      throw new Error('Failed to update teacher data. Please try again.');
    }
}


export async function deleteTeacher(teacherId) {
  try {
    await axios.delete(`${BASE_URL}/teachers/${teacherId}`,{
      withCredentials:true,
      timeout:10000
     });
      } catch (s3Error) {
        console.error('Error deleting avatar:', s3Error);
        throw new Error('Failed to delete avatar image. Please try again.');
      }
  }
 

export async function getTeachersCount() {
  try {
    const response = await axios.get(`${BASE_URL}/teachers/total`,{
      withCredentials:true
    });
    return response.data.body.total;
  } catch (error) {

     console.error("Error during request setup:", error.message);
     throw new Error("Failed to fetch total. Request setup error.");
    
  }
}

