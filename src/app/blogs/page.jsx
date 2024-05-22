'use client';
import React, { useEffect ,useState} from 'react';
import { useRouter } from 'next/navigation';
import fetchData from './utils/fetchData';


function BlogPage() {
    const [blogEvents, setBlogEvents] = useState([]);

    const router = useRouter();

    const handleClick = (props) => {
        router.push('/blogs/' + props);
    }

    useEffect(() => {
        const fetchBlogData = async () => {
          const { data, error } = await fetchData();
          if (error) {
            setError(error);
          } else {
            setBlogEvents(data);
          }
        };
        fetchBlogData();
      }, []);

return (
  <div className="flex flex-wrap justify-center min-h-screen m-auto bg-gray-900">
    <h1 className="text-3xl font-bold p-6 text-white text-center">Our Events Blog</h1>
    <div className="grid grid-cols-1 p-5 md:p-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {blogEvents.map((event, index) => (
        <div
          key={event.id}
          className={`bg-gray-800 shadow-lg rounded-lg p-4 hover:shadow-xl hover:bg-gray-700 transition duration-300`}
          onClick={() => handleClick(event.id)}
        >
          <h2 className="text-xl font-bold mb-2 text-white">{event.title}</h2>
          <p className="text-gray-300 mb-2">{event.shortDescription}</p>
          <p className="text-gray-300 mb-2">{event.details}</p>
          <p className="text-gray-300 mb-2">{event.date}</p>
          <p className="text-gray-300 mb-2">{event.location}</p>
          <p className="text-gray-300 mb-2">{event.speaker}</p>
        </div>
      ))}
    </div>
  </div>
);
}

export default BlogPage