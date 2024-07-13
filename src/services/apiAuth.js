import axios from "axios";
import { BASE_URL } from "./apiData";
import { deleteFile, updateAvatar } from "./apiUploads";

// Environment variable or configuration for the base URL

export async function getAuth() {
  console.log("0000000000000000000000000000");
  try {
    const response = await axios.get(`${BASE_URL}/users/me`, {
      withCredentials: true,
      timeout: 6000,
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error(`Error: ${error.message}`);
  }
}

export async function login(loginData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/login`,
      loginData,
      {
        withCredentials: true,
        timeout: 6000,
      },
    );
    if (!response.data || response.status !== 200) {
      throw new Error("User not found or login failed");
    }
    return response.data;

  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
      throw new Error(
        `Login failed: ${error.response.data.message || "An unexpected server error occurred."}`,
      );
    } else if (error.request) {
      console.error("Network error:", error.request);
      throw new Error(
        "Network error: No response received from the server. Please check your network connection and try again.",
      );
    } else {
      console.error("Error:", error.message);
      throw new Error(`An unexpected error occurred: ${error.message}`);
    }
  }
}


export async function logOut() {
  try {
    await axios.post(`${BASE_URL}/users/logout`,{},
               {withCredentials: true,timeout: 6000,}
     ); 
     return true 
  } catch (error) {
    
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
      throw new Error(
        `Logout failed: ${error.response.data.message || "An unexpected server error occurred."}`
      );
    } else if (error.request) {
      console.error("Network error:", error.request);
      throw new Error(
        "Network error: No response received from the server. Please check your network connection and try again."
      );
    } else {
      console.error("Error:", error.message);
      throw new Error(`An unexpected error occurred: ${error.message}`);
    }
  }
}


export async function changePassword(passwordData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/change-password`,
      passwordData,
      {
        withCredentials: true,
        timeout: 6000,
      },
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
      throw new Error(
        `Failed to change password: ${error.response.data.message || "An unexpected server error occurred."} `,
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("Failed to change password. No response from server.");
    } else {
      console.error("Error setting up the request:", error.message);
      throw new Error("Failed to change password. Please try again.");
    }
  }
}

export async function updateAuther(newData) {
 
  try {
    let avatar;
    if (newData.avatarFile) {
      try {
        avatar = await updateAvatar(
          newData.avatarFile,
          newData.avatarDbUrl,
          "assets/images/auth-avatars",
        );
      } catch (updateAvatarError) {
        console.error("Error updating avatar:", updateAvatarError);
        throw new Error("Failed to update avatar. Please try again.");
      }
    } else if (newData.avatarDbUrl) {
      await deleteFile(newData.avatarDbUrl.split("amazonaws.com/")[1]);
      avatar = "";
    } else {
      avatar = newData.avatarDbUrl || newData.avatar;
    }
    // Clean up newData object
    delete newData.avatarDbUrl;
    delete newData.avatarFile;
    // Update teacher data
    try {
      await axios.patch(
        `${BASE_URL}/users/me/update`,
        { ...newData, avatar },
        {
          withCredentials: true,
        },
      );
    } catch (apiError) {
      console.error("Error updating auther data:", apiError);
      throw new Error("Failed to update authcher data. Please try again.");
    }
  } catch (error) {
    console.error("Error in updateAuther:", error);
  }
}

export async function resetPassword(data) {
  try {
    await axios.post(
      `${BASE_URL}/users/reset-password`,
      data,
      {
        withCredentials: true,
        timeout: 6000,
      },
    );

  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
      throw new Error(
        `Server error: ${error.response.data.message || "An unexpected server error occurred."} `,
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("No response received from the server.");
    } else {
      console.error("Error setting up the request:", error.message);
      throw new Error("Error setting up the password reset request.");
    }
  }
}


export async function requestPasswordResetToken(data) {
  try {
    await axios.post(
      `${BASE_URL}/users/forgot-password`,
      data,
      {
        timeout: 6000,
      },
    );

  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
      throw new Error(
        `Server error: ${error.response.data.message || "An unexpected server error occurred."} `,
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("No response received from the server.");
    } else {
      console.error("Error setting up the request:", error.message);
      throw new Error("Error setting up the password reset token request.");
    }
  }
}



export async function requestEmailResetToken(email) {
  try {
    await axios.post(
      `${BASE_URL}/users/change-email-token`,
      email,
      {
        withCredentials: true,
        timeout: 6000,
      },
    );

  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
      throw new Error(
        `Server error: ${error.response.data.message || "An unexpected server error occurred."} `,
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("No response received from the server.");
    } else {
      console.error("Error setting up the request:", error.message);
      throw new Error("Error setting up the email reset token request.");
    }
  }
}



export async function changeEmail(data) {
  try {
    await axios.post(
      `${BASE_URL}/users/change-email`,
      data,
      {
        withCredentials: true,
        timeout: 6000,
      },
    );
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
      throw new Error(
        `Server error: ${error.response.data.message || "An unexpected server error occurred."} `,
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("No response received from the server.");
    } else {
      console.error("Error setting up the request:", error.message);
      throw new Error("Error setting up the email change request.");
    }
  }
}

