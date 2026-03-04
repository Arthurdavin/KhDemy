// import { useLocation, useNavigate } from "react-router-dom";
// import { useGetProfileQuery } from "../../features/teacher/teacherApi";
// import { Avatar } from "./Profile";

// const navItems = [
//   { icon: "🎓", label: "Create Course", path: "/teacher/create-course" },
//   { icon: "📝", label: "Add Lesson",    path: "/teacher/add-lesson" },
//   { icon: "❓", label: "Add Quiz",      path: "/teacher/add-quiz" },
//   { icon: "✏️", label: "Edit Lesson",  path: "/teacher/edit-lesson" },
//   { icon: "📚", label: "Add Book",     path: "/teacher/add-book" },
//   { icon: "💬", label: "Add Article",  path: "/teacher/add-article" },
// ];

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { data: user, isLoading, isError } = useGetProfileQuery();

//   return (
//     <div className="w-72 flex-shrink-0">

//       {/* Profile Card */}
//       <div className="bg-white rounded-2xl shadow-sm mb-5 overflow-hidden">
//         {isLoading ? (
//           <div className="p-7 text-center text-gray-400">Loading...</div>
//         ) : isError ? (
//           <div className="p-7 text-center text-red-400">
//             Failed to load profile
//           </div>
//         ) : (
//           <div className="p-7 flex flex-col items-center text-center">
//             {user?.avatar_url ? (
//               <img
//                 src={user.avatar_url}
//                 alt={user.name}
//                 className="w-24 h-24 rounded-full object-cover border-2 border-white shadow"
//               />
//             ) : (
//               <Avatar size={24} />
//             )}

//             <p className="font-bold text-gray-800 text-base mt-2">
//               {user?.name ?? "Teacher"}
//             </p>
//             <p className="text-blue-500 font-semibold text-xs mb-2 capitalize">
//               {user?.role ?? ""}
//             </p>
//             <p className="text-gray-400 text-xs mb-4">
//               {user?.bio ?? ""}
//             </p>

//             <button
//               onClick={() => navigate("/teacher/edit-profile")}
//               className="w-full border border-gray-200 rounded-xl py-2 text-xs font-semibold
//                 text-gray-600 hover:bg-gray-50 transition"
//             >
//               ✏️ Edit Profile
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Navigation */}
//       <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-1">
//         {navItems.map(({ icon, label, path }) => {
//           const isActive = location.pathname === path;

//           return (
//             <button
//               key={label}
//               onClick={() => navigate(path)}
//               className={`flex items-center gap-3 px-4 py-3 text-base w-full text-left rounded-lg transition-colors
//                 ${isActive
//                   ? "bg-blue-50 text-blue-700 font-bold"
//                   : "text-gray-600 hover:text-blue-700 hover:bg-blue-50"
//                 }`}
//             >
//               <span className="w-5 text-center">{icon}</span>
//               <span>{label}</span>
//             </button>
//           );
//         })}
//       </div>

//     </div>
//   );
// }


import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useGetProfileQuery } from "../../features/teacher/teacherApi"
import { Avatar } from "./Profile"
import EditProfileModal from "./EditProfileModal"

const navItems = [
  { icon: "🎓", label: "Create Course", path: "/teacher/create-course" },
  { icon: "📝", label: "Add Lesson",    path: "/teacher/add-lesson"    },
  { icon: "❓", label: "Add Quiz",      path: "/teacher/add-quiz"      },
  { icon: "✏️", label: "Edit Lesson",  path: "/teacher/edit-lesson"   },
  { icon: "📚", label: "Add Book",      path: "/teacher/add-book"      },
  { icon: "💬", label: "Add Article",  path: "/teacher/add-article"   },
]

export default function Sidebar() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const [showEdit, setShowEdit] = useState(false)

  const { data: user, isLoading, isError } = useGetProfileQuery()

  return (
    <>
      <div className="w-72 flex-shrink-0">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm mb-5 overflow-hidden">
          {isLoading ? (
            <div className="p-7 text-center text-gray-400 text-sm animate-pulse">Loading...</div>
          ) : isError ? (
            <div className="p-7 text-center text-red-400 text-sm">Failed to load profile</div>
          ) : (
            <div className="p-7 flex flex-col items-center text-center">
              {/* Clickable avatar */}
              <button
                onClick={() => setShowEdit(true)}
                className="group relative focus:outline-none"
              >
                {user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-white shadow group-hover:opacity-90 transition-opacity"
                  />
                ) : (
                  <Avatar size={24} />
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white text-[10px] font-bold transition-opacity">
                    Edit
                  </span>
                </div>
              </button>

              <p className="font-bold text-gray-800 text-base mt-2">
                {user?.name ?? "Teacher"}
              </p>
              <p className="text-blue-500 font-semibold text-xs mb-2 capitalize">
                {user?.role ?? ""}
              </p>
              <p className="text-gray-400 text-xs mb-4">
                {user?.bio ?? ""}
              </p>

              <button
                onClick={() => setShowEdit(true)}
                className="w-full border border-gray-200 rounded-xl py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition"
              >
                ✏️ Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-1">
          {navItems.map(({ icon, label, path }) => {
            const isActive = location.pathname === path
            return (
              <button
                key={label}
                onClick={() => navigate(path)}
                className={`flex items-center gap-3 px-4 py-3 text-base w-full text-left rounded-lg transition-colors
                  ${isActive
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "text-gray-600 hover:text-blue-700 hover:bg-blue-50"
                  }`}
              >
                <span className="w-5 text-center">{icon}</span>
                <span>{label}</span>
              </button>
            )
          })}
        </div>

      </div>

      {/* ✅ Edit Profile Modal */}
      {showEdit && <EditProfileModal onClose={() => setShowEdit(false)} />}
    </>
  )
}