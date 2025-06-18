import { useNavigate } from "react-router-dom"
import { Input, Button } from "../components"
import { useState } from "react"
import axios from "axios"

function CreateBlog() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [blogPhoto, setPhoto] = useState("")
  const[preview, setPreview] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [load,setLoad] = useState(false)
  const navigate = useNavigate()
  const handlePreview = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload=() => {
        setPreview(reader.result)
        setPhoto(file)
      }
    }
  }

  const submitHandler = async(e) => {
    e.preventDefault()
    setError("")
    if (!title || !category || !blogPhoto || !description) {
      setError("All are Required")
      return;
    }
    setLoad(true)
    const formData = new FormData()
    formData.append("title",title)
    formData.append("category", category)
    formData.append("blogPhoto",blogPhoto)
    formData.append("about",description)
    try {
      const respo = await axios.post(`${import.meta.env.VITE_API_URL}/api/blog/create-blog`,formData, {withCredentials: true})
      if (respo) {
            setSuccess("✅ Update Successful")
            setTitle("")
            setCategory("")
            setPhoto("")
            setPreview("")
            setDescription("")
            setLoad(false)
            navigate('/dashboard');
      }
  
    } catch (error) {
      setError(error?.response?.data?.message)
      setLoad(false)
    }
  }

  return (
    <>
    <form onSubmit={submitHandler}>
    <div className="w-[100%] h-screen text-center flex justify-center items-center mx-24">
    <div className="w-[500px] h-[520px] border-2 border-black rounded-3xl shadow-2xl bg-neutral-200 place-content-center">
    <h1 className="font-black text-4xl ">Create Blog</h1>
    <Input type={`text`} placeholder={`Enter title`} className="w-96 h-10 rounded-2xl px-4 border-2 my-2 border-black" onChange={(e)=>setTitle(e.target.value)} />
    <select name="category" id="category" className="w-96 h-10 rounded-2xl px-4 border-2 my-2 border-black" onChange={(e)=>setCategory(e.target.value)} >
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
      {blogPhoto && <div className="w-96 h-28 bg-black text relative left-14 rounded-3xl overflow-y-auto">
      <img src={preview} className="object-cover"  />
    </div> }
    {blogPhoto && <Button children={'X'} className="border-2 border-black w-5 relative bottom-28 left-52" onClick={()=>{
      setPreview("")
      setPhoto("")
    }} /> } <br />
    <Input type="file" id="nand"  accept="image/*" className="w-96 h-10 rounded-2xl  px-4 border-2 my-2 border-black bg-white ${photo ? 'ml-10':'ml-0'} " onChange={handlePreview} />
    <textarea name="description"  rows={4} cols={50} placeholder="Description here" className="rounded-3xl border-2 border-black box-border py-2" onChange={(e)=>setDescription(e.target.value)} ></textarea> <br />
    <Button type="submit" children={load?`Loading...`:`Submit`} className={`bg-blue-400 w-48 h-10 text-white rounded-3xl border-2 border-white `} />
    {error && <p className="text-red-500">{error}</p> }
    </div>
    </div>
    {success && <div className="w-48 h-8  absolute left-[520px] bottom-6 rounded-xl text-center border-2 border-black font-bold">
      <p>{success}</p></div> }
    </form>
    </>
  )
}

export default CreateBlog
