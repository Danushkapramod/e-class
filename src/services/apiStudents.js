import axios from "axios";
import { BASE_URL } from "./apiData";

export async function createStudent(stdData) {
    try {
    const res = await axios.post(`${BASE_URL}/students`, stdData,{
        withCredentials:true,
        timeout:10000
    });
    return res.data
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
  

  export async function getStudents() {
    try {
      const response = await axios.get(`${BASE_URL}/students`,{
        withCredentials:true,
        timeout:6000
      });
      return response.data.body.students;
    
    } catch (error) {
      if (error.response) {
      
        console.error('Error Data:', error.response.data);
        throw new Error('Failed to fetch students. Server responded with error.');
      } else if (error.request) {
  
        console.error('No response received:', error.request);
        throw new Error('Failed to fetch students. No response received from server.');
      } else {
     
        console.error('Error during request setup:', error.message);
        throw new Error('Failed to fetch students. Request setup error.');
      }
    }
  }

  export async function updateStudent({studentId, newData }) {
      try {
        const response = await axios.patch(`${BASE_URL}/students/${studentId}`, newData,{
          withCredentials:true,
          timeout:10000
        });
        return response.data
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
            console.error("Error update student:", error.message);
            throw new Error("Error update student.");
          }
      }

  }


  export async function deleteStudent(studentId) {
      try {
        await axios.delete(`${BASE_URL}/students/${studentId}`,{
          withCredentials:true,
          timeout:10000
        });
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
            console.error("Error deleting student from database:", error.message);
            throw new Error("Failed to delete student. Please try again.");
           }
      }

  }