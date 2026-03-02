import { useState, useRef, useEffect } from "react"
import CourseDetail from "./CourseDetail"

const CATEGORIES = ["All Category", "Programming", "Development", "Design", "Data Science", "Mobile"]

const COURSES = [
  // Programming (10)
  { id:1,  title:"Variables & Data",         desc:"Learn how programs store information.",           price:29, rating:4.6, category:"Programming",  tag:"Programming",  img:"https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&q=80" },
  { id:2,  title:"Control Flow Basics",      desc:"Use if-else and loops in programs.",              price:29, rating:4.6, category:"Programming",  tag:"Programming",  img:"https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80" },
  { id:3,  title:"Functions for Basic",      desc:"Create reusable blocks of code.",                 price:29, rating:4.6, category:"Programming",  tag:"Programming",  img:"https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&q=80" },
  { id:4,  title:"Programming Mindset",      desc:"Think like a developer step by step.",            price:29, rating:4.6, category:"Programming",  tag:"Programming",  img:"https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&q=80" },
  { id:5,  title:"Hello World Coding",       desc:"Start writing your first program.",               price:29, rating:4.6, category:"Programming",  tag:"Programming",  img:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80" },
  { id:6,  title:"Loops Made Easy",          desc:"Repeat tasks using simple loops.",                price:29, rating:4.6, category:"Programming",  tag:"Programming",  img:"https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&q=80" },
  { id:7,  title:"Lists & Arrays Intro",     desc:"Store multiple values in programs.",              price:29, rating:4.6, category:"Programming",  tag:"Programming",  img:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80" },
  { id:8,  title:"Coding From Scratch",      desc:"Start programming with zero experience.",         price:29, rating:4.6, category:"Programming",  tag:"Programming",  img:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80" },
  { id:9,  title:"JavaScript Essentials",    desc:"Learn JavaScript to build websites.",             price:59, rating:4.7, category:"Programming",  tag:"Programming",  img:"https://images.unsplash.com/photo-1537884944318-390069bb8665?w=400&q=80" },
  { id:10, title:"Python for Beginners",     desc:"Start coding with Python for automation.",        price:69, rating:4.7, category:"Programming",  tag:"Programming",  img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" },
  // Development (10)
  { id:11, title:"React Fundamentals",       desc:"Build modern web apps with React.",               price:59, rating:4.6, category:"Development",  tag:"Development",  img:"https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&q=80" },
  { id:12, title:"Development Bootcamp",     desc:"Build complete web apps from frontend to back.",  price:69, rating:4.9, category:"Development",  tag:"Development",  img:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80" },
  { id:13, title:"Web Design",               desc:"Make websites work on all screen sizes.",         price:59, rating:4.7, category:"Development",  tag:"Development",  img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { id:14, title:"Tailwind CSS Mastery",     desc:"Design modern UI fast using utility classes.",    price:48, rating:4.8, category:"Development",  tag:"Development",  img:"https://images.unsplash.com/photo-1537884944318-390069bb8665?w=400&q=80" },
  { id:15, title:"API & Deployment",         desc:"Connect apps to APIs and deploy online.",         price:69, rating:4.9, category:"Development",  tag:"Development",  img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" },
  { id:16, title:"Node.js Backend",          desc:"Build fast server-side apps using Node.js.",     price:69, rating:4.6, category:"Development",  tag:"Development",  img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" },
  { id:17, title:"Database Design",          desc:"Understand table and data modeling.",             price:59, rating:4.8, category:"Development",  tag:"Development",  img:"https://images.unsplash.com/photo-1489875347316-0d6a5d7f3b0a?w=400&q=80" },
  { id:18, title:"Git & GitHub Workflow",    desc:"Manage code, branches, and team collaboration.", price:49, rating:4.5, category:"Development",  tag:"Development",  img:"https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&q=80" },
  { id:19, title:"Docker for Developers",    desc:"Containerize apps for easy deployment.",         price:79, rating:4.6, category:"Development",  tag:"Development",  img:"https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&q=80" },
  { id:20, title:"TypeScript Deep Dive",     desc:"Write safer, scalable JavaScript with types.",   price:69, rating:4.8, category:"Development",  tag:"Development",  img:"https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&q=80" },
  // Design (8)
  { id:21, title:"UX Wireframing",           desc:"Design user flows and simple product.",           price:49, rating:4.6, category:"Design",       tag:"Design",       img:"https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&q=80" },
  { id:22, title:"Figma Essentials",         desc:"Design real UI using components, auto-layout.",  price:49, rating:4.6, category:"Design",       tag:"Design",       img:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80" },
  { id:23, title:"UI Design Basics",         desc:"Learn layout, typography, and visual hierarchy.", price:0,  rating:3.6, category:"Design",       tag:"Design",       img:"https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&q=80" },
  { id:24, title:"Color & Branding",         desc:"Create strong visual using color systems.",       price:49, rating:4.6, category:"Design",       tag:"Design",       img:"https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&q=80" },
  { id:25, title:"Graphic Design Pro",       desc:"Master composition, grids and visual balance.",  price:59, rating:4.7, category:"Design",       tag:"Design",       img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { id:26, title:"Motion Design",            desc:"Animate interfaces with purpose and flair.",      price:69, rating:4.8, category:"Design",       tag:"Design",       img:"https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&q=80" },
  { id:27, title:"Design Systems",           desc:"Build scalable component libraries in Figma.",   price:79, rating:4.9, category:"Design",       tag:"Design",       img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { id:28, title:"Typography Mastery",       desc:"Choose and pair fonts like a pro designer.",      price:39, rating:4.5, category:"Design",       tag:"Design",       img:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80" },
  // Data Science (6)
  { id:29, title:"Data Science Basics",      desc:"Explore and model real datasets with Python.",   price:59, rating:4.7, category:"Data Science", tag:"Data Science", img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
  { id:30, title:"Machine Learning Intro",   desc:"Build and train your first ML models.",          price:79, rating:4.8, category:"Data Science", tag:"Data Science", img:"https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&q=80" },
  { id:31, title:"Data Visualization",       desc:"Turn raw numbers into beautiful charts.",        price:49, rating:4.6, category:"Data Science", tag:"Data Science", img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
  { id:32, title:"SQL for Analysts",         desc:"Query databases and uncover insights.",          price:39, rating:4.5, category:"Data Science", tag:"Data Science", img:"https://images.unsplash.com/photo-1489875347316-0d6a5d7f3b0a?w=400&q=80" },
  { id:33, title:"Deep Learning Basics",     desc:"Understand neural networks from scratch.",       price:89, rating:4.9, category:"Data Science", tag:"Data Science", img:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80" },
  { id:34, title:"AI with Python",           desc:"Build smart apps using AI frameworks.",          price:79, rating:4.8, category:"Data Science", tag:"Data Science", img:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80" },
  // Mobile (6)
  { id:35, title:"Flutter Mobile",           desc:"Build cross-platform apps with one codebase.",  price:79, rating:4.8, category:"Mobile",       tag:"Mobile",       img:"https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=80" },
  { id:36, title:"React Native Apps",        desc:"Build iOS & Android with JavaScript.",          price:79, rating:4.9, category:"Mobile",       tag:"Mobile",       img:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80" },
  { id:37, title:"Swift for iOS",            desc:"Build native Apple apps from zero.",            price:89, rating:4.8, category:"Mobile",       tag:"Mobile",       img:"https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&q=80" },
  { id:38, title:"Kotlin for Android",       desc:"Official language for Android development.",   price:79, rating:4.7, category:"Mobile",       tag:"Mobile",       img:"https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400&q=80" },
  { id:39, title:"Mobile UI Patterns",       desc:"Design intuitive mobile interfaces.",           price:49, rating:4.6, category:"Mobile",       tag:"Mobile",       img:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80" },
  { id:40, title:"App Store Launch",         desc:"Publish your app to iOS and Android stores.",  price:59, rating:4.7, category:"Mobile",       tag:"Mobile",       img:"https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=80" },
]

const TAG_COLORS = {
  "Programming":  { bg:"#1e1b6e", text:"#fff" },
  "Development":  { bg:"#0ea5e9", text:"#fff" },
  "Design":       { bg:"#e91e8c", text:"#fff" },
  "Data Science": { bg:"#f5a623", text:"#fff" },
  "Mobile":       { bg:"#22c55e", text:"#fff" },
}

function StarRating({ rating }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:3 }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="#f5a623">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
      <span style={{ fontSize:12, fontWeight:700, color:"#f5a623" }}>{rating.toFixed(1)}</span>
    </span>
  )
}

function BookmarkIcon() {
  const [saved, setSaved] = useState(false)
  return (
    <button
      onClick={e => { e.stopPropagation(); setSaved(s => !s) }}
      style={{ background:"none", border:"none", cursor:"pointer", padding:2, display:"flex", alignItems:"center", color: saved ? "#1e1b6e" : "#ccc", transition:"color .2s, transform .2s" }}
      onMouseEnter={e => e.currentTarget.style.transform="scale(1.25)"}
      onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
      </svg>
    </button>
  )
}

function CourseCard({ course, index, onSelect }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const tc = TAG_COLORS[course.tag] || { bg:"#1e1b6e", text:"#fff" }

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), (index % 4) * 70); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      onClick={() => onSelect && onSelect(course)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:"#fff",
        borderRadius:16,
        border:`1px solid ${hovered ? "rgba(30,27,110,.18)" : "#efefef"}`,
        boxShadow: hovered ? "0 16px 40px rgba(30,27,110,.13)" : "0 2px 10px rgba(0,0,0,.05)",
        overflow:"hidden",
        cursor:"pointer",
        display:"flex",
        flexDirection:"column",
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? "translateY(-5px) scale(1.018)" : "translateY(0) scale(1)") : "translateY(28px) scale(0.96)",
        transition:"opacity .5s ease, transform .35s ease, box-shadow .25s, border-color .25s",
      }}
    >
      {/* Image */}
      <div style={{ position:"relative", width:"100%", height:168, overflow:"hidden", background:"#e8eaf0", flexShrink:0 }}>
        <img
          src={course.img}
          alt={course.title}
          style={{
            width:"100%", height:"100%", objectFit:"cover", display:"block",
            transition:"transform .5s ease",
            transform: hovered ? "scale(1.07)" : "scale(1)"
          }}
        />
        {/* gradient overlay */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(0,0,0,.08) 0%, transparent 50%)" }} />
        {/* Tag */}
        <span style={{
          position:"absolute", top:12, left:12,
          background: tc.bg, color: tc.text,
          fontSize:10.5, fontWeight:800,
          padding:"4px 12px", borderRadius:100,
          letterSpacing:".06em", textTransform:"uppercase",
          boxShadow:"0 3px 10px rgba(0,0,0,.22)"
        }}>{course.tag}</span>
      </div>

      {/* Body */}
      <div style={{ padding:"14px 14px 16px", display:"flex", flexDirection:"column", flex:1 }}>
        <p style={{ fontSize:14, fontWeight:800, color:"#111", marginBottom:5, lineHeight:1.35 }}>{course.title}</p>
        <p style={{ fontSize:12, color:"#9b9baa", lineHeight:1.65, marginBottom:14, flex:1 }}>{course.desc}</p>
        {/* Footer */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontSize:15, fontWeight:900, color:"#1e1b6e" }}>
            {course.price === 0 ? <span style={{ color:"#22c55e", fontWeight:800 }}>Free</span> : `$${course.price}`}
          </span>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <StarRating rating={course.rating} />
            <BookmarkIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

// Smart pagination: always max 5 visible page numbers
function getPageNumbers(active, total) {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
  let start = Math.max(1, active - 2)
  let end   = start + 4
  if (end > total) { end = total; start = Math.max(1, end - 4) }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

function getPerPage() {
  if (typeof window === "undefined") return 8
  const w = window.innerWidth
  if (w >= 1025) return 8
  if (w >= 601)  return 9
  return 8
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'Plus Jakarta Sans',sans-serif; background:#f8f8fc; }

  .cp-page { min-height:100vh; background:#f8f8fc; font-family:'Plus Jakarta Sans',sans-serif; }
  .cp-wrap { max-width:1240px; margin:0 auto; padding:0 48px; }

  /* Search */
  .cp-search-input {
    width:100%; padding:12px 16px 12px 44px;
    border:1.5px solid #e8e8ef; border-radius:12px;
    font-size:14px; font-family:'Plus Jakarta Sans',sans-serif;
    background:#fff; color:#111; outline:none;
    transition:border-color .2s, box-shadow .2s;
    box-shadow:0 1px 4px rgba(0,0,0,.05);
  }
  .cp-search-input:focus { border-color:#1e1b6e; box-shadow:0 0 0 3px rgba(30,27,110,.1); }
  .cp-search-input::placeholder { color:#c4c4cc; }

  /* Select */
  .cp-select {
    padding:12px 38px 12px 16px;
    border:1.5px solid #e8e8ef; border-radius:12px;
    font-size:14px; font-family:'Plus Jakarta Sans',sans-serif;
    background:#fff; color:#111; outline:none; cursor:pointer;
    appearance:none; -webkit-appearance:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239b9baa' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat:no-repeat; background-position:calc(100% - 14px) center;
    transition:border-color .2s, box-shadow .2s;
    min-width:170px; box-shadow:0 1px 4px rgba(0,0,0,.05);
  }
  .cp-select:focus { border-color:#1e1b6e; box-shadow:0 0 0 3px rgba(30,27,110,.1); }

  /* Category pills */
  .cp-cats { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:28px; }
  .cp-cat {
    padding:8px 20px; border-radius:100px; border:1.5px solid #e8e8ef;
    font-size:13px; font-weight:600; cursor:pointer;
    background:#fff; color:#666;
    transition:all .2s; font-family:'Plus Jakarta Sans',sans-serif;
    white-space:nowrap; box-shadow:0 1px 4px rgba(0,0,0,.04);
  }
  .cp-cat:hover { border-color:#1e1b6e; color:#1e1b6e; background:#eeedf8; }
  .cp-cat.active { background:#1e1b6e; color:#fff; border-color:#1e1b6e; box-shadow:0 4px 14px rgba(30,27,110,.28); }

  /* Grid */
  .cp-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-bottom:48px; }

  /* Pagination */
  .cp-pagination { display:flex; justify-content:center; align-items:center; gap:6px; padding-bottom:64px; flex-wrap:nowrap; }
  .cp-page-btn {
    padding:9px 16px; border-radius:10px; border:1.5px solid #e5e7eb;
    background:#fff; color:#111; font-weight:500; font-size:14px;
    cursor:pointer; min-width:42px; text-align:center;
    transition:all .2s; font-family:'Plus Jakarta Sans',sans-serif;
    white-space:nowrap; flex-shrink:0;
    box-shadow:0 1px 4px rgba(0,0,0,.05);
  }
  .cp-page-btn:hover:not(.active) { background:#eeedf8; border-color:#1e1b6e; color:#1e1b6e; transform:translateY(-2px); box-shadow:0 4px 12px rgba(30,27,110,.12); }
  .cp-page-btn.active { background:#1e1b6e; color:#fff; border-color:#1e1b6e; font-weight:700; box-shadow:0 4px 16px rgba(30,27,110,.32); }
  .cp-page-nav { color:#1e1b6e; font-weight:700; border-color:rgba(30,27,110,.2); font-size:13px; padding:9px 14px; }

  /* Empty */
  .cp-empty { text-align:center; padding:80px 20px; color:#9b9baa; }
  .cp-empty-icon { font-size:52px; margin-bottom:16px; }
  .cp-empty p { font-size:16px; font-weight:600; }

  /* ── RESPONSIVE ── */
  @media(max-width:1024px) {
    .cp-wrap { padding:0 28px; }
    .cp-grid { grid-template-columns:repeat(3,1fr); gap:16px; }
  }
  @media(max-width:768px) {
    .cp-wrap { padding:0 16px; }
    .cp-grid { grid-template-columns:repeat(2,1fr); gap:14px; }
    .cp-cats { gap:7px; }
    .cp-cat { padding:7px 14px; font-size:12px; }
    .cp-top-bar { grid-template-columns:1fr!important; gap:14px!important; }
    .cp-select { min-width:100%!important; width:100%; }
  }
  @media(max-width:480px) {
    .cp-wrap { padding:0 12px; }
    .cp-grid { grid-template-columns:repeat(2,1fr); gap:10px; }
    .cp-page-btn { padding:7px 10px; font-size:12px; min-width:34px; border-radius:8px; }
    .cp-page-nav { padding:7px 12px; font-size:12px; }
  }
`

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [search, setSearch]         = useState("")
  const [category, setCategory]     = useState("All Category")
  const [activePage, setActivePage] = useState(1)
  const [perPage, setPerPage]       = useState(getPerPage)

  useEffect(() => {
    function onResize() {
      setPerPage(prev => {
        const next = getPerPage()
        if (next !== prev) { setActivePage(1); return next }
        return prev
      })
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // Reset page on filter change
  useEffect(() => { setActivePage(1) }, [search, category])

  // Show detail page when a course is selected
  if (selectedCourse) {
    return <CourseDetail course={selectedCourse} onBack={() => setSelectedCourse(null)} />
  }

  // Filter
  const filtered = COURSES.filter(c => {
    const matchCat    = category === "All Category" || c.category === category
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                        c.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const safePage   = Math.min(activePage, totalPages)
  const pageSlice  = filtered.slice((safePage - 1) * perPage, safePage * perPage)
  const pageNums   = getPageNumbers(safePage, totalPages)

  function goTo(p) { setActivePage(p); window.scrollTo({ top:0, behavior:"smooth" }) }

  return (
    <>
      <style>{css}</style>
      <div className="cp-page">
        <div className="cp-wrap">

          {/* ── TOP BAR ── */}
          <div
            className="cp-top-bar"
            style={{ paddingTop:36, paddingBottom:24, display:"grid", gridTemplateColumns:"1fr auto", gap:24, alignItems:"end" }}
          >
            {/* Search */}
            <div>
              <p style={{ fontSize:13, fontWeight:700, color:"#444", marginBottom:8 }}>Search</p>
              <div style={{ position:"relative" }}>
                <svg style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"#c4c4cc", pointerEvents:"none" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  className="cp-search-input"
                  placeholder="Search courses..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
            {/* Category select */}
            <div>
              <p style={{ fontSize:13, fontWeight:700, color:"#444", marginBottom:8 }}>Category</p>
              <select className="cp-select" value={category} onChange={e => setCategory(e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* ── Category pills ── */}
          <div className="cp-cats">
            {CATEGORIES.map(c => (
              <button key={c} className={`cp-cat${category === c ? " active" : ""}`} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>

          {/* ── Section heading ── */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:10 }}>
            <h2 style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:900, color:"#1e1b6e", letterSpacing:"-.02em" }}>
              Popular Courses
            </h2>
            <span style={{ fontSize:12.5, color:"#9b9baa", fontWeight:600, background:"#fff", border:"1px solid #ebebf0", padding:"4px 14px", borderRadius:100 }}>
              {filtered.length} course{filtered.length !== 1 ? "s" : ""} found
            </span>
          </div>

          {/* ── Grid ── */}
          {pageSlice.length > 0 ? (
            <div className="cp-grid">
              {pageSlice.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} onSelect={setSelectedCourse} />
              ))}
            </div>
          ) : (
            <div className="cp-empty">
              <div className="cp-empty-icon">🔍</div>
              <p>No courses found{search ? ` for "${search}"` : ""}</p>
            </div>
          )}

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="cp-pagination">
              <button
                className="cp-page-btn cp-page-nav"
                onClick={() => goTo(Math.max(1, safePage - 1))}
                style={{ opacity: safePage === 1 ? 0.4 : 1 }}
              >‹ Back</button>
              {pageNums.map(p => (
                <button
                  key={p}
                  className={`cp-page-btn${safePage === p ? " active" : ""}`}
                  onClick={() => goTo(p)}
                >{p}</button>
              ))}
              <button
                className="cp-page-btn cp-page-nav"
                onClick={() => goTo(Math.min(totalPages, safePage + 1))}
                style={{ opacity: safePage === totalPages ? 0.4 : 1 }}
              >Next ›</button>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
