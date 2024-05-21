'use client';
import React from 'react';
import { blogEvents } from './utils/data';
import { useRouter } from 'next/navigation';


function BlogPage() {

    const router = useRouter();

    const handleClick = (props) => {
        router.push('/blogs/' + props);
    }

return (
    <div className="flex flex-wrap justify-center min-h-screen m-auto">
        {blogEvents.map((event, index) => (
            <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 m-4 w-64 h-96"
                onClick={() => handleClick(index + 1)}
            >
                <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                <p className="text-gray-600 mb-2">{event.shortDescription}</p>
                <p className="text-gray-600 mb-2">{event.details}</p>
                <p className="text-gray-600 mb-2">{event.date}</p>
                <p className="text-gray-600 mb-2">{event.location}</p>
                <p className="text-gray-600 mb-2">{event.speaker}</p>
            </div>
        ))}
    </div>
);
}

export default BlogPage