import { getURL, uploadImage } from "./apiUploadImages";
import supabase from "./supabase";

export async function getTeachers(queryParams){
  try {
    let query = supabase
    .from('teachers')
    .select('*')
    
    if(queryParams){
       Object.entries(queryParams).forEach(([column, value]) => {
        if(Array.isArray(value)){
          query = query.or(value.map(val => `${column}.ilike.${val}`).join(",")) 
        }
        else if(column === "teacherId" ){
          query = query.eq(column,value)
      }
        else{
          query = query.ilike(column,`%${value}%`)
        }
       });
    }

  const { data, error }= await query
    
    if(error){
        console.error(error);
        throw new Error(`Teachers-Data could not be loaded, 
                          Try again later.`)
    }
    return data
} catch (error) {
    console.error('An error occurred:', error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}





export async function updateTeacher(newData) {
    try {
      const {  error } = await supabase
        .from('teachers')
        .update(newData)
        .eq('teacherId', newData.teacherId) 
  
      if (error) {
        console.error(error);
        throw new Error(`Teacher data could not be updated. Please try again later.`);
      }

    } catch (error) {
      console.error('An error occurred:', error);
      throw new Error(`An unexpected error occurred. Please try again later.`);
    }
  }
  

  export async function deleteTeacher(id) {
    try {
      const {  error } = await supabase
        .from('teachers')
        .delete()
        .eq('teacherId',id) 
  
      if (error) {
        console.error(error);
        throw new Error(`Teacher could not be deleted. Please try again later.`);
      }

    } catch (error) {
      console.error('An error occurred:', error);
      throw new Error(`An unexpected error occurred. Please try again later.`);
    }
  }

  export async function createTeacher(teacherData) {
    try {
      let imageUrl = "";
      if(teacherData.image[0]){
         const {image,name} = teacherData
         
         const resData = await uploadImage({ bucketName:"teacher-avatars",imageFile:image[0],fileNameHeader:name})
        if(!resData.path) throw new Error("Image could not be uploaded. Try Again later")
         imageUrl =  getURL("teacher-avatars",resData.path)
  
      }
        
      const { error } = await supabase
        .from('teachers')
        .insert([
            {...teacherData,image:imageUrl}
        ])
  
      if (error) {
        console.error(error);
        throw new Error(`Teacher  could not be created. Please try again later.`);
      }

    } catch (error) {
      console.error('An error occurred:', error);
      throw new Error(`An unexpected error occurred. Please try again later.`);
    }
  }