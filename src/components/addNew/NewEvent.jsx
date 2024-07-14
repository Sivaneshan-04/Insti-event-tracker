"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "../../../utils/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const style =
  "py-2 px-2 block border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50";

const NewEvent = () => {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const routeProtector = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return router.push("/login");
    }
  };

  useEffect(() => {
    routeProtector();
    return () => {};
  }, []);

  const submitHandler = async(e) => {
    e.preventDefault();
    
    const title = e.target.title.value;
    const shortDescription = e.target.shortDescription.value;
    const location = e.target.location.value;
    const speaker = e.target.speaker.value;
    const date = e.target.date.value;
    const time = e.target.time.value;
    const detail = e.target.detail.value;
    const image = e.target.image.files[0];
    console.log(title, shortDescription, location, speaker, date, time, image);
    
    const valid = title && shortDescription && location && speaker && date && time && image;
    
    if(!valid) return toast.error('All fields are required');
    setLoading(true);
    
    try{
      const data2 = new FormData();
      setLoading(true);
      data2.append("file", image);
      data2.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME; // Your Cloudinary cloud name
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    
        const response = await fetch(url, {
          method: 'POST',
          body: data2,
        });
        console.log(response, 'response');
        if (!response.ok) {
          throw new Error('Image upload failed');
        }
    
        const uploadData = await response.json();
        console.log(uploadData, 'uploadData');
        
        const link = uploadData.secure_url;
        console.log('Image URL:', link);
        await Promise.all([response]);
        const {error} = await supabase.from('blog_data').insert({title,details:detail, image:link,shortDescription, location, speaker, date, time});
        console.log(error);
        if(error) toast.error(error.message);
        else{
            e.target.title.value = '';
            e.target.shortDescription.value = '';
            e.target.location.value = '';
            e.target.speaker.value = '';
            e.target.date.value = '';
            e.target.time.value = '';
            e.target.detail.value = '';
            e.target.image.value = '';
            router.push('/blogs');
        }
    }catch (error){
        console.log(error);
        toast.error(error.message);
    }
    setLoading(false);
  };
  return (
    <div className="w-full flex flex-col justify-center items-center min-h-screen">
      <div className="shadow-lg bg-slate-50 p-6">
        <h2 className="text-center font-bold text-3xl pb-3">Add New Event</h2>
        <form
          onSubmit={submitHandler}
          className="flex flex-col justify-start text-base"
          formEncType="multipart/form-data"
        >
          <div className="flex flex-col mb-2">
            <label className="pb-1" htmlFor="title">
              Title
            </label>
            <input type="text" name="title" className={style} id="title" />
          </div>
          <div className="flex flex-col mb-2">
            <label className="pb-1" htmlFor="shortDescription">
              Description
            </label>
            <textarea
              name="shortDescription"
              className={style}
              id="shortDescription"
            ></textarea>
          </div>
          <div className="flex flex-col mb-2">
            <label className="pb-1" htmlFor="detail">
              Detail
            </label>
            <textarea
              name="detail"
              className={style}
              id="detail"
            ></textarea>
          </div>
          <div className="flex flex-row  gap-5">

          <div className="flex flex-col mb-2">
            <label className="pb-1" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              name="location"
              className={style}
              id="location"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="pb-1" htmlFor="speaker">
              Speaker
            </label>
            <input type="text" name="speaker" className={style} id="speaker" />
          </div>
          </div>
          <div className="flex flex-row  gap-5">
            <div className="flex flex-col mb-2 w-2/3">
              <label className="pb-1" htmlFor="date">
                Date
              </label>
              <input type="date" name="date" className={style} id="date" />
            </div>
            <div className="flex flex-col mb-2 w-1/3">
              <label className="pb-1" htmlFor="time">
                Time
              </label>
              <input type="time" name="time" className={style} id="time" />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <label className="pb-1" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              name="image"
              className="py-2 px-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="image"
            />
          </div>
          {!loading && <button
            type="submit"
            className="px-6 py-2 bg-blue-600 rounded-lg text-white font-bold text-lg hover:bg-violet-200 hover:text-black"
          >
            Submit
          </button>}
            {loading && <button
                type="submit"
                className="px-6 text-center py-2 bg-gray-400 rounded-lg text-white font-bold text-lg"
                disabled
            >
               Uploading...
            </button>}
        </form>
      </div>
    </div>
  );
};

export default NewEvent;
