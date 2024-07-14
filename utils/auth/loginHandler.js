"use server";
import { createClient } from "../supabase/server";

const signin = async (email,password) => {
  const supabase = createClient();

  try {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (user){
        console.log('User signed in');
        return {user};
    }
      console.log(error);
      return {error: error};
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

export default signin;
