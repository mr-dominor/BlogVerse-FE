/* eslint-disable no-unused-vars */
/* eslint-disable react/no-children-prop */
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Input, Button } from '../components/index.js'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useAuth} from '../context/AuthProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [show, setShow] = useState(false)
  const [password, setPassword] = useState("")
  const [contact, setContact] = useState("")
  const [role, setRole] = useState("")
  const [education, setEducation] = useState("")
  const [photo, setPhoto] = useState("")
  const [preview, setPreview] = useState("")
  const {setProfile, setIsAuth} = useAuth()
  const[load,setLoad] = useState(false)
  const navigate = useNavigate()
  const handlePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setPreview(reader.result)
        setPhoto(file)
      }
    }
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    setError("")
    if (!name || !email || !password || !contact || !role || !education || !photo) {
      console.log("fucked")
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoad(true)
   
    const formData = new FormData()
    formData.append("name",name)
    formData.append("email",email)
    formData.append("contact",contact)
    formData.append("password",password)
    formData.append("role",role)
    formData.append("education",education)
    formData.append("photo",photo)
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`,formData, {withCredentials:true, headers: {
        "Content-Type" : "multipart/form-data"
      }})
      

      localStorage.setItem("jwt",data.token)
      toast.success(data.message || "User registered successfully");
        setName("");
        setEmail("");
        setContact("");
        setPassword("");
        setRole("");
        setEducation("");
        setPhoto("");
        setPreview("");
        setProfile(data);
        setIsAuth(true);
        setLoad(false)
        navigate("/")
        
    } catch (error) {
      setError(error.response?.data?.message)
      setLoad(false)
      
    }
  }
 

  return (
    <>
    <div className='w-full h-screen grid place-items-center'>
      <h6 className='text-5xl font-bold'>BlogVerse</h6>
      <div className='w-[450px] h-full border-2 border-black bg-slate-300 rounded-3xl py-1 text-center ' >
    <form onSubmit={handleSubmit} >
      <div className='w-[100%] h-[100%] leading-none'>
        <Input type='file' className={`w-[150px] h-[150px] bg-black relative left-[35%] rounded-[50%] ${preview?'hidden':'block'} `} id="custom" onChange={handlePreview} />
      {photo && (<div className='w-[150px] h-[150px]  bg-slate-400 rounded-[50%] overflow-hidden relative left-[35%] '>
      <img src={preview} alt="" className={`object-cover h-full w-full }`} />
      </div>)}
      {photo && <Button children={`X`} className={`border-2 w-8 border-black z-40`} onClick={()=>{
        setPhoto("")
        setPreview("")
      }} />}
    <Input  placeholder="Enter your name" className='bg-white w-96 h-8 rounded-xl text-center border-2 border-black m-1' onChange={(e) => setName(e.target.value)} value={name}  /><br />
    <Input  placeholder="Enter your email" type='eamil' className='bg-white w-96 rounded-xl text-center border-2 border-black m-1 h-8' onChange={(e) => setEmail(e.target.value)} value={email} /><br />
    <Input  placeholder="Enter your contact" type='number' className='bg-white w-96 rounded-xl text-center border-2 border-black m-1 h-8' onChange={(e) => setContact(e.target.value)} value={contact} /><br />
    <Input  placeholder="Enter your password" type={show?"text":"password"} className='bg-white w-96 rounded-xl text-center border-2 border-black m-1 h-8' onChange={(e) => setPassword(e.target.value)} value={password} />
    {password && <button onClick={()=>setShow(!show)} type='button' > {show?<FontAwesomeIcon icon={faEye} />:<FontAwesomeIcon icon={faEyeSlash} />} </button>} <br />
    <select name="role" id="role" className='rounded-xl border-2 border-black' onChange={(e) => setRole(e.target.value)} value={role} >
      3<option value="" >Role</option>
      <option value="user" >User</option>
      <option value="admin">Admin</option>tion
    </select>
    <label htmlFor="role" > Select your role</label><br />
    <select name="education" id="education" className='rounded-xl  m-2 border-2 border-black' onChange={(e) => setEducation(e.target.value)} value={education} >
      <option value="" >Education</option>
      <option value="bachelors" >Bachelor</option>
      <option value="masters">Masters</option>
      <option value="Undergraduate">Undergraduate</option>
      <option value="none">None</option>
    </select>
    <label htmlFor="education" > Education</label><br /><p className='text-blue-500 py-1'>
     Already have an account?<Link to="/login">Login</Link>
    </p>
    
    <Button children={load?`Registering...`:`Register`} type='submit' className={`bg-green-500 rounded-2xl px-8 py-1 border-2  border-black`} />
    {error && <p className='text-red-500'>{error}</p> }
      </div>
      
    </form>
    
    </div>
    </div>
    </>
  )
}

export default Register
