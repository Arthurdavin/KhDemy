import { useEffect } from "react"
import { BLOGS } from "./BlogPage"

/* ─────────────────────────────────────────────
   PER-BLOG DYNAMIC CONTENT
───────────────────────────────────────────── */
const BLOG_DETAILS = {
  1: {
    tags: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
    p1: "UX/UI Design is one of the most sought-after skills in tech today. Great design is not just about making things look pretty — it's about solving real user problems through intuitive, accessible, and delightful experiences. Companies everywhere are hiring designers who can bridge the gap between users and technology.",
    p2: "This course covers the full design process from user research and wireframing to high-fidelity prototyping in Figma. You'll work on real projects, get feedback, and graduate with a portfolio that showcases your skills to potential employers.",
    learnings: [
      { left:"User research & empathy mapping",       right:"Wireframing & low-fidelity mockups" },
      { left:"High-fidelity UI design in Figma",      right:"Design systems & component libraries" },
      { left:"Usability testing & iteration",          right:"Accessibility & inclusive design" },
      { left:"Prototyping & micro-interactions",       right:"Handoff to developers with Figma" },
    ],
  },
  2: {
    tags: ["Practical", "Interactive", "Innovative", "Future-Ready"],
    p1: "React remains the most in-demand frontend library in the world — and for good reason. It enables developers to build blazing-fast interfaces with a component-driven architecture that scales beautifully. Whether you're aiming for a job at a tech startup or launching your own product, React is your best investment.",
    p2: "This course was designed from the ground up by Lina, a senior developer who has shipped production React applications for companies across Southeast Asia and Europe. Every lesson is built around real code, real patterns, and real-world problem solving — not just slides and theory.",
    learnings: [
      { left:"Testing with React Testing Library",    right:"useState, useEffect & core hooks" },
      { left:"React component architecture & JSX",    right:"TypeScript integration with React" },
      { left:"Fetching data from REST & GraphQL APIs", right:"Global state with Context & Zustand" },
      { left:"React Router for multi-page apps",      right:"Performance optimization techniques" },
    ],
  },
  3: {
    tags: ["Backend", "Server-Side", "MySQL", "Security"],
    p1: "PHP powers over 75% of websites on the internet, including giants like WordPress, Facebook, and Wikipedia. It's a battle-tested, versatile language that's perfect for building dynamic, database-driven web applications quickly and efficiently.",
    p2: "In this course you'll master PHP from the ground up — from variables and functions to OOP, MVC architecture, and building RESTful APIs. You'll connect to MySQL databases, handle authentication, and deploy a full-stack PHP application by the end.",
    learnings: [
      { left:"PHP syntax, variables & control flow",  right:"Object-oriented PHP & classes" },
      { left:"MySQL database design & queries",        right:"MVC architecture with Laravel basics" },
      { left:"Form handling & data validation",        right:"User authentication & sessions" },
      { left:"Building RESTful APIs with PHP",         right:"Deploying PHP apps to a server" },
    ],
  },
  4: {
    tags: ["ES6+", "DOM", "Async", "Browser APIs"],
    p1: "JavaScript is the language of the web — it runs in every browser and powers everything from interactive dropdowns to full-scale web apps. Mastering JavaScript opens doors to frontend, backend (Node.js), and mobile development with a single language.",
    p2: "This course takes you from JavaScript fundamentals to modern ES6+ features, async programming, and DOM manipulation. You'll build real interactive projects along the way and finish with a strong foundation to tackle any JavaScript framework.",
    learnings: [
      { left:"Variables, functions & scope",           right:"ES6+ arrow functions & destructuring" },
      { left:"DOM manipulation & events",              right:"Promises, async/await & fetch API" },
      { left:"Arrays, objects & higher-order functions", right:"Modules & modern JS tooling" },
      { left:"Error handling & debugging",             right:"LocalStorage & browser APIs" },
    ],
  },
  5: {
    tags: ["Data Science", "Automation", "AI/ML", "Scripting"],
    p1: "Python is the world's most popular programming language for good reason — it's readable, powerful, and versatile. From web development to data science and AI, Python is the go-to tool for developers, analysts, and researchers worldwide.",
    p2: "This course starts with Python basics and builds up to data analysis with Pandas, visualization with Matplotlib, and an introduction to machine learning with scikit-learn. You'll complete real data projects that demonstrate your skills to employers.",
    learnings: [
      { left:"Python syntax, loops & functions",       right:"Object-oriented programming in Python" },
      { left:"Data analysis with Pandas & NumPy",      right:"Data visualization with Matplotlib" },
      { left:"Web scraping with BeautifulSoup",        right:"Intro to machine learning with scikit-learn" },
      { left:"File I/O & working with APIs",           right:"Writing clean, testable Python code" },
    ],
  },
  6: {
    tags: ["Server-Side", "Express", "APIs", "Real-Time"],
    p1: "Node.js changed everything for JavaScript developers — now you can use the same language on both the frontend and backend. Its non-blocking, event-driven architecture makes it perfect for building fast, scalable APIs and real-time applications.",
    p2: "You'll learn how to build REST APIs with Express, connect to MongoDB, handle authentication with JWT, and deploy your backend to the cloud. By the end you'll have a production-ready Node.js API powering a full-stack app.",
    learnings: [
      { left:"Node.js runtime & event loop",           right:"Building REST APIs with Express.js" },
      { left:"MongoDB & Mongoose for data storage",    right:"JWT authentication & authorization" },
      { left:"Middleware, routing & error handling",   right:"File uploads & working with streams" },
      { left:"WebSockets & real-time with Socket.io",  right:"Deploying Node apps to cloud platforms" },
    ],
  },
  7: {
    tags: ["Cross-Platform", "Dart", "Mobile", "iOS & Android"],
    p1: "Flutter lets you write one codebase and ship to iOS, Android, Web, and Desktop simultaneously. With its rich widget library and hot-reload development experience, Flutter has become one of the fastest-growing mobile frameworks in the world.",
    p2: "In this course you'll learn Dart from scratch, build beautiful UIs with Flutter widgets, manage state, connect to APIs, and publish your first app to both the App Store and Google Play. No prior mobile development experience needed.",
    learnings: [
      { left:"Dart language fundamentals",             right:"Flutter widget tree & layouts" },
      { left:"State management with Provider & Riverpod", right:"Navigation & routing in Flutter" },
      { left:"Connecting to REST APIs",                right:"Local storage with Hive & SharedPrefs" },
      { left:"Publishing to App Store & Play Store",   right:"Animations & custom UI components" },
    ],
  },
  8: {
    tags: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision"],
    p1: "Artificial Intelligence and Machine Learning are transforming every industry — from healthcare to finance to education. Understanding the fundamentals of AI/ML gives you a massive competitive edge whether you're a developer, analyst, or entrepreneur.",
    p2: "This course covers the core ML algorithms, neural networks, and hands-on projects using Python, TensorFlow, and scikit-learn. You'll build and train real models, understand how they work under the hood, and learn to evaluate and deploy them.",
    learnings: [
      { left:"Supervised & unsupervised learning",     right:"Neural networks & deep learning basics" },
      { left:"Data preprocessing & feature engineering", right:"Model evaluation & hyperparameter tuning" },
      { left:"Computer vision with CNNs",              right:"NLP & text classification" },
      { left:"Building ML pipelines with scikit-learn", right:"Deploying ML models as APIs" },
    ],
  },
  9: {
    tags: ["Responsive", "CSS Grid", "Flexbox", "Performance"],
    p1: "Mobile-first design is no longer optional — over 60% of web traffic comes from mobile devices. Building responsive, performant web experiences that look great on any screen size is a fundamental skill every frontend developer must master.",
    p2: "This course teaches you mobile-first CSS, responsive layouts with Flexbox and Grid, media queries, and performance optimization techniques. You'll redesign real websites from desktop-first to fully responsive mobile experiences.",
    learnings: [
      { left:"Mobile-first CSS methodology",           right:"Responsive layouts with Flexbox" },
      { left:"CSS Grid for complex layouts",           right:"Media queries & breakpoints" },
      { left:"Touch-friendly UI & tap targets",        right:"Image optimization & lazy loading" },
      { left:"Testing across devices & browsers",      right:"Performance metrics & Core Web Vitals" },
    ],
  },
  10: {
    tags: ["Virtual Reality", "Augmented Reality", "WebXR", "3D"],
    p1: "VR and AR are no longer science fiction — they're reshaping education, training, retail, and entertainment. Developers who can build immersive experiences are in high demand, and the barrier to entry has never been lower thanks to WebXR and tools like A-Frame and Three.js.",
    p2: "In this course you'll build immersive 3D experiences for the web using WebXR, A-Frame, and Three.js. No prior 3D experience is required — you'll go from basics to building a fully interactive VR learning environment from scratch.",
    learnings: [
      { left:"3D fundamentals & scene setup",          right:"Building VR scenes with A-Frame" },
      { left:"Three.js for WebGL rendering",           right:"AR overlays with WebXR" },
      { left:"3D models, textures & animations",       right:"Interactivity & event handling in 3D" },
      { left:"Optimizing 3D for the web",              right:"Deploying WebXR experiences" },
    ],
  },
  11: {
    tags: ["Engagement", "Game Design", "Rewards", "Learning UX"],
    p1: "Gamification applies game design principles — points, badges, leaderboards, challenges — to non-game contexts like e-learning, fitness apps, and productivity tools. Done right, it dramatically boosts user engagement, retention, and motivation.",
    p2: "This course teaches you how to design and implement gamification systems in web and mobile apps. You'll learn the psychology behind what makes gamification work, how to avoid common pitfalls, and how to build reward systems that keep users coming back.",
    learnings: [
      { left:"Psychology of motivation & rewards",     right:"Points, badges & leaderboard systems" },
      { left:"Designing meaningful challenges",        right:"Progress tracking & streaks" },
      { left:"Implementing gamification in React",     right:"A/B testing gamification features" },
      { left:"Avoiding dark patterns in gamification", right:"Measuring engagement & retention" },
    ],
  },
  12: {
    tags: ["AI Tutors", "Personalization", "EdTech", "Adaptive Learning"],
    p1: "AI-Powered Learning platforms are revolutionizing education by adapting to each learner's pace, style, and goals. From intelligent tutoring systems to automated feedback and personalized content recommendations, AI is making education more effective and accessible than ever.",
    p2: "This course explores how to build adaptive learning systems using AI APIs, recommendation algorithms, and natural language processing. You'll design and prototype an AI-powered learning platform that personalizes content and provides intelligent feedback.",
    learnings: [
      { left:"Fundamentals of adaptive learning systems", right:"Recommendation engines for content" },
      { left:"Integrating AI APIs (OpenAI, Anthropic)", right:"NLP for automated feedback" },
      { left:"Learner analytics & progress modeling",  right:"Personalization algorithms" },
      { left:"Building AI tutors & chatbots",          right:"Ethical AI in education" },
    ],
  },
}

const DEFAULT_DETAIL = {
  tags: ["Practical", "Hands-On", "Modern", "Career-Ready"],
  p1: "This course covers one of the most in-demand skills in modern tech. Whether you're a beginner or looking to level up, you'll gain practical knowledge you can apply to real-world projects immediately.",
  p2: "Designed by industry professionals with years of hands-on experience, every lesson is grounded in real code and real problems. You'll finish with a portfolio project that showcases your new skills.",
  learnings: [
    { left:"Core fundamentals & syntax",               right:"Advanced patterns & best practices" },
    { left:"Building real-world projects",             right:"Debugging & problem solving" },
    { left:"Integrating with APIs & services",         right:"Testing & code quality" },
    { left:"Deployment & production considerations",   right:"Career tips & next steps" },
  ],
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'Plus Jakarta Sans',sans-serif; }
  :root { --primary:#2D2A8E; --text:#111111; --desc:#9B9BAA; --bg:#FFFFFF; }

  .bd { background:#fff; min-height:100vh; font-family:'Plus Jakarta Sans',sans-serif; color:#111827; overflow-x:hidden; }
  .page-enter { animation:pageIn .4s cubic-bezier(.22,1,.36,1) both; }
  @keyframes pageIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

  .bd-nav { position:sticky; top:0; z-index:100; background:rgba(255,255,255,.92); backdrop-filter:blur(12px); border-bottom:1px solid #f0f0f0; padding:14px 80px; display:flex; align-items:center; gap:16px; }
  .bd-back-btn { display:inline-flex; align-items:center; gap:8px; background:var(--primary); color:#fff; font-size:13px; font-weight:700; padding:8px 18px; border-radius:100px; border:none; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; transition:transform .2s,box-shadow .2s; box-shadow:0 4px 14px rgba(45,42,142,.3); }
  .bd-back-btn:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(45,42,142,.4); }
  .bd-nav-crumb { font-size:13px; color:#9ca3af; }
  .bd-nav-crumb span { color:var(--primary); font-weight:700; }

  .bd-hero-outer { max-width:1200px; margin:0 auto; padding:36px 80px 0; }
  .bd-hero-box   { border-radius:22px; overflow:hidden; position:relative; }
  .bd-hero-img   { width:100%; height:440px; object-fit:cover; display:block; animation:heroImg .6s ease both; }
  @keyframes heroImg { from{transform:scale(1.04);opacity:0} to{transform:scale(1);opacity:1} }
  .bd-hero-shade { position:absolute; inset:0; background:linear-gradient(to top,rgba(17,24,39,.5) 0%,transparent 55%); }
  .bd-hero-badge { position:absolute; top:20px; left:20px; background:rgba(255,255,255,.93); backdrop-filter:blur(8px); border-radius:100px; padding:6px 14px; font-size:11.5px; font-weight:700; color:var(--primary); display:flex; align-items:center; gap:6px; box-shadow:0 4px 14px rgba(0,0,0,.1); }
  .bd-hero-bdot  { width:6px; height:6px; background:var(--primary); border-radius:50%; }
  .bd-hero-foot  { position:absolute; bottom:20px; left:24px; right:24px; display:flex; align-items:flex-end; justify-content:space-between; gap:10px; }
  .bd-hero-htitle{ font-size:clamp(16px,3vw,28px); font-weight:900; color:#fff; letter-spacing:-0.02em; line-height:1.2; text-shadow:0 2px 12px rgba(0,0,0,.35); text-align:left; }
  .bd-hero-chips { display:flex; gap:7px; flex-wrap:wrap; justify-content:flex-end; }
  .bd-hero-chip  { font-size:11px; font-weight:700; padding:4px 11px; border-radius:100px; }

  .bd-body { max-width:1200px; margin:0 auto; padding:48px 80px 100px; display:grid; grid-template-columns:1fr 300px; gap:64px; align-items:start; }

  .bd-meta { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:14px; }
  .bd-meta-chip { font-size:11.5px; font-weight:700; padding:5px 13px; border-radius:100px; letter-spacing:.05em; text-transform:uppercase; }
  .bd-meta-read { font-size:13px; color:#9ca3af; }
  .bd-title  { font-size:clamp(22px,4vw,36px); font-weight:900; color:#111827; margin-bottom:20px; line-height:1.15; letter-spacing:-0.025em; text-align:left; animation:fadeUp .6s .1s ease both; }
  .bd-para   { font-size:15px; color:#374151; line-height:1.9; margin-bottom:18px; text-align:left; animation:fadeUp .6s .2s ease both; }
  .bd-tags   { display:flex; gap:10px; flex-wrap:wrap; margin:8px 0 28px; animation:fadeUp .6s .3s ease both; }
  .bd-tag    { background:#1e1b4b; color:#fff; font-size:13.5px; font-weight:600; padding:9px 22px; border-radius:100px; cursor:pointer; transition:background .2s,transform .2s; }
  .bd-tag:hover { background:#3730a3; transform:translateY(-2px); }
  .bd-divider{ border:none; border-top:1px solid #e5e7eb; margin:0 0 24px; }

  .bd-author    { display:flex; align-items:center; gap:14px; animation:fadeUp .6s .35s ease both; }
  .bd-author-av { width:60px; height:60px; border-radius:50%; overflow:hidden; flex-shrink:0; border:2.5px solid #e5e7eb; background:#eef2ff; }
  .bd-author-av img { width:100%; height:100%; object-fit:cover; object-position:top; display:block; }
  .bd-author-lbl  { font-size:12px; color:#9ca3af; margin-bottom:3px; }
  .bd-author-name { font-size:16px; font-weight:800; color:#111827; }

  .bd-learn     { margin-top:56px; animation:fadeUp .6s .4s ease both; }
  .bd-learn-h   { font-size:clamp(18px,2.5vw,24px); font-weight:800; color:#111827; margin-bottom:4px; letter-spacing:-0.02em; }
  .bd-learn-sub { font-size:13px; color:#9ca3af; margin-bottom:14px; }
  .bd-learn-row { display:grid; grid-template-columns:1fr 1fr; border-top:1px solid #f3f4f6; padding:16px 0; gap:20px; }
  .bd-learn-item{ display:flex; align-items:flex-start; gap:10px; font-size:14px; color:#374151; line-height:1.6; text-align:left; }
  .bd-learn-check{ width:20px; height:20px; border-radius:50%; background:#eef2ff; display:grid; place-items:center; flex-shrink:0; margin-top:1px; }
  .bd-learn-end { border-top:1px solid #f3f4f6; }

  .bd-sidebar-card { background:#fff; border-radius:18px; border:1px solid #efefef; box-shadow:0 4px 24px rgba(0,0,0,.07); overflow:hidden; margin-bottom:20px; cursor:pointer; transition:transform .2s,box-shadow .2s; }
  .bd-sidebar-card:hover { transform:translateY(-4px); box-shadow:0 12px 32px rgba(0,0,0,.12); }
  .bd-sidebar-img   { width:100%; height:155px; object-fit:cover; display:block; transition:transform .4s; }
  .bd-sidebar-card:hover .bd-sidebar-img { transform:scale(1.04); }
  .bd-sidebar-body  { padding:16px 16px 20px; }
  .bd-sidebar-tag   { display:inline-block; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; background:#eef2ff; color:var(--primary); padding:4px 10px; border-radius:100px; margin-bottom:9px; }
  .bd-sidebar-title { font-weight:800; font-size:15.5px; color:#111827; margin-bottom:6px; line-height:1.4; }
  .bd-sidebar-desc  { font-size:12.5px; color:#9ca3af; line-height:1.65; margin-bottom:12px; }
  .bd-sidebar-auth  { display:flex; align-items:center; gap:8px; padding-top:10px; border-top:1px solid #f3f4f6; }
  .bd-sidebar-sav   { width:26px; height:26px; border-radius:50%; overflow:hidden; flex-shrink:0; border:1.5px solid #e5e7eb; background:#eef2ff; }
  .bd-sidebar-sav img { width:100%; height:100%; object-fit:cover; object-position:top; display:block; }
  .bd-sidebar-aname { font-size:12.5px; color:#374151; font-weight:600; }

  .bd-cta { background:linear-gradient(135deg,var(--primary),#4f46e5); border-radius:18px; padding:24px 18px; color:#fff; text-align:center; position:sticky; top:80px; }
  .bd-cta-icon  { font-size:32px; margin-bottom:9px; }
  .bd-cta-title { font-size:16px; font-weight:900; margin-bottom:6px; letter-spacing:-.01em; }
  .bd-cta-desc  { font-size:12px; opacity:.85; line-height:1.65; margin-bottom:16px; }
  .bd-cta-btn   { background:#fff; color:var(--primary); font-size:13px; font-weight:800; padding:10px 22px; border-radius:100px; border:none; cursor:pointer; width:100%; font-family:'Plus Jakarta Sans',sans-serif; transition:transform .2s,box-shadow .2s; }
  .bd-cta-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,.18); }

  @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }

  @media(max-width:1024px){
    .bd-nav{padding:12px 40px} .bd-hero-outer{padding:28px 40px 0} .bd-body{padding:40px 40px 80px;gap:48px;grid-template-columns:1fr 260px}
  }
  @media(max-width:768px){
    .bd-nav{padding:12px 20px} .bd-hero-outer{padding:20px 20px 0} .bd-hero-img{height:280px}
    .bd-hero-foot{flex-direction:column;align-items:flex-start;gap:8px} .bd-hero-chips{justify-content:flex-start}
    .bd-body{padding:28px 20px 60px;grid-template-columns:1fr;gap:32px} .bd-cta{position:static}
    .bd-sidebar-wrapper{display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start}
    .bd-learn-row{grid-template-columns:1fr;gap:10px;padding:14px 0}
  }
  @media(max-width:480px){
    .bd-nav{padding:10px 14px} .bd-back-btn{font-size:12px;padding:7px 14px}
    .bd-hero-outer{padding:12px 14px 0} .bd-hero-img{height:210px}
    .bd-body{padding:20px 14px 48px} .bd-title{font-size:20px} .bd-para{font-size:14px}
    .bd-tags{gap:7px} .bd-tag{font-size:12.5px;padding:7px 16px} .bd-sidebar-wrapper{grid-template-columns:1fr}
  }
`

export default function BlogDetail({ blog, onBack }) {
  useEffect(() => { window.scrollTo({ top:0, behavior:"smooth" }) }, [blog])

  const detail  = BLOG_DETAILS[blog.id] || DEFAULT_DETAIL
  const related = blog

  return (
    <>
      <style>{css}</style>
      <div className="bd page-enter">

        <nav className="bd-nav">
          <button className="bd-back-btn" onClick={onBack}>← Back</button>
          <span className="bd-nav-crumb">Blog / <span>{blog.title}</span></span>
        </nav>

        <div className="bd-hero-outer">
          <div className="bd-hero-box">
            <img className="bd-hero-img" src={blog.img} alt={blog.title} />
            <div className="bd-hero-shade" />
            <div className="bd-hero-badge"><span className="bd-hero-bdot" />{blog.title} · 2026</div>
            <div className="bd-hero-foot">
              <h2 className="bd-hero-htitle">{blog.cardTitle}</h2>
              <div className="bd-hero-chips">
                <span className="bd-hero-chip" style={{ background:"rgba(99,102,241,.75)", color:"#fff" }}>{blog.title}</span>
                <span className="bd-hero-chip" style={{ background:"rgba(236,72,153,.75)", color:"#fff" }}>Course</span>
                <span className="bd-hero-chip" style={{ background:"rgba(0,0,0,.4)",       color:"#fff" }}>8 min read</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bd-body">
          <article>
            <div className="bd-meta">
              <span className="bd-meta-chip" style={{ background:"#eef2ff", color:"#6366f1" }}>{blog.title}</span>
              <span className="bd-meta-chip" style={{ background:"#fce7f3", color:"#ec4899" }}>Course</span>
              <span className="bd-meta-read">· 8 min read</span>
            </div>

            <h1 className="bd-title">{blog.cardTitle}</h1>
            <p className="bd-para">{detail.p1}</p>
            <p className="bd-para" style={{ marginBottom:28 }}>{detail.p2}</p>

            <div className="bd-tags">
              {detail.tags.map(t => <span key={t} className="bd-tag">{t}</span>)}
            </div>

            <hr className="bd-divider" />

            <div className="bd-author">
              <div className="bd-author-av"><img src="/sarikapro.jpg" alt={blog.author} /></div>
              <div>
                <p className="bd-author-lbl">Written by</p>
                <p className="bd-author-name">{blog.author}</p>
              </div>
            </div>

            <div className="bd-learn">
              <h2 className="bd-learn-h">What You'll Walk Away With</h2>
              <p className="bd-learn-sub">Skills you'll gain from this course</p>
              {detail.learnings.map((row, i) => (
                <div key={i} className="bd-learn-row">
                  {[row.left, row.right].map((txt, j) => (
                    <div key={j} className="bd-learn-item">
                      <div className="bd-learn-check">
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      {txt}
                    </div>
                  ))}
                </div>
              ))}
              <div className="bd-learn-end" />
            </div>
          </article>

          <aside>
            <div className="bd-sidebar-wrapper">
              <div className="bd-sidebar-card" onClick={onBack}>
                <img className="bd-sidebar-img" src={related.img} alt={related.title} />
                <div className="bd-sidebar-body">
                  <span className="bd-sidebar-tag">Related</span>
                  <p className="bd-sidebar-title">{related.title}</p>
                  <p className="bd-sidebar-desc">{related.desc}</p>
                  <div className="bd-sidebar-auth">
                    <div className="bd-sidebar-sav"><img src="/sarikapro.jpg" alt="Sarika" /></div>
                    <span className="bd-sidebar-aname">{related.author}</span>
                  </div>
                </div>
              </div>

              <div className="bd-cta">
                <div className="bd-cta-icon">🚀</div>
                <div className="bd-cta-title">Start Learning Today</div>
                <div className="bd-cta-desc">Join 120K+ learners building real-world apps with expert guidance.</div>
                <button className="bd-cta-btn">Enroll Now — Free</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}