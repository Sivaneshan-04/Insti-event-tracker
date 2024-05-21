import React from 'react';
import { blogEvents } from '../utils/data';

function BlogIdPage({ params }) {
    const blog = blogEvents.find((blog) => blog.id.toString() === params.blogId);
 
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="center-section m-auto p-3 md:p-7">
                <div className="md:m-auto center-section">
                    <p className="text-gray-500 py-1">{blog.location}</p>
                    <h2 className="py-1 text-2xl font-bold">{blog.title}</h2>
                    <p className="text-gray-500 py-1">{blog.shortDescription}</p>
                    <p className="text-gray-500 py-1">{blog.speaker}</p>
                    <p className="text-gray-500 py-1">{blog.date}</p>
                </div>
                <div className="mt-4">
                    {blog.details}
                </div>
            </div>
        </div>
    );
}

export const revalidate = 300; 

export async function generateStaticParams(context) {
      
    return blogEvents.map((blog) => {
            return {
               blogId: blog.id.toString(),  
            };
        });
}

export default BlogIdPage;  