/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { Input, Button } from "../components"
import { useNavigate,  useParams } from "react-router-dom"
import axios from "axios"
function UpdateBlog() {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [blogPhoto, setBlogPhoto] = useState("")
    const[preview, setPreview] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] =useState("")
    const [load,setLoad] = useState(false)
    const {id} = useParams()
    const navigateTo = useNavigate()
    
  useEffect(() => {
    const fetchBlog = async() => {
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/blog/get-single-blog/${id}`, {withCredentials:true})
            setTitle(data?.blog?.title || "");
      setCategory(data?.blog?.category || "");
      setDescription(data?.blog?.about || "");
      setPreview(data?.blog?.blogImage?.url || "");
      setBlogPhoto(data?.blog?.blogImage || "");
            
        } catch (error) {
            console.log(error?.response?.data?.message || "Error occured at update frontend")
        }
        
    }
    fetchBlog()
  }, [id])
  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload= () => {
            setBlogPhoto(file)
            setPreview(reader.result)
        }
    }
  }

  const updateHandler = async(e) => {
    e.preventDefault()
    setError("")
    if(!title || !category || !blogPhoto || !description) {
        setError("Something is missing")
        return
    }
    setLoad(true)
    const formData = new FormData()
    formData.append("title",title)
    formData.append("category", category)
    formData.append("blogPhoto",blogPhoto)
    formData.append("about",description)

    try {
        const data = await axios.put(`${import.meta.env.VITE_API_URL}/api/blog/update-blog/${id}`,formData,{withCredentials:true})
        if (data) {
            console.log("Update done",data)
            setSuccess("✅ Update Successful")
        }
        setTitle("")
        setCategory("")
        setDescription("")
        setPreview("")
        setBlogPhoto("")
        setLoad(false)
        setTimeout(() => {
            navigateTo('/dashboard');
        }, 5000);
        
    } catch (error) {
        setError(error?.response?.data?.message || "Failed Updating, try again...")
        setLoad(false)
    }
  }
  return (
    <>
   
    <form onSubmit={updateHandler}>
    <div className="w-[100%] h-screen text-center flex justify-center items-center mx-24">
    <div className="w-[500px] h-[520px] border-2 border-black rounded-3xl shadow-2xl bg-neutral-200 place-content-center">
    <h1 className="font-black text-4xl ">Update Blog</h1>
    <Input type={`text`} placeholder={`Enter title`} value={title} className="w-96 h-10 rounded-2xl px-4 border-2 my-2 border-black" onChange={(e)=>setTitle(e.target.value)} />
    <select name="category" value={category} id="category" className="w-96 h-10 rounded-2xl px-4 border-2 my-2 border-black" onChange={(e)=>setCategory(e.target.value)}  >
        <option value="">Select Category</option>
        <option value="Education">Education</option>
        <option value="Devotion">Devotion</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Business">Business</option>
        <option value="Medical Science">Medical Science</option>
        <option value="Technology">Technology</option>
        <option value="Finance">Finance</option>
        <option value="Politics">Politics</option>
        <option value="Travel">Travel</option>
    </select>
    {blogPhoto && <div className="w-[100%] h-[35%] bg-black text rounded-3xl overflow-y-auto">
      <img src={preview} className="object-cover"  />
    </div> }
    {blogPhoto && <Button children={'X'} className="border-2 border-black w-8 h-8 bg-white rounded-full" onClick={()=>{
      setPreview("")
      setBlogPhoto("")
    }} /> } <br />
    <Input type="file" id="nand"  className={`w-96 h-10 rounded-2xl  px-4 border-2 my-2 border-black bg-white ${preview?'hidden':'block'}`}  onChange={handlePhoto} />
    <textarea name="description" value={description} rows={4} cols={50} placeholder="Description here" className="rounded-3xl border-2 border-black box-border py-2" onChange={(e)=>setDescription(e.target.value)} ></textarea>
    <Button type="submit" children={load?`Submitting...`:`Submit`} className="bg-blue-400 w-48 h-10 text-white rounded-3xl border-2 border-white" />
    {error && <p className="text-red-500">{error}</p> }
    
    </div>
    </div>
    </form>
    {success && <div className="w-48 h-8  absolute left-[520px] bottom-6 rounded-xl text-center border-2 border-black font-bold">
        <p>{success}</p></div> }
    
    </>
  )
}

export default UpdateBlog
