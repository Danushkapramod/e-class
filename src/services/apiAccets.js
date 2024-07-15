import axios from "axios";
import { BASE_URL } from "./apiData";


function blob(response,fileName){
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}


export async function exportToCsv({category}) {
    let endPoint;
    try {
        if(category === 'class'){
          endPoint = `${BASE_URL}/assets/classes-csv/get`
        }
        if(category === 'teacher'){
          endPoint = `${BASE_URL}/assets/teachers-csv/get`
        }

       const response = await axios.get(endPoint, {responseType: 'blob'} );     
       blob(response,'classes.csv') 

    } catch (error) {
       console.error("Error during request setup:", error.message);
       throw new Error("Failed to export. Request setup error.");
      
    }
  }

  export async function exportToPdf({category}) {
    let endPoint;
    try {
        if(category === 'class'){
            endPoint = `${BASE_URL}/assets/classes-pdf/get`
          }
        if(category === 'teacher'){
            endPoint = `${BASE_URL}/assets/teachers-pdf/get`
          }
          
        const response = await axios.get(endPoint,{responseType:'blob'});
        blob(response,'classes.pdf')
    
    } catch (error) {
       console.error("Error during request setup:", error.message);
       throw new Error("Failed to export. Request setup error.");
      
    }
  }