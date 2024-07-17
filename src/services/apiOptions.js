import axios from "axios";
import { BASE_URL } from "./apiData";

export async function getSubjects() {
  try {
    const response = await axios.get(`${BASE_URL}/options?option=subject`,{
      withCredentials:true,
    });
    return response.data.body.options;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function createSubject(subjectData) {
  try {
    await axios.post(`${BASE_URL}/options?option=subject`, subjectData,{
      withCredentials:true
    });
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function deleteSubject(subjectId) {
  try {
    await axios.delete(`${BASE_URL}/options/${subjectId}?option=subject`,{
      withCredentials:true
    });
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function getHalls() {
  try {
    const response = await axios.get(`${BASE_URL}/options?option=hall`,{
      withCredentials:true,
    });
    return response.data.body.options;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function createHall(hallData) {
  try {
    await axios.post(`${BASE_URL}/options?option=hall`, hallData,{
      withCredentials:true
    });
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function deleteHall(hallId) {
  try {
    await axios.delete(`${BASE_URL}/options/${hallId}?option=hall`,{
      withCredentials:true
    });
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function getGrades() {
  try {
    const response = await axios.get(`${BASE_URL}/options?option=grade`,{
      withCredentials:true,
    });
    return response.data.body.options;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function createGrade(gradeData) {
  try {
    await axios.post(`${BASE_URL}/options?option=grade`, gradeData,{
      withCredentials:true,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function deleteGrade(gradeId) {
  try {
    await axios.delete(`${BASE_URL}/options/${gradeId}?option=grade`,{
      withCredentials:true
    });
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function getOptionsCount(option) {
  try {
    const response = await axios.get(`${BASE_URL}/options/total?option=${option}`,{
      withCredentials:true
    });
    return response.data.body.total;
  } catch (error) {

     console.error("Error during request setup:", error.message);
     throw new Error("Failed to fetch total. Request setup error.");
    
  }
}