import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetBlogsQuery } from "../../features/blog/blogApi";
import { useGetCategoriesQuery } from "../../features/categories/categoriesApi";
import { useGetProfileQuery } from "../../features/teacher/teacherApi";
import {
  Star, Bookmark, ChevronLeft, ChevronRight,
  Search, X, Plus, User,
} from "lucide-react";

const LIMIT = 9;

const BADGE_COLORS = [
  "bg-indigo-600", "bg-pink-500", "bg-sky-500",
  "bg-amber-500",  "bg-emerald-500", "bg-purple-600",
];

// ── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
    <div className="w-full h-44 bg-gray-100" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-100 rounded-full w-3/4 mx-auto" />
      <div className="h-3 bg-gray-100 rounded-full w-full" />
      <div className="h-3 bg-gray-100 rounded-full w-2/3 mx-auto" />
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gray-100" />
          <div className="h-3 w-16 bg-gray-100 rounded-full" />
        </div>
        <div className="h-3 w-10 bg-gray-100 rounded-full" />
      </div>
    </div>
  </div>
);

// ── Blog Card ─────────────────────────────────────────────────────────────────
const BlogCard = ({ blog, profile }) => {
  const navigate          = useNavigate();
  const [saved, setSaved] = useState(false);

  const tags       = (blog.tags ?? []).map((t) => typeof t === "string" ? t : t.name ?? "").filter(Boolean);
  const badgeLabel = tags[0] ?? null;
  const badgeColor = BADGE_COLORS[Math.abs((blog.id ?? 0) % BADGE_COLORS.length)];
  const thumb      = blog.thumbnail_url ?? blog.thumbnail ?? null;
  const rating     = blog.rating ?? 4.8;

  // ✅ Use profile from /users/me as author
  const authorName   = blog.author_name ?? blog.author?.name ?? profile?.name ?? "Author";
  const authorAvatar = blog.author?.avatar_url ?? profile?.avatar_url ?? null;

  return (
    <div
      onClick={() => navigate(`/blogs/${blog.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100
        hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-44 bg-gray-100 overflow-hidden">
        {thumb ? (
          <img
            src={thumb}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-pink-100 to-indigo-100 flex items-center justify-center">
            <span className="text-4xl">📝</span>
          </div>
        )}
        {badgeLabel && (
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold
              text-white backdrop-blur-sm shadow ${badgeColor}`}>
              {badgeLabel}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 text-center">
        <h3
          className="font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors"
          style={{ fontSize: "16px" }}
        >
          {blog.title}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-5">
          {blog.description ?? blog.excerpt ?? blog.content ?? "No description available."}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">

          {/* ✅ Author from profile */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-indigo-100 border border-indigo-200 overflow-hidden flex items-center justify-center flex-shrink-0">
              {authorAvatar ? (
                <img src={authorAvatar} alt={authorName} className="w-full h-full object-cover" />
              ) : (
                <User size={12} className="text-indigo-500" />
              )}
            </div>
            <span className="text-xs font-semibold text-gray-600 truncate max-w-[80px]">
              {authorName}
            </span>
          </div>

          {/* Rating + Bookmark */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <Star size={12} style={{ color: "#FE9A20", fill: "#FE9A20" }} />
              <span className="text-xs font-bold" style={{ color: "#FE9A20" }}>{rating}</span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
              className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all
                ${saved
                  ? "border-indigo-300 bg-indigo-50 text-indigo-500"
                  : "border-gray-200 text-gray-400 hover:border-indigo-200 hover:text-indigo-400"
                }`}
            >
              <Bookmark size={12} className={saved ? "fill-indigo-500" : ""} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Pagination ────────────────────────────────────────────────────────────────
const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-14 pb-12">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="flex items-center gap-1 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-semibold
          text-gray-500 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft size={14} /> Back
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-10 h-10 rounded-full text-sm font-bold transition-all
            ${page === p
              ? "bg-indigo-700 text-white shadow-lg shadow-indigo-200"
              : "border border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600"
            }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className="flex items-center gap-1 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-semibold
          text-gray-500 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Next <ChevronRight size={14} />
      </button>
    </div>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const navigate                      = useNavigate();
  const [page,        setPage]        = useState(1);
  const [categoryId,  setCategoryId]  = useState(null);
  const [searchInput, setSearchInput] = useState("");

  // ✅ Fetch profile from /users/me
  const { data: profile } = useGetProfileQuery();

  // ✅ Real categories
  const { data: categoriesRaw = [], isLoading: catLoading } = useGetCategoriesQuery();
  const categories = Array.isArray(categoriesRaw)
    ? categoriesRaw
    : categoriesRaw?.categories ?? categoriesRaw?.data ?? [];

  // ✅ Real blogs — server-side pagination
  const { data: raw, isLoading, isError } = useGetBlogsQuery({
    page,
    limit: LIMIT,
    ...(categoryId ? { category_id: categoryId } : {}),
  });

  const blogs      = raw?.blogs ?? [];
  const total      = raw?.total ?? 0;
  const totalPages = Math.ceil(total / LIMIT);

  // ✅ Client-side search
  const filtered = useMemo(() => {
    const q = searchInput.trim().toLowerCase();
    if (!q) return blogs;
    return blogs.filter((b) => {
      const tagNames = (b.tags ?? [])
        .map((t) => typeof t === "string" ? t : t.name ?? "")
        .join(" ").toLowerCase();
      return (
        b.title?.toLowerCase().includes(q)   ||
        b.content?.toLowerCase().includes(q) ||
        tagNames.includes(q)
      );
    });
  }, [blogs, searchInput]);

  const handleCategory = (id) => { setCategoryId(id); setPage(1); setSearchInput(""); };
  const clearSearch    = ()   => { setSearchInput(""); setPage(1); };

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <div className="max-w-6xl mx-auto px-8 pt-16 pb-12">
        <div className="flex flex-col md:flex-row items-center gap-12">

          {/* Left text */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-5">
              <span style={{ color: "#E91E8C" }}>Empowering Cambodia's</span><br />
              <span style={{ color: "#1565C0" }}>Future Through Smart</span><br />
              <span style={{ color: "#FFC107" }}>Learning</span>
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              KhDemy is transforming the way students learn, practice, and grow.
            </p>
          </div>

          {/* Right image */}
          <div className="flex-1 flex justify-end">
            <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=600"
                alt="Learning"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── SEARCH + CREATE ── */}
      <div className="max-w-6xl mx-auto px-8 mb-8">
        <div className="flex items-center gap-4">

          {/* ✅ Create blog — LEFT */}
          <button
            onClick={() => navigate("/blogs/create")}
            className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-indigo-700 text-indigo-700
              text-sm font-bold hover:bg-indigo-700 hover:text-white transition-all flex-shrink-0"
          >
            <Plus size={15} /> Create Your Blog
          </button>

          {/* Search bar — RIGHT */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => { setSearchInput(e.target.value); setPage(1); }}
              placeholder="Search"
              className="w-full pl-6 pr-11 py-3 rounded-full border-2 border-gray-200 bg-white text-sm
                text-gray-800 outline-none focus:border-indigo-400 transition-all shadow-sm"
            />
            {searchInput ? (
              <button onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            ) : (
              <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            )}
          </div>
        </div>

        {/* Search result count */}
        {searchInput && (
          <p className="text-sm text-gray-400 mt-3">
            Found <span className="font-bold text-indigo-600">{filtered.length}</span> result{filtered.length !== 1 ? "s" : ""} for{" "}
            <span className="font-bold text-gray-700">"{searchInput}"</span>
          </p>
        )}
      </div>

      {/* ── CATEGORY PILLS ── */}
      <div className="max-w-6xl mx-auto px-8 mb-10">
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => handleCategory(null)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all
              ${categoryId === null
                ? "bg-indigo-700 text-white shadow-md"
                : "text-gray-500 hover:text-indigo-600"
              }`}
          >
            All
          </button>

          {catLoading && Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 w-24 rounded-full bg-gray-100 animate-pulse" />
          ))}

          {!catLoading && categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all
                ${categoryId === cat.id
                  ? "bg-indigo-700 text-white shadow-md"
                  : "text-gray-500 hover:text-indigo-600"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── BLOG GRID ── */}
      <div className="max-w-6xl mx-auto px-8 pb-4">

        {isError && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">😕</p>
            <p className="text-sm font-semibold text-gray-400">Failed to load blogs.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {isLoading
            ? Array.from({ length: LIMIT }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length === 0
              ? (
                <div className="col-span-3 text-center py-24">
                  <p className="text-4xl mb-3">📭</p>
                  <p className="text-sm font-semibold text-gray-400">
                    {searchInput ? `No blogs match "${searchInput}".` : "No blogs available."}
                  </p>
                  {(searchInput || categoryId) && (
                    <button
                      onClick={() => { clearSearch(); handleCategory(null); }}
                      className="mt-3 text-xs text-indigo-500 font-bold hover:underline"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              )
              : filtered.map((blog) => (
                  // ✅ Pass profile to every card
                  <BlogCard key={blog.id} blog={blog} profile={profile} />
                ))
          }
        </div>

        {/* Pagination */}
        {!isLoading && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          />
        )}
      </div>
    </div>
  );
}

// import { useState } from "react"
// import { useGetBlogsQuery, useGetBlogByIdQuery } from "../../features/blog/blogApi"

// const LIMIT = 6

// const TAG_COLORS = [
//   "bg-indigo-700 text-white",
//   "bg-pink-500 text-white",
//   "bg-sky-500 text-white",
//   "bg-amber-500 text-white",
//   "bg-emerald-500 text-white",
//   "bg-purple-600 text-white",
// ]

// function getTagColor(i) { return TAG_COLORS[i % TAG_COLORS.length] }

// function formatDate(iso) {
//   if (!iso) return ""
//   return new Date(iso).toLocaleDateString("en-US", {
//     year: "numeric", month: "short", day: "numeric",
//   })
// }

// const LEARNINGS = [
//   { left: "Core fundamentals & real-world applications", right: "Advanced patterns & best practices" },
//   { left: "Building production-ready projects",          right: "Debugging & problem solving strategies" },
//   { left: "Integrating with modern APIs & services",     right: "Testing & code quality" },
//   { left: "Deployment strategies",                       right: "Career tips & next steps" },
// ]

// // ─── Skeleton Card ────────────────────────────────────────────────────────────
// function SkeletonCard() {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
//       <div className="h-48 bg-gray-100" />
//       <div className="p-5 space-y-3">
//         <div className="h-3 bg-gray-100 rounded-full w-1/4" />
//         <div className="h-4 bg-gray-100 rounded-full w-3/4" />
//         <div className="h-3 bg-gray-100 rounded-full w-full" />
//         <div className="h-3 bg-gray-100 rounded-full w-2/3" />
//       </div>
//     </div>
//   )
// }

// // ─── Blog List Card ───────────────────────────────────────────────────────────
// function BlogCard({ blog, onSelect }) {
//   const [hovered, setHovered] = useState(false)
//   const title     = blog.title ?? ""
//   const content   = blog.content ?? ""
//   const thumbnail = blog.thumbnail_url ?? ""
//   const createdAt = blog.created_at ?? ""
//   const tags      = blog.tags ?? []

//   return (
//     <div
//       onClick={() => onSelect?.(blog)}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       className={`bg-white rounded-2xl border overflow-hidden cursor-pointer flex flex-col transition-all duration-300
//         ${hovered ? "-translate-y-1.5 shadow-2xl shadow-indigo-100 border-indigo-100" : "shadow-sm border-gray-100"}`}
//     >
//       <div className="relative w-full h-48 overflow-hidden bg-gray-100 flex-shrink-0">
//         {thumbnail ? (
//           <img
//             src={thumbnail}
//             alt={title}
//             className={`w-full h-full object-cover transition-transform duration-500 ${hovered ? "scale-110" : "scale-100"}`}
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-indigo-50 to-purple-50">📝</div>
//         )}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />
//         {tags.length > 0 && (
//           <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
//             {tags.map((tag, i) => (
//               <span key={tag.id} className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md ${getTagColor(i)}`}>
//                 {tag.name}
//               </span>
//             ))}
//           </div>
//         )}
//       </div>
//       <div className="flex flex-col flex-1 p-5">
//         {createdAt && (
//           <p className="text-[11px] font-semibold text-gray-400 mb-2 uppercase tracking-widest">{formatDate(createdAt)}</p>
//         )}
//         <h3 className="text-sm font-black text-gray-900 mb-2 leading-snug line-clamp-2">{title}</h3>
//         <p className="text-xs text-gray-400 leading-relaxed flex-1 line-clamp-3">{content}</p>
//         <div className="mt-4">
//           <span className={`text-xs font-bold text-indigo-700 transition-all ${hovered ? "translate-x-1" : ""}`}>
//             Read more →
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }

// // ─── Sidebar Blog Card (matches screenshot) ───────────────────────────────────
// function BlogSideCard({ thumbnail, title, content, author, onBack }) {
//   return (
//     <div
//       className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
//       onClick={onBack}
//     >
//       {thumbnail ? (
//         <img src={thumbnail} alt={title} className="w-full h-36 object-cover" />
//       ) : (
//         <div className="w-full h-36 bg-gradient-to-br from-indigo-800 to-indigo-600 flex items-center justify-center">
//           <span className="text-white font-black text-lg tracking-wide">📝</span>
//         </div>
//       )}
//       <div className="p-4">
//         <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1.5 line-clamp-2">{title}</h3>
//         <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3">
//           {content?.replace(/<[^>]+>/g, "").slice(0, 90)}
//         </p>
//         <div className="flex items-center gap-2">
//           <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 border border-indigo-200">
//             <span className="text-indigo-700 font-black text-xs">{(author ?? "A")[0].toUpperCase()}</span>
//           </div>
//           <div>
//             <p className="text-[10px] text-gray-400 leading-none mb-0.5">Written by</p>
//             <p className="text-xs font-bold text-gray-700 leading-none">{author ?? "Author"}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // ─── Skeleton Detail ──────────────────────────────────────────────────────────
// function SkeletonDetail({ onBack }) {
//   return (
//     <div className="min-h-screen bg-white">
//       <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 py-3.5 px-6 md:px-20">
//         <button onClick={onBack} className="inline-flex items-center gap-2 bg-indigo-900 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg">
//           ← Back
//         </button>
//       </nav>
//       <div className="max-w-6xl mx-auto px-6 md:px-16 py-10 space-y-5">
//         <div className="h-72 bg-gray-100 rounded-2xl animate-pulse" />
//         <div className="h-6 bg-gray-100 rounded-full w-2/3 animate-pulse" />
//         <div className="h-4 bg-gray-100 rounded-full w-full animate-pulse" />
//         <div className="h-4 bg-gray-100 rounded-full w-5/6 animate-pulse" />
//       </div>
//     </div>
//   )
// }

// // ─── Blog Detail ──────────────────────────────────────────────────────────────
// function BlogDetail({ blog, onBack }) {
//   const { data: detail, isLoading, isError } = useGetBlogByIdQuery(blog?.id, {
//     skip: !blog?.id,
//   })

//   // Merge API data over card data so title/thumbnail show instantly
//   const d         = detail ?? blog ?? {}
//   const title     = d.title ?? ""
//   const content   = d.content ?? ""
//   const thumbnail = d.thumbnail_url ?? ""
//   const tags      = d.tags ?? []
//   const createdAt = d.created_at ?? ""
//   const updatedAt = d.updated_at ?? ""
//   const author    = d.author ?? "Author"

//   if (isLoading) return <SkeletonDetail onBack={onBack} />

//   if (isError) return (
//     <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 text-gray-400">
//       <p className="text-5xl">⚠️</p>
//       <p className="text-base font-semibold">Failed to load article.</p>
//       <button onClick={onBack} className="mt-2 bg-indigo-900 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg hover:-translate-y-0.5 transition-all">
//         ← Go Back
//       </button>
//     </div>
//   )

//   return (
//     <div className="min-h-screen bg-white overflow-x-hidden">

//       {/* ── NAV ── */}
//       <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 py-3.5">
//         <div className="max-w-6xl mx-auto px-6 md:px-16 flex items-center gap-4">
//           <button
//             onClick={onBack}
//             className="inline-flex items-center gap-2 bg-indigo-900 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg shadow-indigo-200 hover:-translate-y-0.5 transition-all"
//           >
//             ← Back
//           </button>
//           <span className="text-sm text-gray-400 truncate">
//             Blog / <span className="text-indigo-900 font-bold">{title}</span>
//           </span>
//         </div>
//       </nav>

//       {/* ── HERO ── */}
//       <div className="max-w-6xl mx-auto px-6 md:px-16 pt-8">
//         <div className="relative w-full rounded-2xl overflow-hidden shadow-xl">
//           {thumbnail ? (
//             <img src={thumbnail} alt={title} className="w-full h-72 md:h-[420px] object-cover" />
//           ) : (
//             <div className="w-full h-72 md:h-[420px] bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center text-7xl">📝</div>
//           )}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//           {tags.length > 0 && (
//             <div className="absolute top-4 left-4 flex flex-wrap gap-2">
//               {tags.map((tag, i) => (
//                 <span key={tag.id} className={`text-[10.5px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md ${getTagColor(i)}`}>
//                   {tag.name}
//                 </span>
//               ))}
//             </div>
//           )}
//           <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
//             <h2 className="text-white text-2xl md:text-4xl font-extrabold drop-shadow-lg leading-tight">{title}</h2>
//             <span className="bg-black/50 text-white text-xs px-4 py-1 rounded-full font-medium self-start md:self-auto flex-shrink-0">
//               {formatDate(createdAt)}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* ── BODY ── */}
//       <div className="max-w-6xl mx-auto px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-14 items-start">

//         {/* Article */}
//         <article>
//           <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">{title}</h1>

//           <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 whitespace-pre-wrap">{content}</p>

//           {/* Tags */}
//           <div className="flex flex-wrap gap-3 mb-8">
//             {tags.map((tag, i) => (
//               <span key={tag.id} className={`text-sm font-bold px-6 py-2 rounded-full ${getTagColor(i)}`}>
//                 {tag.name}
//               </span>
//             ))}
//           </div>

//           {/* Author */}
//           <div className="flex items-center gap-4 bg-gradient-to-br from-gray-50 to-gray-100 px-5 py-4 rounded-2xl w-fit mb-8">
//             <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
//               <span className="text-indigo-700 font-black text-lg">{author[0]?.toUpperCase()}</span>
//             </div>
//             <div>
//               <p className="text-xs text-gray-400 font-medium mb-0.5">Written by</p>
//               <h3 className="text-base font-extrabold text-gray-900">{author}</h3>
//             </div>
//           </div>

//           <hr className="border-gray-100 mb-8" />

//           {/* Dates */}
//           <div className="flex flex-wrap gap-5 text-xs text-gray-400 font-medium mb-10">
//             {createdAt && (
//               <span className="flex items-center gap-1.5">📅 Published <strong className="text-gray-600">{formatDate(createdAt)}</strong></span>
//             )}
//             {updatedAt && updatedAt !== createdAt && (
//               <span className="flex items-center gap-1.5">✏️ Updated <strong className="text-gray-600">{formatDate(updatedAt)}</strong></span>
//             )}
//           </div>

//           {/* Learnings */}
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">What You'll Walk Away With</h2>
//             <p className="text-sm text-gray-400 mb-2">Skills and insights from this article</p>
//             {LEARNINGS.map((row, i) => (
//               <div key={i} className="grid md:grid-cols-2 gap-8 border-t border-gray-100 py-5">
//                 {[row.left, row.right].map((item, j) => (
//                   <div key={j} className="flex items-start gap-3">
//                     <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
//                       <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//                         <path d="M2 6l3 3 5-5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                       </svg>
//                     </div>
//                     <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </article>

//         {/* Sidebar */}
//         <aside className="space-y-6 md:sticky md:top-[80px]">

//           {/* ✅ Card matching screenshot */}
//           <BlogSideCard
//             thumbnail={thumbnail}
//             title={title}
//             content={content}
//             author={author}
//             onBack={onBack}
//           />

//           {/* CTA */}
//           <div className="bg-gradient-to-br from-indigo-700 to-indigo-500 text-white rounded-3xl p-8 text-center shadow-xl shadow-indigo-200">
//             <div className="text-4xl mb-4">🚀</div>
//             <h3 className="font-extrabold text-lg mb-2">Start Learning Today</h3>
//             <p className="text-sm opacity-80 leading-relaxed mb-6">Join 120K+ learners building real-world skills.</p>
//             <button className="bg-white text-indigo-700 font-bold px-6 py-3 rounded-full w-full hover:-translate-y-1 transition-all shadow-lg">
//               Enroll Now — Free
//             </button>
//           </div>

//           {/* Topics */}
//           {tags.length > 0 && (
//             <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
//               <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Topics</p>
//               <div className="flex flex-wrap gap-2">
//                 {tags.map((tag, i) => (
//                   <span key={tag.id} className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${getTagColor(i)}`}>
//                     {tag.name}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Article info */}
//           {createdAt && (
//             <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-2.5">
//               <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Article Info</p>
//               <div className="flex items-center gap-2 text-sm text-gray-600">
//                 <span>📅</span>
//                 <span>Published <strong>{formatDate(createdAt)}</strong></span>
//               </div>
//               {updatedAt && updatedAt !== createdAt && (
//                 <div className="flex items-center gap-2 text-sm text-gray-600">
//                   <span>✏️</span>
//                   <span>Updated <strong>{formatDate(updatedAt)}</strong></span>
//                 </div>
//               )}
//             </div>
//           )}
//         </aside>
//       </div>
//     </div>
//   )
// }

// // ─── Main BlogsPage ───────────────────────────────────────────────────────────
// export default function BlogsPage() {
//   const [selectedBlog, setSelectedBlog] = useState(null)
//   const [page, setPage]     = useState(1)
//   const [search, setSearch] = useState("")

//   const { data, isLoading, isError } = useGetBlogsQuery({ page, limit: LIMIT })

//   const blogs      = data?.blogs ?? []
//   const total      = data?.total ?? 0
//   const totalPages = Math.max(1, Math.ceil(total / LIMIT))

//   if (selectedBlog) return <BlogDetail blog={selectedBlog} onBack={() => setSelectedBlog(null)} />

//   const filtered = blogs.filter(b =>
//     (b.title ?? "").toLowerCase().includes(search.toLowerCase()) ||
//     (b.content ?? "").toLowerCase().includes(search.toLowerCase()) ||
//     (b.tags ?? []).some(t => t.name.toLowerCase().includes(search.toLowerCase()))
//   )

//   function goTo(p) { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }) }

//   return (
//     <div className="min-h-screen bg-slate-50">

//       {/* ── HERO ── */}
//       <div className="relative bg-gradient-to-br from-[#2D2A8E] to-[#1a177a] pt-14 pb-12 overflow-hidden">
//         <div className="absolute w-80 h-80 rounded-full bg-[#3F3CAE] opacity-35 -top-24 right-[15%] blur-[80px] pointer-events-none" />
//         <div className="absolute w-48 h-48 rounded-full bg-[#FF2D87] opacity-10 -bottom-14 right-[5%] blur-[60px] pointer-events-none" />
//         <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
//           <div className="mb-4">
//             <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-[10.5px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
//               <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
//               KHdemy · Blog
//             </span>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
//             Latest <span className="text-amber-400">Articles</span>
//           </h1>
//           <p className="text-white/65 text-sm leading-relaxed max-w-md mb-8">
//             Insights, tutorials, and updates from the KHdemy community.
//           </p>
//           <div className="max-w-md">
//             <p className="text-white/60 text-xs font-bold mb-2">Search</p>
//             <div className="relative">
//               <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//                 <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
//               </svg>
//               <input
//                 className="w-full bg-white/95 text-gray-900 placeholder-gray-400 text-sm rounded-xl pl-10 pr-4 py-3 outline-none border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
//                 placeholder="Search articles..."
//                 value={search}
//                 onChange={e => { setSearch(e.target.value); setPage(1) }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── MAIN ── */}
//       <div className="max-w-6xl mx-auto px-6 md:px-12 pt-8">
//         <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
//           <h2 className="text-2xl md:text-3xl font-black text-indigo-900 tracking-tight">All Articles</h2>
//           <span className="text-xs font-semibold text-gray-400 bg-white border border-gray-100 px-4 py-1.5 rounded-full shadow-sm">
//             {isLoading ? "Loading…" : `${total} article${total !== 1 ? "s" : ""} total`}
//           </span>
//         </div>

//         {isLoading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//             {Array.from({ length: LIMIT }).map((_, i) => <SkeletonCard key={i} />)}
//           </div>
//         ) : isError ? (
//           <div className="text-center py-24 text-gray-400">
//             <p className="text-5xl mb-4">⚠️</p>
//             <p className="text-base font-semibold">Failed to load articles. Please try again.</p>
//           </div>
//         ) : filtered.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//             {filtered.map(blog => (
//               <BlogCard key={blog.id} blog={blog} onSelect={setSelectedBlog} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-24 text-gray-400">
//             <p className="text-5xl mb-4">🔍</p>
//             <p className="text-base font-semibold">No articles found{search ? ` for "${search}"` : ""}.</p>
//           </div>
//         )}

//         {/* Pagination */}
//         {!isLoading && totalPages > 1 && (
//           <div className="flex justify-center items-center gap-1.5 pb-16 flex-wrap">
//             <button
//               onClick={() => goTo(Math.max(1, page - 1))}
//               disabled={page === 1}
//               className="px-4 py-2 rounded-xl border border-indigo-200 text-indigo-700 font-bold text-sm bg-white hover:bg-indigo-50 disabled:opacity-40 transition-all"
//             >
//               ‹ Back
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
//               <button
//                 key={p}
//                 onClick={() => goTo(p)}
//                 className={`min-w-[42px] px-4 py-2 rounded-xl border text-sm font-medium transition-all
//                   ${page === p
//                     ? "bg-indigo-900 text-white border-indigo-900 font-bold shadow-lg shadow-indigo-200"
//                     : "bg-white text-gray-700 border-gray-200 hover:border-indigo-400 hover:text-indigo-700 hover:bg-indigo-50 hover:-translate-y-0.5"
//                   }`}
//               >
//                 {p}
//               </button>
//             ))}
//             <button
//               onClick={() => goTo(Math.min(totalPages, page + 1))}
//               disabled={page === totalPages}
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
