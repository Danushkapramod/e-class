import axios from "axios";
import { BASE_URL } from "./apiData";


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


export async function getOptions(option) {
  console.log(option);
  try {
      const res = await axios.get(`${BASE_URL}/options?option=${option}`,{
         withCredentials:true,
      });
    return res.data.body.options;

  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function createOption({option,optionData}) {
  try {
   const res  =  await axios.post(`${BASE_URL}/options?option=${option}`, optionData,{
      withCredentials:true
    });
   return res.data 
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function deleteOption({optionId,option}) {
  try {
   const res =  await axios.delete(`${BASE_URL}/options/${optionId}?option=${option}`,{
      withCredentials:true
    });
    return res.data
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

