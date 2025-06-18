
import { useEffect } from "react"
import { Footer,Slider, Button } from "../components"
import NavBar from "../components/NavBar"
import { useAuth } from "../context/AuthProvider"
import { useNavigate } from "react-router-dom"
function Home() {

  const navigate = useNavigate()
  const {blogs,fetchBlogs} = useAuth()
  
  useEffect(() => {
    fetchBlogs()
    }, [])
  
  const responsiveConfig = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  }
  const travel = blogs.filter((obj)=>(obj.category === 'Travel'))
  const entertainment = blogs.filter((obj)=>(obj.category === 'Entertainment'))
  const education = blogs.filter((obj)=>(obj.category === 'Education'))
  const items = entertainment.map((object, index)=>(
      <div key={index} className='w-96 h-96 bg-neutral-400  rounded-3xl shadow-lg border-2 border-white'>
        <div className='w-full h-[75%] bg-gray-500 rounded-t-3xl overflow-hidden' >
          <img src={object.blogImage.url} alt={object.title} className='w-[400px] h-72 ' />
        </div>
        <div className='w-full h-[25%]  rounded-b-3xl flex justify-start items-center'>
          <div className='w-16 h-16 rounded-full overflow-hidden  border-2 border-white shadow-lg mx-3'>
          <img src={object?.createdBy?.photo?.url} alt="" className='w-full h-full object-cover relative'/>
          </div>
          <div>
            <p className='text-white text-xl font-bold w-36' >{object.title}</p>
            <p>{object?.createdBy?.name}</p>
          </div>
          <Button children={`Read`} className={`w-16 h-10 rounded-2xl relative bg-blue-400 left-16 border-2 border-white shadow-lg`} onClick={()=>{
            navigate(`/read-blog/${object?._id}`)
            }} />
        </div>
        {<p className=' text-white relative bottom-36 mx-3 font-bold text-xl '>{object.category}</p>}
      </div>
    ))
    const items2 = travel.map((object, index)=>(
      <div key={index} className='w-96 h-96 bg-neutral-400  rounded-3xl shadow-lg border-2 border-white'>
        <div className='w-full h-[75%] bg-gray-500 rounded-t-3xl overflow-hidden' >
          <img src={object.blogImage.url} alt={object.title} className='w-[400px] h-72 ' />
        </div>
        <div className='w-full h-[25%]  rounded-b-3xl flex justify-start items-center'>
          <div className='w-16 h-16 rounded-full overflow-hidden  border-2 border-white shadow-lg mx-3'>
          <img src={object?.createdBy?.photo?.url} alt="" className='w-full h-full object-cover relative'/>
          </div>
          <div>
            <p className='text-white text-xl font-bold' >{object.title}</p>
            <p>{object?.createdBy?.name}</p>
          </div>
          <Button children={`Read`} className={`w-16 h-10 rounded-2xl relative bg-blue-400 left-16 border-2 border-white shadow-lg`} onClick={()=>{
            navigate(`/read-blog/${object?._id}`)
            }} />
        </div>
        {<p className=' text-white relative bottom-36 mx-3 font-bold text-xl '>{object.category}</p>}
      </div>
    ))
    const items3= education.map((object, index)=>(
      <div key={index} className='w-96 h-96 bg-neutral-400  rounded-3xl shadow-lg border-2 border-white'>
        <div className='w-full h-[75%] bg-gray-500 rounded-t-3xl overflow-hidden' >
          <img src={object.blogImage.url} alt={object.title} className='w-[400px] h-72 ' />
        </div>
        <div className='w-full h-[25%]  rounded-b-3xl flex justify-start items-center'>
          <div className='w-16 h-16 rounded-full overflow-hidden  border-2 border-white shadow-lg mx-3'>
          <img src={object?.createdBy?.photo?.url} alt="" className='w-full h-full object-cover relative'/>
          </div>
          <div>
            <p className='text-white text-xl font-bold w-24' >{object.title}</p>
            <p>{object?.createdBy?.name}</p>
          </div>
          <Button children={`Read`} className={`w-16 h-10 rounded-2xl relative bg-blue-400 left-16 border-2 border-white shadow-lg`} onClick={()=>{
            navigate(`/read-blog/${object?._id}`)
            }} />
        </div>
        {<p className=' text-white relative bottom-36 mx-3 font-bold text-xl '>{object.category}</p>}
      </div>
    ))
  
  
  return (
    <div>
      <NavBar />
      {entertainment.length>0? (
          <div className=" w-screen h-96 -z-50  my-10 ">
            <h1 className="font-bold text-xl mx-2 capitalize">Entertainment</h1>
            <div className="w-screen h-96">
            <Slider items={items} responsiveConfig={responsiveConfig} className={`h-[420px] w-screen   px-3 rounded-3xl`} />
            </div>
        </div>
        )
       : null}
       {travel.length>0? (
          <div className=" w-screen h-96  my-10">
            <h1 className="font-bold text-xl mx-2 capitalize">Travel</h1>
            <div className="w-screen h-96">
            <Slider items={items2} responsiveConfig={responsiveConfig} className={`h-[420px] w-screen   px-3 rounded-3xl`} />
            </div>
        </div>
        )
       : null}
       {education.length>0? (
          <div className=" w-screen h-96  my-10">
            <h1 className="font-bold text-xl mx-2 capitalize">Education</h1>
            <div className="w-screen h-96">
            <Slider items={items3} responsiveConfig={responsiveConfig} className={`h-[420px] w-screen   px-3 rounded-3xl`} />
            </div>
        </div>
        )
       : null}
      <Footer />
    </div>
    )
  }

export default Home
