import { useEffect } from 'react'
import { NavBar, Footer, Button } from '../components/index.js'
import {useAuth} from '../context/AuthProvider'
import {useNavigate} from 'react-router-dom'
function Blogs() {


  const navigate = useNavigate();
  const {blogs,fetchBlogs} = useAuth()
  useEffect(() => {
    fetchBlogs(); // ✅ will update blogs from the backend on mount
  }, []);
  return (
    <div>
      <NavBar />
      <div className='w-screen h-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto' >
      {blogs ?( 
        blogs.map((object, index)=>(
          <div key={index} className='w-96 h-80 bg-neutral-400 m-2 rounded-3xl shadow-lg border-2 border-white'>
            <div className='w-full h-[75%] bg-gray-500 rounded-t-3xl overflow-hidden' >
              <img src={object.blogImage.url} alt={object.title} className='w-96 h-64 ' />
            </div>
            <div className='w-full h-[25%] rounded-b-3xl flex justify-start items-center'>
              <div className='w-16 h-16 rounded-full overflow-hidden  border-2 border-white shadow-lg mx-3'>
              <img src={object?.createdBy?.photo?.url} alt="" className='w-full h-full object-cover relative'/>
              </div>
              <div>
                <p className='text-white text-xl font-bold w-36' >{object.title}</p>
                <p>{object?.createdBy?.name}</p>
              </div>
            </div>
            {<p className=' text-white relative bottom-32 mx-3 font-bold text-xl '>{object.category}</p>}
            <Button children={`Read`} className={`w-16 h-10 rounded-2xl bg-blue-400 relative left-72 bottom-20 border-2 border-white shadow-lg`} onClick={()=>{
              navigate(`/read-blog/${object._id}`);
             
            }} />
          </div>
        ))
      ) : null}
      </div>
      <Footer />
    </div>
  )
}

export default Blogs
