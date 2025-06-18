import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faBriefcase } from '@fortawesome/free-solid-svg-icons'

function Footer() {
  return (
    <footer className="border-t-2 border-black bg-white py-6 block">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        
        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/blogs">Blogs</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-gray-600">
            Welcome to our blog, where we share insights, stories, and the latest updates on a wide range of topics.
          </p>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <ul className="space-y-1">
            <li>
              <a href="https://www.instagram.com/invites/contact/?igsh=147abys5hf4ud&utm_content=8ptooap" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faCamera} className="mr-2" /> Instagram
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/mubashshir-islam-ba1483254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faBriefcase} className="mr-2" /> LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div>
          <h3 className="font-semibold mb-2">Copyright</h3>
          <p className="text-gray-500">&copy; {new Date().getFullYear()} BlogVerse. All rights reserved.</p>
          <ul className="mt-2 space-y-1 text-gray-500">
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

      </div>
    </footer>
  )
}

export default Footer
