const STATS = [
  { value: "120K+", label: "Learners" },
  { value: "850+",  label: "Courses" },
  { value: "90+",   label: "Countries" },
  { value: "98%",   label: "Satisfaction" },
]

const MENTORS = [
  { name: "Mr. Kay Keo",       quote: "Each day I grow stronger. Soon unstoppable.",              img: "/cherkeomentor.jpg" },
  { name: "Miss. Eung Lyzhai", quote: "If you want the best, you've gotta put up with an oven.", img: "/cherzhiamentor.jpg" },
]

const TEAM = [
  { name: "Chhay Davin",     role: "Group Leader",  quote: "It is soon will be in the past.",    img: "/davinleader.jpg" },
  { name: "Chhorn Seacleng", role: "Sub-Leader",     quote: "Brake and grow.",                   img: "/seavlengsubleader.jpg" },
  { name: "Ngorn Sansarika", role: "Group Member",   quote: "It is soon will be in the past.",   img: "/sarikamember.jpg" },
  { name: "Lut Lina",        role: "Group Member",   quote: "Follow your way, not their words.", img: "/linamember.jpg" },
  { name: "Sroeum Saren",    role: "Group Member",   quote: "Let's grow together.",              img: "/sarean.jpg" },
  { name: "Sea Sengchhay",   role: "Group Member",   quote: "What you Give is What you Get.",    img: "/sengchhymember.jpg" },
  { name: "Bun Raksa",       role: "Group Member",   quote: "It is soon will be in the past.",   img: "/sarikapro.jpg" },
]

// Dark mode works by toggling .dark on <html> via ThemeContext.
// All colors reference CSS variables that change between :root and :root.dark
const css = `
  :root {
    --primary:    #1e1b6e;
    --primary-lt: #eeedf8;
    --primary-md: #b3b0e0;
    --secondary:  #e53935;
    --accent:     #f5a623;
    --blue:       #2196f3;
    --pink:       #e91e8c;
    --text:       #111111;
    --muted:      #9e9e9e;
    --border:     #e8e8e8;
    --bg:         #ffffff;
    --bg-soft:    #fafafa;
    --bg-card:    #ffffff;
    --bg-hero:    #eef2ff;
    --shadow:     rgba(30,27,110,0.10);
  }

  /* ── DARK OVERRIDES ── */
  :root.dark {
    --primary-lt: rgba(99,97,210,0.15);
    --primary-md: #4a47a3;
    --text:       #f1f1f1;
    --muted:      #9b9baa;
    --border:     #2e2e45;
    --bg:         #0f0f1a;
    --bg-soft:    #13131f;
    --bg-card:    #1a1a2e;
    --bg-hero:    #1a1a3e;
    --shadow:     rgba(0,0,0,0.40);
  }

  /* ── BASE ── */
  .page {
    background: var(--bg);
    color: var(--text);
    font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
    transition: background 0.3s, color 0.3s;
  }
  .wrap { max-width: 1100px; margin: 0 auto; padding: 0 60px; }

  /* ── HERO ── */
  .hero {
    background: var(--bg-hero);
    padding: 56px 0 52px;
    position: relative; overflow: hidden;
    transition: background 0.3s;
  }
  .hero-inner {
    display: grid; grid-template-columns: 1fr auto;
    gap: 32px; align-items: center;
    position: relative; z-index: 1;
  }
  .hero-text { text-align: left; }
  .hero-title {
    font-size: clamp(36px,5vw,60px); font-weight: 900;
    line-height: 1.05; letter-spacing: -0.02em; margin-bottom: 6px;
  }
  .hero-title .t-indigo { color: var(--primary); display: block; }
  .hero-title .t-pink   { color: var(--pink);    display: block; }
  :root.dark .hero-title .t-indigo { color: #8b87ff; }

  .hero-underline {
    width: 56px; height: 4px;
    background: linear-gradient(90deg, var(--primary), var(--pink));
    border-radius: 4px; margin-bottom: 22px;
  }
  .hero-desc { font-size: 14px; color: var(--muted); line-height: 1.8; max-width: 380px; margin-bottom: 36px; }
  .hero-stats { display: flex; gap: 44px; flex-wrap: wrap; }
  .h-stat-num {
    font-size: clamp(22px,2.5vw,30px); font-weight: 900;
    color: var(--primary); line-height: 1; margin-bottom: 4px;
  }
  :root.dark .h-stat-num { color: #a5b4fc; }

  /* Fix dot group visibility in dark */
  :root.dark .dot-sm { opacity: 0.4; }
  .h-stat-lbl { font-size: 12px; color: var(--muted); font-weight: 500; }

  .hero-illus { position: relative; width: clamp(200px,26vw,300px); flex-shrink: 0; }
  .hero-illus-blob {
    position: absolute; width: 200px; height: 200px;
    border-radius: 50%; background: #C4B5FD;
    opacity: 0.45; top: -28px; right: -16px; z-index: 0;
    transition: opacity 0.3s;
  }
  :root.dark .hero-illus-blob { opacity: 0.15; }
  .hero-illus img {
    position: relative; z-index: 1; width: 100%; object-fit: contain;
    filter: drop-shadow(0 8px 24px rgba(30,27,110,0.15));
    transition: filter 0.3s;
  }
  :root.dark .hero-illus img { filter: drop-shadow(0 8px 24px rgba(139,135,255,0.2)) brightness(0.85); }

  .dot-group { position: absolute; display: flex; gap: 5px; flex-wrap: wrap; width: 56px; pointer-events: none; }
  .dot-sm    { width: 7px; height: 7px; border-radius: 50%; }
  .deco      { position: absolute; pointer-events: none; }

  /* ── WHO ARE WE ── */
  .who-section {
    padding: 88px 0 80px; background: var(--bg);
    position: relative; overflow: hidden;
    transition: background 0.3s;
  }
  .who-dot { position: absolute; border-radius: 50%; pointer-events: none; animation: wfloat 5s ease-in-out infinite; }
  @keyframes wfloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

  .who-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; position: relative; z-index: 1; }
  .who-left  { display: flex; flex-direction: column; gap: 28px; }

  .who-cloud {
    position: relative; background: linear-gradient(135deg,#29b6f6,#0ea5e9);
    border-radius: 50px 50px 50px 12px; padding: 20px 44px;
    display: inline-flex; align-items: center; justify-content: center;
    width: fit-content; box-shadow: 0 10px 36px rgba(14,165,233,0.32);
    animation: popIn 0.6s cubic-bezier(.34,1.56,.64,1) both;
  }
  @keyframes popIn { from{opacity:0;transform:scale(0.7)} to{opacity:1;transform:scale(1)} }
  .who-cloud::before { content:''; position:absolute; width:32px; height:32px; background:linear-gradient(135deg,#29b6f6,#0ea5e9); border-radius:50%; top:-16px; left:28px; }
  .who-cloud::after  { content:''; position:absolute; width:20px; height:20px; background:linear-gradient(135deg,#29b6f6,#0ea5e9); border-radius:50%; top:-26px; left:52px; }
  .who-cloud-puff { position:absolute; background:linear-gradient(135deg,#38c7f8,#0ea5e9); border-radius:50%; }
  .who-cloud h2 { font-size:clamp(18px,2vw,22px); font-weight:900; color:#fff; white-space:nowrap; letter-spacing:-0.01em; position:relative; z-index:1; }

  .who-illus-wrap { position:relative; width:100%; max-width:340px; }
  .who-people-svg {
    position:relative; z-index:1; width:100%;
    filter:drop-shadow(0 8px 24px rgba(30,27,110,0.1));
    animation:fadeUp 0.7s 0.2s ease both;
    transition: filter 0.3s;
  }
  :root.dark .who-people-svg { filter: drop-shadow(0 8px 24px rgba(0,0,0,0.4)) brightness(0.75); }

  .who-float-card {
    position:absolute; background:var(--bg-card); border-radius:14px;
    padding:9px 15px; display:flex; align-items:center; gap:9px;
    font-size:12px; font-weight:700; color:var(--text); white-space:nowrap;
    box-shadow:0 8px 28px var(--shadow); z-index:2;
    animation:fadeUp 0.6s ease both;
    transition: background 0.3s, color 0.3s, box-shadow 0.3s;
  }
  .who-float-icon { width:28px; height:28px; border-radius:8px; display:grid; place-items:center; font-size:14px; flex-shrink:0; }
  .who-right { display:flex; flex-direction:column; gap:20px; animation:fadeUp 0.7s 0.15s ease both; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }

  .who-badge {
    display:inline-flex; align-items:center; gap:7px;
    background:var(--primary-lt); border:1.5px solid var(--primary-md);
    color:var(--primary); font-size:11px; font-weight:700;
    letter-spacing:0.12em; text-transform:uppercase;
    padding:7px 16px; border-radius:100px; width:fit-content;
    transition: background 0.3s, border-color 0.3s, color 0.3s;
  }
  :root.dark .who-badge { color: #8b87ff; }
  .who-desc { font-size:clamp(15px,1.6vw,17px); font-weight:700; line-height:2.0; color:var(--text); max-width:400px; }

  /* ── MISSION ── */
  .mission-section {
    padding:72px 0 80px; background:var(--bg);
    border-top:1px solid var(--border); border-bottom:1px solid var(--border);
    transition: background 0.3s, border-color 0.3s;
  }
  .mission-heading { font-size:clamp(32px,4vw,52px); font-weight:900; letter-spacing:-0.025em; margin-bottom:48px; line-height:1; }
  .mission-heading .red  { color:var(--secondary); }
  .mission-heading .dark { color:var(--text); }
  .mission-inner { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }

  .mission-photo { border-radius:20px; overflow:hidden; box-shadow:0 12px 40px var(--shadow); border:1px solid var(--border); transition: border-color 0.3s; }
  .mission-photo img { width:100%; height:300px; object-fit:cover; display:block; transition: filter 0.3s; }
  :root.dark .mission-photo img { filter: brightness(0.7); }

  .mission-cards { display:flex; flex-direction:column; gap:14px; }
  .mc {
    border-radius:16px; padding:18px 22px;
    display:flex; gap:14px; align-items:flex-start;
    box-shadow:0 4px 20px rgba(0,0,0,0.08);
    transition:transform 0.2s, box-shadow 0.2s;
  }
  :root.dark .mc { box-shadow: 0 4px 20px rgba(0,0,0,0.35); }
  .mc:hover { transform:translateX(6px); box-shadow:0 8px 28px rgba(0,0,0,0.18); }
  .mc:nth-child(1) { margin-left:0; }
  .mc:nth-child(2) { margin-left:32px; }
  .mc:nth-child(3) { margin-left:64px; }
  .mc-icon-wrap { width:42px; height:42px; border-radius:50%; background:rgba(255,255,255,0.25); display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }
  .mc-title { font-size:14px; font-weight:800; color:#fff; margin-bottom:4px; }
  .mc-desc  { font-size:12px; color:rgba(255,255,255,0.88); line-height:1.6; }

  /* ── MENTORS / TEAM ── */
  .mentors-section { padding:80px 0; background:var(--bg); transition: background 0.3s; }
  .team-section    { padding:80px 0; background:var(--bg-soft); transition: background 0.3s; }

  .sec-heading { text-align:center; font-size:clamp(24px,3vw,36px); font-weight:900; color:var(--text); margin-bottom:52px; letter-spacing:-0.02em; }
  .sec-heading .accent { color:var(--primary); }
  :root.dark .sec-heading .accent { color: #8b87ff; }

  .mentors-row { display:flex; justify-content:center; gap:40px; flex-wrap:wrap; }
  .mentors-row .pcard { width:240px; }

  .pcard {
    background: var(--bg-card);
    border:1px solid var(--border);
    border-radius:20px; padding:32px 20px 24px;
    text-align:center;
    transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s, background 0.3s;
    display:flex; flex-direction:column; align-items:center;
  }
  .pcard:hover { box-shadow:0 12px 36px var(--shadow); transform:translateY(-5px); border-color:var(--primary-md); }

  .pcard-av {
    width:100px; height:100px; border-radius:50%; overflow:hidden;
    margin-bottom:16px; border:3px solid var(--primary-md);
    background:var(--primary-lt);
    transition: border-color 0.25s, box-shadow 0.25s, background 0.3s;
    flex-shrink:0; position:static; transform:none;
    box-shadow: 0 4px 16px var(--shadow);
  }
  .pcard:hover .pcard-av { border-color:var(--primary); box-shadow:0 6px 24px var(--shadow); }
  .pcard-av img { width:100%; height:100%; object-fit:cover; object-position:top center; display:block; }

  .pcard-name { font-size:15px; font-weight:800; color:var(--text); margin-bottom:5px; }
  .pcard-role {
    display:inline-block; font-size:10px; font-weight:700;
    text-transform:uppercase; letter-spacing:0.1em;
    color:var(--primary); background:var(--primary-lt);
    padding:3px 12px; border-radius:100px; margin-bottom:10px;
    transition: background 0.3s, color 0.3s;
  }
  :root.dark .pcard-role { color: #8b87ff; }
  .pcard-quote { font-size:12px; color:var(--muted); line-height:1.65; font-style:italic; margin-bottom:16px; min-height:32px; }

  .pcard-lg .pcard-av   { width:120px; height:120px; }
  .pcard-lg .pcard-name { font-size:18px; }
  .pcard-lg .pcard-quote{ font-size:13px; min-height:0; }

  .soc-row { display:flex; gap:8px; justify-content:center; }
  .soc-btn {
    width:36px; height:36px; border-radius:50%; border:none; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    transition:transform 0.2s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s; padding:0;
  }
  .soc-btn:hover { transform:translateY(-3px) scale(1.12); box-shadow:0 6px 16px rgba(0,0,0,0.25); }

  .team-g3 { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-bottom:20px; }
  .team-g4 { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }

  /* ── RESPONSIVE ── */
  @media (max-width:1024px) { .wrap { padding:0 32px; } }
  @media (max-width:768px) {
    .wrap { padding:0 20px; }
    .hero-inner { grid-template-columns:1fr; }
    .hero-illus { display:none; }
    .who-inner  { grid-template-columns:1fr; gap:48px; }
    .mission-inner { grid-template-columns:1fr; gap:32px; }
    .mc:nth-child(2), .mc:nth-child(3) { margin-left:0; }
    .team-g3, .team-g4 { display:flex; flex-wrap:wrap; justify-content:center; gap:16px; }
    .team-g3 .pcard, .team-g4 .pcard { width:calc(50% - 8px); max-width:210px; }
    .mentors-row .pcard { width:calc(50% - 8px); max-width:210px; }
  }
  @media (max-width:480px) {
    .wrap { padding:0 16px; }
    .hero-stats { gap:20px; }
    .team-g3, .team-g4 { display:flex; flex-direction:column; align-items:center; gap:16px; }
    .team-g3 .pcard, .team-g4 .pcard { width:100%; max-width:300px; }
    .mentors-row { flex-direction:column; align-items:center; }
    .mentors-row .pcard { width:100%; max-width:300px; }
  }
`

function SocialIcons() {
  return (
    <div className="soc-row">
      <button className="soc-btn" title="Facebook" style={{ background:"#0084FF" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      </button>
      <button className="soc-btn" title="Telegram" style={{ background:"#0084FF" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M21.94 3.4L2.37 10.96c-1.3.52-1.29 1.26-.24 1.58l4.9 1.53 1.91 5.85c.23.65.12.9.8.9.52 0 .75-.24 1.04-.52l2.5-2.43 5.2 3.83c.96.53 1.65.26 1.89-.89l3.43-16.17c.35-1.38-.53-2.01-1.86-1.24z"/>
        </svg>
      </button>
    </div>
  )
}

function PersonCard({ name, role, quote, img, large }) {
  return (
    <div className={`pcard${large ? ' pcard-lg' : ''}`}>
      <div className="pcard-av"><img src={img} alt={name} /></div>
      <div className="pcard-name">{name}</div>
      {role && <div className="pcard-role">{role}</div>}
      <div className="pcard-quote">"{quote}"</div>
      <SocialIcons />
    </div>
  )
}

function PeopleIllustration() {
  return (
    <svg viewBox="0 0 360 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="who-people-svg">
      <path d="M50 220 C10 198 8 140 18 95 C28 50 82 14 148 10 C214 6 278 28 308 72 C338 116 342 178 318 214 C294 250 244 268 192 270 C140 272 90 242 50 220Z" fill="#dce8ff" opacity="0.65"/>
      <rect x="108" y="22" width="144" height="94" rx="9" fill="#fff" stroke="#b3b0e0" strokeWidth="2"/>
      <rect x="116" y="30" width="128" height="58" rx="5" fill="#eeedf8"/>
      <rect x="126" y="58" width="13" height="22" rx="2" fill="#1e1b6e"/>
      <rect x="145" y="50" width="13" height="30" rx="2" fill="#4340a8"/>
      <rect x="164" y="54" width="13" height="26" rx="2" fill="#1e1b6e" opacity="0.55"/>
      <rect x="183" y="44" width="13" height="36" rx="2" fill="#1e1b6e"/>
      <rect x="202" y="56" width="13" height="24" rx="2" fill="#2196f3" opacity="0.75"/>
      <rect x="221" y="48" width="13" height="32" rx="2" fill="#e91e8c" opacity="0.8"/>
      <polyline points="126,64 158,56 183,50 215,46 234,52" stroke="#f5a623" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <rect x="172" y="116" width="16" height="12" rx="2" fill="#b3b0e0"/>
      <rect x="158" y="126" width="44" height="6" rx="3" fill="#b3b0e0"/>
      <circle cx="68"  cy="152" r="17" fill="#FFB347"/>
      <path d="M54 144 Q68 134 82 144 Q78 130 68 128 Q58 130 54 144Z" fill="#5C3317"/>
      <path d="M46 195 Q68 174 90 195 L92 240 H44 Z" fill="#1e1b6e"/>
      <circle cx="122" cy="156" r="17" fill="#FDDBB4"/>
      <path d="M108 148 Q122 138 136 148 Q132 134 122 132 Q112 134 108 148Z" fill="#2c1810"/>
      <path d="M100 198 Q122 177 144 198 L146 240 H98 Z" fill="#e91e8c"/>
      <circle cx="180" cy="155" r="18" fill="#8B5E3C"/>
      <path d="M166 147 Q180 136 194 147 Q190 133 180 131 Q170 133 166 147Z" fill="#1a0a00"/>
      <path d="M158 198 Q180 176 202 198 L204 240 H156 Z" fill="#f5a623"/>
      <circle cx="238" cy="156" r="17" fill="#FDDBB4"/>
      <path d="M224 148 Q238 138 252 148 Q248 134 238 132 Q228 134 224 148Z" fill="#4a2a00"/>
      <path d="M216 198 Q238 177 260 198 L262 240 H214 Z" fill="#2196f3"/>
      <circle cx="292" cy="152" r="15" fill="#FFB347"/>
      <path d="M280 145 Q292 136 304 145 Q300 133 292 131 Q284 133 280 145Z" fill="#3d1f00"/>
      <path d="M272 193 Q292 174 312 193 L313 240 H271 Z" fill="#e53935"/>
      <line x1="38" y1="240" x2="322" y2="240" stroke="#b3b0e0" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="18" y="208" width="11" height="28" rx="3" fill="#a78866"/>
      <ellipse cx="24" cy="203" rx="15" ry="17" fill="#4ade80" opacity="0.75"/>
      <ellipse cx="14" cy="210" rx="10" ry="12" fill="#22c55e" opacity="0.7"/>
      <ellipse cx="34" cy="208" rx="9"  ry="11" fill="#4ade80" opacity="0.85"/>
      <rect x="330" y="212" width="10" height="24" rx="3" fill="#a78866"/>
      <ellipse cx="335" cy="207" rx="13" ry="15" fill="#4ade80" opacity="0.7"/>
      <ellipse cx="325" cy="213" rx="8"  ry="10" fill="#22c55e" opacity="0.65"/>
      <ellipse cx="344" cy="211" rx="8"  ry="10" fill="#4ade80" opacity="0.8"/>
      <circle cx="95"  cy="20" r="4" fill="#f5a623" opacity="0.8"/>
      <circle cx="260" cy="16" r="3" fill="#e91e8c" opacity="0.7"/>
      <circle cx="330" cy="60" r="5" fill="#2196f3" opacity="0.5"/>
    </svg>
  )
}

export default function AboutUs() {
  return (
    <>
      <style>{css}</style>
      <div className="page">

        {/* ══════════ HERO ══════════ */}
        <section className="hero">
          <div className="deco" style={{ top:28, right:"38%", width:0, height:0, borderLeft:"10px solid transparent", borderRight:"10px solid transparent", borderBottom:"18px solid #4ADE80" }} />
          <div className="deco" style={{ top:20, right:"22%", fontSize:20, color:"#FBBF24" }}>★</div>
          <div className="deco" style={{ top:16, right:60, width:80, height:80, borderRadius:"50%", background:"#C4B5FD", opacity:0.5 }} />
          <div className="dot-group" style={{ bottom:24, left:60 }}>
            {[0,1,2,3,4,5].map(i=><div key={i} className="dot-sm" style={{ background:"#93C5FD" }}/>)}
          </div>
          <div className="dot-group" style={{ bottom:24, right:60 }}>
            {[0,1,2,3,4,5].map(i=><div key={i} className="dot-sm" style={{ background:"#93C5FD" }}/>)}
          </div>
          <div className="wrap">
            <div className="hero-inner">
              <div className="hero-text">
                <h1 className="hero-title">
                  <span className="t-indigo">About</span>
                  <span className="t-pink">KHdemy</span>
                </h1>
                <div className="hero-underline" />
                <p className="hero-desc">
                  KHdemy is an innovative e-learning platform connecting tech enthusiasts through quality courses and expert instructors.
                </p>
                <div className="hero-stats">
                  {STATS.map(s => (
                    <div key={s.label}>
                      <div className="h-stat-num">{s.value}</div>
                      <div className="h-stat-lbl">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hero-illus">
                <div className="hero-illus-blob" />
                <img
                  src="https://illustrations.popsy.co/amber/remote-work.svg"
                  alt="illustration"
                  onError={e => { e.target.src = "https://illustrations.popsy.co/violet/work-from-home.svg" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ WHO ARE WE ══════════ */}
        <section className="who-section">
          <div className="who-dot" style={{ top:50,   right:90,   width:14, height:14, background:"#2196f3", animationDelay:"0s"   }} />
          <div className="who-dot" style={{ top:110,  right:52,   width:9,  height:9,  background:"#4ade80", animationDelay:"0.6s" }} />
          <div className="who-dot" style={{ top:170,  right:140,  width:8,  height:8,  background:"#e91e8c", animationDelay:"1.1s" }} />
          <div className="who-dot" style={{ top:200,  right:62,   width:11, height:11, background:"#fbbf24", animationDelay:"0.3s" }} />
          <div className="who-dot" style={{ bottom:50, left:"38%", width:16, height:16, background:"#e91e8c", animationDelay:"0.8s" }} />
          <div className="who-dot" style={{ bottom:30, right:90,   width:22, height:22, background:"#f5a623", animationDelay:"1.4s" }} />
          <div className="who-dot" style={{ top:80,   left:40,    width:10, height:10, background:"#1e1b6e", animationDelay:"0.5s" }} />
          <svg className="deco" style={{ top:"42%", left:"46%", opacity:0.3 }} width="36" height="36" viewBox="0 0 36 36">
            <path d="M6 28 Q12 8 18 20 Q24 32 30 12" stroke="#2196f3" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          </svg>
          <div className="wrap">
            <div className="who-inner">
              <div className="who-left">
                <div className="who-cloud">
                  <div className="who-cloud-puff" style={{ width:36, height:36, top:-18, right:64 }} />
                  <div className="who-cloud-puff" style={{ width:22, height:22, top:-28, right:44 }} />
                  <div className="who-cloud-puff" style={{ width:18, height:18, top:-12, right:28 }} />
                  <h2>Who are we ?</h2>
                </div>
                <div className="who-illus-wrap">
                  <PeopleIllustration />
                  <div className="who-float-card" style={{ top:-16, right:-8, animationDelay:"0.35s" }}>
                    <div className="who-float-icon" style={{ background:"#eeedf8" }}>💻</div>Frontend Dev
                  </div>
                  <div className="who-float-card" style={{ bottom:60, right:-24, animationDelay:"0.45s" }}>
                    <div className="who-float-icon" style={{ background:"#fce4f3" }}>⚙️</div>Backend Dev
                  </div>
                  <div className="who-float-card" style={{ bottom:-14, left:8, animationDelay:"0.55s" }}>
                    <div className="who-float-icon" style={{ background:"#f0fdf4" }}>🤝</div>Team of 7
                  </div>
                </div>
              </div>
              <div className="who-right">
                <div className="who-badge">🎓 ISTAD · Foundation 5th</div>
                <p className="who-desc">
                  We are Foundation 5th students at ISTAD, building responsive and user-friendly web applications using frontend and backend technologies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ MISSION ══════════ */}
        <section className="mission-section">
          <div className="wrap">
            <h2 className="mission-heading">
              <span className="red">Our </span>
              <span className="dark">Mission</span>
            </h2>
            <div className="mission-inner">
              <div className="mission-photo">
                <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=80" alt="Mission"/>
              </div>
              <div className="mission-cards">
                <div className="mc" style={{ background:"#f5a623" }}>
                  <div className="mc-icon-wrap">🌐</div>
                  <div><div className="mc-title">Flexible Learning</div><div className="mc-desc">Learn anytime, anywhere, at your own pace.</div></div>
                </div>
                <div className="mc" style={{ background:"#e91e8c" }}>
                  <div className="mc-icon-wrap">🎧</div>
                  <div><div className="mc-title">24/7 Support</div><div className="mc-desc">AI tutors and mentors, always available.</div></div>
                </div>
                <div className="mc" style={{ background:"#2196f3" }}>
                  <div className="mc-icon-wrap">🎯</div>
                  <div><div className="mc-title">Progress Guarantee</div><div className="mc-desc">Analytics and structured paths for real results.</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ MENTORS ══════════ */}
        <section className="mentors-section">
          <div className="wrap">
            <h2 className="sec-heading">Meet Our <span className="accent">Mentors</span></h2>
            <div className="mentors-row">
              {MENTORS.map(m => <PersonCard key={m.name} large {...m} />)}
            </div>
          </div>
        </section>

        {/* ══════════ TEAM ══════════ */}
        <section className="team-section">
          <div className="wrap">
            <h2 className="sec-heading">Meet Our <span className="accent">Team</span></h2>
            <div className="team-g3">
              {TEAM.slice(0,3).map(m => <PersonCard key={m.name} {...m} />)}
            </div>
            <div className="team-g4">
              {TEAM.slice(3).map(m => <PersonCard key={m.name} {...m} />)}
            </div>
          </div>
        </section>

      </div>
    </>
  )
}