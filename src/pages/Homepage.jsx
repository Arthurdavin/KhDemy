// src/pages/Home.jsx
import { useState, useEffect } from "react"

// ══════════════════════════════════════════════════════
// THEME TOKENS
// ══════════════════════════════════════════════════════
const LIGHT = {
  pageBg:        "#ffffff",
  sectionAlt:    "#FAFBFF",
  cardBg:        "#ffffff",
  cardBorder:    "#F3F4F6",
  cardShadow:    "0 4px 20px rgba(0,0,0,0.08)",
  cardShadowHov: "0 20px 50px rgba(0,0,0,0.13)",
  heading:       "#111827",
  subheading:    "#1e1b4b",
  body:          "#6B7280",
  muted:         "#9CA3AF",
  badgeBg:       "#EDE9FE",
  badgeText:     "#7C3AED",
  bookBadgeBg:   "#F3E8FF",
  bookBadgeText: "#7C3AED",
  bookBorder:    "#F3F4F6",
  inputBg:       "#F9FAFB",
  pillBg:        "#1e1b4b",
  pillText:      "#ffffff",
  btnBg:         "#1e1b4b",
  btnText:       "#ffffff",
  testimonialL:  "#F8F9FB",
  testimonialR:  "#ffffff",
  testimonialDiv:"#F0F0F0",
  quoteColor:    "#E5E7EB",
  navDot:        "#D1D5DB",
  navDotActive:  "#1e1b4b",
  helpDesc:      "#6B7280",
  authorName:    "#1F2937",
  blogTitle:     "#111827",
}

const DARK = {
  pageBg:        "#0f1117",
  sectionAlt:    "#161a24",
  cardBg:        "#1e2235",
  cardBorder:    "#2a2f45",
  cardShadow:    "0 4px 24px rgba(0,0,0,0.4)",
  cardShadowHov: "0 20px 50px rgba(0,0,0,0.6)",
  heading:       "#f1f5f9",
  subheading:    "#a5b4fc",
  body:          "#94a3b8",
  muted:         "#64748b",
  badgeBg:       "#2e1f5e",
  badgeText:     "#a78bfa",
  bookBadgeBg:   "#2e1f5e",
  bookBadgeText: "#c4b5fd",
  bookBorder:    "#2a2f45",
  inputBg:       "#1e2235",
  pillBg:        "#4f46e5",
  pillText:      "#ffffff",
  btnBg:         "#4f46e5",
  btnText:       "#ffffff",
  testimonialL:  "#1a1f2e",
  testimonialR:  "#1e2235",
  testimonialDiv:"#2a2f45",
  quoteColor:    "#2a2f45",
  navDot:        "#2a2f45",
  navDotActive:  "#818cf8",
  helpDesc:      "#94a3b8",
  authorName:    "#e2e8f0",
  blogTitle:     "#f1f5f9",
}

// ─── BOOK CARD ────────────────────────────────────────────────────────────────
function BookCard({ image, category, title, description, author, t }) {
  const [bookmarked, setBookmarked] = useState(false)
  return (
    <div
      style={{
        display:"flex", flexDirection:"row", gap:12,
        borderRadius:16, padding:12,
        background: t.cardBg,
        border: `1px solid ${t.cardBorder}`,
        boxShadow: t.cardShadow,
        cursor:"pointer", width:"100%", maxWidth:600, height:220,
        transition:"box-shadow 0.25s ease",
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = t.cardShadowHov}
      onMouseLeave={e => e.currentTarget.style.boxShadow = t.cardShadow}
    >
      <div style={{ flexShrink:0, width:160, height:"100%", borderRadius:10, overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.15)" }}>
        <img src={image} alt={title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
      </div>
      <div style={{ display:"flex", flexDirection:"column", flex:1, gap:6, position:"relative", overflow:"hidden", padding:"4px 0" }}>
        <span style={{ display:"inline-block", width:"fit-content", background: t.bookBadgeBg, color: t.bookBadgeText, fontSize:11, fontWeight:700, borderRadius:999, padding:"3px 10px" }}>
          {category}
        </span>
        <h2 style={{ fontWeight:800, color: t.heading, fontSize:15, lineHeight:1.35, margin:0, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
          {title}
        </h2>
        {author && <p style={{ fontSize:11, color: t.muted, margin:0 }}>by {author}</p>}
        <p style={{ color: t.body, fontSize:12, lineHeight:1.6, margin:0, display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
          {description}
        </p>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setBookmarked(b => !b) }}
          style={{ position:"absolute", bottom:0, right:0, background:"none", border:"none", cursor:"pointer", padding:4 }}
        >
          <svg style={{ width:18, height:18, fill: bookmarked ? t.btnBg : "none", stroke: bookmarked ? t.btnBg : t.muted, transition:"all 0.2s" }} strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3h14a1 1 0 0 1 1 1v17l-8-4-8 4V4a1 1 0 0 1 1-1z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// ─── BLOG CARD ────────────────────────────────────────────────────────────────
function BlogCard({ title, cardTitle, desc, author, authorImg, img, t }) {
  const [bookmarked, setBookmarked] = useState(false)
  return (
    <div
      style={{
        display:"flex", flexDirection:"column",
        background: t.cardBg,
        borderRadius:20, overflow:"hidden",
        boxShadow: t.cardShadow,
        border: `1px solid ${t.cardBorder}`,
        cursor:"pointer",
        transition:"transform 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow=t.cardShadowHov }}
      onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=t.cardShadow }}
    >
      <div style={{ width:"100%", height:200, overflow:"hidden", flexShrink:0 }}>
        <img src={img} alt={cardTitle}
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.3s ease" }}
          onError={e => { e.target.parentNode.style.background = t.cardBorder }} />
      </div>
      <div style={{ padding:"18px 20px 20px", display:"flex", flexDirection:"column", gap:10, flex:1 }}>
        <span style={{ display:"inline-block", width:"fit-content", background: t.badgeBg, color: t.badgeText, fontSize:12, fontWeight:600, borderRadius:999, padding:"4px 14px" }}>
          {title}
        </span>
        <h3 style={{ fontWeight:800, color: t.blogTitle, fontSize:17, lineHeight:1.4, margin:0, textAlign:"center", display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
          {cardTitle}
        </h3>
        <p style={{ color: t.muted, fontSize:14, lineHeight:1.6, margin:0, textAlign:"center", flex:1, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
          {desc}
        </p>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:6 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:"50%", overflow:"hidden", flexShrink:0, background:"linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
              <img src={authorImg} alt={author}
                style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top", display:"block" }}
                onError={e => { e.target.style.display="none"; e.target.parentNode.innerHTML=`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:14px">${author[0]}</div>` }} />
            </div>
            <span style={{ fontSize:14, fontWeight:600, color: t.authorName }}>{author}</span>
          </div>
          <button onClick={e => { e.preventDefault(); e.stopPropagation(); setBookmarked(b => !b) }}
            style={{ background:"none", border:"none", cursor:"pointer", padding:4, lineHeight:1 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke={bookmarked ? t.btnBg : t.muted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              style={{ fill: bookmarked ? t.btnBg : "none", transition:"all 0.2s" }}>
              <path d="M5 3h14a1 1 0 0 1 1 1v17l-8-4-8 4V4a1 1 0 0 1 1-1z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="#F59E0B">
      <path d="M6.5 0l1.545 4.753H13L9.228 7.697l1.545 4.753L6.5 9.506l-4.273 2.944L3.772 7.697 0 4.753h4.955L6.5 0z" />
    </svg>
  )
}

function D({ w, h, bg, style }) {
  return <span style={{ position:"absolute", width:w, height:h, borderRadius:"50%", background:bg, ...style }} />
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const COURSES = [
  { id:1, title:"Variables & Data",        desc:"Learn how programs store information.",   price:29, rating:4.6, tag:"Programming", img:"https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&q=80" },
  { id:2, title:"Control Flow Basics",     desc:"Use if-else and loops in programs.",      price:29, rating:4.8, tag:"Programming", img:"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80" },
  { id:3, title:"Functions for Beginners", desc:"Create reusable blocks of code easily.",  price:29, rating:4.7, tag:"Programming", img:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80" },
  { id:4, title:"Programming Mindset",     desc:"Think like a developer step by step.",    price:29, rating:4.5, tag:"Mindset",     img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { id:5, title:"Hello World Coding",      desc:"Start writing your first program today.", price:29, rating:4.6, tag:"Beginner",    img:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80" },
  { id:6, title:"Loops Made Easy",         desc:"Repeat tasks using simple loops.",        price:29, rating:4.7, tag:"Programming", img:"https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&q=80" },
  { id:7, title:"Lists & Arrays Intro",    desc:"Store multiple values in programs.",      price:29, rating:4.6, tag:"Programming", img:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80" },
  { id:8, title:"Coding From Scratch",     desc:"Start programming with zero experience.", price:29, rating:4.9, tag:"Beginner",    img:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80" },
]

const BOOKS = [
  { id:1, title:"C/C++ Programming",          cat:"Programming",      author:"Brian W. Kernighan",      desc:"A comprehensive guide to C and C++ covering memory management, pointers, OOP and modern best practices for systems programming.",                                   img:"https://covers.openlibrary.org/b/id/8091016-L.jpg"  },
  { id:2, title:"Clean Code",                 cat:"Software Eng.",    author:"Robert C. Martin",        desc:"Robert C. Martin's classic on writing code that is readable, maintainable, and elegant — essential for every serious developer.",                                    img:"https://covers.openlibrary.org/b/id/8498997-L.jpg"  },
  { id:3, title:"You Don't Know JS",          cat:"JavaScript",       author:"Kyle Simpson",            desc:"A deep dive into the core mechanisms of the JavaScript language — scope, closures, this, prototypes, and async patterns explained clearly.",                         img:"https://covers.openlibrary.org/b/id/10721776-L.jpg" },
  { id:4, title:"The Pragmatic Programmer",   cat:"Career & Craft",   author:"Andrew Hunt & D. Thomas", desc:"Timeless advice for software developers on how to think about code, tools, and your career to become a truly effective programmer.",                                 img:"https://covers.openlibrary.org/b/id/9962525-L.jpg"  },
  { id:5, title:"Introduction to Algorithms", cat:"Computer Science", author:"Thomas H. Cormen",        desc:"The definitive reference on algorithms — covering sorting, searching, graph algorithms, dynamic programming, and complexity theory used worldwide in CS education.", img:"https://covers.openlibrary.org/b/id/8739161-L.jpg"  },
  { id:6, title:"Design Patterns",            cat:"Architecture",     author:"Gang of Four",            desc:"The iconic book on reusable object-oriented design patterns — covering creational, structural, and behavioral patterns every software architect must know.",          img:"https://covers.openlibrary.org/b/id/8109895-L.jpg"  },
]

const BLOGS = [
  { id:1, title:"UX/UI",        cardTitle:"Why Good Design Matters",                 desc:"Intuitive design Better experience",                   author:"Sarika",   authorImg:"/sarika.jpg",   img:"https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&q=80" },
  { id:2, title:"Programming",  cardTitle:"How to Think Like a Developer",           desc:"Problem solving mindset for beginners",                 author:"Davin",    authorImg:"/davin.jpg",    img:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80" },
  { id:3, title:"Data Science", cardTitle:"Python vs R: Which Should You Learn?",    desc:"Compare the two most popular data languages",           author:"Seavleng", authorImg:"/heroleng.png", img:"https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&q=80" },
  { id:4, title:"Web Dev",      cardTitle:"CSS Tips Every Frontend Dev Should Know", desc:"Write cleaner, faster, more maintainable styles",       author:"Lina",     authorImg:"/herona.jpg",   img:"https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&q=80" },
  { id:5, title:"Career",       cardTitle:"Getting Your First Tech Job in Cambodia", desc:"Practical steps to land your first developer role",     author:"Sengchay", authorImg:"/herochay.jpg", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { id:6, title:"AI & ML",      cardTitle:"Machine Learning Explained Simply",       desc:"No math degree needed — understand ML concepts today",  author:"Reaksa",   authorImg:"/Reaksa.png",   img:"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80" },
]

const HELP_ITEMS = [
  { emoji:"📚", colorHex:"#F59E0B", darkColor:"#FBBF24", title:"Learn at Your Own Pace",   desc:"Access videos, PDFs, articles and books anytime — 24/7." },
  { emoji:"🎯", colorHex:"#EC4899", darkColor:"#F472B6", title:"Track Your Progress",      desc:"Take quizzes after every lesson. See your completion rate and stay motivated." },
  { emoji:"🤝", colorHex:"#3B82F6", darkColor:"#60A5FA", title:"Connect with Instructors", desc:"Ask questions, leave comments, and get direct answers from your instructor." },
]

const TESTIMONIALS = [
  { name:"Lina",     review:"I learned web development and got my first developer job.",    avatar:"/herona.jpg"   },
  { name:"Sengchay", review:"As a graphic designer, I needed to learn new skills.",         avatar:"/herochay.jpg" },
  { name:"Seavleng", review:"The instructors explain everything clearly in Khmer.",         avatar:"/heroleng.png" },
  { name:"Davin",    review:"The courses are well structured and easy to follow along.",    avatar:"/davin.jpg"    },
  { name:"Sarika",   review:"I completed 3 courses and now I can build my own apps!",      avatar:"/sarika.jpg"   },
  { name:"Saren",    review:"I love the interactive lessons and the supportive community.", avatar:"/saren.png"    },
  { name:"Reaksa",   review:"Best learning platform in Cambodia. Highly recommended!",     avatar:"/Reaksa.png"   },
]

// ─── COURSE CARD ──────────────────────────────────────────────────────────────
function CourseCard({ course, t }) {
  const [bookmarked, setBookmarked] = useState(false)
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: t.cardBg,
        border: `1px solid ${t.cardBorder}`,
        borderRadius:18, overflow:"hidden", cursor:"pointer",
        transition:"transform 0.3s ease, box-shadow 0.3s ease",
        transform: hover ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hover ? t.cardShadowHov : t.cardShadow,
      }}
    >
      <div style={{ position:"relative", width:"100%", height:160, overflow:"hidden", background: t.cardBorder }}>
        <img src={course.img} alt={course.title}
          style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.4s ease", transform: hover ? "scale(1.06)" : "scale(1)" }}
          onError={e => { e.target.style.display="none" }} />
        <span style={{ position:"absolute", top:12, left:12, background: t.pillBg, color: t.pillText, fontWeight:700, borderRadius:999, fontSize:11, padding:"5px 13px" }}>
          {course.tag}
        </span>
      </div>
      <div style={{ padding:"16px 16px 18px" }}>
        <h3 style={{ fontWeight:700, color: t.heading, fontSize:14, margin:"0 0 6px" }}>{course.title}</h3>
        <p style={{ color: t.muted, fontSize:12, lineHeight:1.6, margin:"0 0 14px", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
          {course.desc}
        </p>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontWeight:900, color:"#22C55E", fontSize:15 }}>${course.price}</span>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <StarIcon />
            <span style={{ color: t.muted, fontWeight:700, fontSize:12 }}>{course.rating}</span>
            <button onClick={e => { e.stopPropagation(); setBookmarked(b => !b) }}
              style={{ background:"none", border:"none", cursor:"pointer", padding:0, lineHeight:1 }}>
              <svg width="16" height="20" viewBox="0 0 16 20" fill={bookmarked ? t.btnBg : "none"}>
                <path d="M1 1h14v18l-7-4-7 4V1z" stroke={bookmarked ? t.btnBg : t.muted} strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── TESTIMONIALS CAROUSEL ────────────────────────────────────────────────────
function TestimonialsCarousel({ t }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState("right")
  const [animKey, setAnimKey] = useState(0)
  const total = TESTIMONIALS.length

  const goTo = (index, dir) => { setDirection(dir); setAnimKey(k => k + 1); setCurrent(index) }
  const prev = () => goTo(current === 0 ? total - 1 : current - 1, "left")
  const next = () => goTo(current === total - 1 ? 0 : current + 1, "right")

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection("right"); setAnimKey(k => k + 1)
      setCurrent(c => (c === total - 1 ? 0 : c + 1))
    }, 3000)
    return () => clearInterval(timer)
  }, [total])

  const person = TESTIMONIALS[current]

  return (
    <section style={{ background: t.pageBg, padding:"80px 24px 100px", transition:"background 0.3s ease" }}>
      <style>{`
        @keyframes slideInFromRight { from { opacity:0; transform:translateX(80px)  } to { opacity:1; transform:translateX(0) } }
        @keyframes slideInFromLeft  { from { opacity:0; transform:translateX(-80px) } to { opacity:1; transform:translateX(0) } }
        .slide-right { animation: slideInFromRight 0.4s cubic-bezier(0.25,0.46,0.45,0.94) both }
        .slide-left  { animation: slideInFromLeft  0.4s cubic-bezier(0.25,0.46,0.45,0.94) both }
      `}</style>

      <h2 style={{ textAlign:"center", fontWeight:900, color: t.heading, marginBottom:72, fontSize:"clamp(2rem,4vw,2.8rem)", letterSpacing:"-0.02em" }}>
        What do students say about Khdemy?
      </h2>

      <div style={{ display:"flex", alignItems:"center", gap:32, maxWidth:860, margin:"0 auto" }}>
        <button onClick={prev} style={{ flexShrink:0, width:64, height:64, borderRadius:16, background: t.btnBg, border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", boxShadow:"0 6px 20px rgba(0,0,0,0.3)" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <div style={{ flex:1, overflow:"hidden" }}>
          <div key={animKey} className={direction === "right" ? "slide-right" : "slide-left"}
            style={{ display:"flex", flexDirection:"row", borderRadius:32, overflow:"hidden", boxShadow: t.cardShadow, border:`1px solid ${t.cardBorder}`, minHeight:300 }}>
            <div style={{
              flexShrink:0, width:280,
              background: t.testimonialL,
              display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
              padding:"44px 28px", gap:14,
              borderRight:`1px solid ${t.testimonialDiv}`,
            }}>
              <div style={{ width:170, height:170, borderRadius:"50%", overflow:"hidden", border:`4px solid ${t.cardBorder}`, boxShadow:"0 8px 28px rgba(0,0,0,0.18)" }}>
                <img src={person.avatar} alt={person.name}
                  style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }}
                  onError={e => { e.target.style.display="none"; e.target.parentNode.innerHTML=`<div style="width:100%;height:100%;background:#6366f1;display:flex;align-items:center;justify-content:center;font-size:40px">👤</div>` }} />
              </div>
              <div style={{ textAlign:"center" }}>
                <p style={{ fontWeight:800, color: t.heading, fontSize:18, margin:"0 0 4px" }}>{person.name}</p>
                <p style={{ fontWeight:500, color: t.muted, fontSize:13, margin:0 }}>KhDemy Student</p>
              </div>
              <div style={{ display:"flex", gap:4 }}>
                {[...Array(5)].map((_, s) => (
                  <svg key={s} width="18" height="18" viewBox="0 0 20 20" fill="#FFC107">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
            </div>
            <div style={{ flex:1, background: t.testimonialR, display:"flex", flexDirection:"column", justifyContent:"center", padding:"44px 52px", position:"relative" }}>
              <span style={{ position:"absolute", top:20, left:36, fontSize:80, lineHeight:1, color: t.quoteColor, fontFamily:"Georgia,serif", userSelect:"none" }}>"</span>
              <p style={{ color: t.body, lineHeight:2, fontSize:17, margin:0, fontStyle:"italic", position:"relative", zIndex:1 }}>
                {person.review}
              </p>
              <span style={{ position:"absolute", bottom:16, right:36, fontSize:80, lineHeight:1, color: t.quoteColor, fontFamily:"Georgia,serif", userSelect:"none" }}>"</span>
            </div>
          </div>
        </div>

        <button onClick={next} style={{ flexShrink:0, width:64, height:64, borderRadius:16, background: t.btnBg, border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", boxShadow:"0 6px 20px rgba(0,0,0,0.3)" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <div style={{ display:"flex", justifyContent:"center", gap:10, marginTop:40 }}>
        {TESTIMONIALS.map((_, i) => (
          <button key={i} onClick={() => goTo(i, i > current ? "right" : "left")}
            style={{ width: i===current ? 32 : 12, height:12, borderRadius:9999, background: i===current ? t.navDotActive : t.navDot, border:"none", padding:0, cursor:"pointer", transition:"all 0.35s ease" }} />
        ))}
      </div>
    </section>
  )
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
// Pass dark={true} for dark mode, dark={false} or nothing for light mode
// Example usage:
//   <Home />              → light mode
//   <Home dark={true} />  → dark mode
//   <Home dark={isDark} /> → controlled by parent
export default function Home({ dark = false }) {
  const t = dark ? DARK : LIGHT

  return (
    <main style={{ overflowX:"hidden", background: t.pageBg, transition:"background 0.3s ease", minHeight:"100vh" }}>

      {/* ══ SECTION 1 — HERO ══ */}
      <section style={{ position:"relative", background: t.pageBg, textAlign:"center", padding:"40px 16px 80px", overflow:"hidden", transition:"background 0.3s ease" }}>
        <D w={10} h={10} bg="#EC4899" style={{ top:"6%",    left:"3%",   opacity: dark ? 0.5 : 1 }} />
        <D w={7}  h={7}  bg="#F59E0B" style={{ top:"12%",   left:"6%",   opacity: dark ? 0.5 : 1 }} />
        <D w={12} h={12} bg="#3B82F6" style={{ top:"4%",    left:"10%",  opacity: dark ? 0.5 : 1 }} />
        <D w={6}  h={6}  bg="#7C3AED" style={{ top:"18%",   left:"2%",   opacity: dark ? 0.5 : 1 }} />
        <D w={9}  h={9}  bg="#10B981" style={{ top:"22%",   left:"8%",   opacity: dark ? 0.5 : 1 }} />
        <D w={11} h={11} bg="#F59E0B" style={{ top:"5%",    right:"4%",  opacity: dark ? 0.5 : 1 }} />
        <D w={7}  h={7}  bg="#EC4899" style={{ top:"10%",   right:"9%",  opacity: dark ? 0.5 : 1 }} />
        <D w={13} h={13} bg="#3B82F6" style={{ top:"3%",    right:"14%", opacity: dark ? 0.5 : 1 }} />
        <D w={6}  h={6}  bg="#10B981" style={{ top:"20%",   right:"3%",  opacity: dark ? 0.5 : 1 }} />
        <D w={8}  h={8}  bg="#7C3AED" style={{ top:"16%",   right:"11%", opacity: dark ? 0.5 : 1 }} />
        <D w={14} h={14} bg="#EC4899" style={{ top:"52%",   left:"1.5%", opacity: dark ? 0.5 : 1 }} />
        <D w={8}  h={8}  bg="#3B82F6" style={{ top:"44%",   left:"4%",   opacity: dark ? 0.5 : 1 }} />
        <D w={6}  h={6}  bg="#F59E0B" style={{ top:"60%",   left:"2.5%", opacity: dark ? 0.5 : 1 }} />
        <D w={10} h={10} bg="#7C3AED" style={{ top:"48%",   right:"2%",  opacity: dark ? 0.5 : 1 }} />
        <D w={7}  h={7}  bg="#EC4899" style={{ top:"58%",   right:"5%",  opacity: dark ? 0.5 : 1 }} />
        <D w={12} h={12} bg="#10B981" style={{ top:"40%",   right:"3%",  opacity: dark ? 0.5 : 1 }} />
        <D w={18} h={18} bg="#F59E0B" style={{ bottom:"8%", left:"14%",  opacity: dark ? 0.5 : 1 }} />
        <D w={8}  h={8}  bg="#3B82F6" style={{ bottom:"14%",left:"10%",  opacity: dark ? 0.5 : 1 }} />
        <D w={6}  h={6}  bg="#EC4899" style={{ bottom:"5%", left:"20%",  opacity: dark ? 0.5 : 1 }} />
        <D w={16} h={16} bg="#7C3AED" style={{ bottom:"8%", right:"16%", opacity: dark ? 0.5 : 1 }} />
        <D w={9}  h={9}  bg="#10B981" style={{ bottom:"14%",right:"12%", opacity: dark ? 0.5 : 1 }} />
        <D w={7}  h={7}  bg="#F59E0B" style={{ bottom:"5%", right:"22%", opacity: dark ? 0.5 : 1 }} />

        <p style={{ fontWeight:900, color:"#F472B6", fontSize:"clamp(2.2rem,5vw,3.2rem)", letterSpacing:"-0.02em", marginBottom:4 }}>KhDemy</p>
        <h1 style={{ fontWeight:900, fontSize:"clamp(2.2rem,5vw,3.2rem)", lineHeight:1.2, marginBottom:12 }}>
          <span style={{ color:"#F59E0B" }}>Online</span>
          <span style={{ color: dark ? "#818cf8" : "#3B82F6" }}> Anytime, Anywhere</span>
        </h1>
        <p style={{ color: t.muted, fontWeight:500, maxWidth:380, margin:"0 auto 24px", lineHeight:1.7, fontSize:14 }}>
          Discover hundreds of courses taught by expert instructors. Start learning today and unlock your potential with Khdemy.
        </p>
        <button
          style={{ background: t.btnBg, color:"#fff", borderRadius:999, fontWeight:800, padding:"14px 40px", fontSize:16, border:"none", cursor:"pointer", boxShadow:"0 8px 24px rgba(79,70,229,0.4)", transition:"all .2s" }}
          onMouseEnter={e => e.currentTarget.style.opacity="0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity="1"}
        >Enroll now</button>

        <div style={{ display:"flex", justifyContent:"center", alignItems:"flex-end", gap:16, paddingTop:32, flexWrap:"wrap" }}>
          {[
            { src:"/herodin.jpg",  w:"clamp(110px,16vw,195px)", h:"clamp(170px,24vw,290px)", r:"100px" },
            { src:"/heroleng.png", w:"clamp(110px,16vw,195px)", h:"clamp(155px,21vw,265px)", r:"90px",  mb:-24 },
            { src:"/herona.jpg",   w:"clamp(110px,16vw,195px)", h:"clamp(155px,21vw,265px)", r:"90px",  mb:-24 },
            { src:"/herochay.jpg", w:"clamp(110px,16vw,195px)", h:"clamp(170px,24vw,290px)", r:"100px" },
          ].map((img, i) => (
            <div key={i} style={{ width:img.w, height:img.h, borderRadius:img.r, overflow:"hidden", flexShrink:0, boxShadow: dark ? "0 12px 40px rgba(0,0,0,0.5)" : "0 12px 40px rgba(0,0,0,0.15)", marginBottom:img.mb||0 }}>
              <img src={img.src} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }}
                onError={e => { e.target.parentNode.style.background = t.cardBorder }} />
            </div>
          ))}
        </div>
      </section>

      {/* ══ SECTION 2 — WHY CHOOSE KHDEMY ══ */}
      <section style={{ background: t.sectionAlt, padding:"56px 24px", transition:"background 0.3s ease" }}>
        <h2 style={{ textAlign:"center", fontWeight:900, color: t.subheading, fontSize:"clamp(1.6rem,3vw,2rem)", marginBottom:48 }}>
          Why should you choose KhDemy?
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:40, maxWidth:780, margin:"0 auto" }}>
          {[
            { src:"/Teacher.jpg", label:"Experienced teacher",  color:"#F59E0B", desc:"Learn from qualified professionals across Cambodia and beyond." },
            { src:"/davin.jpg",   label:"Flexible Learning",    color:"#EC4899", desc:"Study at your own pace, anytime, anywhere." },
            { src:"/QR.jpg",      label:"Easy Bakong Payments", color:"#3B82F6", desc:"Pay securely with Cambodia's Bakong system." },
          ].map((item, i) => (
            <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
              <div style={{ width:185, height:148, borderRadius:18, overflow:"hidden", boxShadow: dark ? "0 6px 24px rgba(0,0,0,0.4)" : "0 6px 20px rgba(0,0,0,.1)", marginBottom:20 }}>
                <img src={item.src} alt={item.label} style={{ width:"100%", height:"100%", objectFit:"cover", filter: dark ? "brightness(0.85)" : "none" }}
                  onError={e => { e.target.parentNode.style.background = t.cardBorder }} />
              </div>
              <p style={{ fontWeight:900, color:item.color, fontSize:14, marginBottom:6 }}>{item.label}</p>
              <p style={{ color: t.body, fontSize:12, lineHeight:1.65, margin:0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SECTION 3 — POPULAR COURSES ══ */}
      <section style={{ background: t.pageBg, padding:"48px 24px", transition:"background 0.3s ease" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:12 }}>
            <h2 style={{ fontWeight:900, color: t.heading, fontSize:"clamp(1.8rem,3.5vw,2.4rem)", letterSpacing:"-0.02em", margin:0 }}>Popular Courses</h2>
            <button style={{ background: t.btnBg, color:"#fff", borderRadius:999, fontWeight:700, padding:"10px 28px", fontSize:14, border:"none", cursor:"pointer" }}>See more</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:20 }}>
            {COURSES.map(c => <CourseCard key={c.id} course={c} t={t} />)}
          </div>
        </div>
      </section>

      {/* ══ SECTION 4 — TOP TRENDING BOOKS ══ */}
      <section style={{ background: t.sectionAlt, padding:"40px 24px", transition:"background 0.3s ease" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:12 }}>
            <h2 style={{ fontWeight:900, color: t.heading, fontSize:"clamp(1.8rem,4vw,2.4rem)", letterSpacing:"-0.02em", margin:0 }}>Top Trending Books</h2>
            <button style={{ background: t.btnBg, color:"#fff", borderRadius:999, fontWeight:700, padding:"10px 28px", fontSize:14, border:"none", cursor:"pointer" }}>See more</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:20 }}>
            {BOOKS.map(b => <BookCard key={b.id} image={b.img} category={b.cat} title={b.title} author={b.author} description={b.desc} t={t} />)}
          </div>
        </div>
      </section>

      {/* ══ SECTION 5 — LATEST BLOG POSTS ══ */}
      <section style={{ background: t.pageBg, padding:"48px 24px", transition:"background 0.3s ease" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:12 }}>
            <h2 style={{ fontWeight:900, color: t.heading, fontSize:"clamp(1.8rem,3.5vw,2.4rem)", letterSpacing:"-0.02em", margin:0 }}>Latest Blog Posts</h2>
            <button style={{ background: t.btnBg, color:"#fff", borderRadius:999, fontWeight:700, padding:"10px 28px", fontSize:14, border:"none", cursor:"pointer" }}>See more</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:24 }}>
            {BLOGS.map(b => <BlogCard key={b.id} {...b} t={t} />)}
          </div>
        </div>
      </section>

      {/* ══ SECTION 6 — VIDEO SECTIONS ══ */}
      <section style={{ position:"relative", background: t.sectionAlt, padding:"64px 24px", overflow:"hidden", transition:"background 0.3s ease" }}>
        {[
          { w:10,h:10,bg:"#EC4899",s:{top:"2%",left:"5%"}},
          { w:7, h:7, bg:"#3B82F6",s:{top:"1%",left:"18%"}},
          { w:12,h:12,bg:"#F59E0B",s:{top:"3%",left:"32%"}},
          { w:8, h:8, bg:"#10B981",s:{top:"2%",right:"28%"}},
          { w:10,h:10,bg:"#7C3AED",s:{top:"1%",right:"12%"}},
          { w:6, h:6, bg:"#EC4899",s:{top:"3%",right:"5%"}},
          { w:9, h:9, bg:"#F59E0B",s:{top:"18%",left:"1%"}},
          { w:6, h:6, bg:"#3B82F6",s:{top:"30%",left:"2%"}},
          { w:11,h:11,bg:"#EC4899",s:{top:"50%",left:"0.5%"}},
          { w:8, h:8, bg:"#10B981",s:{top:"15%",right:"1%"}},
          { w:11,h:11,bg:"#F59E0B",s:{top:"28%",right:"2%"}},
          { w:10,h:10,bg:"#7C3AED",s:{bottom:"2%",left:"8%"}},
          { w:12,h:12,bg:"#EC4899",s:{bottom:"1%",left:"40%"}},
          { w:9, h:9, bg:"#3B82F6",s:{bottom:"3%",right:"8%"}},
        ].map((d,i) => <D key={i} w={d.w} h={d.h} bg={d.bg} style={{...d.s, opacity: dark ? 0.4 : 1}} />)}

        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          {/* Row 1 */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:48, alignItems:"center", marginBottom:80 }}>
            <div style={{ position:"relative", height:340 }}>
              <div style={{ position:"absolute", width:300, height:260, top:0, left:0, borderRadius:32, overflow:"hidden", boxShadow: dark ? "0 12px 40px rgba(0,0,0,0.5)" : "0 12px 32px rgba(0,0,0,.12)" }}>
                <img src="/lina.jpg" alt="Live class" style={{ width:"100%", height:"100%", objectFit:"cover", filter: dark ? "brightness(0.8)" : "none" }}
                  onError={e => { e.target.parentNode.style.background = t.cardBorder }} />
              </div>
              <div style={{ position:"absolute", width:210, height:210, bottom:-10, left:130, borderRadius:"50%", overflow:"hidden", zIndex:10, boxShadow: dark ? "0 12px 40px rgba(0,0,0,0.5)" : "0 12px 40px rgba(0,0,0,.15)" }}>
                <img src="/chay.jpg" alt="Student" style={{ width:"100%", height:"100%", objectFit:"cover", filter: dark ? "brightness(0.8)" : "none" }}
                  onError={e => { e.target.parentNode.style.background = t.cardBorder }} />
              </div>
            </div>
            <div>
              <h2 style={{ fontWeight:900, color: t.heading, fontSize:"clamp(2rem,4vw,2.8rem)", letterSpacing:"-0.03em", lineHeight:1.2, marginBottom:16 }}>
                Engaging Video Lessons
              </h2>
              <p style={{ color: t.muted, fontWeight:500, lineHeight:1.75, fontSize:15, marginBottom:32, maxWidth:420 }}>
                Connect with expert instructors through live sessions. Ask questions to support your learning journey.
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <button style={{ background: t.btnBg, color:"#fff", borderRadius:999, fontWeight:700, padding:"13px 36px", fontSize:15, border:"none", cursor:"pointer" }}>Enroll now</button>
                <span style={{ width:12, height:12, borderRadius:"50%", background:"#3B82F6", display:"inline-block" }} />
                <span style={{ width:8,  height:8,  borderRadius:"50%", background:"#F59E0B", display:"inline-block" }} />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:48, alignItems:"center" }}>
            <div>
              <h2 style={{ fontWeight:900, color: t.heading, fontSize:"clamp(2rem,4vw,2.8rem)", letterSpacing:"-0.03em", lineHeight:1.2, marginBottom:16 }}>
                Go Live and Learn
              </h2>
              <p style={{ color: t.muted, fontWeight:500, lineHeight:1.75, fontSize:15, marginBottom:32, maxWidth:420 }}>
                Access thousands of high-quality video lessons taught by top instructors.
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <button style={{ background: t.btnBg, color:"#fff", borderRadius:999, fontWeight:700, padding:"13px 36px", fontSize:15, border:"none", cursor:"pointer" }}>Enroll now</button>
                <span style={{ width:12, height:12, borderRadius:"50%", background:"#F59E0B", display:"inline-block" }} />
                <span style={{ width:8,  height:8,  borderRadius:"50%", background:"#EC4899", display:"inline-block" }} />
              </div>
            </div>
            <div style={{ position:"relative", height:460 }}>
              <div style={{ position:"absolute", width:310, height:260, bottom:20, left:20, borderRadius:48, overflow:"hidden", boxShadow: dark ? "0 12px 40px rgba(0,0,0,0.5)" : "0 12px 32px rgba(0,0,0,.12)" }}>
                <img src="/sarika.jpg" alt="Student" style={{ width:"100%", height:"100%", objectFit:"cover", filter: dark ? "brightness(0.8)" : "none" }}
                  onError={e => { e.target.parentNode.style.background = t.cardBorder }} />
              </div>
              <div style={{ position:"absolute", width:290, height:255, top:10, right:0, borderRadius:48, overflow:"hidden", zIndex:10, boxShadow: dark ? "0 12px 40px rgba(0,0,0,0.5)" : "0 12px 40px rgba(0,0,0,.15)" }}>
                <img src="/leng.JPG" alt="Teaching" style={{ width:"100%", height:"100%", objectFit:"cover", filter: dark ? "brightness(0.8)" : "none" }}
                  onError={e => { e.target.src="/davin2.jpg" }} />
              </div>
              <span style={{ position:"absolute", width:20, height:20, borderRadius:"50%", background:"#3B82F6", bottom:28, right:-8, zIndex:20 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 7 — HOW KHDEMY CAN HELP YOU ══ */}
      <section style={{ background: t.pageBg, padding:"56px 24px", transition:"background 0.3s ease" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:40, alignItems:"center", maxWidth:860, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"center" }}>
            <div style={{ width:"clamp(220px,55vw,300px)", height:"clamp(280px,48vw,380px)", borderRadius:"50% 50% 0 0 / 40% 40% 0 0", overflow:"hidden", boxShadow: dark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 8px 28px rgba(0,0,0,.1)" }}>
              <img src="/computer.jpg" alt="Student learning" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top", filter: dark ? "brightness(0.8)" : "none" }} />
            </div>
          </div>
          <div>
            <h2 style={{ fontWeight:900, color: t.heading, fontSize:"clamp(1.6rem,3vw,2rem)", lineHeight:1.2, marginBottom:32 }}>
              How KhDemy Can Help You
            </h2>
            {HELP_ITEMS.map((item, i) => (
              <div key={i} style={{ marginBottom:26 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                  <span style={{ fontSize:26, lineHeight:1 }}>{item.emoji}</span>
                  <p style={{ fontWeight:900, fontSize:16, color: dark ? item.darkColor : item.colorHex, margin:0 }}>{item.title}</p>
                </div>
                <p style={{ color: t.helpDesc, lineHeight:1.65, fontSize:14, margin:0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 8 — TESTIMONIALS ══ */}
      <TestimonialsCarousel t={t} />

    </main>
  )
}