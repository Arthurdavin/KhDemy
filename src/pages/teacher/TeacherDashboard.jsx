// import { useState } from "react";

// const courses = [
//   { id: 1, title: "UI/UX Design Fundamentals", category: "Design", type: "Free", students: 20, color: "from-blue-400 to-purple-500" },
//   { id: 2, title: "React JS for Beginners", category: "Web Development", type: "Paid", students: 20, color: "from-blue-600 to-blue-800" },
//   { id: 3, title: "Python Programming", category: "Programming", type: "Free", students: 20, color: "from-orange-400 to-red-500" },
//   { id: 4, title: "Database Design with SQL", category: "Database", type: "Paid", students: 20, color: "from-blue-400 to-cyan-500" },
// ];

// const articles = [
//   { id: 1, title: "Portrait Photography Masterclass", desc: "Portrait Photography Masterclass Portrait ...", author: "Yu Na" },
//   { id: 2, title: "Portrait Photography Masterclass", desc: "Portrait Photography Masterclass Portrait ...", author: "Yu Na" },
// ];

// const books = [
//   { id: 1, title: "Portrait Photography Masterclass", desc: "Portrait Photography Masterclass Portrait ...", author: "Yu Na" },
//   { id: 2, title: "Portrait Photography Masterclass", desc: "Portrait Photography Masterclass Portrait ...", author: "Yu Na" },
// ];

// const navItems = [
//   { icon: "🎓", label: "Create Course" },
//   { icon: "📝", label: "Add lesson" },
//   { icon: "❓", label: "Add quiz" },
//   { icon: "✏️", label: "Edit lesson" },
//   { icon: "📚", label: "Add Book" },
//   { icon: "💬", label: "Article" },
// ];

// const Avatar = ({ size = 16 }) => (
//   <div className={`w-${size} h-${size} rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center overflow-hidden border-2 border-white shadow`}>
//     <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
//       <circle cx="40" cy="40" r="40" fill="#e2e8f0" />
//       <ellipse cx="40" cy="32" rx="13" ry="14" fill="#94a3b8" />
//       <ellipse cx="40" cy="68" rx="22" ry="18" fill="#94a3b8" />
//       <rect x="28" y="20" width="24" height="8" rx="4" fill="#1e293b" />
//       <rect x="26" y="26" width="28" height="4" rx="2" fill="#1e293b" />
//     </svg>
//   </div>
// );

// const SmallAvatar = () => (
//   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-300 to-pink-400 flex items-center justify-center text-white text-xs font-bold shadow-sm border-2 border-white">
//     YN
//   </div>
// );

// const CourseThumb = ({ color }) => (
//   <div className={`w-14 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shadow-sm flex-shrink-0`}>
//     <svg className="w-6 h-6 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20">
//       <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5 8.126V13a1 1 0 00.553.894l4 2a1 1 0 00.894 0l4-2A1 1 0 0015 13V8.126l2.394-1.026a1 1 0 000-1.84l-7-3z"/>
//     </svg>
//   </div>
// );

// const ArticleThumb = ({ idx }) => (
//   <div className={`w-24 h-16 rounded-lg flex-shrink-0 overflow-hidden bg-gradient-to-br ${idx % 2 === 0 ? "from-slate-700 to-slate-900" : "from-gray-600 to-gray-800"} flex items-center justify-center shadow`}>
//     <svg className="w-8 h-8 text-green-400 opacity-70" fill="currentColor" viewBox="0 0 24 24">
//       <rect x="3" y="3" width="18" height="3" rx="1"/>
//       <rect x="3" y="8" width="12" height="2" rx="1"/>
//       <rect x="3" y="12" width="10" height="2" rx="1"/>
//       <circle cx="18" cy="15" r="4" fill="#4ade80"/>
//     </svg>
//   </div>
// );

// export default function TeacherDashboard() {
//   const [activeNav, setActiveNav] = useState("Create Course");

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap');
//         * { font-family: 'Nunito', sans-serif; }
//         .stat-card { transition: transform 0.18s, box-shadow 0.18s; }
//         .stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.10); }
//         .course-row { transition: background 0.15s; }
//         .course-row:hover { background: #f1f5f9; }
//         .nav-item { transition: color 0.15s, background 0.15s; }
//         .nav-item:hover { color: #1e40af; background: #eff6ff; border-radius: 8px; }
//         .nav-item.active { color: #1e40af; font-weight: 700; }
//         .badge-free { background: #dcfce7; color: #16a34a; }
//         .badge-paid { background: #fef9c3; color: #ca8a04; }
//       `}</style>

//       <div className="w-full max-w-screen-2xl mx-auto px-8 py-8">
//         <div className="flex gap-8">
//           {/* LEFT SIDEBAR */}
//           <div className="w-72 flex-shrink-0">
//             {/* Profile Card */}
//             <div className="bg-white rounded-2xl shadow-sm p-7 flex flex-col items-center text-center mb-5">
//               <div className="relative mb-2">
//                 <Avatar size={24} />
//                 <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
//               </div>
//               <p className="font-bold text-gray-800 text-base mt-1">JohnDeo</p>
//               <p className="text-blue-500 font-semibold text-xs mb-2">Aspiring UI/UX Designer</p>
//               <p className="text-gray-400 text-xs leading-relaxed mb-4">
//                 Passionate about creating intuitive digital experiences. Currently mastering Advanced React and Visual Design Systems.
//               </p>
//               <button className="w-full border border-gray-200 rounded-xl py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1.5 transition">
//                 <span>✏️</span> Edit Profile
//               </button>
//             </div>

//             {/* Nav Items */}
//             <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-1">
//               {navItems.map(({ icon, label }) => (
//                 <button
//                   key={label}
//                   onClick={() => setActiveNav(label)}
//                   className={`nav-item flex items-center gap-3 px-4 py-3 text-base w-full text-left ${activeNav === label ? "active bg-blue-50" : "text-gray-600"}`}
//                 >
//                   <span className="text-base w-5 text-center">{icon}</span>
//                   <span>{label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* MAIN CONTENT */}
//           <div className="flex-1 min-w-0">
//             {/* Header */}
//             <div className="mb-6">
//               <h1 className="text-3xl font-extrabold text-gray-800">Welcome, Teacher1 !</h1>
//               <p className="text-gray-400 text-sm mt-0.5">Dashboard</p>
//             </div>

//             {/* Stats Row */}
//             <div className="grid grid-cols-4 gap-5 mb-8">
//               {/* Total Courses */}
//               <div className="stat-card bg-pink-50 rounded-2xl p-5 flex items-center gap-4 shadow-sm cursor-default">
//                 <div className="w-12 h-12 bg-pink-400 rounded-xl flex items-center justify-center shadow">
//                   <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-3xl font-extrabold text-gray-800">5</p>
//                   <p className="text-sm text-gray-500 font-medium">Total Courses</p>
//                 </div>
//               </div>

//               {/* Total Enrollment */}
//               <div className="stat-card bg-orange-50 rounded-2xl p-5 flex items-center gap-4 shadow-sm cursor-default">
//                 <div className="w-12 h-12 bg-orange-400 rounded-xl flex items-center justify-center shadow">
//                   <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 14.094A5.973 5.973 0 004 17v1H1v-1a3 3 0 013.75-2.906z"/>
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-3xl font-extrabold text-gray-800">1503</p>
//                   <p className="text-sm text-gray-500 font-medium">Total Enrollment</p>
//                 </div>
//               </div>

//               {/* Total Blog */}
//               <div className="stat-card bg-green-50 rounded-2xl p-5 flex items-center gap-4 shadow-sm cursor-default">
//                 <div className="w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center shadow">
//                   <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"/>
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-3xl font-extrabold text-gray-800">5</p>
//                   <p className="text-sm text-gray-500 font-medium">Total Blog</p>
//                 </div>
//               </div>

//               {/* Total Books */}
//               <div className="stat-card bg-purple-50 rounded-2xl p-5 flex items-center gap-4 shadow-sm cursor-default">
//                 <div className="w-12 h-12 bg-purple-400 rounded-xl flex items-center justify-center shadow">
//                   <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-3xl font-extrabold text-gray-800">8</p>
//                   <p className="text-sm text-gray-500 font-medium">Total Books</p>
//                 </div>
//               </div>
//             </div>

//             {/* My Course Section */}
//             <div className="bg-white rounded-2xl shadow-sm p-7 mb-6">
//               <div className="flex items-center justify-between mb-5">
//                 <h2 className="text-xl font-extrabold text-blue-700">My Course</h2>
//                 <button className="text-blue-500 text-sm font-semibold hover:underline flex items-center gap-1">
//                   See All Course <span className="text-gray-400">›</span>
//                 </button>
//               </div>
//               <div className="flex justify-between text-sm text-gray-400 font-semibold mb-3 px-2">
//                 <span>Course Name</span>
//                 <span>Total Student</span>
//               </div>
//               <div className="divide-y divide-gray-50">
//                 {courses.map((course) => (
//                   <div key={course.id} className="course-row flex items-center justify-between py-4 px-2 rounded-xl">
//                     <div className="flex items-center gap-4">
//                       <CourseThumb color={course.color} />
//                       <div>
//                         <p className="text-base font-bold text-gray-800">{course.title}</p>
//                         <div className="flex items-center gap-2 mt-0.5">
//                           <span className="text-sm text-gray-400">{course.category}</span>
//                           <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${course.type === "Free" ? "badge-free" : "badge-paid"}`}>
//                             {course.type}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <span className="text-base font-bold text-gray-700">{course.students}</span>
//                       {course.id === 4 && (
//                         <button className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow hover:bg-blue-700 transition">
//                           <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7"/>
//                           </svg>
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* My Article Section */}
//             <div className="bg-white rounded-2xl shadow-sm p-7 mb-6">
//               <div className="flex items-center justify-between mb-5">
//                 <h2 className="text-xl font-extrabold">
//                   <span className="text-blue-700">My </span>
//                   <span className="text-gray-800">Article</span>
//                 </h2>
//                 <button className="text-blue-500 text-sm font-semibold hover:underline flex items-center gap-1">
//                   See All Articles <span className="text-gray-400">›</span>
//                 </button>
//               </div>
//               <div className="divide-y divide-gray-50">
//                 {articles.map((article, idx) => (
//                   <div key={article.id} className="course-row flex items-center gap-5 py-4 rounded-xl">
//                     <ArticleThumb idx={idx} />
//                     <div className="flex-1 min-w-0">
//                       <p className="text-base font-bold text-gray-800 truncate">{article.title}</p>
//                       <p className="text-sm text-gray-400 truncate mb-2">{article.desc}</p>
//                       <div className="flex items-center gap-2">
//                         <SmallAvatar />
//                         <span className="text-sm text-gray-500 font-medium">{article.author}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* My Book Section */}
//             <div className="bg-white rounded-2xl shadow-sm p-7">
//               <div className="flex items-center justify-between mb-5">
//                 <h2 className="text-xl font-extrabold">
//                   <span className="text-blue-700">My </span>
//                   <span className="text-gray-800">Book</span>
//                 </h2>
//                 <button className="text-blue-500 text-sm font-semibold hover:underline flex items-center gap-1">
//                   See All Articles <span className="text-gray-400">›</span>
//                 </button>
//               </div>
//               <div className="divide-y divide-gray-50">
//                 {books.map((book, idx) => (
//                   <div key={book.id} className="course-row flex items-center gap-5 py-4 rounded-xl">
//                     <ArticleThumb idx={idx + 1} />
//                     <div className="flex-1 min-w-0">
//                       <p className="text-base font-bold text-gray-800 truncate">{book.title}</p>
//                       <p className="text-sm text-gray-400 truncate mb-2">{book.desc}</p>
//                       <div className="flex items-center gap-2">
//                         <SmallAvatar />
//                         <span className="text-sm text-gray-500 font-medium">{book.author}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }