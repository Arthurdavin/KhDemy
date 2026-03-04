// // import { useEffect, useRef, useState } from "react"

// // const BLOGS = [
// //   { id:1,  title:"UX/UI",              cardTitle:"Why Good Design Matters",                desc:"Intuitive design Better experience",          author:"Sarika", img:"https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&q=80" },
// //   { id:2,  title:"React",              cardTitle:"Build Modern Web Apps with React",        desc:"Building fast and modern web applications.",  author:"Sarika", img:"https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&q=80" },
// //   { id:3,  title:"PHP",                cardTitle:"Secure & Dynamic Backend with PHP",       desc:"Developing secure and dynamic backend.",      author:"Sarika", img:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80" },
// //   { id:4,  title:"JavaScript",         cardTitle:"JavaScript for Interactive Web",          desc:"Dynamic web Interactive features",            author:"Sarika", img:"https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&q=80" },
// //   { id:5,  title:"Python",             cardTitle:"Analyze Real-World Data with Python",     desc:"Analyze and visualize real-world datasets.",  author:"Sarika", img:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80" },
// //   { id:6,  title:"Node.js",            cardTitle:"Scalable Server-Side Apps in Node",       desc:"Build fast, scalable server-side apps.",      author:"Sarika", img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" },
// //   { id:7,  title:"Flutter",            cardTitle:"Cross-Platform Apps with Flutter",        desc:"Cross-platform apps with one codebase.",      author:"Sarika", img:"https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=80" },
// //   { id:8,  title:"AI & ML",            cardTitle:"Getting Started with AI & ML",            desc:"Fundamentals of models and training data.",   author:"Sarika", img:"https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&q=80" },
// //   { id:9,  title:"Mobile-First",       cardTitle:"Design for Every Screen Size",            desc:"Responsive learning apps for all devices.",   author:"Sarika", img:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80" },
// //   { id:10, title:"VR & AR",            cardTitle:"Immersive Learning with VR & AR",         desc:"Immersive learning made interactive.",         author:"Sarika", img:"https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&q=80" },
// //   { id:11, title:"Gamification",       cardTitle:"Boost Engagement with Game Design",       desc:"Boost engagement with rewards.",               author:"Sarika", img:"https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&q=80" },
// //   { id:12, title:"AI-Powered Learning",cardTitle:"Smart Personalized Learning with AI",     desc:"Smart, personalized learning platforms.",     author:"Sarika", img:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80" },
// //   { id:13, title:"TypeScript",         cardTitle:"Type-Safe Code with TypeScript",          desc:"Write safer and scalable JavaScript code.",   author:"Sarika", img:"https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&q=80" },
// //   { id:14, title:"Docker",             cardTitle:"Containerize Apps with Docker",           desc:"Ship apps anywhere with containers.",         author:"Sarika", img:"https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&q=80" },
// //   { id:15, title:"GraphQL",            cardTitle:"Modern APIs with GraphQL",                desc:"Query exactly the data you need.",            author:"Sarika", img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" },
// //   { id:16, title:"Next.js",            cardTitle:"Full-Stack React with Next.js",           desc:"SSR and SSG for production React apps.",      author:"Sarika", img:"https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=80" },
// //   { id:17, title:"Vue.js",             cardTitle:"Build Reactive UIs with Vue",             desc:"Progressive framework for modern interfaces.",author:"Sarika", img:"https://images.unsplash.com/photo-1537884944318-390069bb8665?w=400&q=80" },
// //   { id:18, title:"Tailwind CSS",       cardTitle:"Rapid UI with Tailwind CSS",              desc:"Utility-first CSS for stunning designs.",     author:"Sarika", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
// //   { id:19, title:"Kubernetes",         cardTitle:"Orchestrate Containers with K8s",         desc:"Scale and manage containerized workloads.",   author:"Sarika", img:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80" },
// //   { id:20, title:"AWS",                cardTitle:"Deploy to the Cloud with AWS",            desc:"Build, deploy and scale on Amazon Cloud.",    author:"Sarika", img:"https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80" },
// //   { id:21, title:"MongoDB",            cardTitle:"NoSQL Databases with MongoDB",            desc:"Store and query flexible document data.",     author:"Sarika", img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" },
// //   { id:22, title:"PostgreSQL",         cardTitle:"Relational Data with PostgreSQL",         desc:"Powerful open-source SQL database mastery.",  author:"Sarika", img:"https://images.unsplash.com/photo-1489875347316-0d6a5d7f3b0a?w=400&q=80" },
// //   { id:23, title:"Git & GitHub",       cardTitle:"Version Control with Git & GitHub",       desc:"Collaborate and track code like a pro.",      author:"Sarika", img:"https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&q=80" },
// //   { id:24, title:"Cybersecurity",      cardTitle:"Protect Apps with Cybersecurity",        desc:"Defend against threats and vulnerabilities.", author:"Sarika", img:"https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=400&q=80" },
// //   { id:25, title:"DevOps",             cardTitle:"Automate Everything with DevOps",         desc:"CI/CD pipelines and infrastructure as code.", author:"Sarika", img:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
// //   { id:26, title:"React Native",       cardTitle:"Native Mobile Apps with React Native",    desc:"Build iOS & Android with JavaScript.",        author:"Sarika", img:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80" },
// //   { id:27, title:"Figma",              cardTitle:"Design Faster and Smarter in Figma",      desc:"Collaborative UI design from scratch.",       author:"Sarika", img:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80" },
// //   { id:28, title:"Blockchain",         cardTitle:"Intro to Blockchain Development",         desc:"Build decentralized apps on the chain.",      author:"Sarika", img:"https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&q=80" },
// //   { id:29, title:"Web3",               cardTitle:"The Future of the Web with Web3",         desc:"Decentralized internet and dApps explained.", author:"Sarika", img:"https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&q=80" },
// //   { id:30, title:"Swift",              cardTitle:"Build iOS Apps with Swift",               desc:"Native Apple app development from zero.",     author:"Sarika", img:"https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&q=80" },
// //   { id:31, title:"Kotlin",             cardTitle:"Modern Android Apps with Kotlin",         desc:"Official language for Android development.",  author:"Sarika", img:"https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400&q=80" },
// //   { id:32, title:"Data Science",       cardTitle:"Turn Data into Decisions",                desc:"Explore, clean and model real datasets.",     author:"Sarika", img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
// //   { id:33, title:"Redux",              cardTitle:"Master State Management with Redux",       desc:"Predictable state for complex React apps.",   author:"Sarika", img:"https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&q=80" },
// //   { id:34, title:"Three.js",           cardTitle:"3D Graphics on the Web with Three.js",    desc:"Create immersive 3D browser experiences.",   author:"Sarika", img:"https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&q=80" },
// //   { id:35, title:"Rust",               cardTitle:"Systems Programming with Rust",           desc:"Fast, memory-safe code for modern systems.",  author:"Sarika", img:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
// //   { id:36, title:"Go",                 cardTitle:"High-Performance APIs with Go",           desc:"Concurrent, blazing-fast backend services.",  author:"Sarika", img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" },
// //   { id:37, title:"Linux",              cardTitle:"Master the Linux Command Line",            desc:"Navigate and automate with the terminal.",   author:"Sarika", img:"https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&q=80" },
// //   { id:38, title:"Testing",            cardTitle:"Write Tests That Actually Work",           desc:"Unit, integration & E2E testing strategies.", author:"Sarika", img:"https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&q=80" },
// //   { id:39, title:"Prompt Engineering", cardTitle:"Get the Best from AI with Prompts",       desc:"Craft prompts that produce great results.",   author:"Sarika", img:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80" },
// //   { id:40, title:"Open Source",        cardTitle:"Contribute to Open Source Projects",      desc:"Give back and grow your developer career.",   author:"Sarika", img:"https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&q=80" },
// // ]

// // const C = {
// //   primary:   "#2D2A8E",
// //   accent:    "#F5A623",
// //   accentBlue:"#0EA5E9",
// //   accentPink:"#FF2D87",
// // }

// // const CARD_COLORS = [
// //   { chip:"rgba(45,42,142,.1)",   text:"#2D2A8E" },
// //   { chip:"rgba(230,57,70,.1)",   text:"#E63946" },
// //   { chip:"rgba(245,166,35,.12)", text:"#F5A623" },
// //   { chip:"rgba(14,165,233,.1)",  text:"#0EA5E9" },
// //   { chip:"rgba(255,45,135,.1)",  text:"#FF2D87" },
// //   { chip:"rgba(255,107,107,.12)",text:"#FF6B6B" },
// // ]

// // // Dark mode chip colors — more visible on dark backgrounds
// // const CARD_COLORS_DARK = [
// //   { chip:"rgba(99,97,210,.25)",  text:"#a5b4fc" },
// //   { chip:"rgba(230,57,70,.2)",   text:"#f87171" },
// //   { chip:"rgba(245,166,35,.2)",  text:"#fbbf24" },
// //   { chip:"rgba(14,165,233,.2)",  text:"#38bdf8" },
// //   { chip:"rgba(255,45,135,.2)",  text:"#f472b6" },
// //   { chip:"rgba(255,107,107,.2)", text:"#fca5a5" },
// // ]

// // function getPerPage() {
// //   if (typeof window === "undefined") return 8
// //   const w = window.innerWidth
// //   if (w >= 1025) return 8
// //   if (w >= 601)  return 9
// //   return 8
// // }

// // function getPageNumbers(activePage, totalPages) {
// //   if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
// //   let start = Math.max(1, activePage - 2)
// //   let end   = start + 4
// //   if (end > totalPages) { end = totalPages; start = Math.max(1, end - 4) }
// //   return Array.from({ length: end - start + 1 }, (_, i) => start + i)
// // }

// // const css = `
// //   /* ── LIGHT MODE VARS ── */
// //   :root {
// //     --bp-primary:    #2D2A8E;
// //     --bp-accent:     #F5A623;
// //     --bp-pink:       #FF2D87;
// //     --bp-blue:       #0EA5E9;
// //     --bp-text:       #111111;
// //     --bp-desc:       #9B9BAA;
// //     --bp-bg:         #FFFFFF;
// //     --bp-bg-soft:    #F5F5F5;
// //     --bp-border:     #f0f0f0;
// //     --bp-border-md:  #e5e7eb;
// //     --bp-card-bg:    #FFFFFF;
// //     --bp-shadow:     rgba(0,0,0,.05);
// //   }

// //   /* ── DARK MODE VARS ── */
// //   :root.dark {
// //     --bp-text:       #f1f1f1;
// //     --bp-desc:       #9b9baa;
// //     --bp-bg:         #0f0f1a;
// //     --bp-bg-soft:    #1a1a2e;
// //     --bp-border:     #2e2e45;
// //     --bp-border-md:  #3a3a55;
// //     --bp-card-bg:    #1a1a2e;
// //     --bp-shadow:     rgba(0,0,0,.25);
// //   }

// //   /* ── BASE ── */
// //   .bp {
// //     background: var(--bp-bg);
// //     min-height: 100vh;
// //     font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
// //     color: var(--bp-text);
// //     overflow-x: hidden;
// //     transition: background 0.3s, color 0.3s;
// //   }
// //   .page-enter { animation: pageIn .4s cubic-bezier(.22,1,.36,1) both; }
// //   @keyframes pageIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

// //   /* ── HERO (always dark bg — no dark mode change needed) ── */
// //   .bp-hero { background: var(--bp-primary); padding:0; position:relative; overflow:hidden; display:flex; align-items:stretch; }
// //   .bp-hero-orb { position:absolute; border-radius:50%; pointer-events:none; }
// //   .bp-hero-orb-drift  { animation:orbDrift  8s ease-in-out infinite alternate; }
// //   .bp-hero-orb-drift2 { animation:orbDrift2 10s ease-in-out infinite alternate; }

// //   .bp-hero-inner { display:grid; grid-template-columns:1fr 1fr; width:100%; max-width:1200px; margin:0 auto; padding:0 80px; position:relative; z-index:2; align-items:center; gap:48px; }
// //   .bp-hero-left { padding:40px 0; text-align:left; }
// //   .bp-hero-left * { text-align:left; }

// //   .bp-hero-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.22); color:#fff; font-size:10.5px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:5px 14px; border-radius:100px; margin-bottom:16px; width:fit-content; animation:badgeIn .7s cubic-bezier(.34,1.56,.64,1) both; }
// //   .bp-hero-badge-dot { width:6px; height:6px; border-radius:50%; background:var(--bp-accent); flex-shrink:0; animation:pulse 2s ease-in-out .8s infinite; }
// //   .bp-hero-title { font-size:clamp(24px,3.2vw,38px); font-weight:900; line-height:1.1; letter-spacing:-0.025em; color:#fff; margin-bottom:14px; animation:titleIn .8s .2s cubic-bezier(.22,1,.36,1) both; }
// //   .bp-hero-title .t-accent      { color:var(--bp-accent); }
// //   .bp-hero-title .t-accent-pink { color:var(--bp-pink); }
// //   .bp-hero-desc { font-size:13.5px; color:rgba(255,255,255,.65); line-height:1.75; max-width:360px; margin-bottom:24px; animation:fadeUp .7s .38s ease both; }
// //   .bp-hero-btns { display:flex; gap:10px; flex-wrap:wrap; animation:fadeUp .7s .5s ease both; }

// //   .bp-hero-btn-primary { background:var(--bp-accent); color:var(--bp-primary); font-size:13px; font-weight:800; padding:10px 24px; border-radius:100px; border:none; cursor:pointer; font-family:inherit; transition:transform .2s,box-shadow .2s; box-shadow:0 4px 16px rgba(245,166,35,.4); position:relative; overflow:hidden; }
// //   .bp-hero-btn-primary::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent); transform:translateX(-100%); animation:shimmer 2.5s 1.2s ease-in-out infinite; }
// //   .bp-hero-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(245,166,35,.5); }
// //   .bp-hero-btn-ghost { background:rgba(255,255,255,.1); color:#fff; font-size:13px; font-weight:700; padding:10px 22px; border-radius:100px; border:1.5px solid rgba(255,255,255,.28); cursor:pointer; font-family:inherit; transition:background .2s,transform .2s; }
// //   .bp-hero-btn-ghost:hover { background:rgba(255,255,255,.18); transform:translateY(-2px); }

// //   .bp-hero-stats { display:flex; gap:28px; margin-top:24px; padding-top:20px; border-top:1px solid rgba(255,255,255,.12); animation:fadeUp .7s .65s ease both; }
// //   .bp-hero-stats > div:nth-child(1) { animation:statIn .5s .7s  cubic-bezier(.34,1.56,.64,1) both; }
// //   .bp-hero-stats > div:nth-child(2) { animation:statIn .5s .8s  cubic-bezier(.34,1.56,.64,1) both; }
// //   .bp-hero-stats > div:nth-child(3) { animation:statIn .5s .9s  cubic-bezier(.34,1.56,.64,1) both; }
// //   .bp-hero-stats > div:nth-child(4) { animation:statIn .5s 1.0s cubic-bezier(.34,1.56,.64,1) both; }
// //   .bp-hero-stat-num { font-size:20px; font-weight:900; color:#fff; line-height:1; margin-bottom:3px; }
// //   .bp-hero-stat-num span { color:var(--bp-accent); }
// //   .bp-hero-stat-lbl { font-size:10px; color:rgba(255,255,255,.5); font-weight:600; text-transform:uppercase; letter-spacing:.06em; }

// //   .bp-hero-right { position:relative; display:flex; align-items:center; justify-content:center; padding:28px 0; animation:slideRight .9s .25s cubic-bezier(.22,1,.36,1) both; }
// //   .bp-hero-img-card { width:100%; border-radius:18px; overflow:hidden; box-shadow:0 20px 50px rgba(0,0,0,.32); position:relative; z-index:1; animation:floatImg 5s 1.2s ease-in-out infinite; }
// //   .bp-hero-img-card img { width:100%; height:240px; object-fit:cover; display:block; }

// //   .bp-hero-pill { position:absolute; background:#fff; border-radius:14px; padding:10px 16px; display:flex; align-items:center; gap:9px; font-size:12.5px; font-weight:700; color:#111; box-shadow:0 8px 28px rgba(0,0,0,.15); z-index:2; white-space:nowrap; }
// //   .bp-hero-pill:nth-child(2) { animation:pillIn .6s .9s  cubic-bezier(.34,1.56,.64,1) both, floatPill1 4s   1.5s ease-in-out infinite; }
// //   .bp-hero-pill:nth-child(3) { animation:pillIn .6s 1.1s cubic-bezier(.34,1.56,.64,1) both, floatPill2 4.5s 1.7s ease-in-out infinite; }
// //   .bp-hero-pill:nth-child(4) { animation:pillIn .6s 1.3s cubic-bezier(.34,1.56,.64,1) both, floatPill1 5s   1.9s ease-in-out infinite; }
// //   .bp-hero-pill-icon { width:28px; height:28px; border-radius:8px; display:grid; place-items:center; font-size:14px; flex-shrink:0; }

// //   /* ── BLOG SECTION ── */
// //   .bp-section { padding:56px 80px 80px; max-width:1200px; margin:0 auto; }
// //   .bp-section-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:32px; flex-wrap:wrap; gap:12px; }
// //   .bp-section-title { font-size:clamp(20px,2.5vw,28px); font-weight:900; color:var(--bp-text); letter-spacing:-0.025em; transition:color 0.3s; }
// //   .bp-section-title span { color:var(--bp-primary); }
// //   :root.dark .bp-section-title span { color: #8b87ff; }

// //   .bp-section-count {
// //     font-size:13px; font-weight:600; color:var(--bp-desc);
// //     background:var(--bp-bg-soft); border:1px solid var(--bp-border);
// //     padding:5px 14px; border-radius:100px;
// //     transition: background 0.3s, border-color 0.3s;
// //   }

// //   .bp-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; }

// //   /* ── CARD ── */
// //   .bp-card {
// //     background: var(--bp-card-bg);
// //     border-radius:16px; border:1px solid var(--bp-border);
// //     box-shadow:0 2px 12px var(--bp-shadow);
// //     overflow:hidden; cursor:pointer; display:flex; flex-direction:column;
// //     opacity:0; transform:translateY(32px) scale(0.97);
// //     transition: opacity .55s ease, transform .55s ease, box-shadow .25s ease,
// //                 border-color .25s, background 0.3s;
// //   }
// //   .bp-card.visible { opacity:1; transform:translateY(0) scale(1); }
// //   .bp-card:hover {
// //     box-shadow:0 18px 44px rgba(45,42,142,.13) !important;
// //     transform:translateY(-6px) scale(1.015) !important;
// //     border-color:rgba(45,42,142,.2);
// //   }
// //   :root.dark .bp-card:hover {
// //     box-shadow: 0 18px 44px rgba(0,0,0,.5) !important;
// //     border-color: #4a47a3;
// //   }

// //   .bp-card-img-wrap { width:100%; height:155px; overflow:hidden; flex-shrink:0; background:#e2e8f0; position:relative; }
// //   :root.dark .bp-card-img-wrap { background: #2e2e45; }
// //   .bp-card-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .5s ease; }
// //   .bp-card:hover .bp-card-img { transform:scale(1.08); }
// //   :root.dark .bp-card-img { filter: brightness(0.85); }
// //   .bp-card:hover .bp-card-img { filter: brightness(1); }

// //   .bp-card-img-wrap::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,.12),transparent 60%); opacity:0; transition:opacity .3s; }
// //   .bp-card:hover .bp-card-img-wrap::after { opacity:1; }

// //   .bp-card-body { padding:16px 16px 18px; display:flex; flex-direction:column; flex:1; }
// //   .bp-card-chip { display:inline-block; font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; padding:3px 10px; border-radius:100px; margin-bottom:9px; width:fit-content; transition:transform .2s; }
// //   .bp-card:hover .bp-card-chip { transform:translateX(3px); }

// //   .bp-card-title { font-weight:800; color:var(--bp-text); font-size:15px; margin-bottom:7px; line-height:1.35; transition:color .2s; }
// //   .bp-card:hover .bp-card-title { color:var(--bp-primary); }
// //   :root.dark .bp-card:hover .bp-card-title { color: #a5b4fc; }

// //   .bp-card-desc { color:var(--bp-desc); font-size:12.5px; line-height:1.65; margin-bottom:14px; flex:1; }

// //   .bp-card-author { display:flex; align-items:center; gap:8px; padding-top:12px; border-top:1px solid var(--bp-border); }
// //   .bp-card-av { width:26px; height:26px; border-radius:50%; overflow:hidden; flex-shrink:0; border:1.5px solid var(--bp-border-md); transition:border-color .2s,box-shadow .2s; }
// //   .bp-card:hover .bp-card-av { border-color:var(--bp-primary); box-shadow:0 0 0 3px rgba(45,42,142,.1); }
// //   :root.dark .bp-card:hover .bp-card-av { border-color: #8b87ff; box-shadow: 0 0 0 3px rgba(139,135,255,.15); }
// //   .bp-card-av img { width:100%; height:100%; object-fit:cover; object-position:top; display:block; }
// //   .bp-card-aname { font-size:12px; color:var(--bp-desc); font-weight:600; }
// //   .bp-card-arrow { margin-left:auto; font-size:14px; color:var(--bp-primary); opacity:0; transform:translateX(-6px); transition:opacity .2s,transform .2s; }
// //   :root.dark .bp-card-arrow { color: #a5b4fc; }
// //   .bp-card:hover .bp-card-arrow { opacity:1; transform:translateX(0); }

// //   /* ── PAGINATION ── */
// //   .bp-pagination { display:flex; justify-content:center; align-items:center; gap:6px; margin-top:56px; flex-wrap:nowrap; }
// //   .bp-page-btn {
// //     padding:9px 16px; border-radius:10px;
// //     border:1.5px solid var(--bp-border-md);
// //     background:var(--bp-card-bg); color:var(--bp-text);
// //     font-weight:500; font-size:14px; cursor:pointer;
// //     min-width:40px; text-align:center;
// //     transition:all .2s; font-family:inherit; white-space:nowrap; flex-shrink:0;
// //   }
// //   .bp-page-btn:hover:not(.bp-page-active) {
// //     background:rgba(45,42,142,.06); border-color:rgba(45,42,142,.3);
// //     color:var(--bp-primary); transform:translateY(-2px);
// //   }
// //   :root.dark .bp-page-btn:hover:not(.bp-page-active) {
// //     background: rgba(139,135,255,.1);
// //     border-color: #8b87ff;
// //     color: #a5b4fc;
// //   }
// //   .bp-page-active { background:var(--bp-primary); color:#fff; border-color:var(--bp-primary); font-weight:700; box-shadow:0 4px 16px rgba(45,42,142,.35); }
// //   .bp-page-nav { color:var(--bp-primary); font-weight:700; border-color:rgba(45,42,142,.25); }
// //   :root.dark .bp-page-nav { color: #a5b4fc; border-color: rgba(139,135,255,.3); }
// //   .bp-page-nav:hover:not(.bp-page-active) { background:rgba(45,42,142,.06); }

// //   /* ── KEYFRAMES ── */
// //   @keyframes badgeIn   { from{opacity:0;transform:translateX(-20px) scale(.9)} to{opacity:1;transform:translateX(0) scale(1)} }
// //   @keyframes titleIn   { from{opacity:0;transform:translateY(30px) skewY(2deg)} to{opacity:1;transform:translateY(0) skewY(0)} }
// //   @keyframes fadeUp    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
// //   @keyframes slideRight{ from{opacity:0;transform:translateX(48px) scale(.96)} to{opacity:1;transform:translateX(0) scale(1)} }
// //   @keyframes statIn    { from{opacity:0;transform:translateY(14px) scale(.85)} to{opacity:1;transform:translateY(0) scale(1)} }
// //   @keyframes pillIn    { from{opacity:0;transform:scale(.6) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
// //   @keyframes floatImg  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
// //   @keyframes floatPill1{ 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-6px) rotate(1deg)} }
// //   @keyframes floatPill2{ 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-5px) rotate(-1deg)} }
// //   @keyframes pulse     { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:.6} }
// //   @keyframes shimmer   { 0%{transform:translateX(-100%)} 60%,100%{transform:translateX(100%)} }
// //   @keyframes orbDrift  { from{transform:translate(0,0) scale(1)} to{transform:translate(30px,-20px) scale(1.08)} }
// //   @keyframes orbDrift2 { from{transform:translate(0,0) scale(1)} to{transform:translate(-20px,25px) scale(.95)} }

// //   /* ── RESPONSIVE ── */
// //   @media(max-width:1024px){
// //     .bp-hero-inner { padding:0 40px; gap:40px; }
// //     .bp-section { padding:44px 40px 72px; }
// //     .bp-hero-stats { gap:24px; }
// //     .bp-grid { grid-template-columns:repeat(3,1fr); gap:18px; }
// //   }
// //   @media(max-width:768px){
// //     .bp-hero-inner{grid-template-columns:1fr;padding:0 24px;gap:0}
// //     .bp-hero-left{padding:40px 0 28px}
// //     .bp-hero-right{padding:0 0 36px}
// //     .bp-hero-img-card img{height:200px}
// //     .bp-hero-stats{gap:20px}
// //     .bp-section{padding:36px 24px 60px}
// //     .bp-grid{grid-template-columns:repeat(3,1fr);gap:14px}
// //     .bp-hero-pill{display:none}
// //     .bp-card-img-wrap{height:130px}
// //     .bp-card-body{padding:12px 12px 14px}
// //     .bp-card-title{font-size:13.5px}
// //     .bp-card-desc{font-size:12px}
// //   }
// //   @media(max-width:600px){
// //     .bp-grid{grid-template-columns:repeat(2,1fr);gap:12px}
// //     .bp-card-img-wrap{height:128px}
// //   }
// //   @media(max-width:480px){
// //     .bp-hero-inner{padding:0 16px}
// //     .bp-hero-left{padding:32px 0 20px}
// //     .bp-section{padding:28px 14px 48px}
// //     .bp-grid{grid-template-columns:repeat(2,1fr);gap:12px}
// //     .bp-card-img-wrap{height:128px}
// //     .bp-hero-btns{gap:10px}
// //     .bp-hero-btn-primary,.bp-hero-btn-ghost{font-size:13px;padding:11px 22px}
// //     .bp-hero-stats{flex-wrap:wrap;gap:16px}
// //     .bp-pagination{gap:4px;margin-top:40px}
// //     .bp-page-btn{padding:7px 10px;font-size:12px;min-width:32px;border-radius:8px}
// //     .bp-page-nav{padding:7px 12px}
// //   }
// //   @media(max-width:360px){
// //     .bp-pagination{gap:3px}
// //     .bp-page-btn{padding:6px 8px;font-size:11.5px;min-width:28px}
// //     .bp-page-nav{padding:6px 10px}
// //   }
// // `

// // function useReveal(delay = 0) {
// //   const ref = useRef(null)
// //   const [visible, setVisible] = useState(false)
// //   useEffect(() => {
// //     const el = ref.current; if (!el) return
// //     const obs = new IntersectionObserver(
// //       ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect() } },
// //       { threshold: 0.12 }
// //     )
// //     obs.observe(el)
// //     return () => obs.disconnect()
// //   }, [delay])
// //   return { ref, visible }
// // }

// // function BlogCard({ blog, index, onSelect }) {
// //   const { ref, visible } = useReveal((index % 4) * 85)
// //   const isDark = document.documentElement.classList.contains("dark")
// //   const colors = isDark ? CARD_COLORS_DARK : CARD_COLORS
// //   const color  = colors[index % colors.length]

// //   return (
// //     <div ref={ref} className={`bp-card${visible ? " visible" : ""}`} onClick={() => onSelect && onSelect(blog)}>
// //       <div className="bp-card-img-wrap">
// //         <img className="bp-card-img" src={blog.img} alt={blog.title} />
// //       </div>
// //       <div className="bp-card-body">
// //         <span className="bp-card-chip" style={{ background:color.chip, color:color.text }}>{blog.title}</span>
// //         <p className="bp-card-title">{blog.cardTitle}</p>
// //         <p className="bp-card-desc">{blog.desc}</p>
// //         <div className="bp-card-author">
// //           <div className="bp-card-av"><img src="/sarikapro.jpg" alt="Sarika" /></div>
// //           <span className="bp-card-aname">{blog.author}</span>
// //           <span className="bp-card-arrow">→</span>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export { BLOGS }

// // export default function BlogPage({ onSelectBlog }) {
// //   const [perPage, setPerPage] = useState(getPerPage)
// //   const [activePage, setActivePage] = useState(1)

// //   useEffect(() => {
// //     function handleResize() {
// //       const next = getPerPage()
// //       setPerPage(prev => {
// //         if (prev !== next) { setActivePage(1); return next }
// //         return prev
// //       })
// //     }
// //     window.addEventListener("resize", handleResize)
// //     return () => window.removeEventListener("resize", handleResize)
// //   }, [])

// //   const totalPages  = Math.ceil(BLOGS.length / perPage)
// //   const visibleBlogs = BLOGS.slice((activePage - 1) * perPage, activePage * perPage)

// //   function goTo(p) {
// //     setActivePage(p)
// //     window.scrollTo({ top: 0, behavior: "smooth" })
// //   }

// //   return (
// //     <>
// //       <style>{css}</style>
// //       <main className="bp page-enter">

// //         {/* HERO — always dark indigo, no dark mode change needed */}
// //         <section className="bp-hero">
// //           <div className="bp-hero-orb bp-hero-orb-drift"  style={{ width:500, height:500, background:"#3F3CAE", opacity:.4, top:-180, left:-120, filter:"blur(90px)" }} />
// //           <div className="bp-hero-orb bp-hero-orb-drift2" style={{ width:300, height:300, background:C.accentPink, opacity:.15, top:"-10%", right:"30%", filter:"blur(70px)" }} />
// //           <div className="bp-hero-orb bp-hero-orb-drift"  style={{ width:250, height:250, background:C.accent, opacity:.18, bottom:"-60px", right:"10%", filter:"blur(60px)" }} />

// //           <div className="bp-hero-inner">
// //             <div className="bp-hero-left">
// //               <div className="bp-hero-badge"><span className="bp-hero-badge-dot" />KHdemy · Learn &amp; Grow</div>
// //               <h1 className="bp-hero-title">
// //                 Empowering<br/>
// //                 <span className="t-accent">Cambodia's</span> Future<br/>
// //                 <span className="t-accent-pink">Through Smart</span><br/>
// //                 Learning
// //               </h1>
// //               <p className="bp-hero-desc">KhDemy is transforming the way students learn, practice, and grow — one course at a time.</p>
// //               <div className="bp-hero-btns">
// //                 <button className="bp-hero-btn-primary">Explore Courses</button>
// //                 <button className="bp-hero-btn-ghost">Learn More →</button>
// //               </div>
// //               <div className="bp-hero-stats">
// //                 {[{num:"120K",sfx:"+",lbl:"Learners"},{num:"850",sfx:"+",lbl:"Courses"},{num:"90",sfx:"+",lbl:"Countries"},{num:"98",sfx:"%",lbl:"Satisfaction"}].map(s => (
// //                   <div key={s.lbl}>
// //                     <div className="bp-hero-stat-num">{s.num}<span>{s.sfx}</span></div>
// //                     <div className="bp-hero-stat-lbl">{s.lbl}</div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             <div className="bp-hero-right">
// //               <div className="bp-hero-pill" style={{ top:10, left:-16 }}><div className="bp-hero-pill-icon" style={{ background:"rgba(245,166,35,.15)" }}>🎓</div>Foundation 5th</div>
// //               <div className="bp-hero-pill" style={{ bottom:30, left:-24 }}><div className="bp-hero-pill-icon" style={{ background:"rgba(14,165,233,.12)" }}>✅</div>98% Satisfaction</div>
// //               <div className="bp-hero-pill" style={{ top:"38%", right:-20 }}><div className="bp-hero-pill-icon" style={{ background:"rgba(255,45,135,.1)" }}>🌍</div>90+ Countries</div>
// //               <div className="bp-hero-img-card">
// //                 <img src="https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=800&q=80" alt="Learning" />
// //                 <div style={{ height:5, background:`linear-gradient(90deg,${C.accent},${C.accentPink},${C.accentBlue})` }} />
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* BLOG GRID */}
// //         <section className="bp-section">
// //           <div className="bp-section-head">
// //             <h2 className="bp-section-title">Related <span>Blog</span></h2>
// //             <span className="bp-section-count">Page {activePage} of {totalPages} · {BLOGS.length} articles</span>
// //           </div>
// //           <div className="bp-grid">
// //             {visibleBlogs.map((blog, i) => (
// //               <BlogCard key={blog.id} blog={blog} index={i} onSelect={onSelectBlog} />
// //             ))}
// //           </div>
// //           <div className="bp-pagination">
// //             <button className="bp-page-btn bp-page-nav" onClick={() => goTo(Math.max(1, activePage - 1))}>← Back</button>
// //             {getPageNumbers(activePage, totalPages).map(p => (
// //               <button key={p} className={`bp-page-btn${activePage===p?" bp-page-active":""}`} onClick={() => goTo(p)}>{p}</button>
// //             ))}
// //             <button className="bp-page-btn bp-page-nav" onClick={() => goTo(Math.min(totalPages, activePage + 1))}>Next →</button>
// //           </div>
// //         </section>

// //       </main>
// //     </>
// //   )
// // }

// import { useEffect, useRef, useState } from "react"

// const BLOGS = [
//   { id:1,  title:"UX/UI",              cardTitle:"Why Good Design Matters",                desc:"Intuitive design Better experience",          author:"Sarika", img:"https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&q=80" },
//   { id:2,  title:"React",              cardTitle:"Build Modern Web Apps with React",        desc:"Building fast and modern web applications.",  author:"Sarika", img:"https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&q=80" },
//   { id:3,  title:"PHP",                cardTitle:"Secure & Dynamic Backend with PHP",       desc:"Developing secure and dynamic backend.",      author:"Sarika", img:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80" },
//   { id:4,  title:"JavaScript",         cardTitle:"JavaScript for Interactive Web",          desc:"Dynamic web Interactive features",            author:"Sarika", img:"https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&q=80" },
//   { id:5,  title:"Python",             cardTitle:"Analyze Real-World Data with Python",     desc:"Analyze and visualize real-world datasets.",  author:"Sarika", img:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80" },
//   { id:6,  title:"Node.js",            cardTitle:"Scalable Server-Side Apps in Node",       desc:"Build fast, scalable server-side apps.",      author:"Sarika", img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" },
//   { id:7,  title:"Flutter",            cardTitle:"Cross-Platform Apps with Flutter",        desc:"Cross-platform apps with one codebase.",      author:"Sarika", img:"https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=80" },
//   { id:8,  title:"AI & ML",            cardTitle:"Getting Started with AI & ML",            desc:"Fundamentals of models and training data.",   author:"Sarika", img:"https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&q=80" },
//   { id:9,  title:"Mobile-First",       cardTitle:"Design for Every Screen Size",            desc:"Responsive learning apps for all devices.",   author:"Sarika", img:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80" },
//   { id:10, title:"VR & AR",            cardTitle:"Immersive Learning with VR & AR",         desc:"Immersive learning made interactive.",         author:"Sarika", img:"https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&q=80" },
//   { id:11, title:"Gamification",       cardTitle:"Boost Engagement with Game Design",       desc:"Boost engagement with rewards.",               author:"Sarika", img:"https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&q=80" },
//   { id:12, title:"AI-Powered Learning",cardTitle:"Smart Personalized Learning with AI",     desc:"Smart, personalized learning platforms.",     author:"Sarika", img:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80" },
//   { id:13, title:"TypeScript",         cardTitle:"Type-Safe Code with TypeScript",          desc:"Write safer and scalable JavaScript code.",   author:"Sarika", img:"https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&q=80" },
//   { id:14, title:"Docker",             cardTitle:"Containerize Apps with Docker",           desc:"Ship apps anywhere with containers.",         author:"Sarika", img:"https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&q=80" },
//   { id:15, title:"GraphQL",            cardTitle:"Modern APIs with GraphQL",                desc:"Query exactly the data you need.",            author:"Sarika", img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" },
//   { id:16, title:"Next.js",            cardTitle:"Full-Stack React with Next.js",           desc:"SSR and SSG for production React apps.",      author:"Sarika", img:"https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=80" },
//   { id:17, title:"Vue.js",             cardTitle:"Build Reactive UIs with Vue",             desc:"Progressive framework for modern interfaces.",author:"Sarika", img:"https://images.unsplash.com/photo-1537884944318-390069bb8665?w=400&q=80" },
//   { id:18, title:"Tailwind CSS",       cardTitle:"Rapid UI with Tailwind CSS",              desc:"Utility-first CSS for stunning designs.",     author:"Sarika", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
//   { id:19, title:"Kubernetes",         cardTitle:"Orchestrate Containers with K8s",         desc:"Scale and manage containerized workloads.",   author:"Sarika", img:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80" },
//   { id:20, title:"AWS",                cardTitle:"Deploy to the Cloud with AWS",            desc:"Build, deploy and scale on Amazon Cloud.",    author:"Sarika", img:"https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80" },
//   { id:21, title:"MongoDB",            cardTitle:"NoSQL Databases with MongoDB",            desc:"Store and query flexible document data.",     author:"Sarika", img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" },
//   { id:22, title:"PostgreSQL",         cardTitle:"Relational Data with PostgreSQL",         desc:"Powerful open-source SQL database mastery.",  author:"Sarika", img:"https://images.unsplash.com/photo-1489875347316-0d6a5d7f3b0a?w=400&q=80" },
//   { id:23, title:"Git & GitHub",       cardTitle:"Version Control with Git & GitHub",       desc:"Collaborate and track code like a pro.",      author:"Sarika", img:"https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&q=80" },
//   { id:24, title:"Cybersecurity",      cardTitle:"Protect Apps with Cybersecurity",        desc:"Defend against threats and vulnerabilities.", author:"Sarika", img:"https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=400&q=80" },
//   { id:25, title:"DevOps",             cardTitle:"Automate Everything with DevOps",         desc:"CI/CD pipelines and infrastructure as code.", author:"Sarika", img:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
//   { id:26, title:"React Native",       cardTitle:"Native Mobile Apps with React Native",    desc:"Build iOS & Android with JavaScript.",        author:"Sarika", img:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80" },
//   { id:27, title:"Figma",              cardTitle:"Design Faster and Smarter in Figma",      desc:"Collaborative UI design from scratch.",       author:"Sarika", img:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80" },
//   { id:28, title:"Blockchain",         cardTitle:"Intro to Blockchain Development",         desc:"Build decentralized apps on the chain.",      author:"Sarika", img:"https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&q=80" },
//   { id:29, title:"Web3",               cardTitle:"The Future of the Web with Web3",         desc:"Decentralized internet and dApps explained.", author:"Sarika", img:"https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&q=80" },
//   { id:30, title:"Swift",              cardTitle:"Build iOS Apps with Swift",               desc:"Native Apple app development from zero.",     author:"Sarika", img:"https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&q=80" },
//   { id:31, title:"Kotlin",             cardTitle:"Modern Android Apps with Kotlin",         desc:"Official language for Android development.",  author:"Sarika", img:"https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400&q=80" },
//   { id:32, title:"Data Science",       cardTitle:"Turn Data into Decisions",                desc:"Explore, clean and model real datasets.",     author:"Sarika", img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
//   { id:33, title:"Redux",              cardTitle:"Master State Management with Redux",       desc:"Predictable state for complex React apps.",   author:"Sarika", img:"https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&q=80" },
//   { id:34, title:"Three.js",           cardTitle:"3D Graphics on the Web with Three.js",    desc:"Create immersive 3D browser experiences.",   author:"Sarika", img:"https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&q=80" },
//   { id:35, title:"Rust",               cardTitle:"Systems Programming with Rust",           desc:"Fast, memory-safe code for modern systems.",  author:"Sarika", img:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
//   { id:36, title:"Go",                 cardTitle:"High-Performance APIs with Go",           desc:"Concurrent, blazing-fast backend services.",  author:"Sarika", img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" },
//   { id:37, title:"Linux",              cardTitle:"Master the Linux Command Line",            desc:"Navigate and automate with the terminal.",   author:"Sarika", img:"https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&q=80" },
//   { id:38, title:"Testing",            cardTitle:"Write Tests That Actually Work",           desc:"Unit, integration & E2E testing strategies.", author:"Sarika", img:"https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&q=80" },
//   { id:39, title:"Prompt Engineering", cardTitle:"Get the Best from AI with Prompts",       desc:"Craft prompts that produce great results.",   author:"Sarika", img:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80" },
//   { id:40, title:"Open Source",        cardTitle:"Contribute to Open Source Projects",      desc:"Give back and grow your developer career.",   author:"Sarika", img:"https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&q=80" },
// ]

// const CHIP_COLORS = [
//   { bg:"bg-indigo-100  dark:bg-indigo-900/40",  text:"text-indigo-700 dark:text-indigo-300" },
//   { bg:"bg-red-100     dark:bg-red-900/40",     text:"text-red-600    dark:text-red-300" },
//   { bg:"bg-amber-100   dark:bg-amber-900/40",   text:"text-amber-600  dark:text-amber-300" },
//   { bg:"bg-sky-100     dark:bg-sky-900/40",     text:"text-sky-600    dark:text-sky-300" },
//   { bg:"bg-pink-100    dark:bg-pink-900/40",    text:"text-pink-600   dark:text-pink-300" },
//   { bg:"bg-orange-100  dark:bg-orange-900/40",  text:"text-orange-600 dark:text-orange-300" },
// ]

// function getPerPage() {
//   if (typeof window === "undefined") return 8
//   const w = window.innerWidth
//   if (w >= 1025) return 8
//   if (w >= 601)  return 9
//   return 8
// }

// function getPageNumbers(activePage, totalPages) {
//   if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
//   let start = Math.max(1, activePage - 2)
//   let end   = start + 4
//   if (end > totalPages) { end = totalPages; start = Math.max(1, end - 4) }
//   return Array.from({ length: end - start + 1 }, (_, i) => start + i)
// }

// function useReveal(delay = 0) {
//   const ref = useRef(null)
//   const [visible, setVisible] = useState(false)
//   useEffect(() => {
//     const el = ref.current; if (!el) return
//     const obs = new IntersectionObserver(
//       ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect() } },
//       { threshold: 0.12 }
//     )
//     obs.observe(el)
//     return () => obs.disconnect()
//   }, [delay])
//   return { ref, visible }
// }

// // Keyframe animations injected once (Tailwind can't do custom keyframes without config)
// const keyframes = `
//   @keyframes badgeIn    { from{opacity:0;transform:translateX(-20px) scale(.9)} to{opacity:1;transform:translateX(0) scale(1)} }
//   @keyframes titleIn    { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
//   @keyframes fadeUp     { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
//   @keyframes slideRight { from{opacity:0;transform:translateX(48px) scale(.96)} to{opacity:1;transform:translateX(0) scale(1)} }
//   @keyframes statIn     { from{opacity:0;transform:translateY(14px) scale(.85)} to{opacity:1;transform:translateY(0) scale(1)} }
//   @keyframes pillIn     { from{opacity:0;transform:scale(.6) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
//   @keyframes floatImg   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
//   @keyframes floatPill1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px) rotate(1deg)} }
//   @keyframes floatPill2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px) rotate(-1deg)} }
//   @keyframes pulse      { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:.6} }
//   @keyframes shimmer    { 0%{transform:translateX(-100%)} 60%,100%{transform:translateX(100%)} }
//   @keyframes orbDrift   { from{transform:translate(0,0) scale(1)} to{transform:translate(30px,-20px) scale(1.08)} }
//   @keyframes orbDrift2  { from{transform:translate(0,0) scale(1)} to{transform:translate(-20px,25px) scale(.95)} }
//   @keyframes cardIn     { from{opacity:0;transform:translateY(32px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }

//   .anim-badge    { animation: badgeIn    .7s cubic-bezier(.34,1.56,.64,1) both; }
//   .anim-title    { animation: titleIn    .8s .2s cubic-bezier(.22,1,.36,1) both; }
//   .anim-desc     { animation: fadeUp     .7s .38s ease both; }
//   .anim-btns     { animation: fadeUp     .7s .5s  ease both; }
//   .anim-stats    { animation: fadeUp     .7s .65s ease both; }
//   .anim-stat-1   { animation: statIn     .5s .7s  cubic-bezier(.34,1.56,.64,1) both; }
//   .anim-stat-2   { animation: statIn     .5s .8s  cubic-bezier(.34,1.56,.64,1) both; }
//   .anim-stat-3   { animation: statIn     .5s .9s  cubic-bezier(.34,1.56,.64,1) both; }
//   .anim-stat-4   { animation: statIn     .5s 1.0s cubic-bezier(.34,1.56,.64,1) both; }
//   .anim-right    { animation: slideRight .9s .25s cubic-bezier(.22,1,.36,1) both; }
//   .anim-float    { animation: floatImg   5s  1.2s ease-in-out infinite; }
//   .anim-pill-1   { animation: pillIn .6s .9s  cubic-bezier(.34,1.56,.64,1) both, floatPill1 4s   1.5s ease-in-out infinite; }
//   .anim-pill-2   { animation: pillIn .6s 1.1s cubic-bezier(.34,1.56,.64,1) both, floatPill2 4.5s 1.7s ease-in-out infinite; }
//   .anim-pill-3   { animation: pillIn .6s 1.3s cubic-bezier(.34,1.56,.64,1) both, floatPill1 5s   1.9s ease-in-out infinite; }
//   .anim-badge-dot{ animation: pulse 2s ease-in-out .8s infinite; }
//   .anim-orb-1    { animation: orbDrift  8s  ease-in-out infinite alternate; }
//   .anim-orb-2    { animation: orbDrift2 10s ease-in-out infinite alternate; }
//   .anim-card     { animation: cardIn .55s ease both; }
//   .btn-shimmer::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent); transform:translateX(-100%); animation:shimmer 2.5s 1.2s ease-in-out infinite; }
// `

// function BlogCard({ blog, index, onSelect }) {
//   const { ref, visible } = useReveal((index % 4) * 85)
//   const color = CHIP_COLORS[index % CHIP_COLORS.length]

//   return (
//     <div
//       ref={ref}
//       onClick={() => onSelect && onSelect(blog)}
//       className={`
//         group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700/60
//         bg-white dark:bg-gray-800/80 shadow-sm cursor-pointer
//         transition-all duration-300 ease-out
//         hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-200 dark:hover:border-indigo-500/40
//         ${visible ? "anim-card" : "opacity-0"}
//       `}
//       style={{ animationDelay: visible ? `${(index % 4) * 85}ms` : "0ms" }}
//     >
//       {/* Image */}
//       <div className="relative h-40 overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
//         <img
//           src={blog.img}
//           alt={blog.title}
//           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 dark:brightness-75 group-hover:brightness-100"
//         />
//         <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//       </div>

//       {/* Body */}
//       <div className="flex flex-col flex-1 p-4">
//         {/* Chip */}
//         <span className={`
//           inline-block w-fit text-[10.5px] font-bold uppercase tracking-wider
//           px-2.5 py-1 rounded-full mb-2
//           transition-transform duration-200 group-hover:translate-x-0.5
//           ${color.bg} ${color.text}
//         `}>
//           {blog.title}
//         </span>

//         {/* Title */}
//         <p className="font-extrabold text-gray-900 dark:text-gray-100 text-[15px] leading-snug mb-1.5
//                       transition-colors duration-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
//           {blog.cardTitle}
//         </p>

//         {/* Desc */}
//         <p className="text-[12.5px] text-gray-400 leading-relaxed flex-1 mb-3">
//           {blog.desc}
//         </p>

//         {/* Author */}
//         <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-700/60">
//           <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 dark:border-gray-600
//                           group-hover:border-indigo-400 group-hover:ring-2 group-hover:ring-indigo-100
//                           dark:group-hover:ring-indigo-500/20 transition-all duration-200 flex-shrink-0 bg-indigo-100">
//             <img src="/sarikapro.jpg" alt="Sarika" className="w-full h-full object-cover object-top" />
//           </div>
//           <span className="text-xs text-gray-400 font-semibold">{blog.author}</span>
//           <span className="ml-auto text-indigo-600 dark:text-indigo-400 text-sm
//                            opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0
//                            transition-all duration-200">→</span>
//         </div>
//       </div>
//     </div>
//   )
// }

// export { BLOGS }

// export default function BlogPage({ onSelectBlog }) {
//   const [perPage, setPerPage]       = useState(getPerPage)
//   const [activePage, setActivePage] = useState(1)

//   useEffect(() => {
//     function handleResize() {
//       const next = getPerPage()
//       setPerPage(prev => { if (prev !== next) { setActivePage(1); return next } return prev })
//     }
//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [])

//   const totalPages   = Math.ceil(BLOGS.length / perPage)
//   const visibleBlogs = BLOGS.slice((activePage - 1) * perPage, activePage * perPage)

//   function goTo(p) {
//     setActivePage(p)
//     window.scrollTo({ top: 0, behavior: "smooth" })
//   }

//   return (
//     <>
//       <style>{keyframes}</style>
//       <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden transition-colors duration-300">

//         {/* ── HERO ── */}
//         <section className="relative bg-[#2D2A8E] overflow-hidden flex items-stretch">
//           {/* Orbs */}
//           <div className="anim-orb-1 absolute rounded-full pointer-events-none"
//                style={{ width:500, height:500, background:"#3F3CAE", opacity:.4, top:-180, left:-120, filter:"blur(90px)" }} />
//           <div className="anim-orb-2 absolute rounded-full pointer-events-none"
//                style={{ width:300, height:300, background:"#FF2D87", opacity:.15, top:"-10%", right:"30%", filter:"blur(70px)" }} />
//           <div className="anim-orb-1 absolute rounded-full pointer-events-none"
//                style={{ width:250, height:250, background:"#F5A623", opacity:.18, bottom:-60, right:"10%", filter:"blur(60px)" }} />

//           <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl mx-auto px-6 md:px-20 gap-10 md:gap-12 items-center">

//             {/* Left */}
//             <div className="py-10 md:py-0">
//               {/* Badge */}
//               <div className="anim-badge inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white
//                               text-[10.5px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4 w-fit">
//                 <span className="anim-badge-dot w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
//                 KHdemy · Learn &amp; Grow
//               </div>

//               {/* Title */}
//               <h1 className="anim-title text-3xl md:text-4xl xl:text-5xl font-black leading-tight tracking-tight text-white mb-4">
//                 Empowering<br/>
//                 <span className="text-amber-400">Cambodia's</span> Future<br/>
//                 <span className="text-pink-400">Through Smart</span><br/>
//                 Learning
//               </h1>

//               {/* Desc */}
//               <p className="anim-desc text-sm text-white/60 leading-relaxed max-w-sm mb-6">
//                 KhDemy is transforming the way students learn, practice, and grow — one course at a time.
//               </p>

//               {/* Buttons */}
//               <div className="anim-btns flex gap-2.5 flex-wrap">
//                 <button className="btn-shimmer relative overflow-hidden bg-amber-400 text-[#2D2A8E] text-sm font-extrabold
//                                    px-6 py-2.5 rounded-full border-none cursor-pointer
//                                    transition-all duration-200 shadow-lg shadow-amber-400/40
//                                    hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-400/50">
//                   Explore Courses
//                 </button>
//                 <button className="bg-white/10 text-white text-sm font-bold px-5 py-2.5 rounded-full
//                                    border border-white/25 cursor-pointer
//                                    transition-all duration-200
//                                    hover:bg-white/20 hover:-translate-y-0.5">
//                   Learn More →
//                 </button>
//               </div>

//               {/* Stats */}
//               <div className="anim-stats flex gap-7 mt-6 pt-5 border-t border-white/10 flex-wrap">
//                 {[
//                   { num:"120K", sfx:"+", lbl:"Learners",    cls:"anim-stat-1" },
//                   { num:"850",  sfx:"+", lbl:"Courses",     cls:"anim-stat-2" },
//                   { num:"90",   sfx:"+", lbl:"Countries",   cls:"anim-stat-3" },
//                   { num:"98",   sfx:"%", lbl:"Satisfaction",cls:"anim-stat-4" },
//                 ].map(s => (
//                   <div key={s.lbl} className={s.cls}>
//                     <div className="text-xl font-black text-white leading-none mb-1">
//                       {s.num}<span className="text-amber-400">{s.sfx}</span>
//                     </div>
//                     <div className="text-[10px] text-white/50 font-semibold uppercase tracking-wider">{s.lbl}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Right */}
//             <div className="anim-right relative flex items-center justify-center py-7 md:py-10">
//               {/* Floating pills */}
//               <div className="anim-pill-1 hidden md:flex absolute top-2.5 -left-4 z-20
//                               bg-white rounded-2xl px-4 py-2.5 items-center gap-2 shadow-xl text-[12.5px] font-bold text-gray-900 whitespace-nowrap">
//                 <div className="w-7 h-7 rounded-lg bg-amber-400/15 grid place-items-center text-sm flex-shrink-0">🎓</div>
//                 Foundation 5th
//               </div>
//               <div className="anim-pill-2 hidden md:flex absolute bottom-8 -left-6 z-20
//                               bg-white rounded-2xl px-4 py-2.5 items-center gap-2 shadow-xl text-[12.5px] font-bold text-gray-900 whitespace-nowrap">
//                 <div className="w-7 h-7 rounded-lg bg-sky-400/12 grid place-items-center text-sm flex-shrink-0">✅</div>
//                 98% Satisfaction
//               </div>
//               <div className="anim-pill-3 hidden md:flex absolute top-1/3 -right-5 z-20
//                               bg-white rounded-2xl px-4 py-2.5 items-center gap-2 shadow-xl text-[12.5px] font-bold text-gray-900 whitespace-nowrap">
//                 <div className="w-7 h-7 rounded-lg bg-pink-400/10 grid place-items-center text-sm flex-shrink-0">🌍</div>
//                 90+ Countries
//               </div>

//               {/* Image card */}
//               <div className="anim-float w-full rounded-2xl overflow-hidden shadow-2xl relative z-10">
//                 <img
//                   src="https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=800&q=80"
//                   alt="Learning"
//                   className="w-full h-60 object-cover block"
//                 />
//                 <div className="h-1.5" style={{ background:"linear-gradient(90deg,#F5A623,#FF2D87,#0EA5E9)" }} />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ── BLOG GRID ── */}
//         <section className="max-w-6xl mx-auto px-6 md:px-20 py-14">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
//             <h2 className="text-2xl md:text-3xl font-black tracking-tight">
//               Related <span className="text-indigo-700 dark:text-indigo-400">Blog</span>
//             </h2>
//             <span className="text-sm font-semibold text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-1.5 rounded-full">
//               Page {activePage} of {totalPages} · {BLOGS.length} articles
//             </span>
//           </div>

//           {/* Grid */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
//             {visibleBlogs.map((blog, i) => (
//               <BlogCard key={blog.id} blog={blog} index={i} onSelect={onSelectBlog} />
//             ))}
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-center items-center gap-1.5 mt-14 flex-wrap">
//             <button
//               onClick={() => goTo(Math.max(1, activePage - 1))}
//               className="px-4 py-2 rounded-xl border-2 border-indigo-200 dark:border-indigo-700/60
//                          bg-white dark:bg-gray-800 text-indigo-700 dark:text-indigo-300
//                          text-sm font-bold cursor-pointer transition-all duration-200
//                          hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:-translate-y-0.5"
//             >
//               ← Back
//             </button>

//             {getPageNumbers(activePage, totalPages).map(p => (
//               <button
//                 key={p}
//                 onClick={() => goTo(p)}
//                 className={`
//                   px-4 py-2 rounded-xl border-2 text-sm font-bold cursor-pointer transition-all duration-200
//                   ${activePage === p
//                     ? "bg-indigo-700 text-white border-indigo-700 shadow-lg shadow-indigo-400/30 font-extrabold"
//                     : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:-translate-y-0.5"
//                   }
//                 `}
//               >
//                 {p}
//               </button>
//             ))}

//             <button
//               onClick={() => goTo(Math.min(totalPages, activePage + 1))}
//               className="px-4 py-2 rounded-xl border-2 border-indigo-200 dark:border-indigo-700/60
//                          bg-white dark:bg-gray-800 text-indigo-700 dark:text-indigo-300
//                          text-sm font-bold cursor-pointer transition-all duration-200
//                          hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:-translate-y-0.5"
//             >
//               Next →
//             </button>
//           </div>
//         </section>
//       </main>
//     </>
//   )
// }


import { useState } from "react"
import { useGetBlogsQuery, useGetBlogByIdQuery } from "../../features/blog/blogApi"

const LIMIT = 6

const TAG_COLORS = [
  "bg-indigo-700 text-white",
  "bg-pink-500 text-white",
  "bg-sky-500 text-white",
  "bg-amber-500 text-white",
  "bg-emerald-500 text-white",
  "bg-purple-600 text-white",
]

function getTagColor(i) { return TAG_COLORS[i % TAG_COLORS.length] }

function formatDate(iso) {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  })
}

const LEARNINGS = [
  { left: "Core fundamentals & real-world applications", right: "Advanced patterns & best practices" },
  { left: "Building production-ready projects",          right: "Debugging & problem solving strategies" },
  { left: "Integrating with modern APIs & services",     right: "Testing & code quality" },
  { left: "Deployment strategies",                       right: "Career tips & next steps" },
]

// ─── Skeleton Card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-100" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-gray-100 rounded-full w-1/4" />
        <div className="h-4 bg-gray-100 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-full" />
        <div className="h-3 bg-gray-100 rounded-full w-2/3" />
      </div>
    </div>
  )
}

// ─── Blog List Card ───────────────────────────────────────────────────────────
function BlogCard({ blog, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const title     = blog.title ?? ""
  const content   = blog.content ?? ""
  const thumbnail = blog.thumbnail_url ?? ""
  const createdAt = blog.created_at ?? ""
  const tags      = blog.tags ?? []

  return (
    <div
      onClick={() => onSelect?.(blog)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bg-white rounded-2xl border overflow-hidden cursor-pointer flex flex-col transition-all duration-300
        ${hovered ? "-translate-y-1.5 shadow-2xl shadow-indigo-100 border-indigo-100" : "shadow-sm border-gray-100"}`}
    >
      <div className="relative w-full h-48 overflow-hidden bg-gray-100 flex-shrink-0">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-500 ${hovered ? "scale-110" : "scale-100"}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-indigo-50 to-purple-50">📝</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />
        {tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {tags.map((tag, i) => (
              <span key={tag.id} className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md ${getTagColor(i)}`}>
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 p-5">
        {createdAt && (
          <p className="text-[11px] font-semibold text-gray-400 mb-2 uppercase tracking-widest">{formatDate(createdAt)}</p>
        )}
        <h3 className="text-sm font-black text-gray-900 mb-2 leading-snug line-clamp-2">{title}</h3>
        <p className="text-xs text-gray-400 leading-relaxed flex-1 line-clamp-3">{content}</p>
        <div className="mt-4">
          <span className={`text-xs font-bold text-indigo-700 transition-all ${hovered ? "translate-x-1" : ""}`}>
            Read more →
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Sidebar Blog Card (matches screenshot) ───────────────────────────────────
function BlogSideCard({ thumbnail, title, content, author, onBack }) {
  return (
    <div
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={onBack}
    >
      {thumbnail ? (
        <img src={thumbnail} alt={title} className="w-full h-36 object-cover" />
      ) : (
        <div className="w-full h-36 bg-gradient-to-br from-indigo-800 to-indigo-600 flex items-center justify-center">
          <span className="text-white font-black text-lg tracking-wide">📝</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1.5 line-clamp-2">{title}</h3>
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3">
          {content?.replace(/<[^>]+>/g, "").slice(0, 90)}
        </p>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 border border-indigo-200">
            <span className="text-indigo-700 font-black text-xs">{(author ?? "A")[0].toUpperCase()}</span>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 leading-none mb-0.5">Written by</p>
            <p className="text-xs font-bold text-gray-700 leading-none">{author ?? "Author"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Skeleton Detail ──────────────────────────────────────────────────────────
function SkeletonDetail({ onBack }) {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 py-3.5 px-6 md:px-20">
        <button onClick={onBack} className="inline-flex items-center gap-2 bg-indigo-900 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg">
          ← Back
        </button>
      </nav>
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-10 space-y-5">
        <div className="h-72 bg-gray-100 rounded-2xl animate-pulse" />
        <div className="h-6 bg-gray-100 rounded-full w-2/3 animate-pulse" />
        <div className="h-4 bg-gray-100 rounded-full w-full animate-pulse" />
        <div className="h-4 bg-gray-100 rounded-full w-5/6 animate-pulse" />
      </div>
    </div>
  )
}

// ─── Blog Detail ──────────────────────────────────────────────────────────────
function BlogDetail({ blog, onBack }) {
  const { data: detail, isLoading, isError } = useGetBlogByIdQuery(blog?.id, {
    skip: !blog?.id,
  })

  // Merge API data over card data so title/thumbnail show instantly
  const d         = detail ?? blog ?? {}
  const title     = d.title ?? ""
  const content   = d.content ?? ""
  const thumbnail = d.thumbnail_url ?? ""
  const tags      = d.tags ?? []
  const createdAt = d.created_at ?? ""
  const updatedAt = d.updated_at ?? ""
  const author    = d.author ?? "Author"

  if (isLoading) return <SkeletonDetail onBack={onBack} />

  if (isError) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 text-gray-400">
      <p className="text-5xl">⚠️</p>
      <p className="text-base font-semibold">Failed to load article.</p>
      <button onClick={onBack} className="mt-2 bg-indigo-900 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg hover:-translate-y-0.5 transition-all">
        ← Go Back
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 py-3.5">
        <div className="max-w-6xl mx-auto px-6 md:px-16 flex items-center gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-indigo-900 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg shadow-indigo-200 hover:-translate-y-0.5 transition-all"
          >
            ← Back
          </button>
          <span className="text-sm text-gray-400 truncate">
            Blog / <span className="text-indigo-900 font-bold">{title}</span>
          </span>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 pt-8">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl">
          {thumbnail ? (
            <img src={thumbnail} alt={title} className="w-full h-72 md:h-[420px] object-cover" />
          ) : (
            <div className="w-full h-72 md:h-[420px] bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center text-7xl">📝</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {tags.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span key={tag.id} className={`text-[10.5px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md ${getTagColor(i)}`}>
                  {tag.name}
                </span>
              ))}
            </div>
          )}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <h2 className="text-white text-2xl md:text-4xl font-extrabold drop-shadow-lg leading-tight">{title}</h2>
            <span className="bg-black/50 text-white text-xs px-4 py-1 rounded-full font-medium self-start md:self-auto flex-shrink-0">
              {formatDate(createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-14 items-start">

        {/* Article */}
        <article>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">{title}</h1>

          <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 whitespace-pre-wrap">{content}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-8">
            {tags.map((tag, i) => (
              <span key={tag.id} className={`text-sm font-bold px-6 py-2 rounded-full ${getTagColor(i)}`}>
                {tag.name}
              </span>
            ))}
          </div>

          {/* Author */}
          <div className="flex items-center gap-4 bg-gradient-to-br from-gray-50 to-gray-100 px-5 py-4 rounded-2xl w-fit mb-8">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-700 font-black text-lg">{author[0]?.toUpperCase()}</span>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-0.5">Written by</p>
              <h3 className="text-base font-extrabold text-gray-900">{author}</h3>
            </div>
          </div>

          <hr className="border-gray-100 mb-8" />

          {/* Dates */}
          <div className="flex flex-wrap gap-5 text-xs text-gray-400 font-medium mb-10">
            {createdAt && (
              <span className="flex items-center gap-1.5">📅 Published <strong className="text-gray-600">{formatDate(createdAt)}</strong></span>
            )}
            {updatedAt && updatedAt !== createdAt && (
              <span className="flex items-center gap-1.5">✏️ Updated <strong className="text-gray-600">{formatDate(updatedAt)}</strong></span>
            )}
          </div>

          {/* Learnings */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">What You'll Walk Away With</h2>
            <p className="text-sm text-gray-400 mb-2">Skills and insights from this article</p>
            {LEARNINGS.map((row, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-8 border-t border-gray-100 py-5">
                {[row.left, row.right].map((item, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6 md:sticky md:top-[80px]">

          {/* ✅ Card matching screenshot */}
          <BlogSideCard
            thumbnail={thumbnail}
            title={title}
            content={content}
            author={author}
            onBack={onBack}
          />

          {/* CTA */}
          <div className="bg-gradient-to-br from-indigo-700 to-indigo-500 text-white rounded-3xl p-8 text-center shadow-xl shadow-indigo-200">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="font-extrabold text-lg mb-2">Start Learning Today</h3>
            <p className="text-sm opacity-80 leading-relaxed mb-6">Join 120K+ learners building real-world skills.</p>
            <button className="bg-white text-indigo-700 font-bold px-6 py-3 rounded-full w-full hover:-translate-y-1 transition-all shadow-lg">
              Enroll Now — Free
            </button>
          </div>

          {/* Topics */}
          {tags.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Topics</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span key={tag.id} className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${getTagColor(i)}`}>
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Article info */}
          {createdAt && (
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-2.5">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Article Info</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>📅</span>
                <span>Published <strong>{formatDate(createdAt)}</strong></span>
              </div>
              {updatedAt && updatedAt !== createdAt && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>✏️</span>
                  <span>Updated <strong>{formatDate(updatedAt)}</strong></span>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

// ─── Main BlogsPage ───────────────────────────────────────────────────────────
export default function BlogsPage() {
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [page, setPage]     = useState(1)
  const [search, setSearch] = useState("")

  const { data, isLoading, isError } = useGetBlogsQuery({ page, limit: LIMIT })

  const blogs      = data?.blogs ?? []
  const total      = data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / LIMIT))

  if (selectedBlog) return <BlogDetail blog={selectedBlog} onBack={() => setSelectedBlog(null)} />

  const filtered = blogs.filter(b =>
    (b.title ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (b.content ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (b.tags ?? []).some(t => t.name.toLowerCase().includes(search.toLowerCase()))
  )

  function goTo(p) { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }) }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── HERO ── */}
      <div className="relative bg-gradient-to-br from-[#2D2A8E] to-[#1a177a] pt-14 pb-12 overflow-hidden">
        <div className="absolute w-80 h-80 rounded-full bg-[#3F3CAE] opacity-35 -top-24 right-[15%] blur-[80px] pointer-events-none" />
        <div className="absolute w-48 h-48 rounded-full bg-[#FF2D87] opacity-10 -bottom-14 right-[5%] blur-[60px] pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-[10.5px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
              KHdemy · Blog
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
            Latest <span className="text-amber-400">Articles</span>
          </h1>
          <p className="text-white/65 text-sm leading-relaxed max-w-md mb-8">
            Insights, tutorials, and updates from the KHdemy community.
          </p>
          <div className="max-w-md">
            <p className="text-white/60 text-xs font-bold mb-2">Search</p>
            <div className="relative">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                className="w-full bg-white/95 text-gray-900 placeholder-gray-400 text-sm rounded-xl pl-10 pr-4 py-3 outline-none border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                placeholder="Search articles..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h2 className="text-2xl md:text-3xl font-black text-indigo-900 tracking-tight">All Articles</h2>
          <span className="text-xs font-semibold text-gray-400 bg-white border border-gray-100 px-4 py-1.5 rounded-full shadow-sm">
            {isLoading ? "Loading…" : `${total} article${total !== 1 ? "s" : ""} total`}
          </span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Array.from({ length: LIMIT }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : isError ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-5xl mb-4">⚠️</p>
            <p className="text-base font-semibold">Failed to load articles. Please try again.</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filtered.map(blog => (
              <BlogCard key={blog.id} blog={blog} onSelect={setSelectedBlog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-400">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-base font-semibold">No articles found{search ? ` for "${search}"` : ""}.</p>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-1.5 pb-16 flex-wrap">
            <button
              onClick={() => goTo(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl border border-indigo-200 text-indigo-700 font-bold text-sm bg-white hover:bg-indigo-50 disabled:opacity-40 transition-all"
            >
              ‹ Back
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => goTo(p)}
                className={`min-w-[42px] px-4 py-2 rounded-xl border text-sm font-medium transition-all
                  ${page === p
                    ? "bg-indigo-900 text-white border-indigo-900 font-bold shadow-lg shadow-indigo-200"
                    : "bg-white text-gray-700 border-gray-200 hover:border-indigo-400 hover:text-indigo-700 hover:bg-indigo-50 hover:-translate-y-0.5"
                  }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => goTo(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl border border-indigo-200 text-indigo-700 font-bold text-sm bg-white hover:bg-indigo-50 disabled:opacity-40 transition-all"
            >
              Next ›
            </button>
          </div>
        )}
      </div>
    </div>
  )
}