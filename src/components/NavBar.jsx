/* eslint-disable no-unused-vars */
/* eslint-disable react/no-children-prop */
import {Button} from '../components/index.js'
import React,{ useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import axios from 'axios'
import {useAuth} from '../context/AuthProvider'

function NavBar() {
    const navItems = {
        home:{
            name: "Home",
            link: "/home"
        },
        blogs:{
            name: "Blogs",
            link: "/blogs"
        },
        creators:{
            name: "Creators",
            link: "/creators"
        },
        about:{
            name: "About",
            link: "/about"
        },
        contact:{
            name: "Contact",
            link: "/contact"
        }
    }
    const navigate = useNavigate()
    const {setIsAuth, adminStatus}= useAuth()
    const logoutHandler = async() => {
        try {
          const respo = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/logout`,{withCredentials:true})
          if (respo.status === 200) {
            localStorage.removeItem("jwt")
          setIsAuth(false)
          navigate('/login')
          }

        } catch (error) {
            console.log(error.data?.response?.message)
        }
    }
    const dash = () => {
      navigate('/dashboard')
    }
    const [hide, setHide] = useState(false)
  return (
    <>
    <nav className=" h-10  text-black pt-2 pb-2 border-b-2 border-black bg-white ">
      <button className='border-2 border-solid bg-orange-400 text-white rounded-3xl ' onClick={()=>setHide(!hide)}>Options</button>
      <div className='w-full h-10  fixed  hidden md:flex bg-white top-0 border-b-2 border-black'>
        {Object.values(navItems).map((val) => (
        <div key={val.name} className='' >
            <NavLink to={`${val.link}`} className={({isActive}) =>`px-4 md:relative left-24 ${isActive? "border-b-[2.5px] border-orange-300 text-orange-500" : "text-black" }`}>{val.name}</NavLink>
        </div>
      ))}
      
     <Button children={`Dashboard`} className='bg-orange-400 w-20 h-8 rounded-3xl border-2 text-white md:fixed right-0' onClick={dash} /><br />
     <Button children={`Logout`} className='bg-orange-400 w-20 h-8 rounded-3xl border-2 text-white md:fixed right-20' onClick={logoutHandler} />
      </div>
      {hide && <div className='w-[30%] h-lvh fixed z-[999] bg-white leading-10 flex-col md:hidden'>
        {Object.values(navItems).map((val) => (
        <div key={val.name} className='z-[999]' >
            <NavLink to={`${val.link}`} className={({isActive}) =>`px-4 md:relative left-24 ${isActive? "border-b-[2.5px] border-orange-300 text-orange-500" : "text-black" }`}>{val.name}</NavLink>
        </div>
      ))}
      <Button children={`Dashboard`} className='bg-orange-400 text-white flex items-center justify-center w-20 h-8 rounded-3xl border-2 border-white md:fixed right-0' onClick={dash} /><br />
     <Button children={`Logout`} className='bg-orange-400 w-20 text-white lex items-center justify-center h-8 rounded-3xl border-2 border-white md:fixed right-20' onClick={logoutHandler} />
      </div>}
    </nav>
      
    </>
  )
}

export default NavBar
