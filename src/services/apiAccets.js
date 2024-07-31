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
    let fileName = `${category}s.csv`
    try {
        if(category === 'class'){
          endPoint = `${BASE_URL}/assets/classes-csv/get`
        }
        else if(category === 'teacher'){
          endPoint = `${BASE_URL}/assets/teachers-csv/get`
        }else if(category === 'student'){
          endPoint = `${BASE_URL}/assets/students-csv/get`
        }

       const response = await axios.get(endPoint, {
        responseType: 'blob',
        withCredentials:true
    } );     
       blob(response,fileName) 

    } catch (error) {
       console.error("Error during request setup:", error.message);
       throw new Error("Failed to export. Request setup error.");
      
    }
  }

  export async function exportToPdf({category,subCategory}) {
    let endPoint;
    let fileName = `${category}s.pdf`
    try {
        if(category === 'class'){
            endPoint = `${BASE_URL}/assets/classes-pdf/get`
          }
        else if(category === 'teacher'){
            endPoint = `${BASE_URL}/assets/teachers-pdf/get`
         }
         else if(category === 'student'){
           if(subCategory === 'payments_sheet'){
            endPoint = `${BASE_URL}/assets/paymentsSheet-pdf/get`
            fileName = 'paymentsSheet.pdf'
           }else if(!subCategory){
            endPoint = `${BASE_URL}/assets/students-pdf/get`
           }
         }

        const response = await axios.get(endPoint,{
            responseType:'blob',
            withCredentials:true
        });
        blob(response,fileName)
    
    } catch (error) {
       console.error("Error during request setup:", error.message);
       throw new Error("Failed to export. Request setup error.");
      
    }
  }