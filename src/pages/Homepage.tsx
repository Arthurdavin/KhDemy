import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import React from 'react'
import Navbar from '../components/layout/NavBarComponent'

// // Mock data fetching (replace with real API later)
// const fetchPopularCourses = async () => {
//   return [
//     { id: 1, title: "Basic Data Types", price: 29, rating: 4.6, image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800" },
//     { id: 2, title: "Control Flow Basics", price: 29, rating: 4.6, image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800" },
//     { id: 3, title: "Functions for Beginners", price: 29, rating: 4.6, image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800" },
//     { id: 4, title: "Programming Mindset", price: 29, rating: 4.8, image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800" },
//     { id: 5, title: "Hello World Coding", price: 29, rating: 4.6, image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800" },
//     { id: 6, title: "Loops Made Easy", price: 29, rating: 4.6, image: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=800" },
//   ]
// }

// export default function Home() {
//   const { data: courses = [] } = useQuery({
//     queryKey: ['popularCourses'],
//     queryFn: fetchPopularCourses,
//   })

//   return (
//     <>
//       {/* Header / Navbar */}
//       <header className="bg-white shadow-sm sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <span className="text-3xl font-bold text-blue-600">KhDemy</span>
//           </div>

//           <nav className="hidden md:flex items-center gap-8">
//             <Link to="/courses" className="text-gray-700 hover:text-blue-600">Courses</Link>
//             <Link to="/library" className="text-gray-700 hover:text-blue-600">Library</Link>
//             <Link to="/blog" className="text-gray-700 hover:text-blue-600">Blog</Link>
//             <Link to="/about" className="text-gray-700 hover:text-blue-600">About Us</Link>
//           </nav>

//           <div className="flex items-center gap-4">
//             <button className="hidden sm:block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
//               Login
//             </button>
//             {/* Mobile menu button */}
//             <button className="md:hidden text-gray-700">☰</button>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50 py-16 md:py-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
//             KhDemy
//             <br />
//             <span className="text-blue-600">Online Anytime, Anywhere</span>
//           </h1>

//           <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10">
//             Discover hundreds of courses taught by expert instructors. Start learning today and unlock your potential with KhDemy.
//           </p>

//           <div className="flex flex-wrap justify-center gap-6 mb-16">
//             {['Experienced Cambodian teacher', 'Young female instructor', 'Male programming teacher'].map((alt, i) => (
//               <div key={i} className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl">
//                 {/* Replace with real instructor photos */}
//                 <img
//                   src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop${i === 0 ? '&crop=face' : ''}`}
//                   alt={alt}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ))}
//           </div>

//           <button className="px-10 py-4 bg-green-500 text-white text-xl font-semibold rounded-full hover:bg-green-600 shadow-lg">
//             Enroll now
//           </button>
//         </div>
//       </section>

//       {/* Why Choose KhDemy */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-4xl font-bold text-center mb-12">Why should you choose KhDemy?</h2>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               { title: "Experienced teacher", desc: "Learn from qualified professionals across Cambodia and beyond.", icon: "👨‍🏫" },
//               { title: "Flexible Learning", desc: "Study at your own pace, anytime, anywhere.", icon: "🕒" },
//               { title: "Easy Bakong Payments", desc: "Pay securely with Cambodia's Bakong system.", icon: "💳" },
//             ].map((item, i) => (
//               <div key={i} className="text-center p-8 rounded-2xl shadow-md hover:shadow-xl transition">
//                 <div className="text-6xl mb-4">{item.icon}</div>
//                 <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
//                 <p className="text-gray-600">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Popular Courses */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center mb-10">
//             <h2 className="text-4xl font-bold">Popular Courses</h2>
//             <Link to="/courses" className="text-blue-600 hover:underline font-medium">See more →</Link>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {courses.map(course => (
//               <div
//                 key={course.id}
//                 className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
//               >
//                 <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
//                 <div className="p-5">
//                   <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>
//                   <div className="flex justify-between items-center">
//                     <span className="text-green-600 font-bold">${course.price}</span>
//                     <span className="text-yellow-500">★ {course.rating}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Engaging Video Lessons / Go Live */}
//       <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-4xl font-bold mb-12">Engaging Video Lessons</h2>

//           <div className="grid md:grid-cols-2 gap-12">
//             <div>
//               <div className="rounded-2xl overflow-hidden shadow-2xl">
//                 <img
//                   src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800"
//                   alt="Students learning"
//                   className="w-full h-64 md:h-80 object-cover"
//                 />
//               </div>
//               <h3 className="text-2xl font-bold mt-6 mb-3">Go Live and Learn</h3>
//               <p className="text-gray-600">Access thousands of high-quality video lessons taught by top instructors.</p>
//             </div>

//             <div>
//               <div className="rounded-2xl overflow-hidden shadow-2xl">
//                 <img
//                   src="https://images.unsplash.com/photo-1522202176988-66273c2b033f?w=800"
//                   alt="Live class"
//                   className="w-full h-64 md:h-80 object-cover"
//                 />
//               </div>
//               <h3 className="text-2xl font-bold mt-6 mb-3">Connect with Instructors</h3>
//               <p className="text-gray-600">Join live sessions, ask questions, get direct answers.</p>
//             </div>
//           </div>

//           <button className="mt-12 px-10 py-4 bg-blue-600 text-white text-xl rounded-full hover:bg-blue-700">
//             Enroll now
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-white text-xl font-bold mb-4">KhDemy</h3>
//               <p className="text-sm">Where Industry Experts Build Tomorrow's Innovators.</p>
//             </div>
//             <div>
//               <h4 className="text-white font-semibold mb-4">Explore</h4>
//               <ul className="space-y-2 text-sm">
//                 <li><Link to="/courses">Courses</Link></li>
//                 <li><Link to="/library">Library</Link></li>
//                 <li><Link to="/blog">Blog</Link></li>
//                 <li><Link to="/about">About us</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-white font-semibold mb-4">Organized by</h4>
//               <p className="text-sm">Institute of Science and Technology Advanced Development</p>
//             </div>
//             <div>
//               <h4 className="text-white font-semibold mb-4">Contact us</h4>
//               <div className="flex gap-4 text-2xl">
//                 <a href="#">fb</a>
//                 <a href="#">tg</a>
//                 <a href="#">yt</a>
//                 <a href="#">ig</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </>
//   )
// }


export default function Homepage() {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            KhDemy
            <br />
            <span className="text-blue-600">Online Anytime, Anywhere</span>
          </h1>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10">
            Discover hundreds of courses taught by expert instructors. Start learning today and unlock your potential with KhDemy.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {['Experienced Cambodian teacher', 'Young female instructor', 'Male programming teacher'].map((alt, i) => (
              <div key={i} className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl">
                {/* Replace with real instructor photos */}
                <img
                  src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop${i === 0 ? '&crop=face' : ''}`}
                  alt={alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <button className="px-10 py-4 bg-green-500 text-white text-xl font-semibold rounded-full hover:bg-green-600 shadow-lg">
            Enroll now
          </button>
        </div>
      </section>

      {/* Why Choose KhDemy */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why should you choose KhDemy?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Experienced teacher", desc: "Learn from qualified professionals across Cambodia and beyond.", icon: "👨‍🏫" },
              { title: "Flexible Learning", desc: "Study at your own pace, anytime, anywhere.", icon: "🕒" },
              { title: "Easy Bakong Payments", desc: "Pay securely with Cambodia's Bakong system.", icon: "💳" },
            ].map((item, i) => (
              <div key={i} className="text-center p-8 rounded-2xl shadow-md hover:shadow-xl transition">
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-bold">Popular Courses</h2>
            <Link to="/courses" className="text-blue-600 hover:underline font-medium">See more →</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map(course => (
              <div
                key={course.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-bold">${course.price}</span>
                    <span className="text-yellow-500">★ {course.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engaging Video Lessons / Go Live */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-12">Engaging Video Lessons</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800"
                  alt="Students learning"
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mt-6 mb-3">Go Live and Learn</h3>
              <p className="text-gray-600">Access thousands of high-quality video lessons taught by top instructors.</p>
            </div>

            <div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2b033f?w=800"
                  alt="Live class"
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mt-6 mb-3">Connect with Instructors</h3>
              <p className="text-gray-600">Join live sessions, ask questions, get direct answers.</p>
            </div>
          </div>

          <button className="mt-12 px-10 py-4 bg-blue-600 text-white text-xl rounded-full hover:bg-blue-700">
            Enroll now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">KhDemy</h3>
              <p className="text-sm">Where Industry Experts Build Tomorrow's Innovators.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/courses">Courses</Link></li>
                <li><Link to="/library">Library</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/about">About us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Organized by</h4>
              <p className="text-sm">Institute of Science and Technology Advanced Development</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact us</h4>
              <div className="flex gap-4 text-2xl">
                <a href="#">fb</a>
                <a href="#">tg</a>
                <a href="#">yt</a>
                <a href="#">ig</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}