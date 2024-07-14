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
        <div className=" h-screen">
            <div className="center-section m-16 p-12 md:p-7">
               <div className='flex flex-row'>
                <div className="md:m-auto center-section w-2/3">
                    <p className="text-slate-700 py-1">Location : <span className='font-bold'>{blog.location}</span></p>
                    <h2 className="py-1 text-2xl font-bold">{blog.title}</h2>
                    <p className="text-slate-700 py-1">{blog.shortDescription}</p>
                    <div className='flex-row flex gap-10'>
                    <p className="text-slate-700 py-1">Speaker : <span className='font-bold'>{blog.speaker}</span></p>
                    <p className="text-slate-700 py-1">Date : <span className='font-bold'>{blog.date}</span></p>
                    </div>
                </div>
                <div className="flex justify-center w-1/3">
                    <img src={blog.image} alt={blog.title} className="w-[300px] h-[280px] items-center" width={300} height={300} />
                    </div>
                </div> 
                <div className="mt-4 text-slate-700 mx-auto">
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