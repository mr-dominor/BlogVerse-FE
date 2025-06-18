/* eslint-disable react/prop-types */

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';

function Container(){
  const [title,setTitle] = useState(""); 
  const [des,setDes] = useState("");
  const [cat,setCat] = useState("");
  const [blogImg,setBlogimg] = useState(""); 
  const [adPic,setAdPic] = useState("");   
  const {id} = useParams()

  useEffect(() => {
    const getBlog = async() =>{
      try {
    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/blog/get-single-blog/${id}`, {withCredentials:true})
    setTitle(data?.blog?.title)
    setDes(data?.blog?.about)
    setCat(data?.blog?.category)
    setBlogimg(data?.blog?.blogImage?.url)
    setAdPic(data?.blog?.createdBy?.photo?.url)
    } catch (error) {
    console.log(error?.response?.data?.message || "Occured at read blog frontend")
  }
    }
    getBlog()
  }, [id]);
  return(<>
  <div className='w-screen h-screen grid place-items-center'>
    <div className='w-[95vw] h-[95vh] bg-zinc-400 rounded-3xl'>
      <div className='w-[full] h-[70%] overflow-y-auto bg-slate-400 rounded-t-3xl'>
        <img src={blogImg} alt="BlogImg" className='w-full h-full rounded-t-3xl object-cover' />
      </div>
      <div className='w-full h-[20%] leading-loose'>
        <h1 className='font-bold'>{title?title:"Title"}</h1>
        <div className='w-[65%] sm:w-[80%] h-[80%] leading-tight overflow-y-auto pr-2'>
          <p className='text-white'>{des?des:"Description"}</p>
        </div>
        <div className='w-[70px] sm:w-24 h-[70px] sm:h-24 rounded-full bg-black absolute bottom-20 right-10'>
          <img src={adPic} alt="adPic" className='w-full h-full object-cover rounded-full' />
        </div>
        <p className='font-bold'>category:{cat?cat:null}</p>
        
      </div>
    </div>
  </div>
  </>)
}
export default Container
