import { useNavigate } from "react-router-dom"
import { Button } from "../components"
import { useAuth } from "../context/AuthProvider"
import { useEffect } from "react"
function MyProfile() {
  const {profile,fetchProfile} = useAuth()
  useEffect(() => {
   fetchProfile()
  }, [])
  
  const navigate = useNavigate()
  return (
    <>
      <div className="w-full h-full  flex items-center place-content-center ">
        <div className="w-[400px] h-[600px] border-2 border-black rounded-3xl flex-col bg-neutral-400">
          <div className="w-full h-[400px] bg-black rounded-t-[22px] overflow-hidden">
          <img src={Object.values(profile)[1]?.photo?.url} alt="" className="w-full h-full object-cover" /></div>
          <div className="w-full h-1/3  py-5 px-5 font-medium">
          <p className="text-3xl font-bold text-white">{Object.values(profile)[1]?.name}</p>
          <p>{Object?.values(profile)[1]?.role}</p>
          <p>{Object?.values(profile)[1]?.education}</p>
          <p>{Object?.values(profile)[1]?.email}</p>
          <Button children={`Update`} className="bg-blue-400 w-48 h-8  rounded-3xl relative left-16 mt-2 " onClick={()=>{
            navigate(`/update-profile/${profile?.user?._id}`)}} />
          </div>
        </div>
      </div>
    </>
  )
}

export default MyProfile
