import axios from "axios";
import { BASE_URL } from "./apiData";

export async function getClasses(queryParams) {
  try {
    let query;
    queryParams ? (query = `&${queryParams.split("?")[1]}`) : (query = "");
    const response = await axios.get(`${BASE_URL}/classes?teacher=true${query}`,{
      withCredentials:true,
      timeout:6000
    });
    return response.data.body.classes;
  } catch (error) {
    if (error.response) {
     
      console.error("Error Data:", error.response.data);
      throw new Error("Failed to fetch classes. Server responded with error.");
    } else if (error.request) {
     
      console.error("No response received:", error.request);
      throw new Error(
        "Failed to fetch classes. No response received from server.",
      );
    } else {
    
      console.error("Error during request setup:", error.message);
      throw new Error("Failed to fetch classes. Request setup error.");
    }
  }
}


export async function getClassesCount() {
  try {
    const response = await axios.get(`${BASE_URL}/classes/total`,{
      withCredentials:true
    });
    return response.data.body.total;
  } catch (error) {

     console.error("Error during request setup:", error.message);
     throw new Error("Failed to fetch total. Request setup error.");
    
  }
}

export async function createClass(classData) {
  try {
    const formData = new FormData();
    Object.entries(classData).forEach(([key, value]) => {
       formData.append(key, value); 
    });

    if (!classData.avatar) {
       formData.delete('avatar') 
     }
    const response = await axios.post(`${BASE_URL}/classes`,formData,{
        withCredentials:true,
        timeout:10000
     });
     return response.data

    } catch (apiError) {
      console.error("Error saving class data:", apiError);
      throw new Error("Failed to save class data. Please try again.");
    }
}

// export async function updateClass({ classId, newData }) {
//   try {
//     let avatar;
//     // Update avatar if a new avatar file is provided
//     if (newData.avatarFile) {
//       try {
//         avatar = await updateAvatar(
//           newData.avatarFile,
//           newData.avatarDbUrl,
//           "assets/images/class-avatars",
//         );
//       } catch (updateAvatarError) {
//         console.error("Error updating avatar:", updateAvatarError);
//         throw new Error("Failed to update avatar. Please try again.");
//       }
//     } else {
//       avatar = newData.avatarDbUrl;
//     }
//     // Clean up newData object
//     delete newData.avatarDbUrl;
//     delete newData.avatarFile;
//     // Update teacher data
//     try {
//       await axios.patch(`${BASE_URL}/classes/${classId}`, {
//         ...newData,
//         avatar,
//       },{
//         withCredentials:true,
//         timeout:10000
//       });
//     } catch (apiError) {
//       console.error("Error updating class data:", apiError);
//       throw new Error("Failed to update class data. Please try again.");
//     }
//   } catch (error) {
//     console.error("Error in updateClass:", error);
//   }
// }


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


export async function updateClass({ classId, newData }) {
  try {
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
   // formDataToObject(formData)
     await axios.patch(`${BASE_URL}/classes/${classId}`, formData,{
        withCredentials:true,
        timeout:10000,
      });

    } catch (apiError) {
      console.error("Error updating class data:", apiError);
      throw new Error("Failed to update class data. Please try again.");
    }
}


export async function deleteClass(classId) {
    try {
      await axios.delete(`${BASE_URL}/classes/${classId}`,{
        withCredentials:true,
        timeout:10000
      });

    } catch (apiError) {
      console.error("Error deleting class from database:", apiError);
      throw new Error("Failed to delete class data. Please try again.");
    } 
}

