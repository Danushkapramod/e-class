import axios from "axios";
import { BASE_URL } from "./apiData";
import { axiousWrapper } from "../utils/wrappers";


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


export async function exportToCsv({category,_selected,classId}) {
    let endPoint;
    let fileName = `${category}s.csv`
    try {
        if(category === 'class'){
          endPoint = `${BASE_URL}/assets/classes-csv/get`
        }
        else if(category === 'teacher'){
          endPoint = `${BASE_URL}/assets/teachers-csv/get`
        }else if(category === 'student'){
          endPoint = `${BASE_URL}/assets/students-csv/get/${classId}`
        }

       const response = await axios.post(endPoint,{_selected:_selected}, {
        responseType: 'blob',
        withCredentials:true
    } );     
       blob(response,fileName) 

    } catch (error) {
       console.error("Error during request setup:", error.message);
       throw new Error("Failed to export. Request setup error.");
      
    }
  }

  export async function exportToPdf({category,subCategory,_selected,classId}) {

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
            endPoint = `${BASE_URL}/assets/paymentsSheet-pdf/get/${classId}`
            fileName = 'paymentsSheet.pdf'
           }else if(!subCategory){
            endPoint = `${BASE_URL}/assets/students-pdf/get/${classId}`
           }
         }

        const response = await axios.post(endPoint,{_selected:_selected},{
            responseType:'blob',
            withCredentials:true
        });
        blob(response,fileName)
    
    } catch (error) {
       console.error("Error during request setup:", error.message);
       throw new Error("Failed to export. Request setup error.");
      
    }
  }
  export const backup = axiousWrapper(({endPoit})=>{
    return axios.get(`${BASE_URL}/services/${endPoit}`,{
       withCredentials:true
   });
 })
  
 export const getBackupAcccount = axiousWrapper(()=>{
  return axios.get(`${BASE_URL}/services/drive-account`,{
     withCredentials:true
 });
})
