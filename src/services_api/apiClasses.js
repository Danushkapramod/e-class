import axios from "axios"
import {url} from "./apiData"


export async function getClasses(queryParams){
    try{
        const response = await axios.get(`${url}/classes`)
        return response.data.body.classes

    }catch(error) {
        if (error.response) {
          console.error('Error Data:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error during request setup:', error.message);
        }
      }
}

export async function createClasse(classData){
    try{
        await axios.post(`${url}/classes`,classData)

    }catch(error) {
        console.error('Error:', error);
      }
}

export async function updateClasse({_id,newData}){
  try{
      await axios.patch(`${url}/classes/${_id}`,newData)
  }catch(error) {
      console.error('Error:', error);
  }
}

export async function deleteClass(classId){
  console.log(classId,"--------");
  try{
      await axios.delete(`${url}/classes/${classId}`)
  }catch(error) {
      console.error('Error:', error);
  }
}
