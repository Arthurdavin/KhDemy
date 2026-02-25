// import React from 'react'

// export default function NavBarComponent() {
//   return (
//     <div>NavBarComponent</div>
//   )
// }

import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router
import { Moon } from 'lucide-react'; // Optional: for the dark mode icon

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            {/* Replace with your actual logo path */}
            <img 
              src="public/logo.jpg" 
              alt="KhDemy Logo" 
              className="h-20 w-auto" 
            />
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex space-x-10 text-gray-700 font-medium">
          <Link to="/courses" className="hover:text-blue-600 transition">Courses</Link>
          <Link to="/library" className="hover:text-blue-600 transition">Library</Link>
          <Link to="/blog" className="hover:text-blue-600 transition">Blog</Link>
          <Link to="/about" className="hover:text-blue-600 transition">About Us</Link>
        </div>

        {/* Right: Theme Toggle and Login */}
        <div className="flex items-center space-x-6">
          <button className="text-gray-700 hover:text-blue-600">
            <Moon className="w-6 h-6" /> {/* Dark mode icon */}
          </button>
          
          <button className="bg-[#2D3482] text-white px-8 py-2 rounded-full font-semibold hover:bg-blue-900 transition shadow-sm">
            Login
          </button>
        </div>

      </div>
    </nav>
  );
}