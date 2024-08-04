import axios from "axios";
import { BASE_URL } from "./apiData";
import { axiousWrapper } from "../utils/wrappers";

export const getOptionsCount = axiousWrapper((option)=>{
  return axios.get(`${BASE_URL}/options/total?option=${option}`,{
    withCredentials:true
  });
})

export const getOptions = axiousWrapper((option)=>{
  return axios.get(`${BASE_URL}/options?option=${option}`,{
         withCredentials:true,
     });
})

export const createOption = axiousWrapper(({option,optionData})=>{
  return axios.post(`${BASE_URL}/options?option=${option}`, optionData,{
      withCredentials:true
    });
})

export const deleteOption = axiousWrapper(({optionId,option})=>{
  return axios.delete(`${BASE_URL}/options/${optionId}?option=${option}`,{
    withCredentials:true
  });
})


