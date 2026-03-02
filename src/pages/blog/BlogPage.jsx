import { useEffect, useRef, useState } from "react"

const BLOGS = [
  // PAGE 1 (1–8)
  { id:1,  title:"UX/UI",              cardTitle:"Why Good Design Matters",                desc:"Intuitive design Better experience",          author:"Sarika", img:"https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&q=80" },
  { id:2,  title:"React",              cardTitle:"Build Modern Web Apps with React",        desc:"Building fast and modern web applications.",  author:"Sarika", img:"https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&q=80" },
  { id:3,  title:"PHP",                cardTitle:"Secure & Dynamic Backend with PHP",       desc:"Developing secure and dynamic backend.",      author:"Sarika", img:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80" },
  { id:4,  title:"JavaScript",         cardTitle:"JavaScript for Interactive Web",          desc:"Dynamic web Interactive features",            author:"Sarika", img:"https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&q=80" },
  { id:5,  title:"Python",             cardTitle:"Analyze Real-World Data with Python",     desc:"Analyze and visualize real-world datasets.",  author:"Sarika", img:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80" },
  { id:6,  title:"Node.js",            cardTitle:"Scalable Server-Side Apps in Node",       desc:"Build fast, scalable server-side apps.",      author:"Sarika", img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" },
  { id:7,  title:"Flutter",            cardTitle:"Cross-Platform Apps with Flutter",        desc:"Cross-platform apps with one codebase.",      author:"Sarika", img:"https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=80" },
  { id:8,  title:"AI & ML",            cardTitle:"Getting Started with AI & ML",            desc:"Fundamentals of models and training data.",   author:"Sarika", img:"https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&q=80" },
  // PAGE 2 (9–16)
  { id:9,  title:"Mobile-First",       cardTitle:"Design for Every Screen Size",            desc:"Responsive learning apps for all devices.",   author:"Sarika", img:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80" },
  { id:10, title:"VR & AR",            cardTitle:"Immersive Learning with VR & AR",         desc:"Immersive learning made interactive.",         author:"Sarika", img:"https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&q=80" },
  { id:11, title:"Gamification",       cardTitle:"Boost Engagement with Game Design",       desc:"Boost engagement with rewards.",               author:"Sarika", img:"https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&q=80" },
  { id:12, title:"AI-Powered Learning",cardTitle:"Smart Personalized Learning with AI",     desc:"Smart, personalized learning platforms.",     author:"Sarika", img:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80" },
  { id:13, title:"TypeScript",         cardTitle:"Type-Safe Code with TypeScript",          desc:"Write safer and scalable JavaScript code.",   author:"Sarika", img:"https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&q=80" },
  { id:14, title:"Docker",             cardTitle:"Containerize Apps with Docker",           desc:"Ship apps anywhere with containers.",         author:"Sarika", img:"https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&q=80" },
  { id:15, title:"GraphQL",            cardTitle:"Modern APIs with GraphQL",                desc:"Query exactly the data you need.",            author:"Sarika", img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" },
  { id:16, title:"Next.js",            cardTitle:"Full-Stack React with Next.js",           desc:"SSR and SSG for production React apps.",      author:"Sarika", img:"https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=80" },
  // PAGE 3 (17–24)
  { id:17, title:"Vue.js",             cardTitle:"Build Reactive UIs with Vue",             desc:"Progressive framework for modern interfaces.",author:"Sarika", img:"https://images.unsplash.com/photo-1537884944318-390069bb8665?w=400&q=80" },
  { id:18, title:"Tailwind CSS",       cardTitle:"Rapid UI with Tailwind CSS",              desc:"Utility-first CSS for stunning designs.",     author:"Sarika", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { id:19, title:"Kubernetes",         cardTitle:"Orchestrate Containers with K8s",         desc:"Scale and manage containerized workloads.",   author:"Sarika", img:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80" },
  { id:20, title:"AWS",                cardTitle:"Deploy to the Cloud with AWS",            desc:"Build, deploy and scale on Amazon Cloud.",    author:"Sarika", img:"https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80" },
  { id:21, title:"MongoDB",            cardTitle:"NoSQL Databases with MongoDB",            desc:"Store and query flexible document data.",     author:"Sarika", img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" },
  { id:22, title:"PostgreSQL",         cardTitle:"Relational Data with PostgreSQL",         desc:"Powerful open-source SQL database mastery.",  author:"Sarika", img:"https://images.unsplash.com/photo-1489875347316-0d6a5d7f3b0a?w=400&q=80" },
  { id:23, title:"Git & GitHub",       cardTitle:"Version Control with Git & GitHub",       desc:"Collaborate and track code like a pro.",      author:"Sarika", img:"https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&q=80" },
  { id:24, title:"Cybersecurity",      cardTitle:"Protect Apps with Cybersecurity",        desc:"Defend against threats and vulnerabilities.", author:"Sarika", img:"https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=400&q=80" },
  // PAGE 4 (25–32)
  { id:25, title:"DevOps",             cardTitle:"Automate Everything with DevOps",         desc:"CI/CD pipelines and infrastructure as code.", author:"Sarika", img:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
  { id:26, title:"React Native",       cardTitle:"Native Mobile Apps with React Native",    desc:"Build iOS & Android with JavaScript.",        author:"Sarika", img:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80" },
  { id:27, title:"Figma",              cardTitle:"Design Faster and Smarter in Figma",      desc:"Collaborative UI design from scratch.",       author:"Sarika", img:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80" },
  { id:28, title:"Blockchain",         cardTitle:"Intro to Blockchain Development",         desc:"Build decentralized apps on the chain.",      author:"Sarika", img:"https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&q=80" },
  { id:29, title:"Web3",               cardTitle:"The Future of the Web with Web3",         desc:"Decentralized internet and dApps explained.", author:"Sarika", img:"https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&q=80" },
  { id:30, title:"Swift",              cardTitle:"Build iOS Apps with Swift",               desc:"Native Apple app development from zero.",     author:"Sarika", img:"https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&q=80" },
  { id:31, title:"Kotlin",             cardTitle:"Modern Android Apps with Kotlin",         desc:"Official language for Android development.",  author:"Sarika", img:"https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400&q=80" },
  { id:32, title:"Data Science",       cardTitle:"Turn Data into Decisions",                desc:"Explore, clean and model real datasets.",     author:"Sarika", img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
  // PAGE 5 (33–40)
  { id:33, title:"Redux",              cardTitle:"Master State Management with Redux",       desc:"Predictable state for complex React apps.",   author:"Sarika", img:"https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&q=80" },
  { id:34, title:"Three.js",           cardTitle:"3D Graphics on the Web with Three.js",    desc:"Create immersive 3D browser experiences.",   author:"Sarika", img:"https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&q=80" },
  { id:35, title:"Rust",               cardTitle:"Systems Programming with Rust",           desc:"Fast, memory-safe code for modern systems.",  author:"Sarika", img:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
  { id:36, title:"Go",                 cardTitle:"High-Performance APIs with Go",           desc:"Concurrent, blazing-fast backend services.",  author:"Sarika", img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" },
  { id:37, title:"Linux",              cardTitle:"Master the Linux Command Line",            desc:"Navigate and automate with the terminal.",   author:"Sarika", img:"https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&q=80" },
  { id:38, title:"Testing",            cardTitle:"Write Tests That Actually Work",           desc:"Unit, integration & E2E testing strategies.", author:"Sarika", img:"https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&q=80" },
  { id:39, title:"Prompt Engineering", cardTitle:"Get the Best from AI with Prompts",       desc:"Craft prompts that produce great results.",   author:"Sarika", img:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80" },
  { id:40, title:"Open Source",        cardTitle:"Contribute to Open Source Projects",      desc:"Give back and grow your developer career.",   author:"Sarika", img:"https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&q=80" },
]

const C = {
  primary:   "#2D2A8E",
  accent:    "#F5A623",
  accentBlue:"#0EA5E9",
  accentPink:"#FF2D87",
  secondary: "#E63946",
  btnBg:     "#FF6B6B",
  text:      "#111111",
  desc:      "#9B9BAA",
}

const CARD_COLORS = [
  { chip:"rgba(45,42,142,.1)",   text:"#2D2A8E" },
  { chip:"rgba(230,57,70,.1)",   text:"#E63946" },
  { chip:"rgba(245,166,35,.12)", text:"#F5A623" },
  { chip:"rgba(14,165,233,.1)",  text:"#0EA5E9" },
  { chip:"rgba(255,45,135,.1)",  text:"#FF2D87" },
  { chip:"rgba(255,107,107,.12)",text:"#FF6B6B" },
]

// Detect screen width for per-page count
function getPerPage() {
  if (typeof window === "undefined") return 8
  const w = window.innerWidth
  if (w >= 1025) return 8   // desktop: 4 cols × 2 rows = 8
  if (w >= 601)  return 9   // tablet:  3 cols × 3 rows = 9
  return 8                   // mobile:  2 cols × 4 rows = 8  → same 5 pages
}

// Smart pagination: always show max 5 page numbers centered around active
function getPageNumbers(activePage, totalPages) {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
  let start = Math.max(1, activePage - 2)
  let end   = start + 4
  if (end > totalPages) { end = totalPages; start = Math.max(1, end - 4) }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'Plus Jakarta Sans',sans-serif; }
  :root {
    --primary:#2D2A8E; --accent:#F5A623; --accent-pink:#FF2D87;
    --accent-blue:#0EA5E9; --text:#111111; --desc:#9B9BAA;
    --bg:#FFFFFF; --bg-text:#F5F5F5;
  }

  .bp { background:var(--bg); min-height:100vh; font-family:'Plus Jakarta Sans',sans-serif; color:var(--text); overflow-x:hidden; }
  .page-enter { animation:pageIn .4s cubic-bezier(.22,1,.36,1) both; }
  @keyframes pageIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

  /* ── HERO ── */
  .bp-hero { background:var(--primary); padding:0; position:relative; overflow:hidden; display:flex; align-items:stretch; }
  .bp-hero-orb { position:absolute; border-radius:50%; pointer-events:none; }
  .bp-hero-orb-drift  { animation:orbDrift  8s ease-in-out infinite alternate; }
  .bp-hero-orb-drift2 { animation:orbDrift2 10s ease-in-out infinite alternate; }

  .bp-hero-inner { display:grid; grid-template-columns:1fr 1fr; width:100%; max-width:1200px; margin:0 auto; padding:0 80px; position:relative; z-index:2; align-items:center; gap:48px; }
  .bp-hero-left { padding:40px 0; text-align:left; }
  .bp-hero-left * { text-align:left; }

  .bp-hero-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.22); color:#fff; font-size:10.5px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:5px 14px; border-radius:100px; margin-bottom:16px; width:fit-content; animation:badgeIn .7s cubic-bezier(.34,1.56,.64,1) both; }
  .bp-hero-badge-dot { width:6px; height:6px; border-radius:50%; background:var(--accent); flex-shrink:0; animation:pulse 2s ease-in-out .8s infinite; }
  .bp-hero-title { font-size:clamp(24px,3.2vw,38px); font-weight:900; line-height:1.1; letter-spacing:-0.025em; color:#fff; margin-bottom:14px; animation:titleIn .8s .2s cubic-bezier(.22,1,.36,1) both; }
  .bp-hero-title .t-accent      { color:var(--accent); }
  .bp-hero-title .t-accent-pink { color:var(--accent-pink); }
  .bp-hero-desc { font-size:13.5px; color:rgba(255,255,255,.65); line-height:1.75; max-width:360px; margin-bottom:24px; animation:fadeUp .7s .38s ease both; }
  .bp-hero-btns { display:flex; gap:10px; flex-wrap:wrap; animation:fadeUp .7s .5s ease both; }

  .bp-hero-btn-primary { background:var(--accent); color:var(--primary); font-size:13px; font-weight:800; padding:10px 24px; border-radius:100px; border:none; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; transition:transform .2s,box-shadow .2s; box-shadow:0 4px 16px rgba(245,166,35,.4); position:relative; overflow:hidden; }
  .bp-hero-btn-primary::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent); transform:translateX(-100%); animation:shimmer 2.5s 1.2s ease-in-out infinite; }
  .bp-hero-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(245,166,35,.5); }
  .bp-hero-btn-ghost { background:rgba(255,255,255,.1); color:#fff; font-size:13px; font-weight:700; padding:10px 22px; border-radius:100px; border:1.5px solid rgba(255,255,255,.28); cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; transition:background .2s,transform .2s; }
  .bp-hero-btn-ghost:hover { background:rgba(255,255,255,.18); transform:translateY(-2px); }

  .bp-hero-stats { display:flex; gap:28px; margin-top:24px; padding-top:20px; border-top:1px solid rgba(255,255,255,.12); animation:fadeUp .7s .65s ease both; }
  .bp-hero-stats > div:nth-child(1) { animation:statIn .5s .7s  cubic-bezier(.34,1.56,.64,1) both; }
  .bp-hero-stats > div:nth-child(2) { animation:statIn .5s .8s  cubic-bezier(.34,1.56,.64,1) both; }
  .bp-hero-stats > div:nth-child(3) { animation:statIn .5s .9s  cubic-bezier(.34,1.56,.64,1) both; }
  .bp-hero-stats > div:nth-child(4) { animation:statIn .5s 1.0s cubic-bezier(.34,1.56,.64,1) both; }
  .bp-hero-stat-num { font-size:20px; font-weight:900; color:#fff; line-height:1; margin-bottom:3px; }
  .bp-hero-stat-num span { color:var(--accent); }
  .bp-hero-stat-lbl { font-size:10px; color:rgba(255,255,255,.5); font-weight:600; text-transform:uppercase; letter-spacing:.06em; }

  .bp-hero-right { position:relative; display:flex; align-items:center; justify-content:center; padding:28px 0; animation:slideRight .9s .25s cubic-bezier(.22,1,.36,1) both; }
  .bp-hero-img-card { width:100%; border-radius:18px; overflow:hidden; box-shadow:0 20px 50px rgba(0,0,0,.32); position:relative; z-index:1; animation:floatImg 5s 1.2s ease-in-out infinite; }
  .bp-hero-img-card img { width:100%; height:240px; object-fit:cover; display:block; }

  .bp-hero-pill { position:absolute; background:#fff; border-radius:14px; padding:10px 16px; display:flex; align-items:center; gap:9px; font-size:12.5px; font-weight:700; color:var(--text); box-shadow:0 8px 28px rgba(0,0,0,.15); z-index:2; white-space:nowrap; }
  .bp-hero-pill:nth-child(2) { animation:pillIn .6s .9s  cubic-bezier(.34,1.56,.64,1) both, floatPill1 4s   1.5s ease-in-out infinite; }
  .bp-hero-pill:nth-child(3) { animation:pillIn .6s 1.1s cubic-bezier(.34,1.56,.64,1) both, floatPill2 4.5s 1.7s ease-in-out infinite; }
  .bp-hero-pill:nth-child(4) { animation:pillIn .6s 1.3s cubic-bezier(.34,1.56,.64,1) both, floatPill1 5s   1.9s ease-in-out infinite; }
  .bp-hero-pill-icon { width:28px; height:28px; border-radius:8px; display:grid; place-items:center; font-size:14px; flex-shrink:0; }

  /* ── BLOG SECTION ── */
  .bp-section { padding:56px 80px 80px; max-width:1200px; margin:0 auto; }
  .bp-section-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:32px; flex-wrap:wrap; gap:12px; }
  .bp-section-title { font-size:clamp(20px,2.5vw,28px); font-weight:900; color:var(--text); letter-spacing:-0.025em; }
  .bp-section-title span { color:var(--primary); }
  .bp-section-count { font-size:13px; font-weight:600; color:var(--desc); background:var(--bg-text); border:1px solid #eee; padding:5px 14px; border-radius:100px; }

  /* ── GRID: 4 cols desktop, 3 cols tablet, 2 cols mobile ── */
  .bp-grid {
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:22px;
  }

  /* ── CARD ── */
  .bp-card { background:var(--bg); border-radius:16px; border:1px solid #f0f0f0; box-shadow:0 2px 12px rgba(0,0,0,.05); overflow:hidden; cursor:pointer; display:flex; flex-direction:column; opacity:0; transform:translateY(32px) scale(0.97); transition:opacity .55s ease,transform .55s ease,box-shadow .25s ease,border-color .25s; }
  .bp-card.visible { opacity:1; transform:translateY(0) scale(1); }
  .bp-card:hover { box-shadow:0 18px 44px rgba(45,42,142,.13)!important; transform:translateY(-6px) scale(1.015)!important; border-color:rgba(45,42,142,.2); }
  .bp-card-img-wrap { width:100%; height:155px; overflow:hidden; flex-shrink:0; background:#e2e8f0; position:relative; }
  .bp-card-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .5s ease; }
  .bp-card:hover .bp-card-img { transform:scale(1.08); }
  .bp-card-img-wrap::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,.12),transparent 60%); opacity:0; transition:opacity .3s; }
  .bp-card:hover .bp-card-img-wrap::after { opacity:1; }
  .bp-card-body { padding:16px 16px 18px; display:flex; flex-direction:column; flex:1; }
  .bp-card-chip { display:inline-block; font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; padding:3px 10px; border-radius:100px; margin-bottom:9px; width:fit-content; transition:transform .2s; }
  .bp-card:hover .bp-card-chip { transform:translateX(3px); }
  .bp-card-title { font-weight:800; color:var(--text); font-size:15px; margin-bottom:7px; line-height:1.35; transition:color .2s; }
  .bp-card:hover .bp-card-title { color:var(--primary); }
  .bp-card-desc { color:var(--desc); font-size:12.5px; line-height:1.65; margin-bottom:14px; flex:1; }
  .bp-card-author { display:flex; align-items:center; gap:8px; padding-top:12px; border-top:1px solid #f3f4f6; }
  .bp-card-av { width:26px; height:26px; border-radius:50%; overflow:hidden; flex-shrink:0; border:1.5px solid #e5e7eb; transition:border-color .2s,box-shadow .2s; }
  .bp-card:hover .bp-card-av { border-color:var(--primary); box-shadow:0 0 0 3px rgba(45,42,142,.1); }
  .bp-card-av img { width:100%; height:100%; object-fit:cover; object-position:top; display:block; }
  .bp-card-aname { font-size:12px; color:var(--desc); font-weight:600; }
  .bp-card-arrow { margin-left:auto; font-size:14px; color:var(--primary); opacity:0; transform:translateX(-6px); transition:opacity .2s,transform .2s; }
  .bp-card:hover .bp-card-arrow { opacity:1; transform:translateX(0); }

  /* ── PAGINATION ── */
  .bp-pagination { display:flex; justify-content:center; align-items:center; gap:6px; margin-top:56px; flex-wrap:nowrap; }
  .bp-page-btn { padding:9px 16px; border-radius:10px; border:1.5px solid #e5e7eb; background:var(--bg); color:var(--text); font-weight:500; font-size:14px; cursor:pointer; min-width:40px; text-align:center; transition:all .2s; font-family:'Plus Jakarta Sans',sans-serif; white-space:nowrap; flex-shrink:0; }
  .bp-page-btn:hover:not(.bp-page-active) { background:rgba(45,42,142,.06); border-color:rgba(45,42,142,.3); color:var(--primary); transform:translateY(-2px); }
  .bp-page-active { background:var(--primary); color:#fff; border-color:var(--primary); font-weight:700; box-shadow:0 4px 16px rgba(45,42,142,.35); }
  .bp-page-nav { color:var(--primary); font-weight:700; border-color:rgba(45,42,142,.25); }
  .bp-page-nav:hover:not(.bp-page-active) { background:rgba(45,42,142,.06); }

  /* ── KEYFRAMES ── */
  @keyframes badgeIn   { from{opacity:0;transform:translateX(-20px) scale(.9)} to{opacity:1;transform:translateX(0) scale(1)} }
  @keyframes titleIn   { from{opacity:0;transform:translateY(30px) skewY(2deg)} to{opacity:1;transform:translateY(0) skewY(0)} }
  @keyframes fadeUp    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideRight{ from{opacity:0;transform:translateX(48px) scale(.96)} to{opacity:1;transform:translateX(0) scale(1)} }
  @keyframes statIn    { from{opacity:0;transform:translateY(14px) scale(.85)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes pillIn    { from{opacity:0;transform:scale(.6) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes floatImg  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes floatPill1{ 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-6px) rotate(1deg)} }
  @keyframes floatPill2{ 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-5px) rotate(-1deg)} }
  @keyframes pulse     { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:.6} }
  @keyframes shimmer   { 0%{transform:translateX(-100%)} 60%,100%{transform:translateX(100%)} }
  @keyframes orbDrift  { from{transform:translate(0,0) scale(1)} to{transform:translate(30px,-20px) scale(1.08)} }
  @keyframes orbDrift2 { from{transform:translate(0,0) scale(1)} to{transform:translate(-20px,25px) scale(.95)} }

  /* ── RESPONSIVE ── */

  /* Tablet: 601px – 1024px → 3 columns × 3 rows = 9 cards */
  @media(max-width:1024px){
    .bp-hero-inner { padding:0 40px; gap:40px; }
    .bp-section { padding:44px 40px 72px; }
    .bp-hero-stats { gap:24px; }
    .bp-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 18px;
    }
  }

  @media(max-width:768px){
    .bp-hero-inner{grid-template-columns:1fr;padding:0 24px;gap:0}
    .bp-hero-left{padding:40px 0 28px}
    .bp-hero-right{padding:0 0 36px}
    .bp-hero-img-card img{height:200px}
    .bp-hero-stats{gap:20px}
    .bp-section{padding:36px 24px 60px}
    .bp-grid{
      grid-template-columns:repeat(3,1fr);
      gap:14px;
    }
    .bp-hero-pill{display:none}
    .bp-card-img-wrap{height:130px}
    .bp-card-body{padding:12px 12px 14px}
    .bp-card-title{font-size:13.5px}
    .bp-card-desc{font-size:12px}
  }

  @media(max-width:600px){
    .bp-grid{
      grid-template-columns:repeat(2,1fr);
      gap:12px;
    }
    .bp-card-img-wrap{height:128px}
  }

  @media(max-width:480px){
    .bp-hero-inner{padding:0 16px}
    .bp-hero-left{padding:32px 0 20px}
    .bp-section{padding:28px 14px 48px}
    .bp-grid{grid-template-columns:repeat(2,1fr);gap:12px}
    .bp-card-img-wrap{height:128px}
    .bp-hero-btns{gap:10px}
    .bp-hero-btn-primary,.bp-hero-btn-ghost{font-size:13px;padding:11px 22px}
    .bp-hero-stats{flex-wrap:wrap;gap:16px}
    .bp-pagination{gap:4px;margin-top:40px}
    .bp-page-btn{padding:7px 10px;font-size:12px;min-width:32px;border-radius:8px}
    .bp-page-nav{padding:7px 12px}
  }
  @media(max-width:360px){
    .bp-pagination{gap:3px}
    .bp-page-btn{padding:6px 8px;font-size:11.5px;min-width:28px}
    .bp-page-nav{padding:6px 10px}
  }
`

function useReveal(delay = 0) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return { ref, visible }
}

function BlogCard({ blog, index, onSelect }) {
  const { ref, visible } = useReveal((index % 4) * 85)
  const [saved, setSaved] = useState(false)
  const color = CARD_COLORS[index % CARD_COLORS.length]
  return (
    <div ref={ref} className={`bp-card${visible ? " visible" : ""}`} onClick={() => onSelect(blog)}>
      <div className="bp-card-img-wrap">
        <img className="bp-card-img" src={blog.img} alt={blog.title} />
      </div>
      <div className="bp-card-body">
        <span className="bp-card-chip" style={{ background:color.chip, color:color.text }}>{blog.title}</span>
        <p className="bp-card-title">{blog.cardTitle}</p>
        <p className="bp-card-desc">{blog.desc}</p>
        <div className="bp-card-author">
          <div className="bp-card-av"><img src="/sarikapro.jpg" alt="Sarika" /></div>
          <span className="bp-card-aname">{blog.author}</span>
          {/* Save bookmark button */}
          <button
            className="bp-save-btn"
            title={saved ? "Saved" : "Save"}
            onClick={e => { e.stopPropagation(); setSaved(s => !s) }}
            style={{ marginLeft:"auto", background:"none", border:"none", cursor:"pointer", padding:4, display:"flex", alignItems:"center", color: saved ? "#2D2A8E" : "#d1d5db", transition:"color .2s, transform .2s" }}
            onMouseEnter={e => e.currentTarget.style.transform="scale(1.25)"}
            onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export { BLOGS }

export default function BlogPage({ onSelectBlog }) {
  // Responsive perPage: 9 on tablet (3×3), 8 on desktop (4×2), 6 on mobile (2×3)
  const [perPage, setPerPage] = useState(getPerPage)
  const [activePage, setActivePage] = useState(1)

  // Update perPage on resize
  useEffect(() => {
    function handleResize() {
      const next = getPerPage()
      setPerPage(prev => {
        if (prev !== next) {
          setActivePage(1) // reset to page 1 when layout changes
          return next
        }
        return prev
      })
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalPages = Math.ceil(BLOGS.length / perPage)
  const visibleBlogs = BLOGS.slice((activePage - 1) * perPage, activePage * perPage)

  function goTo(p) {
    setActivePage(p)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <style>{css}</style>
      <main className="bp page-enter">

        {/* HERO */}
        <section className="bp-hero">
          <div className="bp-hero-orb bp-hero-orb-drift"  style={{ width:500, height:500, background:"#3F3CAE", opacity:.4, top:-180, left:-120, filter:"blur(90px)" }} />
          <div className="bp-hero-orb bp-hero-orb-drift2" style={{ width:300, height:300, background:C.accentPink, opacity:.15, top:"-10%", right:"30%", filter:"blur(70px)" }} />
          <div className="bp-hero-orb bp-hero-orb-drift"  style={{ width:250, height:250, background:C.accent, opacity:.18, bottom:"-60px", right:"10%", filter:"blur(60px)" }} />

          <div className="bp-hero-inner">
            <div className="bp-hero-left">
              <div className="bp-hero-badge"><span className="bp-hero-badge-dot" />KHdemy · Learn &amp; Grow</div>
              <h1 className="bp-hero-title">
                Empowering<br/>
                <span className="t-accent">Cambodia's</span> Future<br/>
                <span className="t-accent-pink">Through Smart</span><br/>
                Learning
              </h1>
              <p className="bp-hero-desc">KhDemy is transforming the way students learn, practice, and grow — one course at a time.</p>
              <div className="bp-hero-btns">
                <button className="bp-hero-btn-primary">Explore Courses</button>
                <button className="bp-hero-btn-ghost">Learn More →</button>
              </div>
              <div className="bp-hero-stats">
                {[{num:"120K",sfx:"+",lbl:"Learners"},{num:"850",sfx:"+",lbl:"Courses"},{num:"90",sfx:"+",lbl:"Countries"},{num:"98",sfx:"%",lbl:"Satisfaction"}].map(s => (
                  <div key={s.lbl}>
                    <div className="bp-hero-stat-num">{s.num}<span>{s.sfx}</span></div>
                    <div className="bp-hero-stat-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bp-hero-right">
              <div className="bp-hero-pill" style={{ top:10, left:-16 }}><div className="bp-hero-pill-icon" style={{ background:"rgba(245,166,35,.15)" }}>🎓</div>Foundation 5th</div>
              <div className="bp-hero-pill" style={{ bottom:30, left:-24 }}><div className="bp-hero-pill-icon" style={{ background:"rgba(14,165,233,.12)" }}>✅</div>98% Satisfaction</div>
              <div className="bp-hero-pill" style={{ top:"38%", right:-20 }}><div className="bp-hero-pill-icon" style={{ background:"rgba(255,45,135,.1)" }}>🌍</div>90+ Countries</div>
              <div className="bp-hero-img-card">
                <img src="https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=800&q=80" alt="Learning" />
                <div style={{ height:5, background:`linear-gradient(90deg,${C.accent},${C.accentPink},${C.accentBlue})` }} />
              </div>
            </div>
          </div>
        </section>

        {/* BLOG GRID */}
        <section className="bp-section">
          <div className="bp-section-head">
            <h2 className="bp-section-title">Related <span>Blog</span></h2>
            <span className="bp-section-count">Page {activePage} of {totalPages} · {BLOGS.length} articles</span>
          </div>
          <div className="bp-grid">
            {visibleBlogs.map((blog, i) => (
              <BlogCard key={blog.id} blog={blog} index={i} onSelect={onSelectBlog} />
            ))}
          </div>
          <div className="bp-pagination">
            <button className="bp-page-btn bp-page-nav" onClick={() => goTo(Math.max(1, activePage - 1))}>← Back</button>
            {getPageNumbers(activePage, totalPages).map(p => (
              <button key={p} className={`bp-page-btn${activePage===p?" bp-page-active":""}`} onClick={() => goTo(p)}>{p}</button>
            ))}
            <button className="bp-page-btn bp-page-nav" onClick={() => goTo(Math.min(totalPages, activePage + 1))}>Next →</button>
          </div>
        </section>

      </main>
    </>
  )
}