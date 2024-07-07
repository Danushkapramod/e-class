import axios from "axios";
import { BASE_URL } from "./apiData";
import { deleteFile, updateAvatar, uploadFile } from "./apiUploads";

export async function getClasses(queryParams) {
  try {
    let query;
    queryParams ? (query = `&${queryParams.split("?")[1]}`) : (query = "");

    const response = await axios.get(`${BASE_URL}/classes?teacher=true${query}`);
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

export async function createClass(classData) {
  try {
    let avatar;
    if (classData.avatar) {
      try {
        // Upload the avatar image and store the URL
        avatar = await uploadFile(
          "assets/images/class-avatars",
          classData.avatar,
        );
      } catch (uploadError) {
        console.error("Error uploading avatar image:", uploadError);
        throw new Error("Failed to upload avatar image. Please try again.");
      }
    }
    // Try to save teacher data including the avatar URL if available
    try {
      await axios.post(`${BASE_URL}/classes`, {
        ...classData,
        avatar,
      });
    } catch (apiError) {
      console.error("Error saving class data:", apiError);
      throw new Error("Failed to save class data. Please try again.");
    }
  } catch (error) {
    console.error("Error creating class:", error);
  }
}

export async function updateClass({ classId, newData }) {
  try {
    let avatar;
    // Update avatar if a new avatar file is provided
    if (newData.avatarFile) {
      try {
        avatar = await updateAvatar(
          newData.avatarFile,
          newData.avatarDbUrl,
          "assets/images/class-avatars",
        );
      } catch (updateAvatarError) {
        console.error("Error updating avatar:", updateAvatarError);
        throw new Error("Failed to update avatar. Please try again.");
      }
    } else {
      avatar = newData.avatarDbUrl;
    }
    // Clean up newData object
    delete newData.avatarDbUrl;
    delete newData.avatarFile;
    // Update teacher data
    try {
      await axios.patch(`${BASE_URL}/classes/${classId}`, {
        ...newData,
        avatar,
      },{
        withCredentials: true,
      });
    } catch (apiError) {
      console.error("Error updating class data:", apiError);
      throw new Error("Failed to update class data. Please try again.");
    }
  } catch (error) {
    console.error("Error in updateClass:", error);
  }
}

export async function deleteClass({ classId, avatarDbUrl }) {
  try {
  
    try {
      await axios.delete(`${BASE_URL}/classes/${classId}`);
    } catch (apiError) {
      console.error("Error deleting class from database:", apiError);
      throw new Error("Failed to delete class data. Please try again.");
    }
    // If an avatar URL is provided, attempt to delete the avatar image from S3
    if (avatarDbUrl) {
      try {
        await deleteFile(avatarDbUrl.split("amazonaws.com/")[1]);
      } catch (s3Error) {
        console.error("Error deleting avatar image from S3:", s3Error);
        throw new Error("Failed to delete avatar image. Please try again.");
      }
    }
  } catch (error) {
    console.error("Error deleting class:", error);
    alert(error.message);
  }
}
