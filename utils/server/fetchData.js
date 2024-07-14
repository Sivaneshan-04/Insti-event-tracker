import { createClient } from "../supabase/client";

export const fetchData = async () => {
  const supabase = createClient();
  try{

    let { data: blog_data, error } = await supabase
    .from('blog_data')
    .select('*')
        
    if (error) {
      return {data: null, error: error};
    } else {
      return {data: blog_data, error: null};
    }
  }
  catch (error) {
    return {data: null, error: error};
  }
}

export default fetchData;