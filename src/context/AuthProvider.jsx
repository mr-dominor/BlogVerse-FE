/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import React ,{useContext, createContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();
export const AuthContextProvider = ({children}) => {
    const [blogs, setBlogs] = useState([])
    const [profile, setProfile] = useState([])
    const [auth, setIsAuth] = useState(false);
    const [adminStatus, setAdminstatus] = useState()
    const navigate = useNavigate();
    const fetchProfile = async() => {
        let token = localStorage.getItem("jwt")
        try {
            if (token) {
                const respo = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/my-profile`,{withCredentials:true})
            setProfile(respo.data)
            setIsAuth(true)
            setAdminstatus(respo.data.user.role)
            }
        } catch (error) {
            navigate('/register')
        }
       }
       const fetchBlogs = async() => {
        try {
            const respo = await axios.get(`${import.meta.env.VITE_API_URL}/api/blog/get-all-blogs`)
            setBlogs(respo.data.blogs)
        } catch (error) {
            console.log(error)
        }
       }

    useEffect(()=>{
       fetchBlogs()
       fetchProfile()
    },[])
    return (
        <AuthContext.Provider
        value={{
            blogs,
            profile,
            auth,
            setIsAuth,
            setProfile,
            adminStatus,
            fetchBlogs,
            fetchProfile
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)