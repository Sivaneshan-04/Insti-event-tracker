"use client";
import React from "react";
import { MapPin, User } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";
import toast from "react-hot-toast";

const BlogCard = (event) => {
  const [isAttending, setIsAttending] = React.useState(false);
  const router = useRouter();
  const supabase = createClient();

  const attendHandler = async(id) => {
    
    try{
      let {data,error} = await supabase.from('blog_data').select('*').eq('id',id);
      if (error){
        toast.error("Error saving it");
      }
      console.log(data)
      data[0].attendees += 1;

      const {data:updatedData, error: updateError} = await supabase.from('blog_data').update(data[0]).eq('id',id);
      if (updateError){
        toast.error("Error saving it");
      }     
      setIsAttending(true);
    }catch(error){
      console.log(error);
      toast.error('Error connecting with Backend')
    }
  };

  const attendDeHandler = async() => {
    setIsAttending(false);
  }

  const handleClick = (id) => {
    router.push("/blogs/" + id);
  };
  return (
    <div
      className={`bg-slate-100 shadow-lg rounded-lg p-4`}
      // onClick={() => handleClick(event.id)}
    >
      <img
        src={event.image}
        alt={event.title}
        className="w-[300px] h-[280px] items-center"
        width={300}
        height={300}
      />
      <p className="text-gray-600 mb-2 text-sm">
        {event.date} | {event.time}
      </p>
      <h2 className="text-lg font-bold mb-2 text-black">{event.title}</h2>
      <p className="text-gray-600 mb-2">{event.shortDescription}</p>
      <div className="flex flex-row justify-around my-2">
        <p className="text-gray-600 mb-2 flex flex-row items-center gap-2">
          <User size={24} weight="duotone" />
          {event.speaker}
        </p>
        <p className="text-gray-600 mb-2 flex flex-row item-center gap-2">
          <MapPin size={24} weight="duotone" />
          {event.location}
        </p>
      </div>
      <div className="flex flex-row justify-around">
        {isAttending? <button className={ 'bg-green-300 mr-2 w-2/3 font-bold'} onClick={()=>attendDeHandler(event.id)}>
          Attending
        </button>:
         <button className={'bg-gray-200 mr-2 w-2/3 font-bold'} onClick={()=>attendHandler(event.id)}>
         Attend
       </button>
        }
        <button
          className="w-2/3 bg-blue-500 hover:shadow-xl hover:bg-slate-400 transition duration-300 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleClick(event.id)}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
