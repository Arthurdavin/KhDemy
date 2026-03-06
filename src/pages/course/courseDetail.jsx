// import { useState } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { useSelector } from "react-redux"
// import {
//   useGetCoursesQuery,
//   useEnrollCourseMutation,
//   useGetEnrolledCoursesQuery,
// } from "../../features/courses/coursesApi"
// import {
//   Monitor, Award, Clock, Headphones, Play, Check,
//   Lock, ChevronDown, ChevronUp, Tag, User,
//   ArrowLeft, BookOpen, Star, Users,
// } from "lucide-react"
// import { toast } from "react-toastify"

// // ── Lesson row ────────────────────────────────────────────────────────────────
// const LessonRow = ({ lesson, index, isEnrolled, isActive, onClick, onLockedClick }) => (
//   <button
//     onClick={() => isEnrolled ? onClick(lesson) : onLockedClick()}
//     className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all mb-1.5 group ${
//       isActive
//         ? "bg-indigo-600 shadow-md shadow-indigo-200"
//         : isEnrolled
//           ? "hover:bg-gray-50 border border-gray-100"
//           : "border border-dashed border-gray-200 opacity-70 hover:opacity-90"
//     }`}
//   >
//     {/* Index / icon */}
//     <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black ${
//       isActive
//         ? "bg-white/20 text-white"
//         : isEnrolled
//           ? "bg-indigo-50 text-indigo-600"
//           : "bg-gray-100 text-gray-400"
//     }`}>
//       {isEnrolled
//         ? (isActive
//             ? <Play size={11} className="fill-white text-white" />
//             : <Play size={11} className="fill-indigo-600" />
//           )
//         : <Lock size={11} />
//       }
//     </div>

//     {/* Text */}
//     <div className="flex-1 min-w-0">
//       <p className={`text-[13px] font-semibold truncate ${isActive ? "text-white" : "text-gray-800"}`}>
//         {index + 1}. {lesson.title}
//       </p>
//       {lesson.duration && (
//         <p className={`text-[10px] mt-0.5 ${isActive ? "text-indigo-200" : "text-gray-400"}`}>
//           {lesson.duration}
//         </p>
//       )}
//     </div>
//   </button>
// )

// // ── Video player ──────────────────────────────────────────────────────────────
// const VideoPlayer = ({ lesson }) => {
//   if (!lesson?.video_url) return (
//     <div className="aspect-video bg-gradient-to-br from-indigo-900 to-indigo-700 rounded-2xl flex items-center justify-center">
//       <p className="text-white/60 text-sm">No video available for this lesson.</p>
//     </div>
//   )

//   const isYoutube = lesson.video_url.includes("youtu")
//   const src = lesson.video_url
//     .replace("youtu.be/", "www.youtube.com/embed/")
//     .replace("watch?v=", "embed/")

//   return (
//     <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-xl">
//       {isYoutube ? (
//         <iframe src={src} className="w-full h-full" allowFullScreen title={lesson.title} />
//       ) : (
//         <video src={lesson.video_url} controls className="w-full h-full" />
//       )}
//     </div>
//   )
// }

// // ── Skeleton ──────────────────────────────────────────────────────────────────
// const Skeleton = () => (
//   <div className="max-w-6xl mx-auto px-6 py-10 animate-pulse">
//     <div className="h-8 w-48 bg-gray-100 rounded-xl mb-8" />
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//       <div className="lg:col-span-2 space-y-4">
//         <div className="h-10 w-3/4 bg-gray-100 rounded-xl" />
//         <div className="h-4 w-full bg-gray-100 rounded" />
//         <div className="aspect-video bg-gray-100 rounded-2xl mt-6" />
//       </div>
//       <div className="h-[500px] bg-gray-100 rounded-2xl" />
//     </div>
//   </div>
// )

// // ── Tab ───────────────────────────────────────────────────────────────────────
// const Tab = ({ label, active, onClick }) => (
//   <button
//     onClick={onClick}
//     className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
//       active
//         ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
//         : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
//     }`}
//   >
//     {label}
//   </button>
// )

// // ── Main ──────────────────────────────────────────────────────────────────────
// export default function CourseDetail() {
//   const { id }    = useParams()
//   const navigate  = useNavigate()
//   const { user }  = useSelector((state) => state.auth)
//   const [activeTab, setActiveTab]         = useState("overview")
//   const [activeLesson, setActiveLesson]   = useState(null)

//   const { data: raw, isLoading } = useGetCoursesQuery({ limit: 999, skip: 0 })
//   const allCourses = Array.isArray(raw) ? raw : raw?.courses ?? raw?.data ?? []
//   const course     = allCourses.find((c) => String(c.id) === String(id))

//   const { data: enrolledList = [] } = useGetEnrolledCoursesQuery(undefined, { skip: !user })
//   const isEnrolled = enrolledList.some(
//     (c) => String(c.id) === String(id) || String(c.course_id) === String(id)
//   )

//   const [enrollCourse, { isLoading: isEnrolling }] = useEnrollCourseMutation()

//   const handleEnroll = async () => {
//     if (!user) { navigate("/login"); return }
//     try {
//       await enrollCourse(Number(id)).unwrap()
//       toast.success("Enrolled successfully! You can now watch the lessons.")
//     } catch (err) {
//       const msg = err?.data?.detail || err?.data?.message || ""
//       if (msg.toLowerCase().includes("already")) {
//         toast.info("You are already enrolled in this course.")
//       } else {
//         toast.error(msg || "Failed to enroll. Please try again.")
//       }
//     }
//   }

//   const handleLockedClick = () => toast.info("Please enroll to watch this lesson.")

//   if (isLoading) return <Skeleton />
//   if (!course) return (
//     <div className="flex flex-col items-center justify-center py-32 text-gray-400">
//       <p className="text-5xl mb-4">📭</p>
//       <p className="text-sm font-semibold">Course not found.</p>
//     </div>
//   )

//   const lessons  = course.lessons  ?? []
//   const tags     = course.tags     ?? []
//   const thumb    = course.thumbnail_url ?? course.thumbnail ?? null
//   const price    = course.is_paid === false ? "Free" : `$${course.price ?? 49}`
//   const teacher  = course.teacher  ?? course.instructor ?? null
//   const category = course.category?.name ?? course.category ?? "General"

//   // auto-select first lesson when enrolled
//   const displayLesson = activeLesson ?? (isEnrolled && lessons[0] ? lessons[0] : null)

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto px-6 py-8">

//         {/* Back */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 font-semibold mb-6 transition-colors"
//         >
//           <ArrowLeft size={16} /> Back
//         </button>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//           {/* ── LEFT COLUMN ── */}
//           <div className="lg:col-span-2 space-y-6">

//             {/* Course header card */}
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
//               <h1 className="text-2xl font-black text-indigo-900 leading-tight mb-3">
//                 {course.title}
//               </h1>

//               {/* Teacher */}
//               {teacher && (
//                 <div className="flex items-center gap-2 mb-4">
//                   <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center flex-shrink-0">
//                     {teacher.avatar_url
//                       ? <img src={teacher.avatar_url} alt={teacher.name} className="w-full h-full object-cover" />
//                       : <User size={14} className="text-indigo-400" />
//                     }
//                   </div>
//                   <span className="text-sm font-bold text-gray-700">{teacher.name ?? teacher.full_name}</span>
//                 </div>
//               )}

//               {/* Category + Tags */}
//               <div className="flex flex-wrap items-center gap-2 mb-4">
//                 <div className="flex items-center gap-1.5">
//                   <span className="text-xs text-gray-400 font-medium">Category :</span>
//                   <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold border border-indigo-100">
//                     {category}
//                   </span>
//                 </div>
//                 {tags.length > 0 && (
//                   <div className="flex items-center gap-1.5 flex-wrap">
//                     <span className="text-xs text-gray-400 font-medium">Tags :</span>
//                     {tags.map((t, i) => (
//                       <span key={i} className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 text-xs font-bold border border-amber-100">
//                         {typeof t === "string" ? t : t.name}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Enroll / Enrolled */}
//               {isEnrolled ? (
//                 <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-bold">
//                   <Check size={14} /> Enrolled
//                 </span>
//               ) : (
//                 <button
//                   onClick={handleEnroll}
//                   disabled={isEnrolling}
//                   className="px-6 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-bold transition-all hover:shadow-lg hover:shadow-indigo-200 disabled:opacity-60"
//                 >
//                   {isEnrolling ? "Enrolling…" : "Enroll Now"}
//                 </button>
//               )}
//             </div>

//             {/* Video player — only when enrolled + lesson selected */}
//             {isEnrolled && displayLesson && (
//               <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
//                 <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3">
//                   Now Playing
//                 </p>
//                 <h2 className="text-base font-black text-gray-900 mb-4">
//                   {lessons.indexOf(displayLesson) + 1}. {displayLesson.title}
//                 </h2>
//                 <VideoPlayer lesson={displayLesson} />
//                 {displayLesson.description && (
//                   <p className="text-sm text-gray-500 leading-relaxed mt-4">
//                     {displayLesson.description}
//                   </p>
//                 )}
//               </div>
//             )}

//             {/* Tabs */}
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
//               <div className="flex gap-2 mb-6">
//                 <Tab label="Overview"   active={activeTab === "overview"}  onClick={() => setActiveTab("overview")}  />
//                 <Tab label="Lessons"    active={activeTab === "lessons"}   onClick={() => setActiveTab("lessons")}   />
//                 <Tab label="Reviews"    active={activeTab === "reviews"}   onClick={() => setActiveTab("reviews")}   />
//               </div>

//               {/* Overview tab */}
//               {activeTab === "overview" && (
//                 <div className="space-y-5">
//                   <div>
//                     <h3 className="text-base font-black text-gray-900 mb-2">About This Course</h3>
//                     <p className="text-sm text-gray-500 leading-relaxed">{course.description}</p>
//                   </div>

//                   {/* Meta grid */}
//                   <div className="grid grid-cols-2 gap-3 pt-2">
//                     {[
//                       { icon: <Monitor size={14} className="text-indigo-500" />, label: "Online Course" },
//                       { icon: <Clock size={14} className="text-indigo-500" />,   label: course.duration ?? "Self-paced" },
//                       { icon: <Award size={14} className="text-indigo-500" />,   label: "Certificate" },
//                       { icon: <Headphones size={14} className="text-indigo-500" />, label: "Mentor Support" },
//                       { icon: <BookOpen size={14} className="text-indigo-500" />, label: `${lessons.length} Lessons` },
//                       { icon: <Users size={14} className="text-indigo-500" />,   label: "Community Access" },
//                     ].map(({ icon, label }, i) => (
//                       <div key={i} className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-4 py-3">
//                         {icon}
//                         <span className="text-sm text-gray-600 font-medium">{label}</span>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Thumbnail */}
//                   {thumb && !isEnrolled && (
//                     <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm mt-2">
//                       <img src={thumb} alt={course.title} className="w-full object-cover max-h-72" />
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Lessons tab */}
//               {activeTab === "lessons" && (
//                 <div>
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-base font-black text-gray-900">
//                       All Lessons
//                       <span className="ml-2 text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
//                         {lessons.length}
//                       </span>
//                     </h3>
//                     {!isEnrolled && (
//                       <span className="text-xs text-gray-400 flex items-center gap-1">
//                         <Lock size={10} /> Enroll to unlock
//                       </span>
//                     )}
//                   </div>
//                   {lessons.length === 0 ? (
//                     <p className="text-sm text-gray-400 text-center py-8">No lessons added yet.</p>
//                   ) : (
//                     lessons.map((lesson, i) => (
//                       <LessonRow
//                         key={lesson.id ?? i}
//                         lesson={lesson}
//                         index={i}
//                         isEnrolled={isEnrolled}
//                         isActive={displayLesson?.id === lesson.id}
//                         onClick={(l) => { setActiveLesson(l); setActiveTab("overview") }}
//                         onLockedClick={handleLockedClick}
//                       />
//                     ))
//                   )}
//                 </div>
//               )}

//               {/* Reviews tab */}
//               {activeTab === "reviews" && (
//                 <div className="text-center py-12 text-gray-400">
//                   <Star size={36} className="mx-auto mb-3 text-gray-200" />
//                   <p className="text-sm font-semibold">No reviews yet.</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ── RIGHT COLUMN — sticky card ── */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-24 space-y-4">

//               {/* Thumbnail card */}
//               <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//                 <div className="relative w-full aspect-video bg-gray-900">
//                   {thumb ? (
//                     <img src={thumb} alt={course.title} className="w-full h-full object-cover opacity-90" />
//                   ) : (
//                     <div className="w-full h-full bg-gradient-to-br from-indigo-800 to-indigo-600" />
//                   )}
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="w-12 h-12 rounded-full bg-white/90 shadow-xl flex items-center justify-center">
//                       <Play size={18} className="text-indigo-600 fill-indigo-600 ml-0.5" />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-5">
//                   <div className="flex items-center justify-between mb-4">
//                     <span className="text-xl font-black text-green-500">{price}</span>
//                     {isEnrolled ? (
//                       <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-bold">
//                         <Check size={12} /> Enrolled
//                       </span>
//                     ) : (
//                       <button
//                         onClick={handleEnroll}
//                         disabled={isEnrolling}
//                         className="px-5 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold transition-all hover:shadow-lg hover:shadow-indigo-200 disabled:opacity-60"
//                       >
//                         {isEnrolling ? "Enrolling…" : "Enroll Now"}
//                       </button>
//                     )}
//                   </div>

//                   {/* Includes */}
//                   <div className="space-y-2.5 border-t border-gray-50 pt-4">
//                     {[
//                       `${lessons.length} lesson${lessons.length !== 1 ? "s" : ""}`,
//                       "Downloadable resources",
//                       "Certificate of completion",
//                       "Lifetime access",
//                       `Category: ${category}`,
//                     ].map((text, i) => (
//                       <div key={i} className="flex items-center gap-2.5">
//                         <div className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
//                           <Check size={9} className="text-indigo-600" strokeWidth={3} />
//                         </div>
//                         <span className="text-xs text-gray-600">{text}</span>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Warning/success banner */}
//                   {!isEnrolled ? (
//                     <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
//                       <Lock size={12} className="text-amber-500 flex-shrink-0 mt-0.5" />
//                       <p className="text-[11px] text-amber-700 font-medium leading-relaxed">
//                         Enroll to unlock all lessons and watch the videos.
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="mt-4 flex items-start gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
//                       <Check size={12} className="text-green-500 flex-shrink-0 mt-0.5" />
//                       <p className="text-[11px] text-green-700 font-medium leading-relaxed">
//                         You're enrolled! Click a lesson to start watching.
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Lesson list sidebar */}
//               {lessons.length > 0 && (
//                 <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
//                   <h3 className="text-sm font-black text-gray-900 mb-3 flex items-center gap-2">
//                     <BookOpen size={14} className="text-indigo-500" />
//                     All Lessons
//                     <span className="ml-auto text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
//                       {lessons.length}
//                     </span>
//                   </h3>
//                   <div className="space-y-1 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
//                     {lessons.map((lesson, i) => (
//                       <LessonRow
//                         key={lesson.id ?? i}
//                         lesson={lesson}
//                         index={i}
//                         isEnrolled={isEnrolled}
//                         isActive={displayLesson?.id === lesson.id}
//                         onClick={(l) => setActiveLesson(l)}
//                         onLockedClick={handleLockedClick}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}

//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }


import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  useGetCoursesQuery,
  useEnrollCourseMutation,
  useGetEnrolledCoursesQuery,
} from "../../features/courses/coursesApi"
import {
  Monitor, Award, Clock, Headphones, Play, Check,
  Lock, User, ArrowLeft, BookOpen, Users, Star, ChevronRight,
} from "lucide-react"
import { toast } from "react-toastify"

// ── Skeleton ──────────────────────────────────────────────────────────────────
const Skeleton = () => (
  <div className="max-w-6xl mx-auto px-6 py-10 animate-pulse">
    <div className="h-8 w-48 bg-gray-100 rounded-xl mb-8" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <div className="h-10 w-3/4 bg-gray-100 rounded-xl" />
        <div className="h-4 w-full bg-gray-100 rounded" />
        <div className="h-64 bg-gray-100 rounded-2xl mt-6" />
      </div>
      <div className="h-[500px] bg-gray-100 rounded-2xl" />
    </div>
  </div>
)

// ── Tab ───────────────────────────────────────────────────────────────────────
const Tab = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
      active
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
    }`}
  >
    {label}
  </button>
)

// ── Lesson row (visible but locked when not enrolled) ─────────────────────────
const LessonListItem = ({ lesson, index, isEnrolled, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all border mb-2 ${
      isActive
        ? "border-amber-400 bg-amber-50 shadow-sm"
        : "border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/40"
    }`}
  >
    <span className={`text-sm font-bold min-w-[1.5rem] ${isActive ? "text-amber-600" : "text-gray-400"}`}>
      {index + 1}.
    </span>
    <span className={`flex-1 text-sm font-medium truncate ${isActive ? "text-gray-900" : "text-gray-700"}`}>
      {lesson.title}
    </span>
    {!isEnrolled && <Lock size={13} className="text-gray-300 flex-shrink-0" />}
    {isEnrolled && <ChevronRight size={13} className={isActive ? "text-amber-500" : "text-gray-300"} />}
  </button>
)

// ── Main ──────────────────────────────────────────────────────────────────────
export default function CourseDetail() {
  const { id }    = useParams()
  const navigate  = useNavigate()
  const { user }  = useSelector((state) => state.auth)
  const [activeTab, setActiveTab]       = useState("overview")
  const [activeLesson, setActiveLesson] = useState(null)

  const { data: raw, isLoading } = useGetCoursesQuery({ limit: 999, skip: 0 })
  const allCourses = Array.isArray(raw) ? raw : raw?.courses ?? raw?.data ?? []
  const course     = allCourses.find((c) => String(c.id) === String(id))

  const { data: enrolledList = [] } = useGetEnrolledCoursesQuery(undefined, { skip: !user })
  const isEnrolled = enrolledList.some(
    (c) => String(c.id) === String(id) || String(c.course_id) === String(id)
  )

  const [enrollCourse, { isLoading: isEnrolling }] = useEnrollCourseMutation()

  const handleEnroll = async () => {
    if (!user) { navigate("/login"); return }
    try {
      await enrollCourse(Number(id)).unwrap()
      toast.success("Enrolled! Redirecting to your progress…")
      setTimeout(() => navigate("/my-progress"), 1200)
    } catch (err) {
      const msg = err?.data?.detail || err?.data?.message || ""
      if (msg.toLowerCase().includes("already")) {
        navigate("/my-progress")
      } else {
        toast.error(msg || "Failed to enroll. Please try again.")
      }
    }
  }

  if (isLoading) return <Skeleton />
  if (!course) return (
    <div className="flex flex-col items-center justify-center py-32 text-gray-400">
      <p className="text-5xl mb-4">📭</p>
      <p className="text-sm font-semibold">Course not found.</p>
    </div>
  )

  const lessons  = course.lessons  ?? []
  const tags     = course.tags     ?? []
  const thumb    = course.thumbnail_url ?? course.thumbnail ?? null
  const price    = course.is_paid === false ? "Free" : `$${course.price ?? 49}`
  const teacher  = course.teacher  ?? course.instructor ?? null
  const category = course.category?.name ?? course.category ?? "General"
  const displayLesson = activeLesson ?? lessons[0] ?? null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 font-semibold mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── LEFT ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Course header */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h1 className="text-2xl font-black text-indigo-900 leading-tight mb-3">
                {course.title}
              </h1>

              {teacher && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    {teacher.avatar_url
                      ? <img src={teacher.avatar_url} alt={teacher.name} className="w-full h-full object-cover" />
                      : <User size={14} className="text-indigo-400" />
                    }
                  </div>
                  <span className="text-sm font-bold text-gray-700">{teacher.name ?? teacher.full_name}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="text-xs text-gray-400 font-medium">Category :</span>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold border border-indigo-100">
                  {category}
                </span>
                {tags.length > 0 && (
                  <>
                    <span className="text-xs text-gray-400 font-medium ml-2">Tags :</span>
                    {tags.map((t, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 text-xs font-bold border border-amber-100">
                        {typeof t === "string" ? t : t.name}
                      </span>
                    ))}
                  </>
                )}
              </div>

              {isEnrolled ? (
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-bold">
                    <Check size={14} /> Enrolled
                  </span>
                  <button
                    onClick={() => navigate("/my-progress")}
                    className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-bold transition-all border border-indigo-100"
                  >
                    View My Progress →
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                  className="px-6 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-bold transition-all hover:shadow-lg hover:shadow-indigo-200 disabled:opacity-60"
                >
                  {isEnrolling ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                      Enrolling…
                    </span>
                  ) : "Enroll Now"}
                </button>
              )}
            </div>

            {/* Tabs + content */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex gap-2 mb-6">
                <Tab label="Overview" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
                <Tab label="Lessons"  active={activeTab === "lessons"}  onClick={() => setActiveTab("lessons")}  />
              </div>

              {/* ── Overview ── */}
              {activeTab === "overview" && (
                <div className="space-y-5">
                  {/* Lesson detail when one is selected (not enrolled = show description only) */}
                  {displayLesson && (
                    <div>
                      <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">
                        {isEnrolled ? "Selected Lesson" : "Lesson Preview"}
                      </p>
                      <h2 className="text-lg font-black text-gray-900 mb-2">
                        Lessons {lessons.indexOf(displayLesson) + 1}: {displayLesson.title}
                      </h2>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {displayLesson.description || course.description}
                      </p>
                      {!isEnrolled && (
                        <div className="mt-4 flex items-center gap-2 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                          <Lock size={13} className="flex-shrink-0" />
                          Enroll to watch this lesson video.
                        </div>
                      )}
                    </div>
                  )}

                  {/* Course meta grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-50">
                    {[
                      { icon: <Monitor size={14} className="text-indigo-500" />,    label: "Online Course" },
                      { icon: <Clock size={14} className="text-indigo-500" />,      label: course.duration ?? "Self-paced" },
                      { icon: <Award size={14} className="text-indigo-500" />,      label: "Certificate" },
                      { icon: <Headphones size={14} className="text-indigo-500" />, label: "Mentor Support" },
                      { icon: <BookOpen size={14} className="text-indigo-500" />,   label: `${lessons.length} Lessons` },
                      { icon: <Users size={14} className="text-indigo-500" />,      label: "Community Access" },
                    ].map(({ icon, label }, i) => (
                      <div key={i} className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-4 py-3">
                        {icon}
                        <span className="text-sm text-gray-600 font-medium">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Lessons tab ── */}
              {activeTab === "lessons" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-black text-gray-900">
                      All Lessons
                      <span className="ml-2 text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        {lessons.length}
                      </span>
                    </h3>
                    {!isEnrolled && (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Lock size={10} /> Enroll to watch
                      </span>
                    )}
                  </div>
                  {lessons.length === 0
                    ? <p className="text-sm text-gray-400 text-center py-8">No lessons added yet.</p>
                    : lessons.map((lesson, i) => (
                        <LessonListItem
                          key={lesson.id ?? i}
                          lesson={lesson}
                          index={i}
                          isEnrolled={isEnrolled}
                          isActive={displayLesson?.id === lesson.id}
                          onClick={() => {
                            setActiveLesson(lesson)
                            setActiveTab("overview")
                          }}
                        />
                      ))
                  }
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT sidebar ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">

              {/* Thumbnail + enroll card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="relative w-full aspect-video bg-gray-900">
                  {thumb
                    ? <img src={thumb} alt={course.title} className="w-full h-full object-cover opacity-90" />
                    : <div className="w-full h-full bg-gradient-to-br from-indigo-800 to-indigo-600" />
                  }
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 shadow-xl flex items-center justify-center">
                      <Play size={18} className="text-indigo-600 fill-indigo-600 ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-black text-green-500">{price}</span>
                    {isEnrolled ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-bold">
                        <Check size={12} /> Enrolled
                      </span>
                    ) : (
                      <button
                        onClick={handleEnroll}
                        disabled={isEnrolling}
                        className="px-5 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold transition-all disabled:opacity-60"
                      >
                        {isEnrolling ? "Enrolling…" : "Enroll Now"}
                      </button>
                    )}
                  </div>

                  <div className="space-y-2.5 border-t border-gray-50 pt-4">
                    {[
                      `${lessons.length} lesson${lessons.length !== 1 ? "s" : ""}`,
                      "Certificate of completion",
                      "Lifetime access",
                      `Category: ${category}`,
                    ].map((text, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                          <Check size={9} className="text-indigo-600" strokeWidth={3} />
                        </div>
                        <span className="text-xs text-gray-600">{text}</span>
                      </div>
                    ))}
                  </div>

                  {isEnrolled && (
                    <button
                      onClick={() => navigate("/my-progress")}
                      className="mt-4 w-full py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-100 transition-all"
                    >
                      View My Progress →
                    </button>
                  )}
                </div>
              </div>

              {/* All lessons sidebar list */}
              {lessons.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="text-sm font-black text-gray-900 mb-3 flex items-center gap-2">
                    <BookOpen size={14} className="text-indigo-500" />
                    All Lessons
                    <span className="ml-auto text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {lessons.length}
                    </span>
                  </h3>
                  <div className="space-y-1 max-h-80 overflow-y-auto">
                    {lessons.map((lesson, i) => (
                      <button
                        key={lesson.id ?? i}
                        onClick={() => { setActiveLesson(lesson); setActiveTab("overview") }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-[13px] transition-all border flex items-center gap-2 ${
                          displayLesson?.id === lesson.id
                            ? "border-amber-400 bg-amber-50 text-gray-900 font-semibold"
                            : "border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/40 text-gray-600"
                        }`}
                      >
                        <span className="text-xs text-gray-400 min-w-[1.2rem]">{i + 1}.</span>
                        <span className="flex-1 truncate">{lesson.title}</span>
                        {!isEnrolled && <Lock size={11} className="text-gray-300 flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}