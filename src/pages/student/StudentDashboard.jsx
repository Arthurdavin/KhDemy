import { useState, useEffect, useRef } from "react"
import MyCourse from "./mycourse"

const STUDENT = {
  name:"Chhorn SeavLeng", role:"Computer Science Student",
  email:"seav@khdemy.com", phone:"+855 12 345 678",
  dob:"15 / 05 / 2000", gender:"Male",
  address:"#32, St 123, Phnom Penh",
  bio:"Passionate about AI and UX Design. Building real projects with React and Python.",
  joined:"March 2024", avatar:"/profilenew.PNG", streak:7, points:1240,
}

const ENROLLED = [
  {id:1,title:"Data Structures and Algorithms",instructor:"Prof. Sarah Mitchell",cat:"CS",color:"indigo",
    img:"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=340&fit=crop",
    progress:72,total:45,done:32,level:"Intermediate",description:"Master DSA fundamentals.",
    modules:[
      {id:1,title:"Foundations",lessons:[{id:"1.1",title:"Intro to Big O",duration:"8:24",done:true},{id:"1.2",title:"Memory Management",duration:"12:10",done:true}]},
      {id:2,title:"Linear Structures",lessons:[{id:"2.1",title:"Arrays and Linked Lists",duration:"28:30",done:false,active:true},{id:"2.2",title:"Stacks and Queues",duration:"18:45",done:false,locked:true}]},
      {id:3,title:"Non-Linear",lessons:[{id:"3.1",title:"Binary Search Trees",duration:"22:00",done:false,locked:true},{id:"3.2",title:"Graph Traversals",duration:"25:15",done:false,locked:true}]},
    ]},
  {id:2,title:"React and Modern Frontend",instructor:"Mr. James Anderson",cat:"Web",color:"sky",
    img:"https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=340&fit=crop",
    progress:45,total:36,done:16,level:"Beginner",description:"Build apps with React.",
    modules:[{id:1,title:"React Basics",lessons:[{id:"1.1",title:"What is React?",duration:"10:00",done:true},{id:"1.2",title:"JSX and Components",duration:"14:20",done:true}]},{id:2,title:"Hooks",lessons:[{id:"2.1",title:"useState and useEffect",duration:"22:00",done:false,active:true},{id:"2.2",title:"Custom Hooks",duration:"18:00",done:false,locked:true}]}]},
  {id:3,title:"UI/UX Design Principles",instructor:"Ms. Elena Rossi",cat:"Design",color:"pink",
    img:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=340&fit=crop",
    progress:90,total:28,done:25,level:"Beginner",description:"Master user-centered design.",
    modules:[{id:1,title:"Foundations",lessons:[{id:"1.1",title:"Color Theory",duration:"9:00",done:true},{id:"1.2",title:"Typography",duration:"11:30",done:false,active:true}]}]},
  {id:4,title:"Python for Data Science",instructor:"Dr. Kevin Park",cat:"Data",color:"amber",
    img:"https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=340&fit=crop",
    progress:20,total:52,done:10,level:"Advanced",description:"Analyze data with Python.",
    modules:[{id:1,title:"Python Basics",lessons:[{id:"1.1",title:"Variables and Types",duration:"8:00",done:true},{id:"1.2",title:"Functions",duration:"12:00",done:false,active:true}]}]},
]

const COMPLETED = [
  {id:5,title:"HTML and CSS Fundamentals",instructor:"Ms. Laura Kim",color:"violet",img:"https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=340&fit=crop",grade:"A+",cat:"Web"},
  {id:6,title:"Introduction to Git",instructor:"Mr. Chris Nguyen",color:"emerald",img:"https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=340&fit=crop",grade:"A",cat:"DevOps"},
]

const SAVED_COURSES_INIT = [10,11,12]

const SAVED = [
  {id:10,title:"Machine Learning A-Z",instructor:"Dr. Andrew Lee",color:"violet",img:"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=340&fit=crop",rating:4.9,price:"Free",cat:"AI/ML"},
  {id:11,title:"Node.js Express API",instructor:"Mr. Brad Traversy",color:"emerald",img:"https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=340&fit=crop",rating:4.7,price:"$29",cat:"Backend"},
  {id:12,title:"Figma UI Design",instructor:"Ms. Sara Sanders",color:"amber",img:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=340&fit=crop",rating:4.8,price:"Free",cat:"Design"},
]

const EXPLORE = [
  {id:20,title:"Machine Learning A-Z",instructor:"Dr. Andrew Lee",cat:"AI/ML",color:"violet",img:"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=340&fit=crop",rating:4.9,students:"12k",price:"Free"},
  {id:21,title:"Node.js Express API",instructor:"Mr. Brad Traversy",cat:"Backend",color:"emerald",img:"https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=340&fit=crop",rating:4.7,students:"8.3k",price:"$29"},
  {id:22,title:"Figma UI Design",instructor:"Ms. Sara Sanders",cat:"Design",color:"amber",img:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=340&fit=crop",rating:4.8,students:"6.1k",price:"Free"},
  {id:23,title:"Cyber Security Basics",instructor:"Prof. Mark Wilson",cat:"Security",color:"rose",img:"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=340&fit=crop",rating:4.6,students:"5.5k",price:"$19"},
  {id:24,title:"Docker and Kubernetes",instructor:"Mr. Nico Williams",cat:"DevOps",color:"sky",img:"https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=340&fit=crop",rating:4.7,students:"7.2k",price:"$39"},
  {id:25,title:"TypeScript Deep Dive",instructor:"Ms. Angela Yu",cat:"Web",color:"indigo",img:"https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=340&fit=crop",rating:4.9,students:"9.8k",price:"Free"},
]

const BLOGS = [
  {id:1,title:"Getting Started with React Hooks",body:"React Hooks changed everything for functional components.",date:"Mar 1, 2026",tag:"React",color:"sky",views:142,likes:18,img:"https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=340&fit=crop",mine:true},
  {id:2,title:"Understanding Big O Notation Simply",body:"Big O is intimidating at first but once you get the mental model it becomes second nature.",date:"Feb 22, 2026",tag:"CS",color:"indigo",views:98,likes:11,img:"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=340&fit=crop",mine:true},
  {id:3,title:"My UI/UX Design Journey So Far",body:"Switching from pure coding to thinking about users was a mindset shift.",date:"Feb 10, 2026",tag:"Design",color:"pink",views:215,likes:34,img:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=340&fit=crop",mine:true},
  {id:4,title:"Why Python is Perfect for Beginners",body:"Python clean syntax and vast ecosystem make it the ideal first language.",date:"Jan 28, 2026",tag:"Python",color:"amber",views:77,likes:9,img:"https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=340&fit=crop",mine:false},
  {id:5,title:"CSS Grid vs Flexbox",body:"Both are powerful layout tools but they solve different problems.",date:"Jan 15, 2026",tag:"CSS",color:"violet",views:310,likes:45,img:"https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=340&fit=crop",mine:false},
]

const BOOKS = [
  {id:1,title:"Clean Code",author:"Robert C. Martin",status:"Reading",pct:65,color:"indigo",genre:"Engineering",pages:431},
  {id:2,title:"The Pragmatic Programmer",author:"David Thomas",status:"Completed",pct:100,color:"emerald",genre:"Engineering",pages:352},
  {id:3,title:"Designing Data-Intensive Apps",author:"Martin Kleppmann",status:"Queued",pct:0,color:"amber",genre:"Backend",pages:562},
  {id:4,title:"Don't Make Me Think",author:"Steve Krug",status:"Reading",pct:40,color:"pink",genre:"UX Design",pages:216},
]

const NOTIFS = [
  {id:1,icon:"📝",title:"New Quiz Live",body:"Data Structures — Quiz #4 is ready",time:"2h",unread:true},
  {id:2,icon:"🎉",title:"Certificate Ready",body:"HTML and CSS — Download now",time:"1d",unread:true},
  {id:3,icon:"💬",title:"New Reply",body:"Prof. Sarah replied to your post",time:"2d",unread:false},
  {id:4,icon:"📢",title:"Course Updated",body:"React: 3 new lessons added",time:"3d",unread:false},
]

const WEEK = [{d:"M",m:45},{d:"T",m:30},{d:"W",m:90},{d:"T",m:20},{d:"F",m:75},{d:"S",m:10},{d:"S",m:60}]

const BADGES = [
  {icon:"🏆",label:"Top Learner",desc:"90%+ in 3 courses",earned:true},
  {icon:"🔥",label:"7-Day Streak",desc:"7 days in a row",earned:true},
  {icon:"⭐",label:"First Cert",desc:"Completed first course",earned:true},
  {icon:"🚀",label:"Speed Runner",desc:"Finish in 2 weeks",earned:false},
  {icon:"💡",label:"Quiz Master",desc:"100% on 5 quizzes",earned:false},
  {icon:"📚",label:"Bookworm",desc:"Enroll in 10+ courses",earned:false},
]

const CATS = ["All","AI/ML","Web","Design","Backend","DevOps","Security"]

const NAV_GROUPS = [
  {label:"Learning", items:[
    {id:"home",    label:"Dashboard",  emoji:"🏠"},
    {id:"courses", label:"My Courses", emoji:"📖"},
    {id:"progress",label:"Progress",   emoji:"📊"},
  ]},
  {label:"", items:[
    {id:"blog",    label:"My Blog",    emoji:"✍️"},
    {id:"profile", label:"Profile",    emoji:"👤"},
  ]},
]

const BOTTOM_NAV = [
  {id:"home",    label:"Home",    emoji:"🏠"},
  {id:"courses", label:"Courses", emoji:"📖"},
  {id:"blog",    label:"Blog",    emoji:"✍️"},
  {id:"progress",label:"Progress",emoji:"📊"},
  {id:"profile", label:"Profile", emoji:"👤"},
]

const COLOR = {
  indigo: {bg:"bg-indigo-500",light:"bg-indigo-50",border:"border-indigo-200",text:"text-indigo-600",bar:"bg-indigo-500"},
  sky:    {bg:"bg-sky-500",   light:"bg-sky-50",   border:"border-sky-200",   text:"text-sky-600",   bar:"bg-sky-500"},
  pink:   {bg:"bg-pink-500",  light:"bg-pink-50",  border:"border-pink-200",  text:"text-pink-600",  bar:"bg-pink-500"},
  amber:  {bg:"bg-amber-500", light:"bg-amber-50", border:"border-amber-200", text:"text-amber-600", bar:"bg-amber-500"},
  violet: {bg:"bg-violet-500",light:"bg-violet-50",border:"border-violet-200",text:"text-violet-600",bar:"bg-violet-500"},
  emerald:{bg:"bg-emerald-500",light:"bg-emerald-50",border:"border-emerald-200",text:"text-emerald-600",bar:"bg-emerald-500"},
  rose:   {bg:"bg-rose-500",  light:"bg-rose-50",  border:"border-rose-200",  text:"text-rose-600",  bar:"bg-rose-500"},
}

function ProgressBar({pct,colorKey="indigo",h="h-1.5"}) {
  const c = COLOR[colorKey]||COLOR.indigo
  return (
    <div className={"w-full "+h+" rounded-full bg-slate-100 overflow-hidden"}>
      <div className={"h-full rounded-full transition-all duration-500 "+c.bar} style={{width:pct+"%"}}/>
    </div>
  )
}

function AvatarImg({size=38,ring=false,onClick}) {
  const [err,setErr] = useState(false)
  const initials = STUDENT.name.split(" ").map(w=>w[0]).slice(0,2).join("")
  return (
    <div onClick={onClick}
      className={"rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center font-black select-none bg-gradient-to-br from-indigo-500 to-violet-600 text-white "+(ring?"ring-2 ring-indigo-500 ring-offset-2":"")+" "+(onClick?"cursor-pointer":"")}
      style={{width:size,height:size,fontSize:size*0.36}}>
      {!err
        ? <img src={STUDENT.avatar} className="w-full h-full object-cover object-top" alt="av" onError={()=>setErr(true)}/>
        : initials}
    </div>
  )
}

// ─── STAR ICON ────────────────────────────────────────────────────────────────
function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 13 13" fill="#F59E0B">
      <path d="M6.5 0l1.545 4.753H13L9.228 7.697l1.545 4.753L6.5 9.506l-4.273 2.944L3.772 7.697 0 4.753h4.955L6.5 0z"/>
    </svg>
  )
}

// ─── COURSE CARD — exact homepage style ──────────────────────────────────────
function CourseCard({c, onClick, type="enrolled", isSaved, onToggleSave}) {
  return (
    <div onClick={onClick}
      className={"bg-white rounded-[20px] overflow-hidden border border-[#f0f0f0] shadow-[0_2px_16px_rgba(0,0,0,0.07)] flex flex-col cursor-pointer transition-transform duration-[280ms] ease-[cubic-bezier(.34,1.2,.64,1)] hover:-translate-y-[7px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.13)]"}>

      {/* Thumbnail — same h as homepage */}
      <div className="relative w-full h-[160px] sm:h-[190px] overflow-hidden flex-shrink-0 bg-gray-200">
        <img src={c.img} alt={c.title} className="w-full h-full object-cover block"
          onError={e=>{e.target.style.display="none"}}/>
        {/* category tag top-left — homepage style */}
        <span className="absolute top-3 left-3 bg-[#2F327D] text-white text-xs font-bold rounded-full px-3 py-1 tracking-wide">
          {c.cat}
        </span>
        {/* completed grade badge */}
        {type==="completed"&&(
          <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold rounded-full px-3 py-1">
            Grade {c.grade}
          </span>
        )}
        {/* bookmark — same SVG as homepage */}
        {onToggleSave&&(
          <button onClick={e=>{e.stopPropagation();onToggleSave(c.id)}}
            className="absolute bottom-2.5 right-2.5 bg-transparent border-none cursor-pointer p-0 leading-none transition-all duration-200">
            <svg width="15" height="19" viewBox="0 0 16 20"
              className={"block transition-all duration-200 "+(isSaved?"fill-[#2F327D] stroke-[#2F327D]":"fill-none stroke-white")}
              strokeWidth="1.5" strokeLinejoin="round">
              <path d="M1 1h14v18l-7-4-7 4V1z"/>
            </svg>
          </button>
        )}
      </div>

      {/* Body — same padding & typography as homepage */}
      <div className="p-3 sm:p-[18px] flex flex-col flex-1">
        <h3 className="font-bold text-sm sm:text-base text-center mb-1.5 sm:mb-2 leading-snug text-gray-900 line-clamp-2">
          {c.title}
        </h3>
        <p className="text-base sm:text-[17px] text-center leading-relaxed mb-3 sm:mb-4 flex-1 line-clamp-2 text-gray-400">
          {c.description||c.desc||c.instructor}
        </p>

        {/* enrolled footer */}
        {type==="enrolled"&&(
          <>
            <ProgressBar pct={c.progress} colorKey={c.color} h="h-1.5"/>
            <div className="flex items-center justify-between mt-2 mb-1">
              <span className="text-[11px] text-gray-400">{c.done}/{c.total} lessons</span>
              <span className="font-black text-sm text-green-500">{c.progress}%</span>
            </div>
            <button onClick={e=>{e.stopPropagation();onClick&&onClick()}}
              className="mt-2 w-full py-2 rounded-xl text-xs font-bold text-white bg-[#2F327D] border-none cursor-pointer hover:opacity-90 transition-opacity">
              ▶ Resume
            </button>
          </>
        )}

        {/* completed footer — same layout as homepage price/rating row */}
        {type==="completed"&&(
          <div className="flex items-center justify-between">
            <span className="font-black text-emerald-500 text-sm sm:text-base">✓ Done</span>
            <div className="flex items-center gap-1.5">
              <StarIcon/>
              <span className="font-bold text-xs sm:text-[13px] text-gray-400">5.0</span>
              {onToggleSave&&(
                <button onClick={e=>{e.stopPropagation();onToggleSave(c.id)}}
                  className="bg-transparent border-none cursor-pointer p-0 leading-none ml-1 transition-all duration-200">
                  <svg width="15" height="19" viewBox="0 0 16 20"
                    className={"block transition-all duration-200 "+(isSaved?"fill-[#2F327D] stroke-[#2F327D]":"fill-none stroke-gray-400")}
                    strokeWidth="1.5" strokeLinejoin="round">
                    <path d="M1 1h14v18l-7-4-7 4V1z"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {/* saved footer — exact homepage price/rating row */}
        {type==="saved"&&(
          <div className="flex items-center justify-between">
            <span className="font-black text-green-500 text-sm sm:text-base">{c.price||"Free"}</span>
            <div className="flex items-center gap-1.5">
              <StarIcon/>
              <span className="font-bold text-xs sm:text-[13px] text-gray-400">{c.rating||"4.8"}</span>
              {onToggleSave&&(
                <button onClick={e=>{e.stopPropagation();onToggleSave(c.id)}}
                  className="bg-transparent border-none cursor-pointer p-0 leading-none ml-1 transition-all duration-200">
                  <svg width="15" height="19" viewBox="0 0 16 20"
                    className={"block transition-all duration-200 "+(isSaved?"fill-[#2F327D] stroke-[#2F327D]":"fill-none stroke-gray-400")}
                    strokeWidth="1.5" strokeLinejoin="round">
                    <path d="M1 1h14v18l-7-4-7 4V1z"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── BOOK CARD — exact homepage BookCard style (horizontal) ──────────────────
function DashBookCard({b, isSaved, onToggleSave}) {
  return (
    <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex flex-row gap-3 rounded-2xl p-3 cursor-pointer w-full transition-transform duration-[280ms] ease-[cubic-bezier(.34,1.2,.64,1)] hover:-translate-y-[7px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.13)]">
      {/* book cover — exact homepage size */}
      <div className="flex-shrink-0 w-28 sm:w-36 h-[160px] sm:h-[200px] rounded-xl overflow-hidden shadow-md bg-gray-100">
        {b.img
          ? <img src={b.img} alt={b.title} className="w-full h-full object-cover"/>
          : <div className="w-full h-full flex items-center justify-center text-3xl bg-indigo-50">📚</div>
        }
      </div>
      {/* info column */}
      <div className="flex flex-col flex-1 gap-1.5 relative overflow-hidden py-1">
        {/* category badge — homepage purple pill */}
        <span className="inline-block w-fit text-xs font-bold rounded-full px-3 py-1 bg-purple-100 text-purple-700">
          {b.genre||b.cat||"Book"}
        </span>
        <h2 className="font-extrabold text-sm sm:text-[15px] leading-snug m-0 line-clamp-2 text-gray-900">
          {b.title}
        </h2>
        {b.author&&(
          <p className="text-[11px] m-0 text-gray-400">by {b.author}</p>
        )}
        <p className="text-base sm:text-[17px] leading-relaxed m-0 line-clamp-2 sm:line-clamp-3 text-gray-500">
          {b.desc||b.description||b.genre}
        </p>
        {/* progress if reading */}
        {b.pct!=null&&(
          <div className="mt-auto pt-1">
            <ProgressBar pct={b.pct} colorKey={b.color||"indigo"} h="h-1"/>
            <span className="text-[10px] text-gray-400">{b.status} · {b.pct}%</span>
          </div>
        )}
        {/* bookmark — exact homepage SVG */}
        {onToggleSave&&(
          <button onClick={e=>{e.preventDefault();e.stopPropagation();onToggleSave(b.id)}}
            className="absolute bottom-0 right-0 bg-transparent border-none cursor-pointer p-1">
            <svg className={"w-[18px] h-[18px] transition-all duration-200 "+(isSaved?"fill-[#1e1b4b] stroke-[#1e1b4b]":"fill-none stroke-gray-400")}
              strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3h14a1 1 0 0 1 1 1v17l-8-4-8 4V4a1 1 0 0 1 1-1z"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

// ─── BLOG CARD — exact homepage BlogCard style ────────────────────────────────
function DashBlogCard({b, isSaved, onToggleSave, onClick}) {
  const tag   = b.tags?.[0]?.name || b.tag || b.title
  const cardTitle = b.cardTitle || b.title
  const desc  = b.content || b.body || b.desc || ""
  const date  = b.created_at
    ? new Date(b.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})
    : b.date || ""
  const thumb  = b.thumbnail_url || b.img || ""
  const author = b.authorName || date   // fallback: show date where author would be

  return (
    <div onClick={onClick}
      className="bg-white border border-[#f0f0f0] shadow-[0_2px_16px_rgba(0,0,0,0.07)] rounded-[20px] overflow-hidden cursor-pointer flex flex-col transition-transform duration-[280ms] ease-[cubic-bezier(.34,1.2,.64,1)] hover:-translate-y-[7px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.13)]">

      {/* thumbnail */}
      <div className="relative w-full h-[160px] sm:h-[190px] overflow-hidden flex-shrink-0 bg-gray-200">
        {thumb
          ? <img src={thumb} alt={cardTitle} className="w-full h-full object-cover block"
              onError={e=>{e.target.style.display="none"}}/>
          : <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">✍️</div>
        }
        {/* tag badge — homepage style */}
        <span className="absolute top-3 left-3 bg-[#2F327D] text-white text-xs font-bold rounded-full px-3 py-1 tracking-wide">
          {tag}
        </span>
      </div>

      {/* body */}
      <div className="p-3 sm:p-[18px] flex flex-col flex-1">
        <h3 className="font-bold text-sm sm:text-base text-center mb-1.5 sm:mb-2 leading-snug text-gray-900 line-clamp-2">
          {cardTitle}
        </h3>
        <p className="text-base sm:text-[17px] text-center leading-relaxed mb-3 sm:mb-4 flex-1 line-clamp-2 text-gray-400">
          {desc}
        </p>

        {/* footer — author avatar + name on left, stars + bookmark on right */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-500">
              <img src={b.authorImg||"/profilenew.PNG"} alt={author}
                className="w-full h-full object-cover object-top block"
                onError={e=>{e.target.style.display="none"}}/>
            </div>
            <span className="font-bold text-xs sm:text-[13px] text-gray-400">{author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <StarIcon/>
            <span className="font-bold text-xs sm:text-[13px] text-gray-400">4.8</span>
            {onToggleSave&&(
              <button onClick={e=>{e.preventDefault();e.stopPropagation();onToggleSave(b)}}
                className="bg-transparent border-none cursor-pointer p-0 leading-none ml-1 transition-all duration-200">
                <svg width="15" height="19" viewBox="0 0 16 20"
                  className={"block transition-all duration-200 "+(isSaved?"fill-[#2F327D] stroke-[#2F327D]":"fill-none stroke-gray-400")}
                  strokeWidth="1.5" strokeLinejoin="round">
                  <path d="M1 1h14v18l-7-4-7 4V1z"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── SIDEBAR (top-level component) ───────────────────────────────────────────
function SidebarNav({page,go,onClose,onLogout}) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-5 py-5 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
            <img src="/logokhdemy.png" className="w-full h-full object-cover" alt="Khdemy"/>
          </div>
          <div>
            <p className="font-black text-slate-900 text-lg leading-none" style={{fontFamily:"'Outfit',sans-serif"}}>Khdemy</p>
            <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">Student Portal</p>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden text-slate-400 text-xl bg-transparent border-none cursor-pointer">✕</button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-0.5">
        {NAV_GROUPS.flatMap(g=>g.items).map(n=>{
          const act = page===n.id
          return (
            <button key={n.id} onClick={()=>go(n.id)}
              className={"w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all border-none text-left cursor-pointer "+(act?"bg-indigo-600 text-white shadow-sm":"text-slate-600 hover:bg-slate-100 hover:text-slate-900")}>
              <span className="text-base w-5 text-center">{n.emoji}</span>
              <span className={"flex-1 "+(act?"font-bold":"font-medium")}>{n.label}</span>
              {n.id==="blog"&&!act&&<span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-sky-100 text-sky-600">New</span>}
              {act&&<div className="w-1.5 h-1.5 rounded-full bg-white/70"/>}
            </button>
          )
        })}
      </nav>

      <div className="px-3 pb-4 pt-3 border-t border-slate-100 flex-shrink-0">
        <button onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-500 border border-rose-100 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer">
          🚪 Log out
        </button>
      </div>
    </div>
  )
}

// ─── PAGE: HOME ───────────────────────────────────────────────────────────────
function HomePage({go, openCourse, token, savedCourses, savedBooks, savedBlogs, toggleSaveCourse, toggleSaveBook, toggleSaveBlog}) {
  const [cat, setCat] = useState("All Topics")
  const [savedTab, setSavedTab] = useState("courses")
  const TOPIC_TABS = ["All Topics","Current Course","Course Complete","Saved"]

  // All courses pool for saved lookup
  const allCourses = [...ENROLLED, ...COMPLETED, ...SAVED]
  const savedCourseItems = allCourses.filter(c => savedCourses.includes(c.id))
  const savedBookItems   = BOOKS.filter(b => savedBooks.includes(b.id))

  return (
    <div className="flex flex-col gap-6">

      {/* ── Topic filter tabs ── */}
      <div className="flex flex-wrap gap-2">
        {TOPIC_TABS.map(t=>(
          <button key={t} onClick={()=>setCat(t)}
            className={"px-4 py-1.5 rounded-full text-xs font-bold border cursor-pointer transition-all "
              +(cat===t
                ?"bg-indigo-600 text-white border-indigo-600 shadow-sm"
                :"bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600")}>
            {t}
          </button>
        ))}
      </div>

      {/* ── Current Courses ── */}
      {(cat==="All Topics"||cat==="Current Course")&&(
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-black text-slate-900" style={{fontFamily:"'Outfit',sans-serif"}}>Current Courses</h2>
            <button onClick={()=>go("courses")} className="text-xs font-bold text-indigo-600 hover:underline border-none bg-transparent cursor-pointer">View All</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ENROLLED.map(c=>(
              <CourseCard key={c.id} c={c} type="enrolled" onClick={()=>openCourse(c)}
                isSaved={savedCourses.includes(c.id)} onToggleSave={toggleSaveCourse}/>
            ))}
          </div>
        </section>
      )}

      {/* ── Complete Courses ── */}
      {(cat==="All Topics"||cat==="Course Complete")&&(
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-black text-slate-900" style={{fontFamily:"'Outfit',sans-serif"}}>Complete Courses</h2>
            <button onClick={()=>go("courses")} className="text-xs font-bold text-indigo-600 hover:underline border-none bg-transparent cursor-pointer">View All</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMPLETED.map(c=>(
              <CourseCard key={c.id} c={c} type="completed"
                isSaved={savedCourses.includes(c.id)} onToggleSave={toggleSaveCourse}/>
            ))}
          </div>
        </section>
      )}

      {/* ── Saved ── */}
      {(cat==="All Topics"||cat==="Saved")&&(
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-black text-slate-900" style={{fontFamily:"'Outfit',sans-serif"}}>Saved</h2>
          </div>

          {/* Sub-tabs */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl w-fit mb-5 border border-slate-200">
            {[["courses",`📖 Courses (${savedCourseItems.length})`],["books",`📚 Books (${savedBookItems.length})`],["blogs",`✍️ Blogs (${savedBlogs.length})`]].map(([k,l])=>(
              <button key={k} onClick={()=>setSavedTab(k)}
                className={"px-4 py-2 rounded-xl text-xs font-bold border-none cursor-pointer transition-all "+(savedTab===k?"bg-indigo-600 text-white shadow-sm":"bg-transparent text-slate-500 hover:text-slate-700")}>
                {l}
              </button>
            ))}
          </div>

          {/* Saved Courses */}
          {savedTab==="courses"&&(
            savedCourseItems.length===0
              ? <EmptySaved label="No saved courses yet" sub="Tap 🔖 on any course to save it"/>
              : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedCourseItems.map(c=>(
                    <CourseCard key={c.id} c={c} type={c.progress!=null?"enrolled":"saved"}
                      onClick={c.progress!=null?()=>openCourse(c):undefined}
                      isSaved={true} onToggleSave={toggleSaveCourse}/>
                  ))}
                </div>
          )}

          {/* Saved Books */}
          {savedTab==="books"&&(
            savedBookItems.length===0
              ? <EmptySaved label="No saved books yet" sub="Tap 🔖 on any book to save it"/>
              : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedBookItems.map(b=>(
                    <DashBookCard key={b.id} b={b} isSaved={true} onToggleSave={toggleSaveBook}/>
                  ))}
                </div>
          )}

          {/* Saved Blogs */}
          {savedTab==="blogs"&&(
            savedBlogs.length===0
              ? <EmptySaved label="No saved blogs yet" sub="Tap 🔖 on any blog post to save it"/>
              : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedBlogs.map(b=>(
                    <DashBlogCard key={b.id} b={b} isSaved={true} onToggleSave={toggleSaveBlog}/>
                  ))}
                </div>
          )}
        </section>
      )}

    </div>
  )
}

function EmptySaved({label,sub}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl mb-3">🔖</div>
      <p className="font-bold text-slate-700 text-sm">{label}</p>
      <p className="text-xs text-slate-400 mt-1">{sub}</p>
    </div>
  )
}

// ─── PAGE: COURSES ────────────────────────────────────────────────────────────
function CoursesPage({go,openCourse}) {
  const [tab,setTab] = useState("current")
  const data = tab==="current"?ENROLLED:tab==="complete"?COMPLETED:SAVED
  const type = tab==="current"?"enrolled":tab==="complete"?"completed":"saved"
  const TABS = [["current","Current"],["complete","Completed"],["saved","Saved"]]
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 mb-0.5" style={{fontFamily:"'Outfit',sans-serif"}}>My Courses</h1>
          <p className="text-sm text-slate-400">Track and continue your learning</p>
        </div>
      </div>
      <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl w-fit mb-6 border border-slate-200">
        {TABS.map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)}
            className={"px-4 py-2 rounded-xl text-xs font-bold border-none cursor-pointer transition-all "+(tab===k?"bg-indigo-600 text-white shadow-md":"bg-transparent text-slate-500 hover:text-slate-700")}>
            {l}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((c,i)=>(
          <CourseCard key={i} c={c} type={type} onClick={type==="enrolled"?()=>openCourse(c):undefined}/>
        ))}
      </div>
    </div>
  )
}

// ─── PAGE: EXPLORE (kept for reference, not in sidebar) ───────────────────────
function ExplorePage() {
  const [q,setQ] = useState("")
  const [cat,setCat] = useState("All")
  const [enrolled,setEnrolled] = useState([])
  const list = EXPLORE.filter(c=>(cat==="All"||c.cat===cat)&&c.title.toLowerCase().includes(q.toLowerCase()))
  return (
    <div>
      <h1 className="text-2xl font-black text-slate-900 mb-0.5" style={{fontFamily:"'Outfit',sans-serif"}}>Explore Courses</h1>
      <p className="text-sm text-slate-400 mb-5">Discover new skills</p>
      <div className="relative mb-4">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search courses…"
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm outline-none focus:border-indigo-400 shadow-sm"/>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {CATS.map(c=>(
          <button key={c} onClick={()=>setCat(c)}
            className={"px-4 py-1.5 rounded-full text-xs font-bold border cursor-pointer transition-all "+(cat===c?"bg-indigo-600 text-white border-indigo-600":"bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600")}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map(c=>{
          const col = COLOR[c.color]||COLOR.indigo
          return (
            <div key={c.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all">
              <div className="relative" style={{height:148}}>
                <img src={c.img} className="w-full h-full object-cover" alt={c.title}/>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"/>
                <span className={"absolute top-2.5 left-2.5 text-white text-xs font-bold px-2.5 py-1 rounded-full "+col.bg}>{c.cat}</span>
                <span className="absolute top-2.5 right-2.5 bg-white/90 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-full">{c.price}</span>
              </div>
              <div className="p-4">
                <p className="font-black text-sm text-slate-900 truncate mb-0.5" style={{fontFamily:"'Outfit',sans-serif"}}>{c.title}</p>
                <p className="text-xs text-slate-400 mb-3">{c.instructor}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-500">★ {c.rating} <span className="text-slate-400 font-normal">({c.students})</span></span>
                  <button onClick={()=>setEnrolled(p=>p.includes(c.id)?p:p.concat(c.id))}
                    className={"px-3.5 py-1.5 rounded-lg text-xs font-bold text-white border-none cursor-pointer "+(enrolled.includes(c.id)?"bg-emerald-500":col.bg)}>
                    {enrolled.includes(c.id)?"✓ Enrolled":"Enroll"}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── PAGE: BLOG (API-connected) ───────────────────────────────────────────────
const API_BASE = "https://khdemy.anajak-khmer.site"

function BlogPage({token, savedBlogs, toggleSaveBlog}) {
  const [posts,setPosts]       = useState([])
  const [loading,setLoading]   = useState(true)
  const [error,setError]       = useState(null)
  const [selected,setSelected] = useState(null)
  const [mode,setMode]         = useState("list") // list | write | edit
  const [draft,setDraft]       = useState({title:"",content:"",tag:"",thumbnail_url:""})
  const [editId,setEditId]     = useState(null)
  const [saving,setSaving]     = useState(false)
  const [page,setPage]         = useState(1)
  const [total,setTotal]       = useState(0)
  const LIMIT = 9

  const headers = {"Content-Type":"application/json","Authorization":`Bearer ${token}`}

  // ── Fetch blogs ────────────────────────────────────────────────────────────
  const fetchBlogs = async (p=1) => {
    setLoading(true); setError(null)
    try {
      const res = await fetch(`${API_BASE}/blogs?page=${p}&limit=${LIMIT}`,{headers})
      if(!res.ok) throw new Error("Failed to load blogs")
      const data = await res.json()
      setPosts(data.blogs||[])
      setTotal(data.total||0)
      setPage(p)
    } catch(e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{fetchBlogs(1)},[])

  // ── Create blog ────────────────────────────────────────────────────────────
  const handleCreate = async () => {
    if(!draft.title.trim()||!draft.content.trim()) return
    setSaving(true)
    try {
      const body = {
        title: draft.title,
        content: draft.content,
        thumbnail_url: draft.thumbnail_url||"https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=340&fit=crop",
        tags: draft.tag ? [{name:draft.tag}] : []
      }
      const res = await fetch(`${API_BASE}/blogs`,{method:"POST",headers,body:JSON.stringify(body)})
      if(!res.ok) throw new Error("Failed to create blog")
      setDraft({title:"",content:"",tag:"",thumbnail_url:""})
      setMode("list")
      fetchBlogs(1)
    } catch(e) {
      alert("Error: "+e.message)
    } finally {
      setSaving(false)
    }
  }

  // ── Update blog ────────────────────────────────────────────────────────────
  const handleUpdate = async () => {
    if(!draft.title.trim()||!draft.content.trim()) return
    setSaving(true)
    try {
      const body = {
        title: draft.title,
        content: draft.content,
        thumbnail_url: draft.thumbnail_url,
        tags: draft.tag ? [{name:draft.tag}] : []
      }
      const res = await fetch(`${API_BASE}/blogs/${editId}`,{method:"PATCH",headers,body:JSON.stringify(body)})
      if(!res.ok) throw new Error("Failed to update blog")
      setDraft({title:"",content:"",tag:"",thumbnail_url:""})
      setEditId(null); setMode("list")
      fetchBlogs(page)
    } catch(e) {
      alert("Error: "+e.message)
    } finally {
      setSaving(false)
    }
  }

  // ── Delete blog ────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if(!window.confirm("Delete this post?")) return
    try {
      const res = await fetch(`${API_BASE}/blogs/${id}`,{method:"DELETE",headers})
      if(!res.ok) throw new Error("Failed to delete")
      if(selected?.id===id) setSelected(null)
      fetchBlogs(page)
    } catch(e) {
      alert("Error: "+e.message)
    }
  }

  const openEdit = (b,e) => {
    e.stopPropagation()
    setDraft({title:b.title,content:b.content,tag:b.tags?.[0]?.name||"",thumbnail_url:b.thumbnail_url||""})
    setEditId(b.id); setMode("edit")
  }

  const totalPages = Math.ceil(total/LIMIT)

  // ── Detail view ────────────────────────────────────────────────────────────
  if(selected) return (
    <div className="max-w-2xl">
      <button onClick={()=>setSelected(null)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6 border-none bg-transparent cursor-pointer">← Back to Blog</button>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {selected.thumbnail_url&&<img src={selected.thumbnail_url} className="w-full h-52 object-cover" alt={selected.title} onError={e=>e.target.style.display='none'}/>}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {selected.tags?.map(t=>(
              <span key={t.id} className="bg-indigo-50 text-indigo-600 text-xs font-bold px-2.5 py-1 rounded-full">{t.name}</span>
            ))}
            <span className="text-xs text-slate-400">{new Date(selected.created_at).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-4" style={{fontFamily:"'Outfit',sans-serif"}}>{selected.title}</h1>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{selected.content}</p>
          <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-slate-100">
            <button onClick={e=>openEdit(selected,e)} className="px-4 py-2 rounded-xl text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 cursor-pointer hover:bg-indigo-100">✏️ Edit</button>
            <button onClick={()=>handleDelete(selected.id)} className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 cursor-pointer hover:bg-rose-100">🗑 Delete</button>
          </div>
        </div>
      </div>
    </div>
  )

  // ── Write / Edit form ──────────────────────────────────────────────────────
  if(mode==="write"||mode==="edit") return (
    <div className="max-w-2xl">
      <button onClick={()=>{setMode("list");setDraft({title:"",content:"",tag:"",thumbnail_url:""});setEditId(null)}}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6 border-none bg-transparent cursor-pointer">← Back to Blog</button>
      <h1 className="text-2xl font-black text-slate-900 mb-6" style={{fontFamily:"'Outfit',sans-serif"}}>{mode==="edit"?"Edit Post":"Write New Post"}</h1>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
        <div>
          <label className="block text-[10px] font-black text-slate-400 mb-1.5 tracking-widest uppercase">Title *</label>
          <input value={draft.title} onChange={e=>setDraft(d=>({...d,title:e.target.value}))} placeholder="Post title…"
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-indigo-400 transition-all"/>
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 mb-1.5 tracking-widest uppercase">Tag</label>
          <input value={draft.tag} onChange={e=>setDraft(d=>({...d,tag:e.target.value}))} placeholder="e.g. React, Python…"
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-indigo-400 transition-all"/>
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 mb-1.5 tracking-widest uppercase">Thumbnail URL</label>
          <input value={draft.thumbnail_url} onChange={e=>setDraft(d=>({...d,thumbnail_url:e.target.value}))} placeholder="https://…"
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-indigo-400 transition-all"/>
          {draft.thumbnail_url&&<img src={draft.thumbnail_url} className="mt-2 w-full h-32 object-cover rounded-xl border border-slate-200" onError={e=>e.target.style.display='none'} alt="preview"/>}
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 mb-1.5 tracking-widest uppercase">Content *</label>
          <textarea value={draft.content} onChange={e=>setDraft(d=>({...d,content:e.target.value}))} rows={10} placeholder="Share your thoughts…"
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-indigo-400 resize-y transition-all"/>
        </div>
        <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
          <button onClick={()=>{setMode("list");setDraft({title:"",content:"",tag:"",thumbnail_url:""});setEditId(null)}}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-500 border border-slate-200 bg-white cursor-pointer">Discard</button>
          <button onClick={mode==="edit"?handleUpdate:handleCreate}
            disabled={saving||!draft.title.trim()||!draft.content.trim()}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 border-none cursor-pointer shadow-sm">
            {saving?"Saving…":mode==="edit"?"Save Changes ✓":"Publish ✓"}
          </button>
        </div>
      </div>
    </div>
  )

  // ── List view ──────────────────────────────────────────────────────────────
  return (
    <div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 leading-tight" style={{fontFamily:"'Outfit',sans-serif"}}>My Blog</h1>
          <p className="text-sm text-slate-400 mt-0.5">{total} post{total!==1?"s":""} published</p>
        </div>
        <button onClick={()=>setMode("write")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 border-none cursor-pointer shadow-sm transition-colors">
          <span>✍️</span> New Post
        </button>
      </div>

      {/* Loading skeletons */}
      {loading&&(
        <div className="flex flex-col gap-4">
          {[1,2,3].map(i=>(
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 flex gap-5 animate-pulse">
              <div className="w-36 h-24 rounded-xl bg-slate-100 flex-shrink-0"/>
              <div className="flex-1"><div className="h-4 bg-slate-100 rounded mb-2 w-3/4"/><div className="h-3 bg-slate-100 rounded w-1/2"/></div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error&&(
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-3xl mb-4">⚠️</div>
          <p className="text-slate-800 font-bold mb-1">Could not load posts</p>
          <p className="text-slate-400 text-sm mb-5">{error}</p>
          <button onClick={()=>fetchBlogs(1)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 border-none cursor-pointer">Retry</button>
        </div>
      )}

      {/* Posts — mixed layout: first post big, rest as list rows */}
      {!loading&&!error&&(
        <>
          {posts.length===0&&(
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl mb-4">✍️</div>
              <p className="text-slate-800 font-bold mb-1">No posts yet</p>
              <p className="text-slate-400 text-sm mb-5">Share your first learning story</p>
              <button onClick={()=>setMode("write")} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 border-none cursor-pointer">Write First Post</button>
            </div>
          )}

          {posts.length>0&&(
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map(b=>(
                <DashBlogCard key={b.id} b={b}
                  isSaved={savedBlogs.some(s=>s.id===b.id)}
                  onToggleSave={toggleSaveBlog}
                  onClick={()=>setSelected(b)}/>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages>1&&(
            <div className="flex items-center justify-center gap-2 mt-8">
              <button onClick={()=>fetchBlogs(page-1)} disabled={page===1}
                className="px-4 py-2 rounded-xl text-sm font-bold text-slate-500 border border-slate-200 bg-white cursor-pointer disabled:opacity-30 hover:border-indigo-300 transition-colors">← Prev</button>
              <span className="text-sm text-slate-400 px-3">{page} / {totalPages}</span>
              <button onClick={()=>fetchBlogs(page+1)} disabled={page===totalPages}
                className="px-4 py-2 rounded-xl text-sm font-bold text-slate-500 border border-slate-200 bg-white cursor-pointer disabled:opacity-30 hover:border-indigo-300 transition-colors">Next →</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// ─── PAGE: PROGRESS ───────────────────────────────────────────────────────────
function ProgressPage({savedBooks, toggleSaveBook}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-black text-slate-900 mb-0.5" style={{fontFamily:"'Outfit',sans-serif"}}>My Progress</h1>
        <p className="text-sm text-slate-400">Learning analytics and performance overview</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {label:"Study Hours",value:"47h",  icon:"⏱",bg:"bg-indigo-50", text:"text-indigo-600"},
          {label:"Quiz Score", value:"88%",  icon:"📝",bg:"bg-emerald-50",text:"text-emerald-600"},
          {label:"Streak",     value:"7 days",icon:"🔥",bg:"bg-amber-50", text:"text-amber-600"},
          {label:"Points",     value:"1,240",icon:"⭐",bg:"bg-violet-50", text:"text-violet-600"},
        ].map((s,i)=>(
          <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center gap-3 shadow-sm">
            <div className={"w-11 h-11 rounded-2xl flex items-center justify-center text-lg flex-shrink-0 "+s.bg}>{s.icon}</div>
            <div>
              <p className={"text-2xl font-black leading-none "+s.text} style={{fontFamily:"'Outfit',sans-serif"}}>{s.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <h2 className="text-base font-black text-slate-900 mb-5" style={{fontFamily:"'Outfit',sans-serif"}}>Course Progress</h2>
        <div className="flex flex-col gap-4">
          {ENROLLED.map(c=>{
            const col = COLOR[c.color]||COLOR.indigo
            return (
              <div key={c.id} className="flex items-center gap-4">
                <img src={c.img} className="w-11 h-11 rounded-xl object-cover flex-shrink-0" alt={c.title}/>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1.5">
                    <p className="font-bold text-sm text-slate-900 truncate max-w-xs">{c.title}</p>
                    <span className={"text-sm font-black "+col.text}>{c.progress}%</span>
                  </div>
                  <ProgressBar pct={c.progress} colorKey={c.color} h="h-2"/>
                  <p className="text-xs text-slate-400 mt-1">{c.done} of {c.total} lessons</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <h2 className="text-base font-black text-slate-900 mb-5" style={{fontFamily:"'Outfit',sans-serif"}}>My Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BOOKS.map(b=>(
            <DashBookCard key={b.id} b={b}
              isSaved={savedBooks.includes(b.id)}
              onToggleSave={toggleSaveBook}/>
          ))}
        </div>
      </div>
    </div>
  )
}
function ProfilePage({token}) {
  const [userId, setUserId] = useState(null)
  const [form, setForm] = useState({
    name:"", email:"", phone:"", dob:"", gender:"", address:"", bio:"", joined:""
  })
  const [imgErr, setImgErr]   = useState(false)
  const [avatar, setAvatar]   = useState(STUDENT.avatar)
  const [pw,  setPw]          = useState({old:"",n1:"",n2:""})
  const [msg, setMsg]         = useState("")
  const [saved, setSaved]     = useState(false)
  const [saving, setSaving]   = useState(false)
  const [loadingProfile, setLP] = useState(true)

  const headers = {"Content-Type":"application/json","Authorization":`Bearer ${token}`}
  const initials = (form.name||"?").split(" ").map(w=>w[0]).slice(0,2).join("")

  // Load real profile from API
  useEffect(()=>{
    fetch(`${API_BASE}/users/me`,{headers})
      .then(r=>r.json())
      .then(d=>{
        const u = d.data||d
        setUserId(u.id||u.user_id)
        setForm({
          name:    u.full_name||u.name||"",
          email:   u.email||"",
          phone:   u.phone_number||u.phone||"",
          dob:     u.date_of_birth||u.dob||"",
          gender:  u.gender||"",
          address: u.address||"",
          bio:     u.bio||"",
          joined:  u.created_at ? new Date(u.created_at).toLocaleDateString("en-US",{month:"long",year:"numeric"}) : "",
        })
        if(u.profile_url||u.avatar) setAvatar(u.profile_url||u.avatar)
      })
      .catch(()=>{})
      .finally(()=>setLP(false))
  },[token])

  const handleSave = async () => {
    setSaving(true)
    try {
      const body = {full_name:form.name, gender:form.gender?.toLowerCase(), bio:form.bio, address:form.address, profile_url:avatar}
      const res = await fetch(`${API_BASE}/users/${userId}`,{method:"PATCH",headers,body:JSON.stringify(body)})
      if(!res.ok) throw new Error("Failed to save")
      setSaved(true); setTimeout(()=>setSaved(false),2500)
    } catch(e){ setMsg("❌ "+e.message) } finally { setSaving(false) }
  }

  const changePw = () => {
    if(!pw.old||!pw.n1||!pw.n2){ setMsg("Please fill all fields."); return }
    if(pw.n1!==pw.n2){ setMsg("Passwords don't match!"); return }
    setMsg("✅ Password changed!"); setPw({old:"",n1:"",n2:""})
    setTimeout(()=>setMsg(""),3000)
  }

  const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-300"
  const labelCls = "block text-[10px] font-bold text-slate-400 mb-1 tracking-widest uppercase"

  if(loadingProfile) return (
    <div className="flex items-center justify-center py-24">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"/>
        <p className="text-sm text-slate-400">Loading profile…</p>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col gap-4 max-w-2xl">

      {/* ── Top profile card ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center shadow-md">
              {!imgErr
                ? <img src={avatar} className="w-full h-full object-cover object-top" alt="profile" onError={()=>setImgErr(true)}/>
                : <span className="text-white font-black text-2xl" style={{fontFamily:"'Outfit',sans-serif"}}>{initials}</span>
              }
            </div>
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white"/>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-black text-slate-900 leading-tight" style={{fontFamily:"'Outfit',sans-serif"}}>{form.name||"—"}</h2>
            <p className="text-sm font-semibold text-indigo-500 mb-2">{STUDENT.role}</p>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">{form.bio||"No bio yet."}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-400">
              {form.address&&<span>📍 {form.address}</span>}
              {form.joined&&<span>📅 Joined {form.joined}</span>}
              <span>🕐 Active 2h ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Personal Information ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h2 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-4" style={{fontFamily:"'Outfit',sans-serif"}}>
          👤 Personal Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Name */}
          <div>
            <label className={labelCls}>Name</label>
            <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}
              placeholder="Full name" className={inputCls}/>
          </div>

          {/* Address */}
          <div>
            <label className={labelCls}>Address</label>
            <input value={form.address} onChange={e=>setForm(f=>({...f,address:e.target.value}))}
              placeholder="Your address" className={inputCls}/>
          </div>

          {/* Date of Birth */}
          <div>
            <label className={labelCls}>Date of Birth</label>
            <input value={form.dob} onChange={e=>setForm(f=>({...f,dob:e.target.value}))}
              placeholder="DD / MM / YYYY" className={inputCls}/>
          </div>

          {/* Email */}
          <div>
            <label className={labelCls}>Email</label>
            <input value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}
              placeholder="your@email.com" className={inputCls}/>
          </div>

          {/* Gender */}
          <div>
            <label className={labelCls}>Gender</label>
            <select value={form.gender} onChange={e=>setForm(f=>({...f,gender:e.target.value}))}
              className={inputCls+" appearance-none cursor-pointer"}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className={labelCls}>Phone</label>
            <input value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}
              placeholder="+855 xx xxx xxx" className={inputCls}/>
          </div>

          {/* Bio full width */}
          <div className="col-span-1 sm:col-span-2">
            <label className={labelCls}>Bio</label>
            <textarea value={form.bio} onChange={e=>setForm(f=>({...f,bio:e.target.value}))}
              rows={3} placeholder="Tell us about yourself…"
              className={inputCls+" resize-none"}/>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
          {saved&&<span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl">✓ Saved!</span>}
          {msg&&!msg.startsWith("✅")&&<span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl">{msg}</span>}
          <button onClick={handleSave} disabled={saving}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 border-none cursor-pointer shadow-sm transition-colors">
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* ── Change Password ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h2 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-4" style={{fontFamily:"'Outfit',sans-serif"}}>
          🔒 Change Password
        </h2>
        <div className="flex flex-col gap-3">
          <input type="password" placeholder="Old Password" value={pw.old}
            onChange={e=>setPw(p=>({...p,old:e.target.value}))} className={inputCls}/>
          <input type="password" placeholder="New Password" value={pw.n1}
            onChange={e=>setPw(p=>({...p,n1:e.target.value}))} className={inputCls}/>
          <input type="password" placeholder="Confirm Password" value={pw.n2}
            onChange={e=>setPw(p=>({...p,n2:e.target.value}))} className={inputCls}/>
        </div>
        {msg&&<p className={"text-xs mt-2 font-semibold "+(msg.startsWith("✅")?"text-emerald-600":"text-rose-500")}>{msg}</p>}
        <div className="flex justify-end mt-4">
          <button onClick={changePw}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 border-none cursor-pointer shadow-sm transition-colors">
            Save Change
          </button>
        </div>
      </div>

    </div>
  )
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({onLogin}) {
  const [form,    setForm]    = useState({identifier:"",password:""})
  const [error,   setError]   = useState("")
  const [loading, setLoading] = useState(false)
  const [showPw,  setShowPw]  = useState(false)

  const handleLogin = async () => {
    if(!form.identifier||!form.password){setError("Please fill all fields.");return}
    setLoading(true); setError("")
    try {
      const res  = await fetch(`${API_BASE}/auth/login`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({identifier:form.identifier,password:form.password})
      })
      const data = await res.json()
      if(!res.ok) throw new Error(data.detail||data.message||"Login failed")
      const tok  = data.access_token||data.token||data.data?.access_token||""
      if(!tok) throw new Error("No token received from server")
      onLogin(tok)
    } catch(e){
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@700;800;900&display=swap');*{box-sizing:border-box}`}</style>
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg mb-3">
            <img src="/logokhdemy.png" className="w-full h-full object-cover" alt="Khdemy"
              onError={e=>{e.target.style.display="none"}}/>
          </div>
          <p className="font-black text-2xl text-slate-900" style={{fontFamily:"'Outfit',sans-serif"}}>Khdemy</p>
          <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">Student Portal</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <h1 className="text-xl font-black text-slate-900 mb-1" style={{fontFamily:"'Outfit',sans-serif"}}>Welcome back 👋</h1>
          <p className="text-sm text-slate-400 mb-6">Sign in to continue learning</p>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 mb-1.5 tracking-widest uppercase">Email or Username</label>
              <input value={form.identifier} onChange={e=>setForm(f=>({...f,identifier:e.target.value}))}
                placeholder="you@email.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"/>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 mb-1.5 tracking-widest uppercase">Password</label>
              <div className="relative">
                <input type={showPw?"text":"password"} value={form.password}
                  onChange={e=>setForm(f=>({...f,password:e.target.value}))}
                  onKeyDown={e=>e.key==="Enter"&&handleLogin()}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"/>
                <button type="button" onClick={()=>setShowPw(p=>!p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer text-sm">
                  {showPw?"🙈":"👁"}
                </button>
              </div>
            </div>
          </div>

          {error&&(
            <div className="mt-3 px-4 py-2.5 rounded-xl bg-rose-50 border border-rose-200">
              <p className="text-xs font-semibold text-rose-600">⚠️ {error}</p>
            </div>
          )}

          <button onClick={handleLogin} disabled={loading}
            className="mt-5 w-full py-3 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-50 border-none cursor-pointer shadow-sm transition-all">
            {loading
              ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block"/>Signing in…</span>
              : "Sign In →"}
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-5">
          Don't have an account? Contact your teacher to register.
        </p>
      </div>
    </div>
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function StudentDashboard({ token: propToken = "" }) {
  const [token, setToken]    = useState(propToken || "BYPASS")
  const [page,setPage]       = useState("home")
  const [savedCourses, setSavedCourses] = useState(SAVED_COURSES_INIT)
  const [savedBooks,   setSavedBooks]   = useState([1,2])
  const [savedBlogs,   setSavedBlogs]   = useState([])

  const toggleSaveCourse = id => setSavedCourses(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id])
  const toggleSaveBook   = id => setSavedBooks(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id])
  const toggleSaveBlog   = b  => setSavedBlogs(p => p.some(x=>x.id===b.id) ? p.filter(x=>x.id!==b.id) : [...p,b])
  const [notifOpen,setNO]    = useState(false)
  const [sidebarOpen,setSB]  = useState(false)
  const [selected,setSel]    = useState(null)
  const notifRef             = useRef(null)
  const unread               = NOTIFS.filter(n=>n.unread).length

  const handleLogout = () => { setPage("home") }

  const go = p => { setPage(p); setNO(false); setSB(false) }
  const openCourse = c => { setSel(c); setPage("lesson"); setNO(false); setSB(false) }

  const PAGE_TITLE = {home:"Dashboard",courses:"My Courses",blog:"Blog",progress:"Progress",profile:"Profile",lesson:selected?.title||"Lesson"}

  useEffect(()=>{
    const fn = e=>{ if(notifRef.current&&!notifRef.current.contains(e.target)) setNO(false) }
    document.addEventListener("mousedown",fn)
    return ()=>document.removeEventListener("mousedown",fn)
  },[])

  return (
    <div className="flex min-h-screen bg-slate-50" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@700;800;900&display=swap');
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:99px}
        button,input,select,textarea{font-family:inherit}
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        @keyframes slideIn{from{transform:translateX(-100%)}to{transform:translateX(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .animate-spin{animation:spin .7s linear infinite}
      `}</style>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-screen border-r border-slate-200 shadow-sm z-40" style={{width:248}}>
        <SidebarNav page={page} go={go} onClose={()=>setSB(false)} onLogout={handleLogout}/>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen&&(
        <>
          <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={()=>setSB(false)}/>
          <aside className="fixed top-0 left-0 h-screen border-r border-slate-200 shadow-xl z-50 lg:hidden flex flex-col" style={{width:260,animation:"slideIn .2s ease"}}>
            <SidebarNav page={page} go={go} onClose={()=>setSB(false)} onLogout={handleLogout}/>
          </aside>
        </>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col lg:pl-[248px]">
        <header className="bg-white border-b border-slate-200 px-4 lg:px-7 h-16 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={()=>setSB(true)} className="lg:hidden w-9 h-9 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 cursor-pointer border-none">☰</button>
            <div>
              <h2 className="text-base font-black text-slate-900 leading-tight" style={{fontFamily:"'Outfit',sans-serif"}}>{PAGE_TITLE[page]}</h2>
              <p className="text-xs text-slate-400 hidden sm:block">{new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div ref={notifRef} className="relative">
              <button onClick={()=>setNO(o=>!o)}
                className={"relative w-9 h-9 rounded-xl border flex items-center justify-center text-base cursor-pointer "+(notifOpen?"border-indigo-300 bg-indigo-50":"border-slate-200 bg-slate-50 hover:bg-slate-100")}>
                🔔
                {unread>0&&<span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"/>}
              </button>
              {notifOpen&&(
                <div className="absolute right-0 top-11 w-72 sm:w-80 bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <p className="font-black text-sm text-slate-900" style={{fontFamily:"'Outfit',sans-serif"}}>Notifications</p>
                    <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{unread} new</span>
                  </div>
                  {NOTIFS.map(n=>(
                    <div key={n.id} className={"flex items-start gap-3 px-4 py-3 border-b border-slate-50 "+(n.unread?"bg-indigo-50/60":"bg-white")}>
                      <span className="text-lg flex-shrink-0">{n.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900">{n.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{n.body}</p>
                        <p className="text-xs text-slate-300 mt-0.5">{n.time} ago</p>
                      </div>
                      {n.unread&&<div className="w-2 h-2 rounded-full bg-indigo-500 mt-1 flex-shrink-0"/>}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <AvatarImg size={36} ring onClick={()=>go("profile")}/>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className={page==="lesson"?"":"p-4 lg:p-7 max-w-screen-xl"}>
            {page==="home"     &&<HomePage     go={go} openCourse={openCourse} token={token} savedCourses={savedCourses} savedBooks={savedBooks} savedBlogs={savedBlogs} toggleSaveCourse={toggleSaveCourse} toggleSaveBook={toggleSaveBook} toggleSaveBlog={toggleSaveBlog}/>}
            {page==="courses"  &&<CoursesPage  go={go} openCourse={openCourse}/>}
            {page==="blog"     &&<BlogPage token={token} savedBlogs={savedBlogs} toggleSaveBlog={toggleSaveBlog}/>}
            {page==="progress" &&<ProgressPage savedBooks={savedBooks} toggleSaveBook={toggleSaveBook}/>}
            {page==="profile"  &&<ProfilePage token={token}/>}
            {page==="lesson"   &&<MyCourse course={selected} onBack={()=>go("courses")}/>}
          </div>
        </main>

        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-30 flex">
          {BOTTOM_NAV.map(n=>{
            const act = page===n.id
            return (
              <button key={n.id} onClick={()=>go(n.id)}
                className={"flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 border-none cursor-pointer "+(act?"bg-indigo-50":"bg-transparent")}>
                <span className="text-base">{n.emoji}</span>
                <span className={"text-[10px] font-semibold "+(act?"text-indigo-600":"text-slate-400")}>{n.label}</span>
              </button>
            )
          })}
        </nav>
        <div className="lg:hidden h-16"/>
      </div>
    </div>
  )
}