
import {  getURL, uploadImage } from "./apiUploadImages";
import supabase from "./supabase";

export async function getClasses(queryParams){
  console.log(Object.entries(queryParams));

  
  try {
    let query =  supabase
    .from('classes')
    .select('*')
   // .order('classTime', { ascending: false })
  

    if(queryParams){
        Object.entries(queryParams).forEach(([colums,value]) =>{
            if(Array.isArray(value)){
                   query = query.or(value.map(val => `${colums}.ilike.${val}`).join(",")) 
            }
            else if(colums === "classId" || colums === "teacherId" ){
                query = query.eq(colums,value)
            }
            else if(colums === "sort" ){
              query = query.order(value,value)
          }
            else{
                query = query.ilike(colums,`%${value}%`)
            }
        })
    }
            
    let { data, error } = await query
    if(error){
        console.error(error);
        throw new Error(`Classes-Data could not be loaded, 
                          Try again later.`)
    }
    return data
} catch (error) {
    console.error('An error occurred:', error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function getClasse(id){
  try {

    let { data, error } =  await  supabase
    .from('classes')
    .eq("classId",id)
    .select('*')
    
    if(error){
        console.error(error);
        throw new Error(`Classes could not be loaded, 
                          Try again later.`)
    }
    return data
} catch (error) {
    console.error('An error occurred:', error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}


export async function updateClass(newData) {
    try {
      const { data, error } = await supabase
        .from('classes')
        .update(newData)
        .eq('classId', newData.classId) 
  
      if (error) {
        console.error(error);
        throw new Error(`Class data could not be updated. Please try again later.`);
      }
      return data;

    } catch (error) {
      console.error('An error occurred:', error);
      throw new Error(`An unexpected error occurred. Please try again later.`);
    }
  }
  

  export async function deleteClass(id) {
    try {
      const {  error } = await supabase
        .from('classes')
        .delete()
        .eq('classId',id) 
  
      if (error) {
        console.error(error);
        throw new Error(`Class could not be deleted. Please try again later.`);
      }
  

    } catch (error) {
      console.error('An error occurred:', error);
      throw new Error(`An unexpected error occurred. Please try again later.`);
    }
  }

  export async function createClass(classData) {
    const {class_poster,subject} = classData
    try {
     const resData = await uploadImage({ bucketName:"classes-images",imageFile:class_poster[0],fileNameHeader:subject})

     if(!resData.path) throw new Error("Image could not be uploaded. Try Again later")
     
     const imageUrl =  getURL("classes-images",resData.path)

     const {  error } = await supabase
       .from('classes')
       .insert([
           {...classData,class_poster:imageUrl}
       ])
  
     if (error) {
       console.error(error);
       throw new Error(`Class  could not be created. Please try again later.`);
     }
   
    } catch (error) {
      console.error('An error occurred:', error);
      throw new Error(`An unexpected error occurred. Please try again later.`);
    }
  }

 

