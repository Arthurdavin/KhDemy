// import { useGetTeacherStatsQuery } from "../../features/teacher/teacherApi";

// // ── Stat card ─────────────────────────────────────────────────────────────────
// const StatCard = ({ bg, iconBg, icon, value, label, loading }) => (
//   <div className={`${bg} rounded-2xl p-5 flex items-center gap-4 shadow-sm cursor-default
//     transition-transform duration-200 hover:-translate-y-1 hover:shadow-md`}>
//     <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center shadow flex-shrink-0`}>
//       {icon}
//     </div>
//     <div>
//       {loading ? (
//         <div className="animate-pulse space-y-2">
//           <div className="h-7 w-12 bg-white/60 rounded" />
//           <div className="h-3 w-20 bg-white/60 rounded" />
//         </div>
//       ) : (
//         <>
//           <p className="text-3xl font-extrabold text-gray-800">{value ?? "—"}</p>
//           <p className="text-sm text-gray-500 font-medium">{label}</p>
//         </>
//       )}
//     </div>
//   </div>
// );

// // ── Icons ─────────────────────────────────────────────────────────────────────
// const IconCourses = () => (
//   <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//     <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
//   </svg>
// );
// const IconPeople = () => (
//   <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//     <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 14.094A5.973 5.973 0 004 17v1H1v-1a3 3 0 013.75-2.906z" />
//   </svg>
// );
// const IconBlog = () => (
//   <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//     <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
//   </svg>
// );
// const IconBook = () => (
//   <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//     <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
//   </svg>
// );

// // ── Banner ────────────────────────────────────────────────────────────────────
// export default function Banner({ teacherName = "Teacher" }) {
//   // ── GET /teacher/stats ─────────────────────────────────────────────────────
//   const { data: raw, isLoading, isError } = useGetTeacherStatsQuery();
//   const stats = raw?.stats ?? raw?.data ?? raw ?? null;

//   return (
//     <div className="mb-8">
//       {/* Welcome heading */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-extrabold text-gray-800">
//           Welcome, {teacherName} !
//         </h1>
//         <p className="text-gray-400 text-sm mt-0.5">Dashboard</p>
//       </div>

//       {isError && (
//         <p className="text-xs text-red-400 mb-3">Could not load stats.</p>
//       )}

//       {/* Stat cards — show skeleton while loading */}
//       <div className="grid grid-cols-4 gap-5">
//         <StatCard bg="bg-pink-50"   iconBg="bg-pink-400"   icon={<IconCourses />}
//           value={stats?.totalCourses}    label="Total Courses"    loading={isLoading} />
//         <StatCard bg="bg-orange-50" iconBg="bg-orange-400" icon={<IconPeople />}
//           value={stats?.totalEnrollment} label="Total Enrollment" loading={isLoading} />
//         <StatCard bg="bg-green-50"  iconBg="bg-green-400"  icon={<IconBlog />}
//           value={stats?.totalBlogs}      label="Total Blog"       loading={isLoading} />
//         <StatCard bg="bg-purple-50" iconBg="bg-purple-400" icon={<IconBook />}
//           value={stats?.totalBooks}      label="Total Books"      loading={isLoading} />
//       </div>
//     </div>
//   );
// }


import { useGetTeacherCoursesQuery } from "../../features/courses/coursesApi"
import { useGetBlogsQuery }          from "../../features/blog/blogApi"
import { useGetBooksQuery }          from "../../features/books/booksAPI"
import { useGetProfileQuery }        from "../../features/teacher/teacherApi"

// ── Stat card ─────────────────────────────────────────────────────────────────
const StatCard = ({ bg, iconBg, icon, value, label, loading }) => (
  <div className={`${bg} rounded-2xl p-5 flex items-center gap-4 shadow-sm cursor-default
    transition-transform duration-200 hover:-translate-y-1 hover:shadow-md`}>
    <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center shadow flex-shrink-0`}>
      {icon}
    </div>
    <div>
      {loading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-7 w-12 bg-white/60 rounded" />
          <div className="h-3 w-20 bg-white/60 rounded" />
        </div>
      ) : (
        <>
          <p className="text-3xl font-extrabold text-gray-800">{value ?? 0}</p>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
        </>
      )}
    </div>
  </div>
)

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconCourses = () => (
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
  </svg>
)
const IconPeople = () => (
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 14.094A5.973 5.973 0 004 17v1H1v-1a3 3 0 013.75-2.906z" />
  </svg>
)
const IconBlog = () => (
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
  </svg>
)
const IconBook = () => (
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
  </svg>
)

// ── Banner ────────────────────────────────────────────────────────────────────
export default function Banner() {
  // ✅ Use existing APIs — no /teacher/stats needed
  const { data: profile                          } = useGetProfileQuery()
  const { data: courses  = [], isLoading: cLoad  } = useGetTeacherCoursesQuery()
  const { data: blogsData,     isLoading: bLoad  } = useGetBlogsQuery({ limit: 100 })
  const { data: booksData,     isLoading: bkLoad } = useGetBooksQuery({ limit: 100 })

  const isLoading = cLoad || bLoad || bkLoad

  // ✅ Derive stats from real data
  const teacherName   = profile?.name ?? "Teacher"
  const totalCourses  = courses.length
  const totalStudents = courses.reduce((sum, c) => sum + (c.students ?? 0), 0)
  const totalBlogs    = Array.isArray(blogsData)
    ? blogsData.length
    : blogsData?.blogs?.length ?? blogsData?.total ?? 0
  const totalBooks    = Array.isArray(booksData)
    ? booksData.length
    : booksData?.books?.length ?? booksData?.total ?? 0

  return (
    <div className="mb-8">
      {/* Welcome heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Welcome, {teacherName}!
        </h1>
        <p className="text-gray-400 text-sm mt-0.5">Dashboard</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-5">
        <StatCard
          bg="bg-pink-50"   iconBg="bg-pink-400"   icon={<IconCourses />}
          value={totalCourses}  label="Total Courses"    loading={isLoading}
        />
        <StatCard
          bg="bg-orange-50" iconBg="bg-orange-400" icon={<IconPeople />}
          value={totalStudents} label="Total Enrollment" loading={isLoading}
        />
        <StatCard
          bg="bg-green-50"  iconBg="bg-green-400"  icon={<IconBlog />}
          value={totalBlogs}    label="Total Blog"       loading={isLoading}
        />
        <StatCard
          bg="bg-purple-50" iconBg="bg-purple-400" icon={<IconBook />}
          value={totalBooks}    label="Total Books"      loading={isLoading}
        />
      </div>
    </div>
  )
}