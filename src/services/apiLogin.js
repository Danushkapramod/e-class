import supabase from "./supabase";

export async function login(loginData){
    try{
        let {data , error } = await supabase.auth.signInWithPassword({
         email: loginData.email,
         password:loginData.password
        })
 
        if (error) {
            console.error(error);
            throw new Error(error.message);
        }
        return data
    }catch(err){
      console.error('An error occurred:', err);
      throw new Error(`An unexpected error occurred. Please try again later.`);
    }
}


  
export async function getUser(){
    try{
     const { data: session } = await supabase.auth.getSession()
     if(!session.session) return null

     const {data:{user},error} = await supabase.auth.getUser()

     if (error) throw new Error(error.message);
    
     return user

    }catch(err){
      console.error('An error occurred:', err);
      throw new Error(`An unexpected error occurred. Please try again later.`);
    }
}

export async function logOut(){
    try{

    const { error } = await supabase.auth.signOut()
     if (error) throw new Error(error.message);
    
    }catch(err){
      console.error('An error occurred:', err);
      throw new Error(`An unexpected error occurred. Please try again later.`);
    }
}

export async function signup(userData){
    try{
    const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options:{
            data:{
            name: userData.name ,
            avatar:""
        }
        }
    }) 
    if (error) throw new Error(error.message);
    return data

    }catch(err){
      console.error('An error occurred:', err);
      throw new Error(`An unexpected error occurred. Please try again later.`);
    }
}


export async function update(userData){
    try{
    const { data, error } = await supabase.auth.updateUser(userData)
  
    if (error) throw new Error(error.message);
    return data

    }catch(err){
      console.error('An error occurred:', err);
      throw new Error(`An unexpected error occurred. Please try again later.`);
    }
}


export async function updatePassword(userData){
    try{
    const {  error: signInError } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
    });

    if (signInError) {
        console.error('Re-authentication failed:', signInError);
        throw new Error('Current password is incorrect');
     }

     const {  error: updateError } = await supabase.auth.updateUser({
        password: userData.newPassword,
      });

    if (updateError) {
    console.error('Password update failed:', updateError);
    throw new Error('Password update failed');
    }

    }catch(err){
      console.error('An error occurred:', err);
      throw new Error(err.message);
    }
}