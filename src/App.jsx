import {Register, Login, Home, Contact, About, Creators, Blogs, Dashboard, UpdateBlog, Container, UpdateProfile} from './main.js'
import './App.css'
import { Routes, Route} from 'react-router-dom'
import { useAuth } from './context/AuthProvider.jsx'

function App() {
let token = localStorage.getItem("jwt")
const {adminStatus} = useAuth()
  return (
    <> 
    
    <Routes>
      <Route exact path='/' element={token?<Home />:<Register /> } />
       <Route path='/register' element={<Register />} />
       <Route path='/dashboard' element={adminStatus === 'admin'?<Dashboard /> : null} />
       <Route exact path='/login' element={<Login />} />
       <Route exact path='/blog/update/:id' element={token?<UpdateBlog />: <Register />} />
       <Route exact path='/contact' element={token?<Contact />: <Register />} />
       <Route exact path='/creators' element={token?<Creators />: <Register />} />
       <Route exact path='/about' element={token?<About />: <Register />} />
       <Route exact path='/blogs' element={token?<Blogs />: <Register />} />
       <Route exact path='/home' element={token?<Home />: <Register />} />
       <Route exact path='/read-blog/:id' element={token?<Container />:<Register />} />
       <Route exact path='/update-profile/:id' element={token?<UpdateProfile />:<Register />} />
    </Routes> 
    </>
  )
}

export default App
