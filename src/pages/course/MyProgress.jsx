import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetEnrolledCoursesQuery,
  useGetCoursesQuery,
} from "../../features/courses/coursesApi";
import {
  Play,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Trophy,
  Loader2,
  Check,
  Lock,
  RotateCcw,
  Bookmark,
  ArrowLeft,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// VIDEO PLAYER
// ─────────────────────────────────────────────────────────────────────────────
function VideoPlayer({ lesson }) {
  if (!lesson?.video_url)
    return (
      <div className="w-full aspect-video bg-gray-900 rounded-xl flex items-center justify-center">
        <p className="text-white/40 text-sm">No video for this lesson.</p>
      </div>
    );
  const isYT = lesson.video_url.includes("youtu");
  const src = lesson.video_url
    .replace("youtu.be/", "www.youtube.com/embed/")
    .replace("watch?v=", "embed/");
  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">
      {isYT ? (
        <iframe
          src={src}
          className="w-full h-full"
          allowFullScreen
          title={lesson.title}
        />
      ) : (
        <video src={lesson.video_url} controls className="w-full h-full" />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COURSE PLAYER  (matches the screenshot exactly)
// ─────────────────────────────────────────────────────────────────────────────
function CoursePlayer({ course, onBack }) {
  const lessons = course?.lessons ?? [];
  const completed = course.completed_lessons ?? 0;
  const total = lessons.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const [active, setActive] = useState(lessons[0] ?? null);
  const currentIdx = active ? lessons.findIndex((l) => l.id === active.id) : 0;

  const goPrev = () => {
    if (currentIdx > 0) setActive(lessons[currentIdx - 1]);
  };
  const goNext = () => {
    if (currentIdx < lessons.length - 1) setActive(lessons[currentIdx + 1]);
  };

  // Group lessons into fake "modules" of 3 for display (replace with real module data if available)
  const moduleSize = 3;
  const modules = [];
  for (let i = 0; i < lessons.length; i += moduleSize) {
    modules.push({
      name: `Module ${Math.floor(i / moduleSize) + 1}`,
      lessons: lessons.slice(i, i + moduleSize),
      startIndex: i,
    });
  }

  const category = course.category?.name ?? course.category ?? "Course Library";

  return (
    <div
      className="flex overflow-hidden rounded-2xl border border-gray-200 shadow-lg bg-white"
      style={{ height: "calc(100vh - 120px)" }}
    >
      {/* ── LEFT SIDEBAR ── */}
      <aside className="w-64 flex-shrink-0 flex flex-col border-r border-gray-100 bg-white overflow-hidden">
        {/* Syllabus header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
          <span className="text-[13px] font-bold text-gray-800">
            Course Syllabus
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
            {percent}% Done
          </span>
        </div>

        {/* Lesson list grouped by modules */}
        <div className="flex-1 overflow-y-auto py-3">
          {modules.map((mod, mi) => (
            <div key={mi} className="mb-1">
              {/* Module label */}
              <p className="px-4 py-2 text-[9px] font-black tracking-widest text-gray-400 uppercase">
                Module {mi + 1} —{" "}
                {mod.name.replace(`Module ${mi + 1}`, "").trim() ||
                  ["Foundations", "Linear Structures", "Non-Linear"][mi] ||
                  `Section ${mi + 1}`}
              </p>
              {/* Lessons */}
              {mod.lessons.map((lesson, li) => {
                const globalIdx = mod.startIndex + li;
                const isActive = active?.id === lesson.id;
                const isDone = globalIdx < completed;
                const isLocked = !isDone && !isActive && globalIdx > currentIdx;

                return (
                  <button
                    key={lesson.id ?? li}
                    onClick={() => !isLocked && setActive(lesson)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all group ${
                      isActive
                        ? "bg-indigo-50 border-l-[3px] border-indigo-600"
                        : isLocked
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-50 border-l-[3px] border-transparent"
                    }`}
                  >
                    {/* Status icon */}
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isDone
                          ? "bg-green-100"
                          : isActive
                          ? "bg-indigo-600"
                          : isLocked
                          ? "bg-gray-100"
                          : "bg-gray-100"
                      }`}
                    >
                      {isDone ? (
                        <Check
                          size={10}
                          className="text-green-600"
                          strokeWidth={3}
                        />
                      ) : isLocked ? (
                        <Lock size={9} className="text-gray-400" />
                      ) : isActive ? (
                        <Play
                          size={9}
                          className="fill-white text-white ml-0.5"
                        />
                      ) : (
                        <Play
                          size={9}
                          className="fill-gray-400 text-gray-400 ml-0.5"
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-[12px] font-semibold truncate leading-tight ${
                          isActive
                            ? "text-indigo-700"
                            : isDone
                            ? "text-gray-600"
                            : "text-gray-700"
                        }`}
                      >
                        {lesson.title}
                      </p>
                      {lesson.duration && (
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          ⏱ {lesson.duration}
                        </p>
                      )}
                    </div>

                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}

          {lessons.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-8">
              No lessons yet.
            </p>
          )}
        </div>

        {/* Resume learning button */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => {
              // Jump to first incomplete lesson
              const firstIncomplete = lessons.find((_, i) => i >= completed);
              if (firstIncomplete) setActive(firstIncomplete);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all"
          >
            <RotateCcw size={13} /> Resume Learning
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {active ? (
            <div className="max-w-3xl mx-auto">
              {/* Title */}
              <h1 className="text-2xl font-black text-gray-900 mb-2">
                {currentIdx + 1}. {active.title}
              </h1>

              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
                <button
                  onClick={onBack}
                  className="hover:text-indigo-600 transition-colors font-medium"
                >
                  Course Library
                </button>
                <ChevronRight size={11} />
                <span className="text-gray-500 font-medium">{category}</span>
                <ChevronRight size={11} />
                <span className="text-indigo-600 font-semibold">
                  {active.title}
                </span>
              </div>

              {/* Description */}
              {active.description && (
                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  {active.description}
                </p>
              )}

              {/* Video */}
              <VideoPlayer lesson={active} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
              <BookOpen size={48} className="text-gray-200" />
              <p className="text-sm font-semibold">
                Select a lesson from the sidebar.
              </p>
            </div>
          )}
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="flex-shrink-0 border-t border-gray-200 bg-white px-8 py-3 flex items-center justify-between">
          {/* Previous */}
          <button
            onClick={goPrev}
            disabled={currentIdx === 0}
            className="flex items-center gap-2 px-5 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Previous Lesson
          </button>

          {/* Save */}
          <button className="flex items-center gap-2 px-5 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all">
            <Bookmark size={14} /> Save
          </button>

          {/* Next */}
          <button
            onClick={goNext}
            disabled={currentIdx >= lessons.length - 1}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next Lesson →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROGRESS CARD
// ─────────────────────────────────────────────────────────────────────────────
function CourseProgressCard({ course, onClick }) {
  const completed = course.completed_lessons ?? 0;
  const total = course.total_lessons ?? course.lessons?.length ?? 0;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isDone = percent >= 100;
  const thumb = course.thumbnail_url ?? course.thumbnail ?? null;
  const category = course.category?.name ?? course.category ?? "Course";

  return (
    <div
      onClick={() => onClick(course)}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
    >
      <div className="relative w-full aspect-video overflow-hidden bg-gray-900">
        {thumb ? (
          <img
            src={thumb}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-indigo-600" />
        )}
        <span
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold text-white"
          style={{ background: isDone ? "#1e3a8a" : "#dc2626" }}
        >
          {category}
        </span>
        {isDone && (
          <div className="absolute inset-0 bg-indigo-900/30 flex items-center justify-center">
            <CheckCircle2 size={40} className="text-white drop-shadow-lg" />
          </div>
        )}
        {!isDone && (
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
              <Play
                size={18}
                className="fill-indigo-600 text-indigo-600 ml-0.5"
              />
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-black text-gray-900 text-[15px] leading-tight mb-1 line-clamp-1">
          {course.title}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed min-h-[2rem]">
          {course.description}
        </p>

        <div className="mb-1 flex items-center justify-between">
          <span className="text-[10px] text-gray-400 font-medium">
            Progress
          </span>
          <span
            className={`text-xs font-black ${
              isDone ? "text-indigo-700" : "text-red-500"
            }`}
          >
            {percent}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${percent}%`,
              background: "linear-gradient(90deg,#1e3a8a,#3b82f6)",
            }}
          />
        </div>
        <p className="text-[10px] text-gray-400 mb-4">
          {completed} of {total} lessons completed
        </p>

        {isDone ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick(course);
            }}
            className="w-full py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold transition-all"
          >
            Complete
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick(course);
            }}
            className="w-full py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
          >
            <Play size={11} className="fill-white" /> Resume
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION
// ─────────────────────────────────────────────────────────────────────────────
function Section({ title, icon, courses, onCardClick }) {
  if (courses.length === 0) return null;
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
          {icon} {title}
          <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full ml-1">
            {courses.length}
          </span>
        </h2>
        <button className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-0.5">
          View All <ChevronRight size={13} />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((c) => (
          <CourseProgressCard key={c.id} course={c} onClick={onCardClick} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function MyProgress() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [activeCourse, setActiveCourse] = useState(null);

  const { data: raw } = useGetCoursesQuery({ limit: 999, skip: 0 });
  const allCourses = Array.isArray(raw) ? raw : raw?.courses ?? raw?.data ?? [];

  const { data: enrolledList = [], isLoading } = useGetEnrolledCoursesQuery(
    undefined,
    { skip: !user },
  );

  const enriched = enrolledList.map((enrolled) => {
    const full = allCourses.find(
      (c) => String(c.id) === String(enrolled.id ?? enrolled.course_id),
    );
    return full ? { ...full, ...enrolled } : enrolled;
  });

  const handleCardClick = (course) => {
    const full = allCourses.find(
      (c) => String(c.id) === String(course.id ?? course.course_id),
    );
    setActiveCourse(full ?? course);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-400 gap-4">
        <BookOpen size={48} className="text-gray-200" />
        <p className="text-sm font-semibold">
          Please log in to view your progress.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition"
        >
          Log In
        </button>
      </div>
    );

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-32 text-gray-400 gap-3">
        <Loader2 size={24} className="animate-spin" />
        <span className="text-sm font-semibold">Loading your courses…</span>
      </div>
    );

  const getPercent = (c) => {
    const total = c.total_lessons ?? c.lessons?.length ?? 0;
    const done = c.completed_lessons ?? 0;
    return total > 0 ? Math.round((done / total) * 100) : 0;
  };

  const current = enriched.filter((c) => getPercent(c) < 100);
  const complete = enriched.filter((c) => getPercent(c) >= 100);

  if (enrolledList.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-400 gap-4">
        <BookOpen size={48} className="text-gray-200" />
        <p className="text-sm font-semibold">
          You haven't enrolled in any courses yet.
        </p>
        <button
          onClick={() => navigate("/courses")}
          className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition"
        >
          Browse Courses
        </button>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* ── PLAYER VIEW ── */}
      {activeCourse ? (
        <>
          {/* Back breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm mb-5">
            <button
              onClick={() => setActiveCourse(null)}
              className="flex items-center gap-1.5 text-gray-500 hover:text-indigo-600 font-medium px-2 py-1 rounded-lg hover:bg-indigo-50 transition-all"
            >
              <ArrowLeft size={14} />
              My Progress
            </button>
            <ChevronRight size={13} className="text-gray-300" />
            <span className="text-gray-800 font-semibold truncate max-w-xs">
              {activeCourse.title}
            </span>
          </div>
          <CoursePlayer
            course={activeCourse}
            onBack={() => setActiveCourse(null)}
          />
        </>
      ) : (
        /* ── GRID VIEW ── */
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-black text-gray-900">My Progress</h1>
            <p className="text-sm text-gray-400 mt-1">
              {enrolledList.length} enrolled · {complete.length} completed
            </p>
          </div>

          <Section
            title="Current Courses"
            icon={<Play size={16} className="text-red-500" />}
            courses={current}
            onCardClick={handleCardClick}
          />
          <Section
            title="Complete Courses"
            icon={<Trophy size={16} className="text-indigo-600" />}
            courses={complete}
            onCardClick={handleCardClick}
          />
        </>
      )}
    </div>
  );
}
