import axios from "axios";
import { url } from "./apiData";

export async function getTeachers(queryParams){
    try{
        const response = await axios.get(`${url}/teachers`)

        return response.data.body.teachers

    }catch(error) {
        if (error.response) {
          console.error('Error Status:', error.response.status);
          console.error('Error Data:', error.response.data);

        } else if (error.request) {
          console.error('No response received:', error.request);

        } else {
          console.error('Error during request setup:', error.message);
        }
      }
}


export async function createTeachers(teacherData){
    try{
        await axios.post(`${url}/teachers`,teacherData)

    }catch(error) {
        console.error('Error:', error);
      }
}