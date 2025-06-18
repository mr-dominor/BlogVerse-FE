import { NavBar ,Footer} from '../components/index.js'
import { useAuth } from '../context/AuthProvider.jsx'
function Creators() {
  const {blogs} = useAuth()
  const listn = [
    ...new Map(
      blogs.map((each) => [each?.createdBy?.photo?.url, { adminPhoto: each.createdBy?.photo?.url, adminName: each.createdBy?.name }])
    ).values()
  ];
  
  return (
    <div>
      <NavBar />
      <div className='w-screen h-screen  overflow-y-auto text-center'>
      <h1 className='text-3xl my-2 font-extrabold'>Our Top Creators</h1>
      <div className='w-full h-[400px] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4'>
      {listn.map((each,index)=>(
        <div key={index} className='h-96 w-72'>
          <div  className='w-72 h-72 rounded-full overflow-hidden mx-4 bg-black '>
          <img src={each.adminPhoto} alt="" className='object-fill' />
        </div>
        <p className=' text-2xl relative left-5 font-bold'>{each.adminName}</p>
        </div>
        
      ))}
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default Creators
