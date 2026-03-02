import React from 'react';
import { Facebook, Send, Youtube, Instagram, Moon } from 'lucide-react';

const KhDemyPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* --- Navigation Bar --- */}
      <nav className="flex items-center justify-between px-12 py-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold">KH</div>
        </div>
        
        <div className="flex items-center gap-8 text-sm font-medium">
          <a href="#" className="hover:text-blue-600">Courses</a>
          <a href="#" className="hover:text-blue-600 border-b-2 border-blue-600 pb-1">Library</a>
          <a href="#" className="hover:text-blue-600">Blog</a>
          <a href="#" className="hover:text-blue-600">About Us</a>
        </div>

        <div className="flex items-center gap-4">
          <Moon size={20} className="cursor-pointer" />
          <button className="bg-blue-900 text-white px-6 py-2 rounded-md text-sm">Login</button>
        </div>
      </nav>

      {/* --- Main Content Section --- */}
      <main className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Book Cover Image */}
        <div className="flex justify-center md:justify-end">
          <div className="w-80 shadow-2xl rounded-sm overflow-hidden border">
            <img 
              src="/api/placeholder/400/600" 
              alt="C Programming Book" 
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Book Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">C Programming</h1>
          <p className="text-gray-500 text-sm italic">by Fiersa Besari</p>
          <p className="text-gray-400 text-xs">3.7M read</p>
          
          <h2 className="text-blue-800 font-bold text-lg mt-2">Description</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            C is a powerful and versatile language widely used for system software, embedded systems, 
            and general applications. It provides important features such as data types, operators, 
            control structures, and functions to create efficient and well-structured programs. 
            With pointers and memory management, C is essential for building operating systems, 
            compilers, and other high-performance tools.
          </p>
          
          <button className="mt-8 bg-blue-900 text-white w-24 py-2 rounded flex items-center justify-center gap-2 text-sm hover:bg-blue-800 transition">
            <span>←</span> Back
          </button>
        </div>
      </main>

      {/* --- Footer Section --- */}
      <footer className="border-t mt-20 py-12 px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Organized By */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-4 text-gray-700">Organized by</h3>
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-900">
                <span className="text-[10px] text-center font-bold text-blue-900">ISTAD</span>
              </div>
              <p className="text-xs text-gray-500">Institute of Science and Techology <br/> Advanced Development</p>
            </div>
          </div>

          {/* KhDemy Info */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-4 text-gray-700">KhDemy</h3>
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="text-3xl font-bold text-blue-900">KH</div>
              <p className="text-xs text-gray-500 leading-tight">
                Where Industry Experts Build <br/> Tomorrow's Innovators.
              </p>
            </div>
          </div>

          {/* Explore Links */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-4 text-gray-700">Explore</h3>
            <ul className="text-xs space-y-4 text-gray-500">
              <li><a href="#" className="hover:underline">Course</a></li>
              <li><a href="#" className="hover:underline">Library</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">About us</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-4 text-gray-700">Contact us</h3>
            <ul className="text-xs space-y-4 text-gray-500">
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Facebook size={16} /> Facebook
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Send size={16} /> Telegram
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Youtube size={16} /> YouTube
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Instagram size={16} /> Instagram
              </li>
            </ul>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default KhDemyPage;