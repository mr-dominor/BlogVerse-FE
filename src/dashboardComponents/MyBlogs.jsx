
import { useAuth } from "../context/AuthProvider"
import { Button } from "../components"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
function MyBlogs() {
    const {blogs, profile,fetchBlogs} = useAuth()
    useEffect(() => {
      fetchBlogs()
    }, [])
    const [del,setDel] = useState(null)
    const match = blogs.filter(blog => blog?.createdBy?.name == Object.values(profile)[1]?.name)
    const navigateTo = useNavigate()
    const handleDelete= async(id) => {

      setDel(id)
      try {
        const respo = await axios.delete(`${import.meta.env.VITE_API_URL}/api/blog/delete-blog/${id}`, {withCredentials: true})
        await fetchBlogs()
        if (respo) {
          console.log(respo)

          setDel(null)
        }
      } catch (error) {
        console.log(error?.response?.data?.message)
        setDel(null)
      }
    }
    
  return (
    <>
      <div className="w-full h-72 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  my-3 mx-2">
      {match.length>0 ?
      (match.map((object,index)=>(
        <div key={index} className="w-72 h-72 border-2 border-black rounded-3xl mx-2  flex-col items-center shadow-2xl">
            <div className="w-[100%] h-[75%] m-0 bg-green-300 overflow-hidden relative rounded-t-[22px]">
              <img src={match[index]?.blogImage?.url} alt="" className="w-full h-full object-cover" />
              <p className="text-white absolute top-44 px-5 font-bold text-xl">{match[index]?.category}</p>
            </div>
            <div className="w-[100%] h-[25%] bg-neutral-400 rounded-b-[22px]  flex items-center" id="mid">
              <Button children={`Update`} className="bg-blue-400 w-20 rounded-3xl border-2 border-white shadow-2xl shadow-black mx-4 font-semibold" onClick={()=>navigateTo(`/blog/update/${match[index]?._id}`)} />
              <Button children={del === match[index]?._id ? `Deleting...` : `Delete`} className={`bg-blue-400  w-20 rounded-3xl border-2 border-white shadow-2xl shadow-black relative left-16 font-semibold`} onClick={()=> handleDelete(match[index]?._id)} />
            </div>
        </div>
      ))):
      ( <h1>Create Your First Blog</h1> ) }
      </div>
      
    </>
  )
}

export default MyBlogs
