/* eslint-disable no-unused-vars */
/* eslint-disable react/no-children-prop */
import { useState } from 'react'
import {Input, Button} from '../components/index.js'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../context/AuthProvider'
import toast from 'react-hot-toast'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [role, setRole] = useState("")
  const [error, setError] = useState("")
  const [load,setLoad] = useState(false)
  const {setProfile, setIsAuth} = useAuth()
  const navigateTo = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault()
    if (!email || !password || !role) {
      setError("Something is Missing")
    }
    setLoad(true)
    const formData = new FormData()
    formData.append("email", email)
    formData.append("password", password)
    formData.append("role",role)
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, formData, {withCredentials:true, headers: {
        "Content-Type": "application/json",
      },
      })
      
      localStorage.setItem("jwt",data.token)
      setProfile(data)
      setIsAuth(true)
      setEmail("")
      setPassword("")
      setRole("")
      setLoad(false)
      navigateTo("/")
    } catch (error) {
      setError(error.response?.data?.message)
      setLoad(false)
    }
  }
  return (
    <>
    <div className='w-full h-full text-center grid place-items-center'>
      <h1 className='text-5xl font-bold'>BlogVerse</h1>
      <form onSubmit={handleSubmit}>

      <div className='w-[450px] h-4/6 bg-slate-300 rounded-3xl mt-6 border-2 border-black text-center'>
      <h1 className='text-2xl font-mono py-10 '>LOGIN</h1>
      <Input type='email' placeholder='Enter email' className='bg-white w-96 h-8 rounded-xl text-center border-2 border-black m-1' onChange={(e) => setEmail(e.target.value)}  />
      <Input type={show?"text":"password"} placeholder='Enter password' className='bg-white w-96 h-8 rounded-xl text-center border-2 border-black m-1' onChange={(e) => setPassword(e.target.value)} id="pass" />
      {password && <button type='button' onClick={()=>setShow(!show)}>{show?<FontAwesomeIcon icon={faEyeSlash} />:<FontAwesomeIcon icon={faEye} />}</button> }
      <select name="role" id="role" className='rounded-xl  m-2 border-2 border-black' onChange={(e) => setRole(e.target.value)} >
        <option value="">Select role</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select><br />
      <p className='text-blue-500 py-1'>Don&apos;t have an account? <Link to={"/register"}>Register now</Link></p>
      <Button type='submit' children={load?`Logging...`:`Login`} className={`bg-green-500 rounded-2xl px-8 py-1 border-2 relative bottom-1  border-black`} />
      {error && (<p className='text-red-500'>{error}</p> ) }
    </div>
    </form>
    </div>
    </>
    
  )
}

export default Login
