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
  

  export async function getStudents({queryParams,signal}) {
    try {
        let query;
        queryParams ? (query = `?${queryParams}`) : (query = "");

        const response = await axios.get(`${BASE_URL}/students${query}`,{
        withCredentials:true,
        signal,
        timeout:6000
      });
      return response.data.body.students;
      
    } catch (error) {
      if (error.response) {
        console.error('Error Data:', error.response.data);
        throw new Error('Error Data:', error.response.data);
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
              `Server error: ${error.response.data.message ||
               "An unexpected server error occurred."} `,
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

  export async function updateManyStudent({studentIds, newData }) {
    try {
      const response = await axios.post(`${BASE_URL}/students/updateMany`,
        {studentIds, newData },
        {
          withCredentials:true,
          timeout:10000
        });
      return response.data
    } catch (error) {
      if (error.response) {
          console.error("Server responded with an error:", error.response.data);
          throw new Error(
            `Server error: ${error.response.data.message ||
             "An unexpected server error occurred."} `,
          );
        } else if (error.request) {
          console.error("No response received:", error.request);
          throw new Error("No response received from the server.");
        } else {
          console.error("Error update students:", error.message);
          throw new Error("Error update students.");
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
              `Server error: ${error.response.data.message ||
               "An unexpected server error occurred."} `,
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


  export async function deleteManyStudents(studentIds) {
    try {
      await axios.post(`${BASE_URL}/students/deleteMany`,studentIds,
        {
        withCredentials:true,
        timeout:10000
      });
    } catch (error) {
      if (error.response) {
         console.error("Server responded with an error:", error.response.data);
          throw new Error(
            `Server error: ${error.response.data.message ||
             "An unexpected server error occurred."} `,
          );
         } else if (error.request) {
          console.error("No response received:", error.request);
          throw new Error("No response received from the server.");
         } else {
          console.error("Error deleting students from database:", error.message);
          throw new Error("Failed to delete students. Please try again.");
         }
    }
}




export async function getStudentsCount() {
  try {
    const response = await axios.get(`${BASE_URL}/students/total`,{
      withCredentials:true
    });
    return response.data.body.total;
  } catch (error) {

     console.error("Error during request setup:", error.message);
     throw new Error("Failed to fetch total. Request setup error.");
    
  }
}