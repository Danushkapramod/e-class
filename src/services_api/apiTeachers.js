import axios from "axios";
import { BASE_URL } from "./apiData";
import { deleteFile, updateAvatar, uploadFile } from "./apiUploads";



export async function getTeachers(queryParams) {
  try {
    const response = await axios.get(`${BASE_URL}/teachers`, { params: queryParams });
    return response.data.body.teachers;
  
  
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.error('Error Data:', error.response.data);
      throw new Error('Failed to fetch teachers. Server responded with error.');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      throw new Error('Failed to fetch teachers. No response received from server.');
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error during request setup:', error.message);
      throw new Error('Failed to fetch teachers. Request setup error.');
    }
  }
}

export async function createTeacher(teacherData) {
  try {
    let avatar;
    if (teacherData.avatar) {
      try {
        avatar = await uploadFile("assets/images/teacher-avatars", teacherData.avatar);
      } catch (uploadError) {
        console.error('Error uploading avatar image:', uploadError);
        throw new Error('Failed to upload avatar image. Please try again.');
      }
    }
    // Try to save teacher data including the avatar URL if available
    try {
      await axios.post(`${BASE_URL}/teachers`, { ...teacherData, avatar });
    } catch (apiError) {
      console.error('Error saving teacher data:', apiError);
      throw new Error('Failed to save teacher data. Please try again.');
    }
  } catch (error) {
    console.error('Error creating teacher:', error);
  }
}

export async function updateTeacher({ _id, newData }) {
  try {
    let avatar;
    // Update avatar if a new avatar file is provided
    if (newData.avatarFile) {
      try {
        avatar = await updateAvatar(newData.avatarFile, newData.avatarDbUrl, "assets/images/teacher-avatars");
      } catch (updateAvatarError) {
        console.error('Error updating avatar:', updateAvatarError);
        throw new Error('Failed to update avatar. Please try again.');
      }
    } else {
      avatar = newData.avatarDbUrl;
    }
    // Clean up newData object
    delete newData.avatarDbUrl;
    delete newData.avatarFile;
    // Update teacher data
    try {
      await axios.patch(`${BASE_URL}/teachers/${_id}`, { ...newData, avatar },{
        withCredentials: true,
      });
    } catch (apiError) {
      console.error('Error updating teacher data:', apiError);
      throw new Error('Failed to update teacher data. Please try again.');
    }
  } catch (error) {
    console.error('Error in updateTeacher:', error);
  }
}


export async function deleteTeacher({teacherId, avatarDbUrl}) {
  console.log({teacherId, avatarDbUrl});
  try {
     
    try {
      await axios.delete(`${BASE_URL}/teachers/${teacherId}`,{
        withCredentials: true,
      });
    } catch (apiError) {
      console.error('Error deleting teacher from database:', apiError);
      throw new Error('Failed to delete teacher data. Please try again.');
    }
  // If an avatar URL is provided, attempt to delete the avatar image from S3
    if (avatarDbUrl) {
      try {
        await deleteFile(avatarDbUrl.split("amazonaws.com/")[1]);
      } catch (s3Error) {
        console.error('Error deleting avatar image from S3:', s3Error);
        throw new Error('Failed to delete avatar image. Please try again.');
      }
    }
  } catch (error) {
    console.error('Error deleting teacher:', error);
    alert(error.message);
  }
}


