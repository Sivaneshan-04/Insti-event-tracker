import React from 'react';
import { createClient } from '../../../../utils/supabase/client';

async function BlogIdPage({ params }) {
    const supabase = createClient();

    let { data: blog, error } = await supabase.from('blog_data').select('*').eq('id', params.blogId);
    if (error) {
        console.log(error);
    }
    blog = blog[0]; 
    return (
        <div className="flex justify-center items-center h-screen bg-gray-700 dark:text-white">
            <div className="center-section m-auto p-3 md:p-7">
                <div className="md:m-auto center-section">
                    <p className="text-gray-300 py-1">{blog.location}</p>
                    <h2 className="py-1 text-2xl text-white font-bold">{blog.title}</h2>
                    <p className="text-gray-300 py-1">{blog.shortDescription}</p>
                    <p className="text-gray-300 py-1">{blog.speaker}</p>
                    <p className="text-gray-300 py-1">{blog.date}</p>
                </div>
                <div className="mt-4 text-gray-300">
                    {blog.details}
                </div>
            </div>
        </div>
    );
}

export const revalidate = 30; 

export async function generateStaticParams() {

    const supabase = createClient();

    let { data: blog_data, error } = await supabase.from('blog_data').select('id');

    if (error) {
        console.log(error);
    }
      
    return blog_data.map((blog) => {
            return {
               blogId: blog.id.toString(),  
            };
        });
}

export default BlogIdPage;  