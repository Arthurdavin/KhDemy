import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useGetCategoriesQuery } from "../../features/categories/categoriesApi"
import { Bookmark, ChevronLeft, ChevronRight, Search, X } from "lucide-react"
import {
  useGetAllBooksQuery,
  useGetBooksQuery,
  useGetMyBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from "../../features/books/booksAPI"

const TRENDING_LIMIT = 6
const EXPLORE_LIMIT  = 6

const BADGE_COLORS = [
  { bg: "bg-purple-100", text: "text-purple-600" },
  { bg: "bg-sky-100",    text: "text-sky-600"    },
  { bg: "bg-pink-100",   text: "text-pink-600"   },
  { bg: "bg-amber-100",  text: "text-amber-600"  },
  { bg: "bg-emerald-100",text: "text-emerald-600"},
  { bg: "bg-indigo-100", text: "text-indigo-600" },
]

// ── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden flex animate-pulse min-h-[160px]">
    <div className="w-[140px] flex-shrink-0 bg-gray-100 dark:bg-gray-700" />
    <div className="flex-1 p-4 space-y-3">
      <div className="h-5 w-16 bg-gray-100 dark:bg-gray-700 rounded-full" />
      <div className="h-4 w-3/4 bg-gray-100 dark:bg-gray-700 rounded-full" />
      <div className="h-3 w-1/3 bg-gray-100 dark:bg-gray-700 rounded-full" />
      <div className="space-y-1.5 pt-1">
        <div className="h-3 w-full  bg-gray-100 dark:bg-gray-700 rounded-full" />
        <div className="h-3 w-5/6  bg-gray-100 dark:bg-gray-700 rounded-full" />
        <div className="h-3 w-4/6  bg-gray-100 dark:bg-gray-700 rounded-full" />
      </div>
    </div>
  </div>
)

// ── Book Card ─────────────────────────────────────────────────────────────────
const BookCard = ({ book, colorIdx = 0, bookmarkedIds, onToggleBookmark }) => {
  const navigate = useNavigate()
  const { bg, text } = BADGE_COLORS[colorIdx % BADGE_COLORS.length]

  const isSaved  = bookmarkedIds?.includes(book.id) ?? false
  const category = book.categories?.[0]?.name ?? book.category?.name ?? book.category ?? "General"
  const author   = book.author ?? (book.author_id ? `Author #${book.author_id}` : null)
  const desc     = book.description ?? "No description available."
  const thumb    = book.thumbnail ?? null

  return (
    <div
      onClick={() => navigate(`/books/${book.id}`)}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700
        overflow-hidden flex cursor-pointer hover:shadow-xl dark:hover:shadow-gray-900/50
        hover:-translate-y-0.5 transition-all duration-300 min-h-[160px]"
    >
      {/* Left: image */}
      <div className="w-[140px] flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-700">
        {thumb ? (
          <img
            src={thumb}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100
            dark:from-indigo-900/40 dark:to-purple-900/40 flex items-center justify-center">
            <span className="text-4xl select-none">📚</span>
          </div>
        )}
      </div>

      {/* Right: info */}
      <div className="flex-1 min-w-0 p-4 flex flex-col justify-between">
        <div>
          <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-2 ${bg} ${text}`}>
            {category}
          </span>
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-0.5 line-clamp-2 leading-snug
            group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {book.title}
          </h3>
          {author && (
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-2">by {author}</p>
          )}
          <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed line-clamp-3">
            {desc}
          </p>
        </div>
      </div>

      {/* Bookmark button */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleBookmark(book.id, isSaved) }}
        className={`absolute bottom-3 right-3 w-7 h-7 rounded-lg border flex items-center justify-center transition-all
          ${isSaved
            ? "border-indigo-300 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-500"
            : "border-gray-200 dark:border-gray-600 text-gray-300 dark:text-gray-600 hover:border-indigo-200 hover:text-indigo-400"
          }`}
        title={isSaved ? "Remove bookmark" : "Bookmark"}
      >
        <Bookmark size={12} className={isSaved ? "fill-indigo-500" : ""} />
      </button>
    </div>
  )
}

// ── Pagination ────────────────────────────────────────────────────────────────
const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null
  const start = Math.max(1, Math.min(page - 2, totalPages - 4))
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => start + i)

  return (
    <div className="flex items-center justify-center gap-2 mt-12 pb-10">
      <button
        onClick={() => onChange(page - 1)} disabled={page === 1}
        className="flex items-center gap-1 px-5 py-2.5 rounded-full border border-gray-200 dark:border-gray-700
          text-sm font-semibold text-gray-500 dark:text-gray-400 hover:border-indigo-300 hover:text-indigo-600
          disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft size={14} /> Back
      </button>
      {pages.map((p) => (
        <button key={p} onClick={() => onChange(p)}
          className={`w-10 h-10 rounded-full text-sm font-bold transition-all
            ${page === p
              ? "bg-indigo-700 dark:bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50"
              : "border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-indigo-300 hover:text-indigo-600"
            }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(page + 1)} disabled={page >= totalPages}
        className="flex items-center gap-1 px-5 py-2.5 rounded-full border border-gray-200 dark:border-gray-700
          text-sm font-semibold text-gray-500 dark:text-gray-400 hover:border-indigo-300 hover:text-indigo-600
          disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Next <ChevronRight size={14} />
      </button>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function LibraryPage() {
  const [page,        setPage]        = useState(1)
  const [categoryId,  setCategoryId]  = useState(null)
  const [searchInput, setSearchInput] = useState("")
  const [showAll,     setShowAll]     = useState(false)

  // ── Categories ──────────────────────────────────────────────────────────────
  const { data: categoriesRaw = [] } = useGetCategoriesQuery()
  const categories = Array.isArray(categoriesRaw)
    ? categoriesRaw
    : categoriesRaw?.categories ?? categoriesRaw?.data ?? []

  // ── Trending (getAllBooks returns a flat array) ─────────────────────────────
  const { data: trendingBooks = [], isLoading: trendLoad } = useGetAllBooksQuery({
    page: 1, limit: TRENDING_LIMIT,
  })

  // ── Explore (getBooks returns { items, total, total_pages }) ───────────────
  const { data: exploreData, isLoading: exploreLoad } = useGetBooksQuery({
    page,
    limit: EXPLORE_LIMIT,
    ...(categoryId ? { category_id: categoryId } : {}),
  })
  const exploreBooks = exploreData?.items       ?? []
  const total        = exploreData?.total       ?? 0
  const totalPages   = exploreData?.total_pages ?? Math.ceil(total / EXPLORE_LIMIT)

  // ── Bookmarks ───────────────────────────────────────────────────────────────
  const { data: bookmarkedIds = [] }    = useGetMyBookmarksQuery()
  const [addBookmark]                   = useAddBookmarkMutation()
  const [removeBookmark]                = useRemoveBookmarkMutation()

  const handleToggleBookmark = async (bookId, isSaved) => {
    try {
      if (isSaved) {
        await removeBookmark(bookId).unwrap()
      } else {
        await addBookmark(bookId).unwrap()
      }
    } catch {
      // silently ignore — UI will stay in sync via cache invalidation
    }
  }

  // ── Client-side search on current page ────────────────────────────────────
  const filtered = useMemo(() => {
    const q = searchInput.trim().toLowerCase()
    if (!q) return exploreBooks
    return exploreBooks.filter((b) =>
      b.title?.toLowerCase().includes(q) ||
      b.description?.toLowerCase().includes(q)
    )
  }, [exploreBooks, searchInput])

  const handleCategory = (id) => { setCategoryId(id); setPage(1); setSearchInput("") }
  const clearSearch    = ()   => { setSearchInput(""); setPage(1) }
  const heroBooks      = trendingBooks.slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">

      {/* ════ HERO ════ */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-8 py-14 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-3">📚 Digital Library</p>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-4">
              Search &amp; review<br />
              your{" "}
              <span style={{ color: "#E91E8C" }}>favorite book</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
              Introducing a seamless experience that transcends traditional boundaries —
              effortlessly search, bookmark and explore books you love.
            </p>
          </div>

          <div className="flex-1 flex justify-end">
            <div className="relative w-full max-w-sm h-72 rounded-3xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1e1b4b 60%, #312e81)" }}>
              <div className="absolute inset-0 p-6">
                {heroBooks.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 h-full">
                    {heroBooks.map((b, i) => (
                      <div key={b.id} className={`rounded-xl overflow-hidden shadow-2xl transition-transform ${
                        i === 0 ? "translate-y-4" : i === 1 ? "-translate-y-2" : i === 2 ? "translate-y-2" : "-translate-y-4"
                      }`}>
                        {b.thumbnail ? (
                          <img src={b.thumbnail} alt={b.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-white/10 flex items-center justify-center">
                            <span className="text-2xl">📚</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 h-full opacity-40">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className={`rounded-xl bg-white/10 ${i % 2 === 0 ? "translate-y-3" : "-translate-y-3"}`} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════ TOP TRENDING ════ */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-2xl font-black">
            <span style={{ color: "#E91E8C" }}>Top Trending</span>{" "}
            <span className="text-indigo-700 dark:text-indigo-400">Books</span>
          </h2>
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-5 py-2.5 rounded-full bg-indigo-700 dark:bg-indigo-600 text-white text-sm font-bold
              hover:bg-indigo-800 transition-all shadow-md shadow-indigo-200 dark:shadow-indigo-900/50"
          >
            {showAll ? "Show less" : "See more"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendLoad
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : (showAll ? trendingBooks : trendingBooks.slice(0, 3)).map((book, i) => (
                <BookCard
                  key={book.id} book={book} colorIdx={i}
                  bookmarkedIds={bookmarkedIds}
                  onToggleBookmark={handleToggleBookmark}
                />
              ))
          }
        </div>
      </div>

      {/* ════ EXPLORE ALL ════ */}
      <div className="max-w-6xl mx-auto px-8 pb-6">
        <h2 className="text-3xl font-black text-gray-900 dark:text-white text-center mb-8">
          Explore All Books Here
        </h2>

        {/* Search */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text" value={searchInput}
              onChange={(e) => { setSearchInput(e.target.value); setPage(1) }}
              placeholder="Search books…"
              className="w-full pl-10 pr-10 py-3 rounded-full border-2 border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100
                placeholder-gray-400 outline-none focus:border-indigo-400 transition-all"
            />
            {searchInput && (
              <button onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button onClick={() => handleCategory(null)}
            className={`px-5 py-2 rounded-full text-sm font-bold border-2 transition-all
              ${categoryId === null
                ? "bg-indigo-700 dark:bg-indigo-600 text-white border-indigo-700"
                : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-indigo-300 hover:text-indigo-600"
              }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => handleCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-bold border-2 transition-all
                ${categoryId === cat.id
                  ? "bg-indigo-700 dark:bg-indigo-600 text-white border-indigo-700"
                  : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-indigo-300 hover:text-indigo-600"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search result count */}
        {searchInput && (
          <p className="text-sm text-gray-400 text-center mb-6">
            Found{" "}
            <span className="font-bold text-indigo-600">{filtered.length}</span>{" "}
            result{filtered.length !== 1 ? "s" : ""} for{" "}
            <span className="font-bold text-gray-700 dark:text-gray-300">"{searchInput}"</span>
          </p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exploreLoad
            ? Array.from({ length: EXPLORE_LIMIT }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length === 0
              ? (
                <div className="col-span-3 text-center py-20">
                  <p className="text-4xl mb-3">📭</p>
                  <p className="text-sm font-semibold text-gray-400 dark:text-gray-500">
                    {searchInput ? `No books match "${searchInput}".` : "No books available."}
                  </p>
                  {(searchInput || categoryId) && (
                    <button onClick={() => { clearSearch(); handleCategory(null) }}
                      className="mt-3 text-xs text-indigo-500 font-bold hover:underline">
                      Clear filters
                    </button>
                  )}
                </div>
              )
              : filtered.map((book, i) => (
                  <BookCard
                    key={book.id} book={book} colorIdx={i}
                    bookmarkedIds={bookmarkedIds}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))
          }
        </div>

        {/* Pagination */}
        {!exploreLoad && !searchInput && (
          <Pagination
            page={page} totalPages={totalPages}
            onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }) }}
          />
        )}
      </div>
    </div>
  )
}

// import { useState, useMemo } from "react"
// import { useNavigate } from "react-router-dom"
// import { useGetCategoriesQuery } from "../../features/categories/categoriesApi"
// import { Bookmark, ChevronLeft, ChevronRight, Search, X } from "lucide-react"
// import { useGetAllBooksQuery, useGetBooksQuery } from "../../features/books/booksAPI"

// const TRENDING_LIMIT = 6
// const EXPLORE_LIMIT  = 6   // multiples of 3 for clean rows

// // Badge colours cycling per card
// const BADGE_COLORS = [
//   { bg: "bg-purple-100", text: "text-purple-600" },
//   { bg: "bg-sky-100",    text: "text-sky-600"    },
//   { bg: "bg-pink-100",   text: "text-pink-600"   },
//   { bg: "bg-amber-100",  text: "text-amber-600"  },
//   { bg: "bg-emerald-100",text: "text-emerald-600"},
//   { bg: "bg-indigo-100", text: "text-indigo-600" },
// ]

// // ── Skeleton — matches the card layout (image left, text right) ───────────────
// const SkeletonCard = () => (
//   <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden flex animate-pulse min-h-[160px]">
//     {/* image placeholder */}
//     <div className="w-[140px] flex-shrink-0 bg-gray-100 dark:bg-gray-700" />
//     {/* text placeholder */}
//     <div className="flex-1 p-4 space-y-3">
//       <div className="h-5 w-16 bg-gray-100 dark:bg-gray-700 rounded-full" />
//       <div className="h-4 w-3/4 bg-gray-100 dark:bg-gray-700 rounded-full" />
//       <div className="h-3 w-1/3 bg-gray-100 dark:bg-gray-700 rounded-full" />
//       <div className="space-y-1.5 pt-1">
//         <div className="h-3 w-full  bg-gray-100 dark:bg-gray-700 rounded-full" />
//         <div className="h-3 w-5/6  bg-gray-100 dark:bg-gray-700 rounded-full" />
//         <div className="h-3 w-4/6  bg-gray-100 dark:bg-gray-700 rounded-full" />
//       </div>
//     </div>
//   </div>
// )

// // ── Book Card — image LEFT, info RIGHT, 3 per row ────────────────────────────
// const BookCard = ({ book, colorIdx = 0 }) => {
//   const navigate          = useNavigate()
//   const [saved, setSaved] = useState(false)

//   const { bg, text } = BADGE_COLORS[colorIdx % BADGE_COLORS.length]

//   const category = book.categories?.[0]?.name
//     ?? book.category?.name
//     ?? book.category
//     ?? "General"

//   const author = book.author
//     ?? (book.author_id ? `Author #${book.author_id}` : null)

//   const desc  = book.desc ?? book.description ?? "No description available."
//   const thumb = book.thumbnail ?? book.thumbnail_url ?? null

//   return (
//     <div
//       onClick={() => navigate(`/books/${book.id}`)}
//       className="
//         group relative bg-white dark:bg-gray-800
//         rounded-2xl border border-gray-100 dark:border-gray-700
//         overflow-hidden flex cursor-pointer
//         hover:shadow-xl dark:hover:shadow-gray-900/50
//         hover:-translate-y-0.5 transition-all duration-300
//         min-h-[160px]
//       "
//     >
//       {/* ── Left: square image ── */}
//       <div className="w-[140px] flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-700">
//         {thumb ? (
//           <img
//             src={thumb}
//             alt={book.title}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//           />
//         ) : (
//           <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100
//             dark:from-indigo-900/40 dark:to-purple-900/40 flex items-center justify-center">
//             <span className="text-4xl select-none">📚</span>
//           </div>
//         )}
//       </div>

//       {/* ── Right: info ── */}
//       <div className="flex-1 min-w-0 p-4 flex flex-col justify-between">
//         <div>
//           {/* Category badge */}
//           <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-2 ${bg} ${text}`}>
//             {category}
//           </span>

//           {/* Title */}
//           <h3 className="
//             text-sm font-bold text-gray-900 dark:text-gray-100
//             mb-0.5 line-clamp-2 leading-snug
//             group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors
//           ">
//             {book.title}
//           </h3>

//           {/* Author */}
//           {author && (
//             <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-2">
//               by {author}
//             </p>
//           )}

//           {/* Description */}
//           <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed line-clamp-3">
//             {desc}
//           </p>
//         </div>
//       </div>

//       {/* ── Bookmark button (bottom-right) ── */}
//       <button
//         onClick={(e) => { e.stopPropagation(); setSaved(!saved) }}
//         className={`
//           absolute bottom-3 right-3 w-7 h-7 rounded-lg border
//           flex items-center justify-center transition-all
//           ${saved
//             ? "border-indigo-300 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-500"
//             : "border-gray-200 dark:border-gray-600 text-gray-300 dark:text-gray-600 hover:border-indigo-200 hover:text-indigo-400"
//           }
//         `}
//         title={saved ? "Remove bookmark" : "Bookmark"}
//       >
//         <Bookmark size={12} className={saved ? "fill-indigo-500" : ""} />
//       </button>
//     </div>
//   )
// }

// // ── Pagination ────────────────────────────────────────────────────────────────
// const Pagination = ({ page, totalPages, onChange }) => {
//   if (totalPages <= 1) return null

//   const start = Math.max(1, Math.min(page - 2, totalPages - 4))
//   const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => start + i)

//   return (
//     <div className="flex items-center justify-center gap-2 mt-12 pb-10">
//       <button
//         onClick={() => onChange(page - 1)}
//         disabled={page === 1}
//         className="flex items-center gap-1 px-5 py-2.5 rounded-full border border-gray-200 dark:border-gray-700
//           text-sm font-semibold text-gray-500 dark:text-gray-400
//           hover:border-indigo-300 hover:text-indigo-600
//           disabled:opacity-40 disabled:cursor-not-allowed transition-all"
//       >
//         <ChevronLeft size={14} /> Back
//       </button>

//       {pages.map((p) => (
//         <button
//           key={p}
//           onClick={() => onChange(p)}
//           className={`w-10 h-10 rounded-full text-sm font-bold transition-all
//             ${page === p
//               ? "bg-indigo-700 dark:bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50"
//               : "border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-indigo-300 hover:text-indigo-600"
//             }`}
//         >
//           {p}
//         </button>
//       ))}

//       <button
//         onClick={() => onChange(page + 1)}
//         disabled={page >= totalPages}
//         className="flex items-center gap-1 px-5 py-2.5 rounded-full border border-gray-200 dark:border-gray-700
//           text-sm font-semibold text-gray-500 dark:text-gray-400
//           hover:border-indigo-300 hover:text-indigo-600
//           disabled:opacity-40 disabled:cursor-not-allowed transition-all"
//       >
//         Next <ChevronRight size={14} />
//       </button>
//     </div>
//   )
// }

// // ── Main Page ─────────────────────────────────────────────────────────────────
// export default function LibraryPage() {
//   const [page,        setPage]        = useState(1)
//   const [categoryId,  setCategoryId]  = useState(null)
//   const [searchInput, setSearchInput] = useState("")
//   const [showAll,     setShowAll]     = useState(false)

//   // ── Categories ──────────────────────────────────────────────
//   const { data: categoriesRaw = [] } = useGetCategoriesQuery()
//   const categories = Array.isArray(categoriesRaw)
//     ? categoriesRaw
//     : categoriesRaw?.categories ?? categoriesRaw?.data ?? []

//   // ── Trending books ──────────────────────────────────────────
//   const { data: trendingRaw = [], isLoading: trendLoad } = useGetAllBooksQuery({
//     page: 1, limit: TRENDING_LIMIT,
//   })
//   const trendingBooks = Array.isArray(trendingRaw)
//     ? trendingRaw
//     : trendingRaw?.items ?? trendingRaw?.books ?? trendingRaw?.data ?? []

//   // ── Explore / paginated ─────────────────────────────────────
//   const { data: exploreRaw, isLoading: exploreLoad } = useGetBooksQuery({
//     page,
//     limit: EXPLORE_LIMIT,
//     ...(categoryId ? { category_id: categoryId } : {}),
//   })
//   const exploreBooks = Array.isArray(exploreRaw)
//     ? exploreRaw
//     : exploreRaw?.items ?? exploreRaw?.books ?? exploreRaw?.data ?? []
//   const total      = exploreRaw?.total ?? exploreBooks.length
//   const totalPages = Math.ceil(total / EXPLORE_LIMIT)

//   // Client-side search on current page data
//   const filtered = useMemo(() => {
//     const q = searchInput.trim().toLowerCase()
//     if (!q) return exploreBooks
//     return exploreBooks.filter((b) =>
//       b.title?.toLowerCase().includes(q) ||
//       b.description?.toLowerCase().includes(q) ||
//       b.desc?.toLowerCase().includes(q)
//     )
//   }, [exploreBooks, searchInput])

//   const handleCategory = (id) => { setCategoryId(id); setPage(1); setSearchInput("") }
//   const clearSearch    = ()   => { setSearchInput(""); setPage(1) }

//   const heroBooks = trendingBooks.slice(0, 4)

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">

//       {/* ════════ HERO ════════ */}
//       <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
//         <div className="max-w-6xl mx-auto px-8 py-14 flex flex-col md:flex-row items-center gap-12">

//           {/* Left */}
//           <div className="flex-1 z-10">
//             <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-3">
//               📚 Digital Library
//             </p>
//             <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-4">
//               Search &amp; review<br />
//               your{" "}
//               <span style={{ color: "#E91E8C" }}>favorite book</span>
//             </h1>
//             <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
//               Introducing a seamless experience that transcends traditional boundaries —
//               effortlessly search, bookmark and explore books you love.
//             </p>
//           </div>

//           {/* Right — staggered book covers */}
//           <div className="flex-1 flex justify-end">
//             <div
//               className="relative w-full max-w-sm h-72 rounded-3xl overflow-hidden"
//               style={{ background: "linear-gradient(135deg, #1e1b4b 60%, #312e81)" }}
//             >
//               <div className="absolute inset-0 p-6">
//                 {heroBooks.length > 0 ? (
//                   <div className="grid grid-cols-2 gap-3 h-full">
//                     {heroBooks.map((b, i) => (
//                       <div
//                         key={b.id}
//                         className={`rounded-xl overflow-hidden shadow-2xl transition-transform ${
//                           i === 0 ? "translate-y-4"  :
//                           i === 1 ? "-translate-y-2" :
//                           i === 2 ? "translate-y-2"  : "-translate-y-4"
//                         }`}
//                       >
//                         {(b.thumbnail ?? b.thumbnail_url) ? (
//                           <img
//                             src={b.thumbnail ?? b.thumbnail_url}
//                             alt={b.title}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <div className="w-full h-full bg-white/10 flex items-center justify-center">
//                             <span className="text-2xl">📚</span>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-2 gap-3 h-full opacity-40">
//                     {Array.from({ length: 4 }).map((_, i) => (
//                       <div key={i} className={`rounded-xl bg-white/10 ${i % 2 === 0 ? "translate-y-3" : "-translate-y-3"}`} />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ════════ TOP TRENDING ════════ */}
//       <div className="max-w-6xl mx-auto px-8 py-12">
//         <div className="flex items-center justify-between mb-7">
//           <h2 className="text-2xl font-black">
//             <span style={{ color: "#E91E8C" }}>Top Trending</span>{" "}
//             <span className="text-indigo-700 dark:text-indigo-400">Books</span>
//           </h2>
//           <button
//             onClick={() => setShowAll(!showAll)}
//             className="px-5 py-2.5 rounded-full bg-indigo-700 dark:bg-indigo-600 text-white text-sm font-bold
//               hover:bg-indigo-800 transition-all shadow-md shadow-indigo-200 dark:shadow-indigo-900/50"
//           >
//             {showAll ? "Show less" : "See more"}
//           </button>
//         </div>

//         {/* 3-per-row horizontal cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {trendLoad
//             ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
//             : (showAll ? trendingBooks : trendingBooks.slice(0, 3)).map((book, i) => (
//                 <BookCard key={book.id} book={book} colorIdx={i} />
//               ))
//           }
//         </div>
//       </div>

//       {/* ════════ EXPLORE ALL ════════ */}
//       <div className="max-w-6xl mx-auto px-8 pb-6">

//         <h2 className="text-3xl font-black text-gray-900 dark:text-white text-center mb-8">
//           Explore All Books Here
//         </h2>

//         {/* Search */}
//         <div className="flex justify-center mb-6">
//           <div className="relative w-full max-w-md">
//             <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//             <input
//               type="text"
//               value={searchInput}
//               onChange={(e) => { setSearchInput(e.target.value); setPage(1) }}
//               placeholder="Search books…"
//               className="w-full pl-10 pr-10 py-3 rounded-full border-2 border-gray-200 dark:border-gray-700
//                 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100
//                 placeholder-gray-400 outline-none focus:border-indigo-400 transition-all"
//             />
//             {searchInput && (
//               <button
//                 onClick={clearSearch}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 <X size={14} />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Category pills */}
//         <div className="flex flex-wrap gap-2 justify-center mb-8">
//           <button
//             onClick={() => handleCategory(null)}
//             className={`px-5 py-2 rounded-full text-sm font-bold border-2 transition-all
//               ${categoryId === null
//                 ? "bg-indigo-700 dark:bg-indigo-600 text-white border-indigo-700"
//                 : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-indigo-300 hover:text-indigo-600"
//               }`}
//           >
//             All
//           </button>
//           {categories.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => handleCategory(cat.id)}
//               className={`px-5 py-2 rounded-full text-sm font-bold border-2 transition-all
//                 ${categoryId === cat.id
//                   ? "bg-indigo-700 dark:bg-indigo-600 text-white border-indigo-700"
//                   : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-indigo-300 hover:text-indigo-600"
//                 }`}
//             >
//               {cat.name}
//             </button>
//           ))}
//         </div>

//         {/* Search result count */}
//         {searchInput && (
//           <p className="text-sm text-gray-400 text-center mb-6">
//             Found{" "}
//             <span className="font-bold text-indigo-600">{filtered.length}</span>{" "}
//             result{filtered.length !== 1 ? "s" : ""} for{" "}
//             <span className="font-bold text-gray-700 dark:text-gray-300">"{searchInput}"</span>
//           </p>
//         )}

//         {/* 3-per-row grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {exploreLoad
//             ? Array.from({ length: EXPLORE_LIMIT }).map((_, i) => <SkeletonCard key={i} />)
//             : filtered.length === 0
//               ? (
//                 <div className="col-span-3 text-center py-20">
//                   <p className="text-4xl mb-3">📭</p>
//                   <p className="text-sm font-semibold text-gray-400 dark:text-gray-500">
//                     {searchInput ? `No books match "${searchInput}".` : "No books available."}
//                   </p>
//                   {(searchInput || categoryId) && (
//                     <button
//                       onClick={() => { clearSearch(); handleCategory(null) }}
//                       className="mt-3 text-xs text-indigo-500 font-bold hover:underline"
//                     >
//                       Clear filters
//                     </button>
//                   )}
//                 </div>
//               )
//               : filtered.map((book, i) => (
//                   <BookCard key={book.id} book={book} colorIdx={i} />
//                 ))
//           }
//         </div>

//         {/* Pagination */}
//         {!exploreLoad && !searchInput && (
//           <Pagination
//             page={page}
//             totalPages={totalPages}
//             onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }) }}
//           />
//         )}
//       </div>
//     </div>
//   )
// }