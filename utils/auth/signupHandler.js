"use server";
import { createClient } from "../supabase/server";

const signUp = async (email,name,password) => {

  const supabase = createClient();
try{

  let { data, error } = await supabase.auth.signUp({
    email: email,
    name: name,
    password: password,
  });
  console.log(data);
  if (data) {
    console.log("User created");
    // return {data}
  }
  
  console.log(error);
  return {error: error}
}catch(err){
  console.log(err);
  return {error: 'An error occurred'};
}
};


export default signUp;
