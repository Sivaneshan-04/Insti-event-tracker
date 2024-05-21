import { createClient } from "../../../../utils/supabase/client";

export const fetchData = async () => {
  const supabase = createClient();

  let { data: blog_data, error } = await supabase
  .from('blog_data')
  .select('*')

  console.log(blog_data, error,'err');

  if (error) {
    return {data: null, error: error.message};
  } else {
    return {data: blog_data, error: null};
  }
}

export default fetchData;