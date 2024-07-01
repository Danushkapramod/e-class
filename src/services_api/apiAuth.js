import axios from "axios";
import { url } from "./apiData";

export async function login(loginData) {
    try {
      const { email, password } = loginData;
  
      if (!email || !password) {
        throw new Error(`Please provide email and password.`);
      }
      const response = await axios.post(`${url}/users/login`, loginData,{
        withCredentials: true,
      });
  
      if (!response.data || response.status !== 200) {
        throw new Error('User not found or login failed');
      }
      return response.data;
       
    } catch (err) {
      console.error('An error occurred:', err);
      throw new Error(`An unexpected error occurred. Please try again later.`);
    }
  }


export async function getAuth() {
    try {
        const response = await axios.get(`${url}/users/me`, {
            withCredentials: true,     
        });
        console.log(response.data);

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

  