"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import fetchData from "../../../utils/server/fetchData";
import BlogCard from "@/components/blog/Card";
import toast from "react-hot-toast";

function BlogPage() {
  const [blogEvents, setBlogEvents] = useState([]);

  const router = useRouter();

  const handleClick = (props) => {
    router.push("/blogs/" + props);
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      const { data, error } = await fetchData();
      if (error) {
        toast.error(error);
      } else {
        setBlogEvents(data);
      }
    };
    fetchBlogData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center min-h-screen m-auto ">
      <div className="flex flex-row w-full h-12 mt-2">
        <h1 className="text-3xl ml-[45vw] font-bold text-blue-800 mx-auto">
          Events
        </h1>
        <button
          className="ml-auto mr-3 bg-blue-800 font-bold text-white border-solid rounded-3xl hover:bg-violet-600 text-lg my-1 px-3"
          onClick={() => router.push("/add")}
        >
          Add Event
        </button>
      </div>
      <div className="grid grid-cols-1 p-5 md:p-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {blogEvents.map((event, index) => (
           <BlogCard key={index} {...event} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
}

export default BlogPage;
