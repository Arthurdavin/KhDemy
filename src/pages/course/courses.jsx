// import { useState, useRef, useEffect } from "react"
// import CourseDetail from "./CourseDetail"
// import { useGetCoursesQuery } from "../../features/courses/coursesApi"

// const CATEGORIES = ["All Category", "Programming", "Development", "Design", "Data Science", "Mobile"]

// const TAG_COLORS = {
//   "Programming":  "bg-indigo-900 text-white",
//   "Development":  "bg-sky-500 text-white",
//   "Design":       "bg-pink-500 text-white",
//   "Data Science": "bg-amber-500 text-white",
//   "Mobile":       "bg-emerald-500 text-white",
// }

// function getTagColor(tag) {
//   return TAG_COLORS[tag] ?? "bg-indigo-700 text-white"
// }

// function StarRating({ rating }) {
//   const r = Number(rating) || 0
//   return (
//     <span className="inline-flex items-center gap-1">
//       <svg width="13" height="13" viewBox="0 0 24 24" fill="#f5a623">
//         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//       </svg>
//       <span className="text-xs font-bold text-amber-500">{r.toFixed(1)}</span>
//     </span>
//   )
// }

// function BookmarkIcon() {
//   const [saved, setSaved] = useState(false)
//   return (
//     <button
//       onClick={e => { e.stopPropagation(); setSaved(s => !s) }}
//       className={`p-0.5 flex items-center bg-transparent border-0 cursor-pointer transition-transform hover:scale-125 ${saved ? "text-indigo-900" : "text-gray-300"}`}
//     >
//       <svg width="15" height="15" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
//       </svg>
//     </button>
//   )
// }

// function SkeletonCard() {
//   return (
//     <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 animate-pulse">
//       <div className="h-44 bg-gray-100" />
//       <div className="p-4 space-y-3">
//         <div className="h-3 bg-gray-100 rounded-full w-3/4" />
//         <div className="h-3 bg-gray-100 rounded-full w-full" />
//         <div className="h-3 bg-gray-100 rounded-full w-2/5" />
//       </div>
//     </div>
//   )
// }

// function CourseCard({ course, index, onSelect }) {
//   const ref = useRef(null)
//   const [visible, setVisible] = useState(index < 4)
//   const [hovered, setHovered] = useState(false)

//   // ── Map API fields ──────────────────────────────────────────────
//   const title     = course.title ?? ""
//   const desc      = course.description ?? ""
//   const thumbnail = course.thumbnail_url ?? course.thumbnail ?? ""
//   const tag       = course.tags?.[0]?.name ?? ""          // from tags array
//   const isPaid    = course.is_paid ?? false
//   const price     = course.price ?? 0
//   const rating    = course.average_rating ?? course.rating ?? 0
//   const tagCls    = getTagColor(tag)

//   useEffect(() => {
//     if (index < 4) return
//     const el = ref.current; if (!el) return
//     const obs = new IntersectionObserver(
//       ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), (index % 4) * 70); obs.disconnect() } },
//       { threshold: 0.08 }
//     )
//     obs.observe(el)
//     return () => obs.disconnect()
//   }, [index])

//   return (
//     <div
//       ref={ref}
//       onClick={() => onSelect?.(course)}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       className={`
//         bg-white rounded-2xl border overflow-hidden cursor-pointer flex flex-col
//         transition-all duration-300
//         ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}
//         ${hovered
//           ? "-translate-y-1.5 shadow-2xl shadow-indigo-100 border-indigo-100 scale-[1.018]"
//           : "shadow-sm border-gray-100 scale-100"}
//       `}
//     >
//       {/* Thumbnail */}
//       <div className="relative w-full h-44 overflow-hidden bg-gray-100 flex-shrink-0">
//         {thumbnail ? (
//           <img
//             src={thumbnail} alt={title}
//             className={`w-full h-full object-cover transition-transform duration-500 ${hovered ? "scale-110" : "scale-100"}`}
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center text-5xl">📚</div>
//         )}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />
//         {tag && (
//           <span className={`absolute top-3 left-3 text-[10.5px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md ${tagCls}`}>
//             {tag}
//           </span>
//         )}
//       </div>

//       {/* Body */}
//       <div className="flex flex-col flex-1 p-4">
//         <p className="text-sm font-black text-gray-900 mb-1.5 leading-snug line-clamp-2">{title}</p>
//         <p className="text-xs text-gray-400 leading-relaxed mb-4 flex-1 line-clamp-2">{desc}</p>
//         <div className="flex items-center justify-between">
//           <span className="text-base font-black text-indigo-900">
//             {!isPaid
//               ? <span className="text-emerald-500 font-black">Free</span>
//               : `$${price}`}
//           </span>
//           <div className="flex items-center gap-2">
//             {rating > 0 && <StarRating rating={rating} />}
//             <BookmarkIcon />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function getPageNumbers(active, total) {
//   if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
//   let start = Math.max(1, active - 2)
//   let end   = start + 4
//   if (end > total) { end = total; start = Math.max(1, end - 4) }
//   return Array.from({ length: end - start + 1 }, (_, i) => start + i)
// }

// function getPerPage() {
//   if (typeof window === "undefined") return 8
//   const w = window.innerWidth
//   if (w >= 1025) return 8
//   if (w >= 601)  return 9
//   return 8
// }

// export default function CoursesPage() {
//   const [selectedCourse, setSelectedCourse] = useState(null)
//   const [search, setSearch]         = useState("")
//   const [category, setCategory]     = useState("All Category")
//   const [activePage, setActivePage] = useState(1)
//   const [perPage, setPerPage]       = useState(getPerPage)

//   const { data: rawCourses, isLoading, isError } = useGetCoursesQuery()
//   const courses = Array.isArray(rawCourses)
//     ? rawCourses
//     : rawCourses?.courses ?? rawCourses?.data ?? rawCourses?.results ?? []

//   useEffect(() => {
//     function onResize() {
//       setPerPage(prev => {
//         const next = getPerPage()
//         if (next !== prev) { setActivePage(1); return next }
//         return prev
//       })
//     }
//     window.addEventListener("resize", onResize)
//     return () => window.removeEventListener("resize", onResize)
//   }, [])

//   useEffect(() => { setActivePage(1) }, [search, category])

//   if (selectedCourse) return <CourseDetail course={selectedCourse} onBack={() => setSelectedCourse(null)} />

//   const filtered = courses.filter(c => {
//     // match against tags[0].name since API has no top-level category name
//     const tagName    = c.tags?.[0]?.name ?? ""
//     const matchCat   = category === "All Category" || tagName === category
//     const matchSearch = (c.title ?? "").toLowerCase().includes(search.toLowerCase()) ||
//                         (c.description ?? "").toLowerCase().includes(search.toLowerCase())
//     return matchCat && matchSearch
//   })

//   const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
//   const safePage   = Math.min(activePage, totalPages)
//   const pageSlice  = filtered.slice((safePage - 1) * perPage, safePage * perPage)
//   const pageNums   = getPageNumbers(safePage, totalPages)

//   function goTo(p) { setActivePage(p); window.scrollTo({ top: 0, behavior: "smooth" }) }

//   return (
//     <div className="min-h-screen bg-slate-50">

//       {/* ══ HERO ══ */}
//       <div className="relative bg-gradient-to-br from-[#2D2A8E] to-[#1a177a] pt-14 pb-12 overflow-hidden">
//         <div className="absolute w-80 h-80 rounded-full bg-[#3F3CAE] opacity-35 -top-24 right-[15%] blur-[80px] pointer-events-none" />
//         <div className="absolute w-48 h-48 rounded-full bg-[#FF2D87] opacity-10 -bottom-14 right-[5%] blur-[60px] pointer-events-none" />

//         <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
//           <div className="mb-4">
//             <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-[10.5px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
//               <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
//               KHdemy · All Courses
//             </span>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
//             Explore <span className="text-amber-400">All Courses</span>
//           </h1>
//           <p className="text-white/65 text-sm leading-relaxed max-w-md mb-8">
//             Build real skills with expert-led courses in programming, design, data science, and more.
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 max-w-2xl">
//             <div>
//               <p className="text-white/60 text-xs font-bold mb-2">Search</p>
//               <div className="relative">
//                 <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//                   <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
//                 </svg>
//                 <input
//                   className="w-full bg-white/95 text-gray-900 placeholder-gray-400 text-sm rounded-xl pl-10 pr-4 py-3 outline-none border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
//                   placeholder="Search courses..."
//                   value={search}
//                   onChange={e => setSearch(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div>
//               <p className="text-white/60 text-xs font-bold mb-2">Category</p>
//               <select
//                 className="bg-white/95 text-gray-900 text-sm rounded-xl px-4 py-3 outline-none border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer min-w-[170px] w-full md:w-auto"
//                 value={category}
//                 onChange={e => setCategory(e.target.value)}
//               >
//                 {CATEGORIES.map(c => <option key={c}>{c}</option>)}
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ══ MAIN ══ */}
//       <div className="max-w-6xl mx-auto px-6 md:px-12 pt-8">

//         {/* Category pills */}
//         <div className="flex flex-wrap gap-2 mb-7">
//           {CATEGORIES.map(c => (
//             <button
//               key={c}
//               onClick={() => setCategory(c)}
//               className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all whitespace-nowrap
//                 ${category === c
//                   ? "bg-indigo-900 text-white border-indigo-900 shadow-lg shadow-indigo-200"
//                   : "bg-white text-gray-400 border-gray-200 hover:border-indigo-400 hover:text-indigo-700 hover:bg-indigo-50"
//                 }`}
//             >
//               {c}
//             </button>
//           ))}
//         </div>

//         {/* Heading row */}
//         <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
//           <h2 className="text-2xl md:text-3xl font-black text-indigo-900 tracking-tight">
//             {category === "All Category" ? "Popular Courses" : category}
//           </h2>
//           <span className="text-xs font-semibold text-gray-400 bg-white border border-gray-100 px-4 py-1.5 rounded-full shadow-sm">
//             {isLoading ? "Loading…" : `${filtered.length} course${filtered.length !== 1 ? "s" : ""} found`}
//           </span>
//         </div>

//         {/* Grid */}
//         {isLoading ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
//             {Array.from({ length: perPage }).map((_, i) => <SkeletonCard key={i} />)}
//           </div>
//         ) : isError ? (
//           <div className="text-center py-24 text-gray-400">
//             <p className="text-5xl mb-4">⚠️</p>
//             <p className="text-base font-semibold">Failed to load courses. Please try again.</p>
//           </div>
//         ) : pageSlice.length > 0 ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
//             {pageSlice.map((course, i) => (
//               <CourseCard key={course.id} course={course} index={i} onSelect={setSelectedCourse} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-24 text-gray-400">
//             <p className="text-5xl mb-4">🔍</p>
//             <p className="text-base font-semibold">No courses found{search ? ` for "${search}"` : ""}.</p>
//           </div>
//         )}

//         {/* Pagination */}
//         {!isLoading && totalPages > 1 && (
//           <div className="flex justify-center items-center gap-1.5 pb-16 flex-wrap">
//             <button
//               onClick={() => goTo(Math.max(1, safePage - 1))}
//               disabled={safePage === 1}
//               className="px-4 py-2 rounded-xl border border-indigo-200 text-indigo-700 font-bold text-sm bg-white hover:bg-indigo-50 disabled:opacity-40 transition-all"
//             >
//               ‹ Back
//             </button>
//             {pageNums.map(p => (
//               <button
//                 key={p}
//                 onClick={() => goTo(p)}
//                 className={`min-w-[42px] px-4 py-2 rounded-xl border text-sm font-medium transition-all
//                   ${safePage === p
//                     ? "bg-indigo-900 text-white border-indigo-900 font-bold shadow-lg shadow-indigo-200"
//                     : "bg-white text-gray-700 border-gray-200 hover:border-indigo-400 hover:text-indigo-700 hover:bg-indigo-50 hover:-translate-y-0.5"
//                   }`}
//               >
//                 {p}
//               </button>
//             ))}
//             <button
//               onClick={() => goTo(Math.min(totalPages, safePage + 1))}
//               disabled={safePage === totalPages}
//               className="px-4 py-2 rounded-xl border border-indigo-200 text-indigo-700 font-bold text-sm bg-white hover:bg-indigo-50 disabled:opacity-40 transition-all"
//             >
//               Next ›
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }


import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useGetCoursesQuery } from "../../features/courses/coursesApi"
import { useGetCategoriesQuery } from "../../features/categories/categoriesApi"
import { Star, Bookmark, ChevronLeft, ChevronRight, Search, X } from "lucide-react"

const LIMIT = 8

const TAG_COLORS = [
  { bg: "bg-indigo-600/90",  text: "text-white" },
  { bg: "bg-pink-500/90",    text: "text-white" },
  { bg: "bg-emerald-500/90", text: "text-white" },
  { bg: "bg-amber-500/90",   text: "text-white" },
  { bg: "bg-sky-500/90",     text: "text-white" },
  { bg: "bg-purple-600/90",  text: "text-white" },
]

// ── Skeleton card ─────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
    <div className="w-full h-48 bg-gray-100" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-100 rounded-full w-3/4" />
      <div className="h-3 bg-gray-100 rounded-full w-full" />
      <div className="h-3 bg-gray-100 rounded-full w-2/3" />
      <div className="flex justify-between items-center pt-1">
        <div className="h-4 w-10 bg-gray-100 rounded-full" />
        <div className="h-3 w-16 bg-gray-100 rounded-full" />
      </div>
    </div>
  </div>
)

// ── Course card ───────────────────────────────────────────────────────────────
const CourseCard = ({ course }) => {
  const navigate          = useNavigate()
  const [saved, setSaved] = useState(false)

  // ✅ Correctly read category name from object or string
  const categoryName =
    course.category?.name ??
    (typeof course.category === "string" ? course.category : null)

  // ✅ Use tags array — [{name, id}] or [string]
  const tags = (course.tags ?? []).map((t) =>
    typeof t === "string" ? t : t.name ?? ""
  ).filter(Boolean)

  // ✅ Badge: use category if exists, else first tag, else nothing
  const badgeLabel = categoryName ?? tags[0] ?? null
  const badgeColor = TAG_COLORS[Math.abs((course.id ?? 0) % TAG_COLORS.length)]

  const rating = course.rating ?? 4.6
  const thumb  = course.thumbnail_url ?? course.thumbnail ?? null
  const price  = course.is_paid === false ? "Free" : `$${course.price ?? 29}`

  return (
    <div
      onClick={() => navigate(`/courses/${course.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100
        hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
        {thumb ? (
          <img
            src={thumb}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
            <span className="text-4xl">📚</span>
          </div>
        )}

        {/* ✅ Badge — category or first tag */}
        {badgeLabel && (
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold
              backdrop-blur-sm shadow-lg ${badgeColor.bg} ${badgeColor.text}`}>
              {badgeLabel}
            </span>
          </div>
        )}

        {/* ✅ Show remaining tags as small pills if more than 1 */}
        {tags.length > 1 && (
          <div className="absolute bottom-3 left-3 flex gap-1 flex-wrap">
            {tags.slice(categoryName ? 0 : 1, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/40 text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className="font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors"
          style={{ fontSize: "18px" }}
        >
          {course.title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed mb-4">
          {course.description ?? "No description available."}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Price */}
          <span className="font-black" style={{ fontSize: "18px", color: "#22C55E" }}>
            {price}
          </span>

          <div className="flex items-center gap-3">
            {/* Type badge */}
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full border"
              style={{ color: "#2F327D", borderColor: "#2F327D", fontSize: "11px" }}
            >
              {course.is_paid === false ? "Free" : "Paid"}
            </span>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star size={13} style={{ color: "#FE9A20", fill: "#FE9A20" }} />
              <span className="text-xs font-bold" style={{ color: "#FE9A20" }}>{rating}</span>
            </div>

            {/* Bookmark */}
            <button
              onClick={(e) => { e.stopPropagation(); setSaved(!saved) }}
              className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all
                ${saved
                  ? "border-indigo-300 bg-indigo-50 text-indigo-500"
                  : "border-gray-200 text-gray-400 hover:border-indigo-200 hover:text-indigo-400"
                }`}
            >
              <Bookmark size={13} className={saved ? "fill-indigo-500" : ""} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Pagination ────────────────────────────────────────────────────────────────
const Pagination = ({ page, total, limit, onChange }) => {
  const totalPages = Math.ceil(total / limit)
  if (totalPages <= 1) return null
  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold
          text-gray-500 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft size={15} /> Back
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-10 h-10 rounded-xl text-sm font-bold transition-all
            ${page === p
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
              : "border border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600"
            }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= Math.ceil(total / limit)}
        className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold
          text-gray-500 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Next <ChevronRight size={15} />
      </button>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function PopularCourses() {
  const [page,        setPage]        = useState(1)
  const [categoryId,  setCategoryId]  = useState(null)
  const [searchInput, setSearchInput] = useState("")

  // ✅ Real categories
  const { data: categoriesRaw = [], isLoading: catLoading } = useGetCategoriesQuery()
  const categories = Array.isArray(categoriesRaw)
    ? categoriesRaw
    : categoriesRaw?.categories ?? categoriesRaw?.data ?? []

  // ✅ Fetch all courses
  const { data: raw, isLoading, isError } = useGetCoursesQuery({
    limit: 999,
    skip:  0,
    ...(categoryId ? { category_id: categoryId } : {}),
  })

  const allCourses = Array.isArray(raw) ? raw : raw?.courses ?? raw?.data ?? []

  // ✅ Client-side search — filter by title, description, category name, OR tags
  const filtered = useMemo(() => {
    const q = searchInput.trim().toLowerCase()
    if (!q) return allCourses
    return allCourses.filter((c) => {
      const catName = c.category?.name ?? (typeof c.category === "string" ? c.category : "")
      const tagNames = (c.tags ?? []).map((t) =>
        typeof t === "string" ? t : t.name ?? ""
      ).join(" ").toLowerCase()
      return (
        c.title?.toLowerCase().includes(q)       ||
        c.description?.toLowerCase().includes(q) ||
        catName.toLowerCase().includes(q)         ||
        tagNames.includes(q)
      )
    })
  }, [allCourses, searchInput])

  const total    = filtered.length
  const paginated = filtered.slice((page - 1) * LIMIT, page * LIMIT)

  const handleCategory    = (id) => { setCategoryId(id); setPage(1); setSearchInput("") }
  const handleSearchChange = (e)  => { setSearchInput(e.target.value); setPage(1) }
  const clearSearch        = ()   => { setSearchInput(""); setPage(1) }

  return (
    <section className="py-12 px-6 max-w-screen-xl mx-auto">

      {/* Header + search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-3xl font-black text-indigo-900">Popular Courses</h2>

        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search by title, category or tag…"
            className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-gray-200 bg-white text-sm
              text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
          />
          {searchInput && (
            <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Search result count */}
      {searchInput && (
        <p className="text-sm text-gray-400 mb-4">
          Found <span className="font-bold text-indigo-600">{filtered.length}</span> result{filtered.length !== 1 ? "s" : ""} for{" "}
          <span className="font-bold text-gray-700">"{searchInput}"</span>
        </p>
      )}

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => handleCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all
            ${categoryId === null
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
              : "bg-gray-100 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
            }`}
        >
          All
        </button>

        {catLoading && Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-24 rounded-full bg-gray-100 animate-pulse" />
        ))}

        {!catLoading && categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all
              ${categoryId === cat.id
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                : "bg-gray-100 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Error */}
      {isError && (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">😕</p>
          <p className="text-sm font-semibold text-gray-400">Failed to load courses.</p>
        </div>
      )}

      {/* Course grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: LIMIT }).map((_, i) => <SkeletonCard key={i} />)
          : paginated.length === 0
            ? (
              <div className="col-span-4 text-center py-20">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-sm font-semibold text-gray-400">
                  {searchInput ? `No courses match "${searchInput}".`
                    : categoryId ? "No courses in this category."
                    : "No courses available."}
                </p>
                {(searchInput || categoryId) && (
                  <button
                    onClick={() => { clearSearch(); handleCategory(null) }}
                    className="mt-3 text-xs text-indigo-500 font-bold hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )
            : paginated.map((course) => <CourseCard key={course.id} course={course} />)
        }
      </div>

      {/* Pagination */}
      {!isLoading && paginated.length > 0 && (
        <Pagination
          page={page}
          total={total}
          limit={LIMIT}
          onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }) }}
        />
      )}

    </section>
  )
}