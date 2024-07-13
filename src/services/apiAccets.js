import axios from "axios";
import { BASE_URL } from "./apiData";

export async function exportToCsv() {
    try {
    const response = await axios.get(`${BASE_URL}/assets/cvs/get`,{
        responseType: 'blob'
    });
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'classes.csv';  
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    } catch (error) {
       console.error("Error during request setup:", error.message);
       throw new Error("Failed to fetch total. Request setup error.");
      
    }
  }