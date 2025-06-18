import { useEffect, useState } from 'react'
import { Button } from '../components/index.js'
import { MyBlogs, CreateBlog, MyProfile } from '../main.js'
import { useAuth } from '../context/AuthProvider.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
  const [component, setComponent] = useState("MyBlogs")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { profile, setIsAuth,fetchBlogs, fetchProfile } = useAuth()
  useEffect(() => {
   fetchBlogs()
   fetchProfile()
  }, [])
  
  const navigateTo = useNavigate()

  const logoutHandler = async () => {
    try {
      const respo = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/logout`, { withCredentials: true })
      if (respo.status === 200) {
        localStorage.removeItem("jwt")
        setIsAuth(false)
        navigateTo('/login')
      }
    } catch (error) {
      console.log(error?.response?.data?.message)
    }
  }

  return (
    <div className="flex h-screen  relative">
      {/* Toggle button for small screens */}
      <button
        className="absolute top-4 left-4 z-20 md:hidden text-sm px-4 py-2 bg-black text-white rounded"
        onClick={() => setSidebarOpen(prev => !prev)}
      >
        Menu
      </button>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen w-64 bg-white border-r-2 border-black z-10 p-4 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:relative md:w-96
      `}>
        <div className="w-40 h-40 mx-auto my-6 overflow-hidden rounded-full border-2 border-black shadow-lg">
          <img src={Object.values(profile)[1]?.photo?.url} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <Button children="My Blogs" className="my-2 w-full bg-orange-400 h-10 rounded-3xl border-2 border-black" onClick={() => setComponent("MyBlogs")} />
        <Button children="Create Blogs" className="my-2 w-full bg-orange-400 h-10 rounded-3xl border-2 border-black" onClick={() => setComponent("CreateBlogs")} />
        <Button children="My Profile" className="my-2 w-full bg-orange-400 h-10 rounded-3xl border-2 border-black" onClick={() => setComponent("MyProfile")} />
        <Button children="Logout" className="my-2 w-full bg-orange-400 h-10 rounded-3xl border-2 border-black" onClick={logoutHandler} />
        <Button children="Home" className="my-2 w-full bg-orange-400 h-10 rounded-3xl border-2 border-black" onClick={() => navigateTo('/')} />
      </div>

      {/* Main Content */}
      <div className="w-screen h-screen overflow-y-auto">
    {component === 'MyBlogs' ? <MyBlogs />
    : component === 'CreateBlogs' ? <CreateBlog />
      : component === 'MyProfile' ? <MyProfile />
        : null}
</div>

    </div>
  )
}

export default Dashboard
