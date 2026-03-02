import { useState, useEffect, useRef } from "react"

// ─── DATA ────────────────────────────────────────────────────────────────────
const STUDENT = {
  name: "Chhorn SeavLeng", email: "seav@khdemy.com", phone: "+855 12 345 678",
  dob: "15 / 05 / 2000", gender: "Male", address: "#32, St 123, Phnom Penh",
  bio: "Passionate about AI & UX Design. Learning React and Python. 🇰🇭",
  joined: "March 2024", initials: "CS",
}

const DEFAULT_TASKS = [
  { id:0, text:"Step 1: Watch the full video lesson",          done:true  },
  { id:1, text:"Step 2: Initialize a 'list' state variable",   done:false },
  { id:2, text:"Step 3: Map through the list items to render", done:false },
  { id:3, text:"Step 4: Implement an AddItem function",        done:false },
]

const QUIZ = [
  { q:"What is the time complexity of accessing an array element by index?",
    opts:["O(n)","O(log n)","O(1)","O(n²)"], ans:2 },
  { q:"Which data structure uses LIFO (Last In First Out) order?",
    opts:["Queue","Stack","Array","Linked List"], ans:1 },
  { q:"What is the main advantage of a linked list over an array?",
    opts:["Faster random access","Dynamic size — easy insert/delete","Less memory usage","Better cache performance"], ans:1 },
]

const STATIC_COMMENTS = [
  { id:1, name:"Prof. Sarah Mitchell", role:"Instructor", time:"2h ago", initials:"SM", color:"#6366f1",
    text:"Great question today! Remember: always handle the edge case of an empty list and a single-node list separately.", likes:124,
    replies:[{ id:11, name:"James Anderson", role:"Top Student", time:"1h ago", initials:"JA", color:"#0ea5e9",
      text:"That edge case tripped me up on the last assignment. Thanks for the tip!", likes:18 }]},
  { id:2, name:"Elena Rossi", role:"Student", time:"5h ago", initials:"ER", color:"#10b981",
    text:"Can someone explain when to use a doubly linked list instead of a singly linked list?", likes:9, replies:[]},
]

const ENROLLED_COURSES = [
  { id:1, title:"Data Structures & Algorithms", instructor:"Prof. Sarah Mitchell", category:"Computer Science",
    img:"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=340&fit=crop",
    progress:72, lessons:45, done:32, color:"#6366f1", level:"Intermediate", status:"current",
    description:"Master fundamentals of data structures and algorithms used in real software.",
    modules:[
      { id:1, title:"Foundations", lessons:[
        { id:"1.1", title:"Introduction to Big O", duration:"8:24", done:true },
        { id:"1.2", title:"Memory Management", duration:"12:10", done:true },
      ]},
      { id:2, title:"Linear Structures", lessons:[
        { id:"2.1", title:"Arrays & Linked Lists", duration:"28:30", done:false, active:true },
        { id:"2.2", title:"Stacks & Queues", duration:"18:45", done:false, locked:true },
      ]},
      { id:3, title:"Non-Linear", lessons:[
        { id:"3.1", title:"Binary Search Trees", duration:"22:00", done:false, locked:true },
        { id:"3.2", title:"Graph Traversals", duration:"25:15", done:false, locked:true },
      ]},
    ]},
  { id:2, title:"React & Modern Frontend", instructor:"Mr. James Anderson", category:"Web Development",
    img:"https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=340&fit=crop",
    progress:45, lessons:36, done:16, color:"#0ea5e9", level:"Beginner", status:"current",
    description:"Build modern web apps with React, hooks, and Redux Toolkit.",
    modules:[{ id:1, title:"React Basics", lessons:[
      { id:"1.1", title:"What is React?", duration:"10:00", done:true },
      { id:"1.2", title:"JSX & Components", duration:"14:20", done:true },
    ]}]},
  { id:3, title:"UI/UX Design Principles", instructor:"Ms. Elena Rossi", category:"Design",
    img:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=340&fit=crop",
    progress:90, lessons:28, done:25, color:"#10b981", level:"Beginner", status:"current",
    description:"Learn user-centered design and Figma prototyping from scratch.", modules:[]},
  { id:4, title:"Python for Data Science", instructor:"Dr. Kevin Park", category:"Data Science",
    img:"https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=340&fit=crop",
    progress:20, lessons:52, done:10, color:"#f59e0b", level:"Advanced", status:"current",
    description:"Analyze data and build ML models with Python and Pandas.", modules:[]},
]

const COMPLETED_COURSES = [
  { id:5, title:"HTML & CSS Fundamentals", instructor:"Ms. Laura Kim",
    img:"https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=340&fit=crop",
    grade:"A+", color:"#8b5cf6", status:"complete", progress:100, lessons:24, done:24 },
  { id:6, title:"Introduction to Git", instructor:"Mr. Chris Nguyen",
    img:"https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=340&fit=crop",
    grade:"A", color:"#ef4444", status:"complete", progress:100, lessons:18, done:18 },
]

const SAVED_COURSES = [
  { id:10, title:"Machine Learning A-Z", instructor:"Dr. Andrew Lee", category:"AI/ML",
    img:"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=340&fit=crop",
    rating:4.9, students:"12k", color:"#8b5cf6", price:"Free", status:"saved", progress:0 },
  { id:11, title:"Node.js & Express API", instructor:"Mr. Brad Traversy", category:"Backend",
    img:"https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=340&fit=crop",
    rating:4.7, students:"8.3k", color:"#10b981", price:"$29", status:"saved", progress:0 },
  { id:12, title:"Figma UI Design", instructor:"Ms. Sara Sanders", category:"Design",
    img:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=340&fit=crop",
    rating:4.8, students:"6.1k", color:"#f59e0b", price:"Free", status:"saved", progress:0 },
]

const EXPLORE_COURSES = [
  { id:20, title:"Machine Learning A-Z", instructor:"Dr. Andrew Lee", category:"AI/ML", img:"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=340&fit=crop", rating:4.9, students:"12k", color:"#8b5cf6", price:"Free" },
  { id:21, title:"Node.js & Express API", instructor:"Mr. Brad Traversy", category:"Backend", img:"https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=340&fit=crop", rating:4.7, students:"8.3k", color:"#10b981", price:"$29" },
  { id:22, title:"Cyber Security Basics", instructor:"Prof. Mark Wilson", category:"Security", img:"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=340&fit=crop", rating:4.6, students:"5.5k", color:"#ef4444", price:"$19" },
  { id:23, title:"Docker & Kubernetes", instructor:"Mr. Nico Williams", category:"DevOps", img:"https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=340&fit=crop", rating:4.7, students:"7.2k", color:"#0ea5e9", price:"$39" },
  { id:24, title:"TypeScript Deep Dive", instructor:"Ms. Angela Yu", category:"Programming", img:"https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=340&fit=crop", rating:4.9, students:"9.8k", color:"#6366f1", price:"Free" },
  { id:25, title:"Figma UI Design", instructor:"Ms. Sara Sanders", category:"Design", img:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=340&fit=crop", rating:4.8, students:"6.1k", color:"#f59e0b", price:"Free" },
]

const NOTIFICATIONS = [
  { id:1, icon:"📝", title:"New assignment posted", desc:"Data Structures — Quiz #4 is live", time:"2h ago", unread:true },
  { id:2, icon:"🎉", title:"Certificate ready", desc:"HTML & CSS — Download your cert", time:"1d ago", unread:true },
  { id:3, icon:"💬", title:"Reply on your comment", desc:"Prof. Sarah replied to your post", time:"2d ago", unread:false },
  { id:4, icon:"📢", title:"Course update", desc:"React course: 3 new lessons added", time:"3d ago", unread:false },
]

const ACHIEVEMENTS = [
  { icon:"🏆", label:"Top Learner", desc:"Scored 90%+ in 3 courses", earned:true },
  { icon:"🔥", label:"7-Day Streak", desc:"Learned 7 days in a row", earned:true },
  { icon:"⭐", label:"First Certificate", desc:"Completed your first course", earned:true },
  { icon:"🚀", label:"Speed Runner", desc:"Finish a course in 2 weeks", earned:false },
  { icon:"💡", label:"Quiz Master", desc:"100% on 5 consecutive quizzes", earned:false },
  { icon:"📚", label:"Bookworm", desc:"Enroll in 10+ courses", earned:false },
]

const NAV = [
  { id:"dashboard", label:"Dashboard", icon:"◉" },
  { id:"courses",   label:"My Courses", icon:"▦" },
  { id:"explore",   label:"Explore",    icon:"◎" },
  { id:"progress",  label:"Progress",   icon:"▲" },
  { id:"profile",   label:"Profile",    icon:"◐" },
]

const COURSE_TABS = [
  { id:"all",      label:"All Topics",      count: ENROLLED_COURSES.length + COMPLETED_COURSES.length },
  { id:"current",  label:"Current",         count: ENROLLED_COURSES.length },
  { id:"complete", label:"Completed",       count: COMPLETED_COURSES.length },
  { id:"saved",    label:"Saved",           count: SAVED_COURSES.length },
]

const CATEGORIES = ["All","AI/ML","Web Development","Design","Backend","DevOps","Security","Programming"]

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const ProgressBar = ({ pct, color="#6366f1", h=5 }) => (
  <div style={{ height:h, borderRadius:999, background:"rgba(0,0,0,0.08)", overflow:"hidden" }}>
    <div style={{ width:`${pct}%`, height:"100%", background:color, borderRadius:999, transition:"width .6s cubic-bezier(.4,0,.2,1)" }} />
  </div>
)

const AvatarEl = ({ size=40, onClick, initials="CS", color="linear-gradient(135deg,#6366f1,#8b5cf6)" }) => (
  <div onClick={onClick} style={{ width:size, height:size, borderRadius:"50%", cursor:onClick?"pointer":"default", flexShrink:0,
    background:color, display:"flex", alignItems:"center", justifyContent:"center",
    color:"#fff", fontWeight:800, fontSize:size*0.35, userSelect:"none",
    boxShadow:"0 2px 12px rgba(99,102,241,.3)" }}>
    {initials}
  </div>
)

const RoleBadge = ({ role }) => {
  const m = { Instructor:["#eef2ff","#4f46e5"], "Top Student":["#fffbeb","#d97706"], Student:["#f0fdf4","#16a34a"] }
  const [bg,fg] = m[role] || m.Student
  return <span style={{ fontSize:10, fontWeight:800, padding:"2px 8px", borderRadius:99, background:bg, color:fg, letterSpacing:".04em", whiteSpace:"nowrap" }}>{role}</span>
}

// useBreakpoint hook
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)
  useEffect(() => {
    const fn = () => setW(window.innerWidth)
    window.addEventListener("resize", fn)
    return () => window.removeEventListener("resize", fn)
  }, [])
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024, w }
}

// ─── COURSE CARD ─────────────────────────────────────────────────────────────
function CourseCard({ course, onOpen, showGrade=false }) {
  const [hover, setHover] = useState(false)
  return (
    <div onClick={() => onOpen && onOpen(course)}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ background:"#fff", borderRadius:20, border:"1.5px solid #e8edf5", overflow:"hidden",
        cursor:onOpen?"pointer":"default", transition:"transform .2s ease,box-shadow .2s ease",
        transform:hover?"translateY(-4px)":"none",
        boxShadow:hover?"0 20px 50px rgba(0,0,0,.1)":"0 2px 10px rgba(0,0,0,.04)" }}>
      <div style={{ position:"relative", height:150 }}>
        <img src={course.img} style={{ width:"100%", height:"100%", objectFit:"cover" }} alt={course.title} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,transparent 30%,rgba(0,0,0,.55))" }} />
        {course.category && (
          <span style={{ position:"absolute", top:10, left:10, background:course.color, color:"#fff", fontSize:10, fontWeight:800, padding:"3px 10px", borderRadius:20 }}>{course.category}</span>
        )}
        {showGrade && (
          <span style={{ position:"absolute", top:10, right:10, background:"#22c55e", color:"#fff", fontSize:12, fontWeight:800, padding:"3px 10px", borderRadius:20 }}>Grade: {course.grade}</span>
        )}
        {course.progress !== undefined && !showGrade && (
          <span style={{ position:"absolute", bottom:10, right:10, background:"rgba(255,255,255,.18)", backdropFilter:"blur(8px)", color:"#fff", fontSize:12, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>{course.progress}%</span>
        )}
        {course.price !== undefined && (
          <span style={{ position:"absolute", top:10, right:10, background:"rgba(0,0,0,.5)", color:"#fff", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>{course.price}</span>
        )}
      </div>
      <div style={{ padding:"16px 18px 18px" }}>
        <h3 style={{ margin:"0 0 4px", fontSize:14, fontWeight:800, color:"#0f172a", lineHeight:1.3 }}>{course.title}</h3>
        <p style={{ margin:"0 0 12px", fontSize:12, color:"#94a3b8" }}>{course.instructor}</p>
        {course.progress !== undefined && (
          <>
            <ProgressBar pct={course.progress} color={course.color||"#6366f1"} h={5} />
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10 }}>
              {course.done !== undefined && <span style={{ fontSize:12, color:"#94a3b8" }}>{course.done}/{course.lessons} lessons</span>}
              {showGrade
                ? <button style={{ padding:"6px 12px", borderRadius:8, border:"1.5px solid #6366f1", background:"transparent", color:"#6366f1", fontSize:11, fontWeight:700, cursor:"pointer" }}>🏅 Certificate</button>
                : <button style={{ padding:"6px 12px", borderRadius:8, border:"none", background:course.color||"#6366f1", color:"#fff", fontSize:11, fontWeight:700, cursor:"pointer" }}>Resume →</button>
              }
            </div>
          </>
        )}
        {course.rating !== undefined && (
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ color:"#f59e0b", fontSize:13, fontWeight:600 }}>★ {course.rating} <span style={{ color:"#94a3b8" }}>({course.students})</span></span>
            <button style={{ padding:"6px 12px", borderRadius:8, border:"none", background:course.color||"#6366f1", color:"#fff", fontSize:11, fontWeight:700, cursor:"pointer" }}>Enroll</button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── FILTER TABS ─────────────────────────────────────────────────────────────
function CourseTabs({ activeTab, onChange }) {
  const { isMobile } = useBreakpoint()
  return (
    <div style={{ display:"flex", gap:6, marginBottom:24, overflowX:"auto", paddingBottom:4,
      scrollbarWidth:"none", msOverflowStyle:"none" }}>
      {COURSE_TABS.map(tab => {
        const active = activeTab === tab.id
        return (
          <button key={tab.id} onClick={() => onChange(tab.id)} style={{
            padding:isMobile?"8px 14px":"9px 18px", borderRadius:100,
            border:active?"none":"1.5px solid #e2e8f0",
            background:active?"#1e2756":"#fff", color:active?"#fff":"#64748b",
            fontWeight:active?700:500, fontSize:isMobile?12:13, cursor:"pointer",
            display:"flex", alignItems:"center", gap:6, transition:"all .2s ease",
            boxShadow:active?"0 4px 16px rgba(30,39,86,.25)":"none", whiteSpace:"nowrap", flexShrink:0
          }}>
            {tab.label}
            <span style={{ background:active?"rgba(255,255,255,.2)":"#f1f5f9", color:active?"#fff":"#94a3b8",
              borderRadius:100, padding:"1px 7px", fontSize:11, fontWeight:700 }}>{tab.count}</span>
          </button>
        )
      })}
    </div>
  )
}

// ─── LESSON PLAYER (MyCourse) ─────────────────────────────────────────────────
function MyCourse({ course, onBack }) {
  const { isMobile, isTablet } = useBreakpoint()
  const modules = course?.modules || []
  const allLessons = modules.flatMap(m => m.lessons)
  const startLesson = allLessons.find(l => l.active) || allLessons.find(l => !l.done) || allLessons[0]
  const courseAccent = course?.color || "#6366f1"

  const [currentId,     setCurrentId]     = useState(startLesson?.id || "2.1")
  const [completed,     setCompleted]     = useState(allLessons.filter(l=>l.done).map(l=>l.id))
  const [tasks,         setTasks]         = useState(DEFAULT_TASKS)
  const [taskDone,      setTaskDone]      = useState(false)
  const [tab,           setTab]           = useState("lesson")
  const [sidebarOpen,   setSidebarOpen]   = useState(!isMobile)
  const [quizStep,      setQuizStep]      = useState(0)
  const [answers,       setAnswers]       = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [comments,      setComments]      = useState(STATIC_COMMENTS)
  const [newComment,    setNewComment]    = useState("")
  const [liked,         setLiked]         = useState([])

  const idx        = allLessons.findIndex(l => l.id === currentId)
  const lesson     = allLessons[idx] || allLessons[0]
  const prevLesson = allLessons[idx - 1]
  const nextLesson = allLessons[idx + 1]
  const totalDone  = completed.length
  const progress   = allLessons.length ? Math.round((totalDone / allLessons.length) * 100) : 0
  const quizScore  = QUIZ.reduce((s,q,i) => s+(answers[i]===q.ans?1:0), 0)

  const goTo = (ls) => {
    if(!ls || ls.locked) return
    setCurrentId(ls.id)
    setTab("lesson")
    setTasks(DEFAULT_TASKS.map((t,i) => ({...t, done:i===0})))
    setTaskDone(false)
    setQuizStep(0); setAnswers({}); setQuizSubmitted(false)
    if (isMobile) setSidebarOpen(false)
  }

  const toggleTask = (id) => { if(id===0||taskDone) return; setTasks(ts => ts.map(t => t.id===id?{...t,done:!t.done}:t)) }
  const submitTask = () => {
    if(!tasks.every(t=>t.done)) return
    setTaskDone(true)
    setCompleted(p => p.includes(currentId)?p:[...p,currentId])
  }
  const postComment = () => {
    if(!newComment.trim()) return
    setComments(p => [{ id:Date.now(), name:"Chhorn SeavLeng", role:"Student", time:"Just now", initials:"CS", color:courseAccent, text:newComment.trim(), likes:0, replies:[] }, ...p])
    setNewComment("")
  }

  return (
    <div style={{ fontFamily:"'Plus Jakarta Sans','Segoe UI',sans-serif", background:"#f1f5f9", minHeight:"100vh", display:"flex", flexDirection:"column", color:"#0f172a" }}>
      {/* TOP NAV */}
      <nav style={{ background:"#fff", borderBottom:"1.5px solid #e2e8f0", padding:"0 16px", height:58, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:50, boxShadow:"0 1px 8px rgba(0,0,0,.05)", gap:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, minWidth:0 }}>
          <button onClick={() => setSidebarOpen(s=>!s)}
            style={{ width:36, height:36, borderRadius:10, border:"1.5px solid #e2e8f0", background:"#f8fafc", cursor:"pointer", fontSize:15, color:"#475569", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>☰</button>
          {onBack && (
            <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", fontSize:12, color:courseAccent, fontWeight:700, flexShrink:0 }}>← Back</button>
          )}
          <span style={{ fontSize:13, fontWeight:700, color:"#0f172a", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
            {course?.title || "Data Structures & Algorithms"}
          </span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
          {!isMobile && (
            <div style={{ display:"flex", alignItems:"center", gap:8, background:"#eef2ff", borderRadius:99, padding:"5px 14px", border:"1.5px solid #c7d2fe" }}>
              <div style={{ width:60, height:4, borderRadius:99, background:"#e2e8f0", overflow:"hidden" }}>
                <div style={{ width:`${progress}%`, height:"100%", background:`linear-gradient(90deg,${courseAccent},#818cf8)`, borderRadius:99 }}/>
              </div>
              <span style={{ fontSize:11, fontWeight:800, color:courseAccent }}>{progress}%</span>
            </div>
          )}
          <button onClick={() => goTo(nextLesson)} disabled={!nextLesson||nextLesson?.locked}
            style={{ padding:"8px 16px", borderRadius:12, border:"none",
              background:nextLesson&&!nextLesson.locked?`linear-gradient(135deg,${courseAccent},#818cf8)`:"#e2e8f0",
              color:nextLesson&&!nextLesson.locked?"#fff":"#94a3b8",
              fontWeight:800, fontSize:12, cursor:nextLesson&&!nextLesson.locked?"pointer":"not-allowed" }}>
            Next →
          </button>
        </div>
      </nav>

      <div style={{ display:"flex", flex:1, position:"relative" }}>
        {/* SIDEBAR */}
        {sidebarOpen && (
          <aside style={{
            width:isMobile?"100%":260, background:"#fff", borderRight:"1.5px solid #e2e8f0",
            display:"flex", flexDirection:"column",
            height:isMobile?"auto":"calc(100vh - 58px)", position:isMobile?"relative":"sticky", top:58,
            overflow:"hidden", flexShrink:0,
            boxShadow:isMobile?"0 4px 20px rgba(0,0,0,.08)":"2px 0 10px rgba(0,0,0,.04)",
            zIndex:isMobile?40:10
          }}>
            <div style={{ padding:"16px 16px 12px", borderBottom:"1.5px solid #f1f5f9" }}>
              <p style={{ fontSize:9, fontWeight:900, color:"#cbd5e1", letterSpacing:".14em", textTransform:"uppercase", marginBottom:10 }}>Course Content</p>
              <div style={{ background:"#f8fafc", borderRadius:10, padding:"10px 12px", border:"1.5px solid #e2e8f0" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span style={{ fontSize:11, color:"#94a3b8" }}>{totalDone}/{allLessons.length} lessons</span>
                  <span style={{ fontSize:11, fontWeight:800, color:courseAccent }}>{progress}%</span>
                </div>
                <ProgressBar pct={progress} color={courseAccent} h={4}/>
              </div>
            </div>
            <div style={{ flex:1, overflowY:"auto", padding:"12px 8px" }}>
              {modules.map(mod => (
                <div key={mod.id} style={{ marginBottom:18 }}>
                  <p style={{ fontSize:9, fontWeight:900, color:"#cbd5e1", letterSpacing:".12em", padding:"0 8px", marginBottom:6, textTransform:"uppercase" }}>
                    Module {mod.id} — {mod.title}
                  </p>
                  {mod.lessons.map(ls => {
                    const isDone = completed.includes(ls.id)
                    const isActive = ls.id === currentId
                    return (
                      <button key={ls.id} onClick={() => goTo(ls)} style={{
                        width:"100%", display:"flex", alignItems:"center", gap:8, padding:"9px 10px",
                        borderRadius:12, border:"none", cursor:ls.locked?"not-allowed":"pointer", marginBottom:3,
                        background:isActive?"#eef2ff":"transparent",
                        borderLeft:isActive?`2.5px solid ${courseAccent}`:"2.5px solid transparent",
                        opacity:ls.locked?0.45:1, transition:"all .15s" }}>
                        <div style={{ width:26, height:26, borderRadius:8, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center",
                          background:isDone?"#ecfdf5":isActive?"#e0e7ff":"#f1f5f9", fontSize:11,
                          color:isDone?"#10b981":isActive?courseAccent:"#94a3b8",
                          border:`1px solid ${isDone?"#a7f3d0":isActive?"#c7d2fe":"#e2e8f0"}` }}>
                          {isDone?"✓":ls.locked?"🔒":"▶"}
                        </div>
                        <div style={{ flex:1, textAlign:"left" }}>
                          <p style={{ margin:0, fontSize:12, fontWeight:isActive?700:500, color:isActive?courseAccent:"#475569", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{ls.id} {ls.title}</p>
                          <p style={{ margin:0, fontSize:10, color:"#94a3b8" }}>⏱ {ls.duration}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* MAIN */}
        <main style={{ flex:1, overflowY:"auto", padding:isMobile?"16px":"24px 32px", background:"#f1f5f9" }}>
          <div style={{ maxWidth:820, margin:"0 auto" }}>
            <h1 style={{ fontSize:isMobile?20:24, fontWeight:900, color:"#0f172a", marginBottom:6, lineHeight:1.2 }}>
              {lesson?.id}. {lesson?.title}
            </h1>
            <p style={{ fontSize:13, color:"#94a3b8", marginBottom:22 }}>
              {course?.description || "Understand the fundamental differences between static and dynamic linear data structures."}
            </p>

            {/* VIDEO */}
            <div style={{ borderRadius:18, overflow:"hidden", marginBottom:24, boxShadow:`0 8px 32px rgba(99,102,241,.12)`, border:"1.5px solid #e2e8f0" }}>
              <div style={{ position:"relative", paddingBottom:"50%", background:"#1e1b4b" }}>
                <img src={course?.img||"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=450&fit=crop"}
                  alt="lesson" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:0.6 }}/>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,transparent 35%,rgba(30,27,75,.9))" }}/>
                <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <div style={{ width:64, height:64, borderRadius:"50%", background:"rgba(255,255,255,.2)", backdropFilter:"blur(12px)", border:"2px solid rgba(255,255,255,.5)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontSize:24, marginLeft:4, color:"#fff" }}>▶</span>
                  </div>
                </div>
                <div style={{ position:"absolute", top:14, right:14, background:"rgba(0,0,0,.4)", backdropFilter:"blur(8px)", borderRadius:99, padding:"4px 12px", color:"#fff", fontSize:11, fontWeight:700 }}>
                  ⏱ {lesson?.duration||"28:30"}
                </div>
              </div>
              <div style={{ background:"#1e1b4b", padding:"8px 16px", display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ color:"#fff", fontSize:16, cursor:"pointer" }}>▶</span>
                <span style={{ color:"#94a3b8", fontSize:11 }}>0:00 / {lesson?.duration||"28:30"}</span>
                <div style={{ flex:1, height:4, borderRadius:99, background:"#374151" }}>
                  <div style={{ width:"0%", height:"100%", background:`linear-gradient(90deg,${courseAccent},#818cf8)`, borderRadius:99 }}/>
                </div>
                {!isMobile && ["0.5x","1x","1.5x","2x"].map(s=>(
                  <button key={s} style={{ fontSize:11, color:s==="1x"?"#818cf8":"#6b7280", background:"none", border:"none", cursor:"pointer", fontWeight:s==="1x"?900:400 }}>{s}</button>
                ))}
              </div>
            </div>

            {/* TABS */}
            <div style={{ display:"flex", gap:4, marginBottom:20, background:"#f1f5f9", borderRadius:14, padding:4, border:"1.5px solid #e2e8f0" }}>
              {[["lesson","📖 Lesson"],["quiz","🧠 Quiz"],["discussion",`💬 (${comments.length})`]].map(([key,label])=>(
                <button key={key} onClick={()=>setTab(key)} style={{
                  flex:1, padding:isMobile?8:10, borderRadius:10, border:"none", cursor:"pointer",
                  fontSize:isMobile?12:13, fontWeight:600,
                  background:tab===key?"#fff":"transparent",
                  color:tab===key?courseAccent:"#94a3b8",
                  boxShadow:tab===key?"0 2px 8px rgba(0,0,0,.07)":"none", transition:"all .18s" }}>
                  {label}
                </button>
              ))}
            </div>

            {/* LESSON TAB */}
            {tab==="lesson" && (
              <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                <div style={{ background:"#fff", borderRadius:18, padding:isMobile?18:24, border:"1.5px solid #e2e8f0" }}>
                  <h2 style={{ fontSize:17, fontWeight:800, color:"#0f172a", marginBottom:12 }}>{lesson?.title}</h2>
                  <p style={{ color:"#475569", lineHeight:1.8, fontSize:14, marginBottom:12 }}>
                    In this lesson, we explore <strong style={{ color:courseAccent }}>{lesson?.title}</strong>. Understanding the difference between static and dynamic data structures helps you choose the right tool.
                  </p>
                  <p style={{ color:"#475569", lineHeight:1.8, fontSize:14, margin:0 }}>
                    Arrays store elements in contiguous memory — fast random access but costly insert/delete. Linked lists use pointers — flexible size, fast insert/delete but slower access.
                  </p>
                </div>

                <div style={{ background:"#fff", borderRadius:18, padding:isMobile?18:24, border:"1.5px solid #e2e8f0" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
                    <div style={{ width:40, height:40, borderRadius:12, background:`linear-gradient(135deg,${courseAccent},#818cf8)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:18 }}>✅</div>
                    <div>
                      <h3 style={{ margin:0, fontSize:15, fontWeight:800 }}>Learning Tasks</h3>
                      <p style={{ margin:0, fontSize:11, color:"#94a3b8" }}>{tasks.filter(t=>t.done).length} of {tasks.length} done</p>
                    </div>
                    <div style={{ marginLeft:"auto", width:80 }}><ProgressBar pct={tasks.filter(t=>t.done).length/tasks.length*100} color={courseAccent} h={4}/></div>
                  </div>
                  {tasks.map(task=>(
                    <div key={task.id} onClick={()=>toggleTask(task.id)} style={{
                      display:"flex", alignItems:"center", gap:10, padding:"12px 14px", borderRadius:12,
                      cursor:task.id===0||taskDone?"default":"pointer",
                      background:task.done?"#f0fdf4":"#f8fafc",
                      border:`1.5px solid ${task.done?"#bbf7d0":"#e2e8f0"}`, marginBottom:6, transition:"all .15s" }}>
                      <div style={{ width:22, height:22, borderRadius:7, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center",
                        background:task.done?"#10b981":"#fff", border:`2px solid ${task.done?"#10b981":"#d1d5db"}`, color:"#fff", fontSize:12 }}>
                        {task.done?"✓":""}
                      </div>
                      <span style={{ fontSize:13, color:task.done?"#94a3b8":"#0f172a", fontWeight:500, textDecoration:task.done?"line-through":"none" }}>{task.text}</span>
                    </div>
                  ))}
                  {taskDone
                    ? <div style={{ textAlign:"center", padding:14, borderRadius:12, background:"#f0fdf4", border:"1.5px solid #bbf7d0", marginTop:4 }}>
                        <p style={{ margin:0, fontWeight:800, color:"#16a34a", fontSize:14 }}>✅ Lesson completed! Great work!</p>
                      </div>
                    : <button onClick={submitTask} style={{
                        width:"100%", padding:13, borderRadius:12, border:"none",
                        background:tasks.every(t=>t.done)?`linear-gradient(135deg,${courseAccent},#818cf8)`:"#e2e8f0",
                        color:tasks.every(t=>t.done)?"#fff":"#94a3b8",
                        fontWeight:800, fontSize:14, cursor:tasks.every(t=>t.done)?"pointer":"default", marginTop:4 }}>
                        {tasks.every(t=>t.done)?"✅ Submit & Complete Lesson":"Complete all tasks first"}
                      </button>
                  }
                </div>

                <div style={{ display:"flex", justifyContent:"space-between", gap:10 }}>
                  <button onClick={()=>goTo(prevLesson)} disabled={!prevLesson}
                    style={{ padding:"11px 20px", borderRadius:12, border:"1.5px solid #e2e8f0", background:"#fff", cursor:prevLesson?"pointer":"not-allowed", fontSize:13, fontWeight:700, color:prevLesson?"#0f172a":"#94a3b8", opacity:prevLesson?1:0.45 }}>
                    ← Previous
                  </button>
                  <button onClick={()=>goTo(nextLesson)} disabled={!nextLesson||nextLesson?.locked}
                    style={{ padding:"11px 24px", borderRadius:12, border:"none",
                      background:nextLesson&&!nextLesson.locked?`linear-gradient(135deg,${courseAccent},#818cf8)`:"#e2e8f0",
                      cursor:nextLesson&&!nextLesson.locked?"pointer":"not-allowed", fontSize:13, fontWeight:800,
                      color:nextLesson&&!nextLesson.locked?"#fff":"#94a3b8", opacity:nextLesson&&!nextLesson.locked?1:0.5 }}>
                    Next Lesson →
                  </button>
                </div>
              </div>
            )}

            {/* QUIZ TAB */}
            {tab==="quiz" && (
              <div style={{ background:"#fff", borderRadius:18, padding:isMobile?18:28, border:"1.5px solid #e2e8f0" }}>
                {!quizSubmitted ? (
                  <>
                    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
                      <div style={{ width:46, height:46, borderRadius:14, background:"#eef2ff", border:"1.5px solid #c7d2fe", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>🧠</div>
                      <div style={{ flex:1 }}>
                        <h2 style={{ margin:0, fontSize:18, fontWeight:800 }}>Lesson Quiz</h2>
                        <p style={{ margin:0, fontSize:12, color:"#94a3b8" }}>Question {quizStep+1} of {QUIZ.length}</p>
                      </div>
                      <div style={{ display:"flex", gap:5 }}>
                        {QUIZ.map((_,i)=>(
                          <div key={i} style={{ width:28, height:5, borderRadius:99, background:i<quizStep?"#10b981":i===quizStep?courseAccent:"#e2e8f0" }}/>
                        ))}
                      </div>
                    </div>
                    <h3 style={{ fontSize:16, fontWeight:700, color:"#0f172a", marginBottom:18, lineHeight:1.6 }}>{QUIZ[quizStep].q}</h3>
                    {QUIZ[quizStep].opts.map((opt,i)=>(
                      <div key={i} onClick={()=>setAnswers(a=>({...a,[quizStep]:i}))} style={{
                        display:"flex", alignItems:"center", gap:12, padding:"13px 16px", borderRadius:12, cursor:"pointer",
                        border:`1.5px solid ${answers[quizStep]===i?courseAccent:"#e2e8f0"}`,
                        background:answers[quizStep]===i?"#eef2ff":"#fafafa", marginBottom:8, transition:"all .15s" }}>
                        <div style={{ width:20, height:20, borderRadius:"50%", flexShrink:0,
                          border:`2px solid ${answers[quizStep]===i?courseAccent:"#d1d5db"}`,
                          background:answers[quizStep]===i?courseAccent:"#fff",
                          display:"flex", alignItems:"center", justifyContent:"center" }}>
                          {answers[quizStep]===i && <div style={{ width:7, height:7, borderRadius:"50%", background:"#fff" }}/>}
                        </div>
                        <span style={{ fontSize:13, color:answers[quizStep]===i?courseAccent:"#475569", fontWeight:answers[quizStep]===i?700:400 }}>{opt}</span>
                      </div>
                    ))}
                    <div style={{ display:"flex", justifyContent:"space-between", marginTop:12 }}>
                      <button onClick={()=>setQuizStep(s=>Math.max(0,s-1))} disabled={quizStep===0}
                        style={{ padding:"9px 20px", borderRadius:10, border:"1.5px solid #e2e8f0", background:"#fff", cursor:quizStep===0?"not-allowed":"pointer", fontSize:12, fontWeight:700, color:"#94a3b8", opacity:quizStep===0?0.4:1 }}>
                        ← Previous
                      </button>
                      {quizStep<QUIZ.length-1
                        ? <button onClick={()=>setQuizStep(s=>s+1)}
                            style={{ padding:"9px 22px", borderRadius:10, border:"none", background:`linear-gradient(135deg,${courseAccent},#818cf8)`, cursor:"pointer", fontSize:12, fontWeight:800, color:"#fff" }}>
                            Next →
                          </button>
                        : <button onClick={()=>setQuizSubmitted(true)}
                            style={{ padding:"9px 22px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#10b981,#059669)", cursor:"pointer", fontSize:12, fontWeight:800, color:"#fff" }}>
                            Submit ✓
                          </button>
                      }
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign:"center", padding:"20px 0" }}>
                    <div style={{ width:76, height:76, borderRadius:"50%", background:quizScore===QUIZ.length?`linear-gradient(135deg,${courseAccent},#818cf8)`:"linear-gradient(135deg,#f59e0b,#d97706)", margin:"0 auto 18px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:34 }}>
                      {quizScore===QUIZ.length?"🎉":"📝"}
                    </div>
                    <h2 style={{ fontSize:22, fontWeight:900, marginBottom:8 }}>{quizScore===QUIZ.length?"Perfect Score!":"Good Effort!"}</h2>
                    <p style={{ color:"#94a3b8", marginBottom:22, fontSize:14 }}>You got <strong style={{ color:courseAccent }}>{quizScore}</strong> / <strong>{QUIZ.length}</strong> correct</p>
                    <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:24 }}>
                      {QUIZ.map((q,i)=>(
                        <div key={i} style={{ width:40, height:40, borderRadius:12,
                          background:answers[i]===q.ans?"#ecfdf5":"#fee2e2",
                          border:`1.5px solid ${answers[i]===q.ans?"#a7f3d0":"#fca5a5"}`,
                          display:"flex", alignItems:"center", justifyContent:"center", fontSize:18,
                          color:answers[i]===q.ans?"#10b981":"#ef4444" }}>
                          {answers[i]===q.ans?"✓":"✗"}
                        </div>
                      ))}
                    </div>
                    <button onClick={()=>{ setQuizSubmitted(false); setQuizStep(0); setAnswers({}) }}
                      style={{ padding:"12px 30px", borderRadius:12, border:"none", background:`linear-gradient(135deg,${courseAccent},#818cf8)`, color:"#fff", fontWeight:800, cursor:"pointer", fontSize:14 }}>
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* DISCUSSION TAB */}
            {tab==="discussion" && (
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <div style={{ background:"#fff", borderRadius:18, padding:isMobile?18:22, border:"1.5px solid #e2e8f0" }}>
                  <h3 style={{ fontSize:15, fontWeight:800, marginBottom:12 }}>Ask a question or share an insight</h3>
                  <textarea value={newComment} onChange={e=>setNewComment(e.target.value)}
                    placeholder="What's on your mind about this lesson?"
                    style={{ width:"100%", minHeight:80, borderRadius:12, border:"1.5px solid #e2e8f0", padding:"10px 14px", fontSize:13, color:"#0f172a", outline:"none", resize:"vertical", background:"#f8fafc", boxSizing:"border-box" }}/>
                  <div style={{ display:"flex", justifyContent:"flex-end", marginTop:8 }}>
                    <button onClick={postComment}
                      style={{ padding:"9px 20px", borderRadius:10, border:"none",
                        background:newComment.trim()?`linear-gradient(135deg,${courseAccent},#818cf8)`:"#e2e8f0",
                        color:newComment.trim()?"#fff":"#94a3b8", fontWeight:800, fontSize:13, cursor:newComment.trim()?"pointer":"default" }}>
                      ✉ Post
                    </button>
                  </div>
                </div>
                {comments.map(c=>(
                  <div key={c.id} style={{ background:"#fff", borderRadius:18, padding:isMobile?18:22, border:"1.5px solid #e2e8f0" }}>
                    <div style={{ display:"flex", gap:12 }}>
                      <AvatarEl initials={c.initials} color={c.color} size={36}/>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6, flexWrap:"wrap" }}>
                          <span style={{ fontWeight:800, color:"#0f172a", fontSize:13 }}>{c.name}</span>
                          <RoleBadge role={c.role}/>
                          <span style={{ color:"#94a3b8", fontSize:11, marginLeft:"auto" }}>{c.time}</span>
                        </div>
                        <p style={{ color:"#475569", fontSize:13, lineHeight:1.7, marginBottom:10 }}>{c.text}</p>
                        <button onClick={()=>setLiked(p=>p.includes(c.id)?p.filter(x=>x!==c.id):[...p,c.id])}
                          style={{ background:"none", border:"none", cursor:"pointer", fontSize:12, color:liked.includes(c.id)?"#ef4444":"#94a3b8", fontWeight:700 }}>
                          {liked.includes(c.id)?"❤️":"🤍"} {c.likes+(liked.includes(c.id)?1:0)}
                        </button>
                      </div>
                    </div>
                    {c.replies?.length>0 && (
                      <div style={{ marginTop:14, marginLeft:isMobile?0:48, display:"flex", flexDirection:"column", gap:8 }}>
                        {c.replies.map(r=>(
                          <div key={r.id} style={{ display:"flex", gap:10, padding:"12px 14px", borderRadius:14, background:"#f8fafc", border:"1.5px solid #e2e8f0" }}>
                            <AvatarEl initials={r.initials} color={r.color} size={28}/>
                            <div style={{ flex:1 }}>
                              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4, flexWrap:"wrap" }}>
                                <span style={{ fontWeight:800, color:"#0f172a", fontSize:12 }}>{r.name}</span>
                                <RoleBadge role={r.role}/>
                                <span style={{ color:"#94a3b8", fontSize:10, marginLeft:"auto" }}>{r.time}</span>
                              </div>
                              <p style={{ color:"#475569", fontSize:12, lineHeight:1.6, marginBottom:4 }}>{r.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

// ─── DASHBOARD HOME ───────────────────────────────────────────────────────────
function DashboardHome({ navigate, onOpenCourse }) {
  const { isMobile, isTablet } = useBreakpoint()
  const [courseTab, setCourseTab] = useState("all")
  const filteredCourses = courseTab==="all" ? [...ENROLLED_COURSES,...COMPLETED_COURSES]
    : courseTab==="current" ? ENROLLED_COURSES
    : courseTab==="complete" ? COMPLETED_COURSES
    : SAVED_COURSES
  const cols = isMobile ? 1 : isTablet ? 2 : 3

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
      {/* Banner */}
      <div style={{ borderRadius:22, padding:isMobile?"22px 20px":"28px 32px", position:"relative", overflow:"hidden",
        background:"linear-gradient(135deg,#1e2756 0%,#312e81 55%,#4c1d95 100%)", color:"#fff" }}>
        <div style={{ position:"absolute", top:-50, right:-20, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,.04)" }}/>
        <div style={{ position:"absolute", bottom:-70, right:100, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,.03)" }}/>
        <p style={{ margin:"0 0 4px", fontSize:13, opacity:0.7 }}>Welcome back 👋</p>
        <h1 style={{ margin:"0 0 6px", fontSize:isMobile?22:28, fontWeight:900 }}>{STUDENT.name}</h1>
        <p style={{ margin:"0 0 20px", fontSize:13, opacity:0.75 }}>You're on a <strong style={{ color:"#fbbf24" }}>7-day streak!</strong> Keep it going 🔥</p>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          <button onClick={()=>navigate("courses")} style={{ padding:"10px 20px", borderRadius:12, border:"none", background:"#fff", color:"#312e81", fontWeight:800, fontSize:13, cursor:"pointer" }}>Continue Learning →</button>
          <button onClick={()=>navigate("explore")} style={{ padding:"10px 20px", borderRadius:12, border:"1.5px solid rgba(255,255,255,.3)", background:"transparent", color:"#fff", fontWeight:600, fontSize:13, cursor:"pointer" }}>Explore Courses</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:`repeat(${isMobile?2:4},1fr)`, gap:12 }}>
        {[
          { label:"Enrolled", value:ENROLLED_COURSES.length, icon:"📚", color:"#6366f1", bg:"#eef2ff" },
          { label:"Completed", value:COMPLETED_COURSES.length, icon:"🏆", color:"#10b981", bg:"#ecfdf5" },
          { label:"Study Hours", value:"47h", icon:"⏱", color:"#f59e0b", bg:"#fffbeb" },
          { label:"Streak", value:"7 days", icon:"🔥", color:"#ef4444", bg:"#fef2f2" },
        ].map((s,i)=>(
          <div key={i} style={{ background:"#fff", borderRadius:16, padding:"16px 18px", border:"1.5px solid #e8edf5", display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:40, height:40, borderRadius:12, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{s.icon}</div>
            <div>
              <p style={{ margin:0, fontSize:20, fontWeight:900, color:"#0f172a" }}>{s.value}</p>
              <p style={{ margin:0, fontSize:11, color:"#94a3b8" }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <CourseTabs activeTab={courseTab} onChange={setCourseTab}/>

      <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, gap:16 }}>
        {filteredCourses.slice(0,6).map(c=>(
          <CourseCard key={c.id} course={c} onOpen={c.status!=="saved"?onOpenCourse:undefined} showGrade={c.status==="complete"}/>
        ))}
        {filteredCourses.length===0 && (
          <div style={{ gridColumn:"1/-1", textAlign:"center", padding:60, color:"#94a3b8" }}>
            <div style={{ fontSize:48, marginBottom:12 }}>📂</div>
            <p style={{ fontSize:15, fontWeight:600, margin:0 }}>No courses here yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── MY COURSES PAGE ──────────────────────────────────────────────────────────
function MyCoursesPage({ navigate, onOpenCourse }) {
  const { isMobile, isTablet } = useBreakpoint()
  const [courseTab, setCourseTab] = useState("all")
  const filteredCourses = courseTab==="all" ? [...ENROLLED_COURSES,...COMPLETED_COURSES]
    : courseTab==="current" ? ENROLLED_COURSES
    : courseTab==="complete" ? COMPLETED_COURSES
    : SAVED_COURSES
  const cols = isMobile ? 1 : 2

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22, gap:12, flexWrap:"wrap" }}>
        <div>
          <h1 style={{ margin:"0 0 4px", fontSize:isMobile?20:24, fontWeight:900, color:"#0f172a" }}>My Courses</h1>
          <p style={{ margin:0, fontSize:12, color:"#94a3b8" }}>Track your learning journey</p>
        </div>
        <button onClick={()=>navigate("explore")} style={{ padding:"9px 18px", borderRadius:12, border:"none", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer" }}>+ Explore More</button>
      </div>
      <CourseTabs activeTab={courseTab} onChange={setCourseTab}/>
      <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, gap:18 }}>
        {filteredCourses.map(c=>(
          <CourseCard key={c.id} course={c} onOpen={c.status!=="saved"?onOpenCourse:undefined} showGrade={c.status==="complete"}/>
        ))}
        {filteredCourses.length===0 && (
          <div style={{ gridColumn:"1/-1", textAlign:"center", padding:60, color:"#94a3b8" }}>
            <div style={{ fontSize:48, marginBottom:12 }}>📂</div>
            <p style={{ fontSize:15, fontWeight:600, margin:0 }}>No courses here yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── EXPLORE PAGE ─────────────────────────────────────────────────────────────
function ExplorePage() {
  const { isMobile, isTablet } = useBreakpoint()
  const [search, setSearch] = useState("")
  const [cat, setCat] = useState("All")
  const [enrolled, setEnrolled] = useState([])
  const [saved, setSaved] = useState([])

  const filtered = EXPLORE_COURSES.filter(c =>
    (cat==="All"||c.category===cat) && c.title.toLowerCase().includes(search.toLowerCase())
  )
  const cols = isMobile ? 1 : isTablet ? 2 : 3

  return (
    <div>
      <h1 style={{ margin:"0 0 4px", fontSize:isMobile?20:24, fontWeight:900, color:"#0f172a" }}>Explore Courses</h1>
      <p style={{ margin:"0 0 20px", fontSize:13, color:"#94a3b8" }}>Discover new skills — search, filter, enroll!</p>

      <div style={{ position:"relative", marginBottom:14 }}>
        <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:13, color:"#94a3b8" }}>🔍</span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search courses..."
          style={{ width:"100%", padding:"12px 14px 12px 42px", borderRadius:14, border:"1.5px solid #e2e8f0", fontSize:13, outline:"none", boxSizing:"border-box", background:"#fff" }}/>
      </div>

      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:24 }}>
        {CATEGORIES.map(c=>(
          <button key={c} onClick={()=>setCat(c)} style={{ padding:"6px 14px", borderRadius:20, border:"1.5px solid", fontSize:12, fontWeight:600, cursor:"pointer",
            borderColor:cat===c?"#6366f1":"#e2e8f0", background:cat===c?"#6366f1":"#fff", color:cat===c?"#fff":"#64748b" }}>{c}</button>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, gap:16 }}>
        {filtered.map(c=>(
          <div key={c.id} style={{ background:"#fff", borderRadius:18, border:"1.5px solid #e8edf5", overflow:"hidden" }}>
            <div style={{ position:"relative", height:140 }}>
              <img src={c.img} style={{ width:"100%", height:"100%", objectFit:"cover" }} alt={c.title}/>
              <span style={{ position:"absolute", top:10, left:10, background:c.color, color:"#fff", fontSize:10, fontWeight:800, padding:"3px 10px", borderRadius:20 }}>{c.category}</span>
              <span style={{ position:"absolute", top:10, right:10, background:"rgba(0,0,0,.5)", color:"#fff", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>{c.price}</span>
              <button onClick={()=>setSaved(p=>p.includes(c.id)?p.filter(x=>x!==c.id):[...p,c.id])}
                style={{ position:"absolute", bottom:8, right:8, width:30, height:30, borderRadius:9, border:"none", background:saved.includes(c.id)?"#f59e0b":"rgba(255,255,255,.2)", backdropFilter:"blur(6px)", cursor:"pointer", fontSize:13 }}>
                {saved.includes(c.id)?"🔖":"🤍"}
              </button>
            </div>
            <div style={{ padding:"14px 16px" }}>
              <h3 style={{ margin:"0 0 3px", fontSize:14, fontWeight:800, color:"#0f172a" }}>{c.title}</h3>
              <p style={{ margin:"0 0 10px", fontSize:11, color:"#94a3b8" }}>{c.instructor}</p>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ color:"#f59e0b", fontSize:12, fontWeight:600 }}>★ {c.rating} <span style={{ color:"#94a3b8" }}>({c.students})</span></span>
                <button onClick={()=>setEnrolled(p=>p.includes(c.id)?p:[...p,c.id])}
                  style={{ padding:"6px 14px", borderRadius:9, border:"none", background:enrolled.includes(c.id)?"#22c55e":c.color, color:"#fff", fontSize:11, fontWeight:700, cursor:enrolled.includes(c.id)?"default":"pointer" }}>
                  {enrolled.includes(c.id)?"✓ Enrolled":"Enroll"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── PROGRESS PAGE ────────────────────────────────────────────────────────────
function ProgressPage() {
  const { isMobile } = useBreakpoint()
  return (
    <div>
      <h1 style={{ margin:"0 0 4px", fontSize:isMobile?20:24, fontWeight:900, color:"#0f172a" }}>My Progress</h1>
      <p style={{ margin:"0 0 24px", fontSize:13, color:"#94a3b8" }}>Your learning analytics and performance overview</p>

      <div style={{ display:"grid", gridTemplateColumns:`repeat(${isMobile?2:4},1fr)`, gap:14, marginBottom:22 }}>
        {[
          { label:"Study Hours", value:"47h",   icon:"⏱", color:"#6366f1", bg:"#eef2ff" },
          { label:"Quiz Score",  value:"88%",   icon:"📝", color:"#10b981", bg:"#ecfdf5" },
          { label:"Streak",      value:"7d",    icon:"🔥", color:"#f59e0b", bg:"#fffbeb" },
          { label:"Points",      value:"1,240", icon:"⭐", color:"#8b5cf6", bg:"#f5f3ff" },
        ].map((s,i)=>(
          <div key={i} style={{ background:"#fff", borderRadius:16, padding:"16px 18px", border:"1.5px solid #e8edf5", display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:42, height:42, borderRadius:12, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{s.icon}</div>
            <div>
              <p style={{ margin:0, fontSize:22, fontWeight:900, color:"#0f172a" }}>{s.value}</p>
              <p style={{ margin:0, fontSize:11, color:"#94a3b8" }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background:"#fff", borderRadius:20, padding:isMobile?18:26, border:"1.5px solid #e8edf5", marginBottom:20 }}>
        <h2 style={{ margin:"0 0 20px", fontSize:16, fontWeight:800, color:"#0f172a" }}>Course Progress</h2>
        {ENROLLED_COURSES.map(c=>(
          <div key={c.id} style={{ display:"flex", alignItems:"center", gap:14, marginBottom:18 }}>
            <img src={c.img} style={{ width:42, height:42, borderRadius:12, objectFit:"cover", flexShrink:0 }} alt={c.title}/>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <p style={{ margin:0, fontWeight:700, fontSize:13, color:"#0f172a", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:"72%" }}>{c.title}</p>
                <span style={{ fontSize:13, fontWeight:800, color:c.color }}>{c.progress}%</span>
              </div>
              <ProgressBar pct={c.progress} color={c.color} h={7}/>
              <p style={{ margin:"4px 0 0", fontSize:11, color:"#94a3b8" }}>{c.done} of {c.lessons} lessons</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background:"#fff", borderRadius:20, padding:isMobile?18:26, border:"1.5px solid #e8edf5" }}>
        <h2 style={{ margin:"0 0 18px", fontSize:16, fontWeight:800, color:"#0f172a" }}>Achievements</h2>
        <div style={{ display:"grid", gridTemplateColumns:`repeat(${isMobile?2:3},1fr)`, gap:12 }}>
          {ACHIEVEMENTS.map((a,i)=>(
            <div key={i} style={{ padding:"16px 12px", borderRadius:16, border:"1.5px solid #e2e8f0", background:a.earned?"#fff":"#fafafa", display:"flex", flexDirection:"column", alignItems:"center", gap:6, textAlign:"center", opacity:a.earned?1:0.45 }}>
              <span style={{ fontSize:28 }}>{a.icon}</span>
              <p style={{ margin:0, fontSize:12, fontWeight:800, color:"#0f172a" }}>{a.label}</p>
              <p style={{ margin:0, fontSize:10, color:"#94a3b8" }}>{a.desc}</p>
              {a.earned && <span style={{ fontSize:9, fontWeight:800, color:"#22c55e", background:"#f0fdf4", padding:"2px 8px", borderRadius:20 }}>EARNED</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
function ProfilePage() {
  const { isMobile } = useBreakpoint()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({...STUDENT})
  const [pwForm, setPwForm] = useState({ old:"", new1:"", new2:"" })
  const [pwMsg, setPwMsg] = useState("")

  const handlePwChange = () => {
    if(!pwForm.old||!pwForm.new1||!pwForm.new2){ setPwMsg("Please fill all fields."); return }
    if(pwForm.new1!==pwForm.new2){ setPwMsg("New passwords don't match!"); return }
    setPwMsg("✅ Password updated successfully!")
    setPwForm({ old:"", new1:"", new2:"" })
  }

  const Field = ({ label, field, type="text" }) => (
    <div style={{ border:"1.5px solid #e2e8f0", borderRadius:14, padding:"18px 16px 12px", position:"relative" }}>
      <span style={{ position:"absolute", top:-9, left:12, background:"#fff", padding:"0 6px", fontSize:10, color:"#94a3b8", fontWeight:700 }}>{label}</span>
      {editing
        ? <input type={type} value={form[field]||""} onChange={e=>setForm(f=>({...f,[field]:e.target.value}))}
            style={{ border:"none", outline:"none", fontSize:13, color:"#0f172a", fontWeight:600, width:"100%", background:"transparent" }}/>
        : <p style={{ margin:0, fontSize:13, color:"#0f172a", fontWeight:600 }}>{form[field]||"—"}</p>
      }
    </div>
  )

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ background:"#fff", borderRadius:20, padding:isMobile?20:28, border:"1.5px solid #e8edf5", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
        <div style={{ position:"relative", marginBottom:16 }}>
          <AvatarEl size={84} initials={STUDENT.initials}/>
          <div style={{ position:"absolute", bottom:4, right:2, width:14, height:14, background:"#22c55e", borderRadius:"50%", border:"2.5px solid #fff" }}/>
        </div>
        <h2 style={{ margin:"0 0 4px", fontSize:20, fontWeight:900, color:"#0f172a" }}>{form.name}</h2>
        <p style={{ margin:"0 0 8px", fontSize:13, color:"#6366f1", fontWeight:700 }}>Computer Science Student</p>
        <p style={{ margin:"0 0 16px", fontSize:13, color:"#94a3b8", maxWidth:400 }}>{form.bio}</p>
        <div style={{ display:"flex", gap:18, fontSize:12, color:"#64748b", flexWrap:"wrap", justifyContent:"center" }}>
          <span>📍 Phnom Penh</span>
          <span>📅 Joined {form.joined}</span>
          <span>⏱ Active 2h ago</span>
        </div>
      </div>

      <div style={{ background:"#fff", borderRadius:20, padding:isMobile?20:28, border:"1.5px solid #e8edf5" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22, flexWrap:"wrap", gap:10 }}>
          <h2 style={{ margin:0, fontSize:17, fontWeight:800, color:"#0f172a" }}>Personal Information</h2>
          <button onClick={()=>setEditing(e=>!e)} style={{ padding:"8px 18px", borderRadius:12, border:editing?"none":"1.5px solid #6366f1",
            background:editing?"linear-gradient(135deg,#6366f1,#8b5cf6)":"transparent", color:editing?"#fff":"#6366f1", fontWeight:700, fontSize:13, cursor:"pointer" }}>
            {editing?"✓ Save Changes":"✏️ Edit Profile"}
          </button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:14 }}>
          <Field label="Full Name" field="name"/>
          <Field label="Email" field="email" type="email"/>
          <Field label="Phone" field="phone"/>
          <Field label="Date of Birth" field="dob"/>
          <Field label="Gender" field="gender"/>
          <Field label="Address" field="address"/>
        </div>
      </div>

      <div style={{ background:"#fff", borderRadius:20, padding:isMobile?20:28, border:"1.5px solid #e8edf5" }}>
        <h2 style={{ margin:"0 0 20px", fontSize:17, fontWeight:800, color:"#0f172a" }}>Change Password</h2>
        {[["Old Password","old"],["New Password","new1"],["Confirm New Password","new2"]].map(([ph,key])=>(
          <input key={key} type="password" placeholder={ph} value={pwForm[key]}
            onChange={e=>setPwForm(f=>({...f,[key]:e.target.value}))}
            style={{ width:"100%", padding:"12px 16px", borderRadius:12, border:"1.5px solid #e2e8f0", fontSize:13, outline:"none", boxSizing:"border-box", marginBottom:10 }}/>
        ))}
        {pwMsg && <p style={{ color:pwMsg.startsWith("✅")?"#22c55e":"#ef4444", fontSize:12, margin:"0 0 12px" }}>{pwMsg}</p>}
        <div style={{ display:"flex", justifyContent:"flex-end" }}>
          <button onClick={handlePwChange} style={{ padding:"11px 24px", borderRadius:12, border:"none", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer" }}>Update Password</button>
        </div>
      </div>
    </div>
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function StudentDashboard() {
  const { isMobile, isTablet } = useBreakpoint()
  const [page, setPage] = useState("dashboard")
  const [notifOpen, setNotifOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const notifRef = useRef(null)

  const unread = NOTIFICATIONS.filter(n=>n.unread).length
  const navigate = (p) => { setPage(p); setNotifOpen(false); setMobileNavOpen(false) }

  const handleOpenCourse = (course) => {
    if(!course.modules||course.modules.length===0) return
    setSelectedCourse(course); setPage("lesson"); setNotifOpen(false)
  }

  useEffect(() => {
    const fn = (e) => { if(notifRef.current&&!notifRef.current.contains(e.target)) setNotifOpen(false) }
    document.addEventListener("mousedown", fn)
    return () => document.removeEventListener("mousedown", fn)
  }, [])

  const pageTitle = { dashboard:"Dashboard", courses:"My Courses", explore:"Explore", progress:"Progress", profile:"Profile", lesson:selectedCourse?.title||"Lesson" }
  const isLesson = page === "lesson"
  const sideW = isTablet ? 200 : 240

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#f8fafc", fontFamily:"'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:99px;}
        button,input,textarea{font-family:inherit;}
        input::placeholder,textarea::placeholder{color:#94a3b8;}
      `}</style>

      {/* ── SIDEBAR (desktop/tablet) ── */}
      {!isLesson && !isMobile && (
        <aside style={{ width:sideW, background:"#fff", borderRight:"1.5px solid #e8edf5", display:"flex", flexDirection:"column", position:"fixed", top:0, left:0, height:"100vh", zIndex:40 }}>
          <div style={{ padding:"20px 18px 16px", borderBottom:"1px solid #f1f5f9" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:38, height:38, borderRadius:12, background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>📚</div>
              <div>
                <p style={{ margin:0, fontWeight:900, fontSize:17, color:"#0f172a" }}>Khdemy</p>
                <p style={{ margin:0, fontSize:9, color:"#94a3b8", fontWeight:700, letterSpacing:".08em", textTransform:"uppercase" }}>Student Portal</p>
              </div>
            </div>
          </div>
          <nav style={{ flex:1, padding:"16px 12px", overflowY:"auto" }}>
            <p style={{ fontSize:9, fontWeight:800, color:"#cbd5e1", letterSpacing:".12em", padding:"0 10px", marginBottom:8, textTransform:"uppercase" }}>Main Menu</p>
            {NAV.map(n => {
              const active = page===n.id
              return (
                <button key={n.id} onClick={()=>navigate(n.id)} style={{
                  width:"100%", display:"flex", alignItems:"center", gap:10, padding:"11px 12px",
                  borderRadius:14, border:"none", cursor:"pointer", marginBottom:3,
                  background:active?"#eef2ff":"transparent", color:active?"#6366f1":"#64748b",
                  fontWeight:active?800:500, fontSize:13, textAlign:"left", transition:"all .15s" }}>
                  <span style={{ fontSize:15 }}>{n.icon}</span>
                  {n.label}
                  {active && <div style={{ marginLeft:"auto", width:6, height:6, borderRadius:"50%", background:"#6366f1" }}/>}
                </button>
              )
            })}
          </nav>
          <div style={{ padding:"12px 18px 18px", borderTop:"1px solid #f1f5f9" }}>
            <div onClick={()=>navigate("profile")} style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", padding:"10px 10px", borderRadius:12, background:"#f8fafc" }}>
              <AvatarEl size={34} initials={STUDENT.initials}/>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ margin:0, fontSize:12, fontWeight:700, color:"#0f172a", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{STUDENT.name}</p>
                <p style={{ margin:0, fontSize:10, color:"#94a3b8" }}>Student</p>
              </div>
              <div style={{ width:7, height:7, borderRadius:"50%", background:"#22c55e", flexShrink:0 }}/>
            </div>
          </div>
        </aside>
      )}

      {/* ── MOBILE NAV DRAWER ── */}
      {isMobile && mobileNavOpen && !isLesson && (
        <div style={{ position:"fixed", inset:0, zIndex:50 }}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.4)" }} onClick={()=>setMobileNavOpen(false)}/>
          <aside style={{ position:"absolute", left:0, top:0, bottom:0, width:240, background:"#fff", display:"flex", flexDirection:"column", boxShadow:"4px 0 20px rgba(0,0,0,.15)" }}>
            <div style={{ padding:"20px 18px 16px", borderBottom:"1px solid #f1f5f9", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:36, height:36, borderRadius:12, background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>📚</div>
                <p style={{ margin:0, fontWeight:900, fontSize:16, color:"#0f172a" }}>Khdemy</p>
              </div>
              <button onClick={()=>setMobileNavOpen(false)} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer", color:"#94a3b8" }}>✕</button>
            </div>
            <nav style={{ flex:1, padding:"16px 12px", overflowY:"auto" }}>
              {NAV.map(n=>{
                const active = page===n.id
                return (
                  <button key={n.id} onClick={()=>navigate(n.id)} style={{
                    width:"100%", display:"flex", alignItems:"center", gap:10, padding:"12px 14px",
                    borderRadius:14, border:"none", cursor:"pointer", marginBottom:4,
                    background:active?"#eef2ff":"transparent", color:active?"#6366f1":"#64748b",
                    fontWeight:active?800:500, fontSize:14, textAlign:"left" }}>
                    <span style={{ fontSize:16 }}>{n.icon}</span>
                    {n.label}
                  </button>
                )
              })}
            </nav>
            <div style={{ padding:"12px 16px 20px", borderTop:"1px solid #f1f5f9" }}>
              <div onClick={()=>navigate("profile")} style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", padding:"10px 10px", borderRadius:12, background:"#f8fafc" }}>
                <AvatarEl size={34} initials={STUDENT.initials}/>
                <div>
                  <p style={{ margin:0, fontSize:12, fontWeight:700, color:"#0f172a" }}>{STUDENT.name}</p>
                  <p style={{ margin:0, fontSize:10, color:"#94a3b8" }}>Student</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* ── MAIN ── */}
      <div style={{ marginLeft:isLesson||isMobile?0:sideW, flex:1, display:"flex", flexDirection:"column" }}>
        {/* HEADER */}
        {!isLesson && (
          <header style={{ background:"#fff", borderBottom:"1.5px solid #e8edf5", padding:`0 ${isMobile?16:28}px`, height:62, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:30 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              {isMobile && (
                <button onClick={()=>setMobileNavOpen(true)} style={{ width:36, height:36, borderRadius:10, border:"1.5px solid #e2e8f0", background:"#f8fafc", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, color:"#475569", flexShrink:0 }}>☰</button>
              )}
              <div>
                <h2 style={{ margin:0, fontSize:isMobile?16:18, fontWeight:900, color:"#0f172a" }}>{pageTitle[page]}</h2>
                {!isMobile && <p style={{ margin:0, fontSize:11, color:"#94a3b8" }}>{new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>}
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              {!isMobile && (
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", fontSize:12, color:"#94a3b8" }}>🔍</span>
                  <input placeholder="Search..." style={{ padding:"8px 12px 8px 32px", borderRadius:12, border:"1.5px solid #e2e8f0", fontSize:12, outline:"none", width:170, background:"#f8fafc" }}/>
                </div>
              )}

              <div ref={notifRef} style={{ position:"relative" }}>
                <button onClick={()=>setNotifOpen(o=>!o)} style={{ width:38, height:38, borderRadius:12, border:"1.5px solid #e2e8f0", background:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, position:"relative" }}>
                  🔔
                  {unread>0 && <span style={{ position:"absolute", top:8, right:8, width:7, height:7, borderRadius:"50%", background:"#ef4444", border:"2px solid #fff" }}/>}
                </button>
                {notifOpen && (
                  <div style={{ position:"absolute", right:0, top:48, width:isMobile?300:320, background:"#fff", borderRadius:18, border:"1.5px solid #e8edf5", boxShadow:"0 16px 50px rgba(0,0,0,.12)", zIndex:100, overflow:"hidden" }}>
                    <div style={{ padding:"14px 18px 10px", borderBottom:"1px solid #f1f5f9", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <p style={{ margin:0, fontWeight:800, fontSize:14, color:"#0f172a" }}>Notifications</p>
                      <span style={{ background:"#ef4444", color:"#fff", fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:20 }}>{unread} new</span>
                    </div>
                    {NOTIFICATIONS.map(n=>(
                      <div key={n.id} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"11px 18px", borderBottom:"1px solid #f8fafc", background:n.unread?"#fafaff":"#fff" }}>
                        <span style={{ fontSize:18, flexShrink:0 }}>{n.icon}</span>
                        <div style={{ flex:1 }}>
                          <p style={{ margin:"0 0 1px", fontSize:12, fontWeight:700, color:"#0f172a" }}>{n.title}</p>
                          <p style={{ margin:"0 0 3px", fontSize:11, color:"#64748b" }}>{n.desc}</p>
                          <p style={{ margin:0, fontSize:10, color:"#94a3b8" }}>{n.time}</p>
                        </div>
                        {n.unread && <div style={{ width:7, height:7, borderRadius:"50%", background:"#6366f1", flexShrink:0, marginTop:4 }}/>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <AvatarEl size={38} initials={STUDENT.initials} onClick={()=>navigate("profile")}/>
            </div>
          </header>
        )}

        {/* LESSON PLAYER */}
        {isLesson && selectedCourse && (
          <MyCourse course={selectedCourse} onBack={()=>navigate("courses")}/>
        )}

        {/* PAGES */}
        {!isLesson && (
          <main style={{ flex:1, padding:isMobile?"16px":"24px 28px", overflowY:"auto" }}>
            {page==="dashboard" && <DashboardHome navigate={navigate} onOpenCourse={handleOpenCourse}/>}
            {page==="courses"   && <MyCoursesPage navigate={navigate} onOpenCourse={handleOpenCourse}/>}
            {page==="explore"   && <ExplorePage/>}
            {page==="progress"  && <ProgressPage/>}
            {page==="profile"   && <ProfilePage/>}
          </main>
        )}

        {/* MOBILE BOTTOM NAV */}
        {isMobile && !isLesson && (
          <nav style={{ position:"fixed", bottom:0, left:0, right:0, background:"#fff", borderTop:"1.5px solid #e8edf5", display:"flex", zIndex:30, boxShadow:"0 -4px 20px rgba(0,0,0,.06)" }}>
            {NAV.map(n=>{
              const active = page===n.id
              return (
                <button key={n.id} onClick={()=>navigate(n.id)} style={{
                  flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                  gap:3, padding:"10px 0 12px", border:"none", background:"none", cursor:"pointer",
                  color:active?"#6366f1":"#94a3b8" }}>
                  <span style={{ fontSize:18 }}>{n.icon}</span>
                  <span style={{ fontSize:9, fontWeight:active?800:500 }}>{n.label}</span>
                  {active && <div style={{ width:20, height:3, borderRadius:99, background:"#6366f1", marginTop:1 }}/>}
                </button>
              )
            })}
          </nav>
        )}
      </div>

      {/* bottom padding for mobile nav */}
      {isMobile && !isLesson && <div style={{ height:70 }}/>}
    </div>
  )
}