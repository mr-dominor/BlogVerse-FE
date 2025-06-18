import { useNavigate, useParams } from 'react-router-dom'
import { Input,Button } from '../components'
import { useState,useEffect } from 'react'
import axios from 'axios'

function UpdateProfile(){
    const {id} = useParams()
    const [image,setImage] = useState()
    const [name,setName] = useState()
    const [deg,setDeg] = useState()
    const [email,setEmail] = useState()
    const [preview,setPreview] = useState()
    const [err,setErr] = useState()
    const [success,setSuccess] = useState()
    const [load,setLoad] = useState(false)
    const navigateTo = useNavigate()

    useEffect(() => {
      let flag = false
      const updateProfileDetails = async()=>{

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/my-profile`,{withCredentials:true})
      if(!flag){
        setPreview(res?.data?.user?.photo?.url)
        setImage(res?.data?.user?.photo?.url)
        setName(res?.data?.user?.name)
        setDeg(res?.data?.user?.education)
        setEmail(res?.data?.user?.email)
      }
      }
      updateProfileDetails()
      return () => {
        flag = true
      }
    }, [])
    

    const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload= () => {
            setImage(file)
            setPreview(reader.result)
        }
    }
  }
  const updateHandler = async(e)=>{
    e.preventDefault()
    if(!image || !email || !name || !deg){
      setErr("All are required")
      return;
    }
    setLoad(true)
    const formData = new FormData()
    formData.append("name",name)
    formData.append("email",email)
    formData.append("education",deg)
    if (image instanceof File) {
    formData.append("adminPhoto", image);
  }
    console.log(import.meta.VITE_API_URL)
    try {
      const data = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/update-profile/${id}`,formData,{withCredentials:true})
        if (data) {
            console.log("Update done",data)
            setSuccess("✅ Update Successful")
        }
        setDeg("")
        setEmail("")
        setName("")
        setPreview("")
        setImage("")
        setLoad(false)
        setTimeout(() => {
            navigateTo('/dashboard');
        }, 5000);
    } catch (error) {
       setErr(error.message || "Something went wrong at updating profile")
       setLoad(false)
    }
  }

  return (
  <><form onSubmit={updateHandler}>
    {/*Image,Name,degree,email*/}
    <div className='w-screen h-screen grid place-items-center '>
      <div className='w-[80vw] h-[60vh]  bg-zinc-400 rounded-3xl grid place-items-center'>
        <h1 className="font-black text-4xl ">Update Profile</h1>
        <Input type={`file`} id="nandy" accept="image/*" className={`w-[80%] h-14 bg-white rounded-3xl px-4 py-2 ${preview?'hidden':'block'} `} onChange={handlePhoto} />
        {preview && <div className='w-[80%] h-24 bg-white rounded-3xl overflow-y-auto object-contain'>
          <img src={preview} alt="Choosen file" />
        </div> }
        {preview && <div className='w-10 h-10 bg-white rounded-full'>
          <Button children={`X`} className='w-full h-full' onClick={()=>{
            setPreview("")
            setImage("")
          }} />
        </div> }
        <Input type={`text`} placeholder={`Enter New Name`} value={name} className="w-[80%] h-10 rounded-2xl px-4 border-2  border-black"   onChange={(e)=>setName(e.target.value)} />
        <Input type={`text`} placeholder={`Enter New Degree`} value={deg} className="w-[80%] h-10 rounded-2xl px-4 border-2  border-black"  onChange={(e)=>setDeg(e.target.value)} />
        <Input type={`text`} placeholder={`Enter New Email`} value={email} className="w-[80%] h-10 rounded-2xl px-4 border-2  border-black" onChange={(e)=>setEmail(e.target.value)} />
        <Button type="submit" children={load?`Submitting...`:`Submit`} className="bg-blue-400 w-48 h-10 text-white rounded-3xl border-2 border-white" />
      </div>
      {err && <p className='text-red-500'>{err}</p> }
      {success && <div className="w-48 h-8 bottom-6 rounded-xl text-center border-2 border-black font-bold">
        <p>{success}</p></div> }
    </div>
  </form>
  </>
    
  )
}


export default UpdateProfile