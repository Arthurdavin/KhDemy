// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useCreateCourseMutation,
//   useUpdateCourseMutation,
//   useGetCourseByIdQuery,
// } from "../../features/courses/coursesApi";
// import { useGetCategoriesQuery } from "../../features/categories/categoriesApi";
// import { toast } from "react-toastify";
// import {
//   BookOpen,
//   Tag,
//   X,
//   AlertCircle,
//   Loader2,
//   ArrowRight,
//   Circle,
//   ChevronRight,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function CreateCourse() {
//   const navigate = useNavigate();
//   const { id }   = useParams();

//   const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();
//   const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
//   const { data: categories = [] }                  = useGetCategoriesQuery();

//   const { data: courseData, isLoading: isFetching } = useGetCourseByIdQuery(id, { skip: !id });

//   const [error, setError]       = useState("");
//   const [tagInput, setTagInput] = useState("");

//   const [formData, setFormData] = useState({
//     title:       "",
//     description: "",
//     category_id: "",
//     thumbnail:   "",
//     tags:        [],
//   });

//   useEffect(() => {
//     if (courseData) {
//       setFormData({
//         title:       courseData.title       || "",
//         description: courseData.description || "",
//         category_id: courseData.category_id ? String(courseData.category_id) : "",
//         thumbnail:   courseData.thumbnail   || "",
//         tags:        courseData.tags?.map((t) => (typeof t === "string" ? t : t.name)) || [],
//       });
//     }
//   }, [courseData]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const addTag = () => {
//     const tag = tagInput.trim();
//     if (tag && !formData.tags.includes(tag))
//       setFormData({ ...formData, tags: [...formData.tags, tag] });
//     setTagInput("");
//   };

//   const removeTag = (tag) =>
//     setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });

//   const handleTagKeyDown = (e) => {
//     if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); }
//     if (e.key === "Backspace" && !tagInput && formData.tags.length)
//       removeTag(formData.tags[formData.tags.length - 1]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!formData.title.trim())       return setError("Course title is required.");
//     if (!formData.description.trim()) return setError("Description is required.");
//     if (!formData.category_id)        return setError("Please select a category.");

//     const payload = {
//       ...formData,
//       category_id: Number(formData.category_id),
//     };

//     try {
//       if (id) {
//         await updateCourse({ id, ...payload }).unwrap();
//         toast.success("Course updated successfully!");
//         navigate("/dashboard/courses");
//       } else {
//         const result = await createCourse(payload).unwrap();
//         toast.success("Course created! Now add some lessons.");
//         // Navigate to lesson creation, passing the new course id
//         navigate(`/dashboard/courses/${result.id}/lessons/create`);
//       }
//     } catch (err) {
//       setError(err?.data?.detail || `Failed to ${id ? "update" : "create"} course.`);
//     }
//   };

//   // ── Style tokens ──────────────────────────────────────────────────────────
//   const inputStyle = {
//     background: "var(--bg-card)",
//     border:     "1px solid var(--border)",
//     color:      "var(--text)",
//   };
//   const inputCls =
//     "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 placeholder:opacity-50";

//   const labelCls = "block text-xs font-bold uppercase tracking-widest mb-2";

//   const sectionStyle = {
//     background: "var(--bg-card)",
//     border:     "1px solid var(--border)",
//   };

//   const isLoading = isCreating || isUpdating;

//   // ── Skeleton ──────────────────────────────────────────────────────────────
//   if (id && isFetching) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "var(--bg)" }}>
//         <div className="max-w-3xl w-full space-y-5 animate-pulse">
//           <div className="h-8 w-64 rounded-xl" style={{ background: "var(--bg-soft)" }} />
//           <div className="rounded-2xl p-7 shadow-sm space-y-4" style={sectionStyle}>
//             <div className="h-4 w-32 rounded"  style={{ background: "var(--bg-soft)" }} />
//             <div className="h-10 rounded-xl"   style={{ background: "var(--bg-soft)" }} />
//             <div className="h-24 rounded-xl"   style={{ background: "var(--bg-soft)" }} />
//             <div className="grid grid-cols-2 gap-4">
//               <div className="h-10 rounded-xl" style={{ background: "var(--bg-soft)" }} />
//               <div className="h-10 rounded-xl" style={{ background: "var(--bg-soft)" }} />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "var(--bg)" }}>
//       <div className="max-w-3xl w-full">

//         {/* Breadcrumb */}
//         <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
//           <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
//           <ChevronRight size={13} style={{ color: "var(--border)" }} />
//           <Link to="/dashboard/courses" className="hover:text-indigo-600 transition-colors">My Courses</Link>
//           <ChevronRight size={13} style={{ color: "var(--border)" }} />
//           <span className="font-semibold" style={{ color: "var(--text)" }}>{id ? "Edit Course" : "New Course"}</span>
//         </nav>

//         {/* Page header */}
//         <div className="mb-8">
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">
//             <Circle size={6} className="fill-indigo-500 text-indigo-500" />
//             {id ? "Edit Course" : "New Course"}
//           </div>
//           <h1 className="text-2xl font-black" style={{ color: "var(--text)" }}>
//             {id ? <>Update your <span className="text-indigo-600">Course</span></> : <>Create a <span className="text-indigo-600">New Course</span></>}
//           </h1>
//           <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
//             {id
//               ? "Update the course details and settings below."
//               : "Fill in the details below. You can add lessons after creating the course."}
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} noValidate className="space-y-5">

//           {/* Course Details */}
//           <section className="rounded-2xl p-7 shadow-sm" style={sectionStyle}>
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
//                 <BookOpen size={18} className="text-indigo-500" />
//               </div>
//               <h2 className="text-base font-bold" style={{ color: "var(--text)" }}>Course Details</h2>
//             </div>

//             <div className="space-y-5">
//               {/* Title */}
//               <div>
//                 <label className={labelCls} style={{ color: "var(--text-muted)" }}>
//                   Course Title <span className="text-red-400">*</span>
//                 </label>
//                 <input
//                   name="title"
//                   placeholder="e.g. Introduction to Python"
//                   value={formData.title}
//                   onChange={handleChange}
//                   className={inputCls}
//                   style={inputStyle}
//                 />
//               </div>

//               {/* Description */}
//               <div>
//                 <label className={labelCls} style={{ color: "var(--text-muted)" }}>
//                   Description <span className="text-red-400">*</span>
//                 </label>
//                 <textarea
//                   name="description"
//                   placeholder="What will students learn? Who is this course for?"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows={4}
//                   className={`${inputCls} resize-none`}
//                   style={inputStyle}
//                 />
//               </div>

//               {/* Category + Thumbnail */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className={labelCls} style={{ color: "var(--text-muted)" }}>
//                     Category <span className="text-red-400">*</span>
//                   </label>
//                   <select
//                     name="category_id"
//                     value={formData.category_id}
//                     onChange={handleChange}
//                     className={`${inputCls} appearance-none cursor-pointer`}
//                     style={inputStyle}
//                   >
//                     <option value="">Select a category…</option>
//                     {categories.map((cat) => (
//                       <option key={cat.id} value={cat.id}>{cat.name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className={labelCls} style={{ color: "var(--text-muted)" }}>Thumbnail URL</label>
//                   <input
//                     name="thumbnail"
//                     placeholder="https://example.com/cover.png"
//                     value={formData.thumbnail}
//                     onChange={handleChange}
//                     className={inputCls}
//                     style={inputStyle}
//                   />
//                 </div>
//               </div>

//               {/* Tags */}
//               <div>
//                 <label className={labelCls} style={{ color: "var(--text-muted)" }}>
//                   <span className="inline-flex items-center gap-1.5"><Tag size={11} /> Tags</span>
//                 </label>
//                 <div
//                   className="flex flex-wrap gap-2 items-center min-h-[48px] px-4 py-2 rounded-xl transition-all duration-200 cursor-text focus-within:ring-2 focus-within:ring-indigo-100"
//                   style={inputStyle}
//                   onClick={() => document.getElementById("tag-input").focus()}
//                 >
//                   {formData.tags.map((tag) => (
//                     <span key={tag} className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs px-3 py-1 rounded-full font-medium">
//                       {tag}
//                       <button type="button" onClick={(e) => { e.stopPropagation(); removeTag(tag); }} className="hover:text-indigo-900 transition-colors">
//                         <X size={11} />
//                       </button>
//                     </span>
//                   ))}
//                   <input
//                     id="tag-input"
//                     value={tagInput}
//                     onChange={(e) => setTagInput(e.target.value)}
//                     onKeyDown={handleTagKeyDown}
//                     onBlur={addTag}
//                     placeholder={formData.tags.length === 0 ? "Type a tag and press Enter…" : ""}
//                     className="flex-1 min-w-[140px] bg-transparent text-sm outline-none"
//                     style={{ color: "var(--text)" }}
//                   />
//                 </div>
//                 <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>
//                   Press{" "}
//                   <kbd className="px-1.5 py-0.5 rounded font-mono text-[11px]" style={{ background: "var(--bg-soft)", color: "var(--text-muted)" }}>Enter</kbd>
//                   {" "}or{" "}
//                   <kbd className="px-1.5 py-0.5 rounded font-mono text-[11px]" style={{ background: "var(--bg-soft)", color: "var(--text-muted)" }}>,</kbd>
//                   {" "}to add a tag
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* Error */}
//           {error && (
//             <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
//               <AlertCircle size={16} className="flex-shrink-0" />
//               {error}
//             </div>
//           )}

//           {/* Actions */}
//           <div className="flex items-center gap-3 pb-4">
//             <button
//               type="button"
//               onClick={() => navigate("/dashboard/courses")}
//               className="px-6 py-3.5 rounded-xl text-sm font-medium transition-all"
//               style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl py-3.5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-200 active:translate-y-0"
//             >
//               {isLoading ? (
//                 <><Loader2 size={16} className="animate-spin" />{id ? "Saving…" : "Creating…"}</>
//               ) : (
//                 <>{id ? "Save Changes" : "Create & Add Lessons"}<ArrowRight size={16} /></>
//               )}
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useGetCourseByIdQuery,
} from "../../features/courses/coursesApi";
import { useGetCategoriesQuery } from "../../features/categories/categoriesApi";
import { toast } from "react-toastify";
import {
  BookOpen,
  Tag,
  X,
  AlertCircle,
  Loader2,
  ArrowRight,
  Circle,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function CreateCourse() {
  const navigate = useNavigate();
  const { id }   = useParams();

  const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
  const { data: categories = [] }                  = useGetCategoriesQuery();

  const { data: courseData, isLoading: isFetching } = useGetCourseByIdQuery(id, { skip: !id });

  const [error, setError]       = useState("");
  const [tagInput, setTagInput] = useState("");

  const [formData, setFormData] = useState({
    title:       "",
    description: "",
    category_id: "",
    thumbnail:   "",
    tags:        [],
  });

  useEffect(() => {
    if (courseData) {
      setFormData({
        title:       courseData.title       || "",
        description: courseData.description || "",
        category_id: courseData.category_id ? String(courseData.category_id) : "",
        thumbnail:   courseData.thumbnail   || "",
        tags:        courseData.tags?.map((t) => (typeof t === "string" ? t : t.name)) || [],
      });
    }
  }, [courseData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag))
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    setTagInput("");
  };

  const removeTag = (tag) =>
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); }
    if (e.key === "Backspace" && !tagInput && formData.tags.length)
      removeTag(formData.tags[formData.tags.length - 1]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim())       return setError("Course title is required.");
    if (!formData.description.trim()) return setError("Description is required.");
    if (!formData.category_id)        return setError("Please select a category.");

    const payload = {
      ...formData,
      category_id: Number(formData.category_id),
    };

    try {
      if (id) {
        await updateCourse({ id, ...payload }).unwrap();
        toast.success("Course updated successfully!");
        navigate("/profile/all-courses");
      } else {
        await createCourse(payload).unwrap();
        toast.success("Course created successfully!");
        navigate("/profile/all-courses");
      }
    } catch (err) {
      // Server returns 201 but RTK Query's .unwrap() throws when it can't
      // parse the response body — status "PARSING_ERROR" or any 2xx code.
      const status = err?.status ?? err?.originalStatus;
      const isActuallySuccess =
        status === "PARSING_ERROR" ||
        (typeof status === "number" && status >= 200 && status < 300);

      if (isActuallySuccess) {
        toast.success(id ? "Course updated successfully!" : "Course created successfully!");
        navigate("/profile/all-courses");
        return;
      }

      const msg = err?.data?.detail ?? err?.data?.message ?? err?.error ?? null;
      setError(msg || `Failed to ${id ? "update" : "create"} course.`);
    }
  };

  // ── Style tokens ──────────────────────────────────────────────────────────
  const inputStyle = {
    background: "var(--bg-card)",
    border:     "1px solid var(--border)",
    color:      "var(--text)",
  };
  const inputCls =
    "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 placeholder:opacity-50";

  const labelCls = "block text-xs font-bold uppercase tracking-widest mb-2";

  const sectionStyle = {
    background: "var(--bg-card)",
    border:     "1px solid var(--border)",
  };

  const isLoading = isCreating || isUpdating;

  // ── Skeleton ──────────────────────────────────────────────────────────────
  if (id && isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "var(--bg)" }}>
        <div className="max-w-3xl w-full space-y-5 animate-pulse">
          <div className="h-8 w-64 rounded-xl" style={{ background: "var(--bg-soft)" }} />
          <div className="rounded-2xl p-7 shadow-sm space-y-4" style={sectionStyle}>
            <div className="h-4 w-32 rounded"  style={{ background: "var(--bg-soft)" }} />
            <div className="h-10 rounded-xl"   style={{ background: "var(--bg-soft)" }} />
            <div className="h-24 rounded-xl"   style={{ background: "var(--bg-soft)" }} />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-10 rounded-xl" style={{ background: "var(--bg-soft)" }} />
              <div className="h-10 rounded-xl" style={{ background: "var(--bg-soft)" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "var(--bg)" }}>
      <div className="max-w-3xl w-full">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
          <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
          <ChevronRight size={13} style={{ color: "var(--border)" }} />
          <Link to="/dashboard/courses" className="hover:text-indigo-600 transition-colors">My Courses</Link>
          <ChevronRight size={13} style={{ color: "var(--border)" }} />
          <span className="font-semibold" style={{ color: "var(--text)" }}>{id ? "Edit Course" : "New Course"}</span>
        </nav>

        {/* Page header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">
            <Circle size={6} className="fill-indigo-500 text-indigo-500" />
            {id ? "Edit Course" : "New Course"}
          </div>
          <h1 className="text-2xl font-black" style={{ color: "var(--text)" }}>
            {id ? <>Update your <span className="text-indigo-600">Course</span></> : <>Create a <span className="text-indigo-600">New Course</span></>}
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {id
              ? "Update the course details and settings below."
              : "Fill in the details below. You can add lessons after creating the course."}
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">

          {/* Course Details */}
          <section className="rounded-2xl p-7 shadow-sm" style={sectionStyle}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <BookOpen size={18} className="text-indigo-500" />
              </div>
              <h2 className="text-base font-bold" style={{ color: "var(--text)" }}>Course Details</h2>
            </div>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className={labelCls} style={{ color: "var(--text-muted)" }}>
                  Course Title <span className="text-red-400">*</span>
                </label>
                <input
                  name="title"
                  placeholder="e.g. Introduction to Python"
                  value={formData.title}
                  onChange={handleChange}
                  className={inputCls}
                  style={inputStyle}
                />
              </div>

              {/* Description */}
              <div>
                <label className={labelCls} style={{ color: "var(--text-muted)" }}>
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="description"
                  placeholder="What will students learn? Who is this course for?"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`${inputCls} resize-none`}
                  style={inputStyle}
                />
              </div>

              {/* Category + Thumbnail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls} style={{ color: "var(--text-muted)" }}>
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    className={`${inputCls} appearance-none cursor-pointer`}
                    style={inputStyle}
                  >
                    <option value="">Select a category…</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls} style={{ color: "var(--text-muted)" }}>Thumbnail URL</label>
                  <input
                    name="thumbnail"
                    placeholder="https://example.com/cover.png"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    className={inputCls}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className={labelCls} style={{ color: "var(--text-muted)" }}>
                  <span className="inline-flex items-center gap-1.5"><Tag size={11} /> Tags</span>
                </label>
                <div
                  className="flex flex-wrap gap-2 items-center min-h-[48px] px-4 py-2 rounded-xl transition-all duration-200 cursor-text focus-within:ring-2 focus-within:ring-indigo-100"
                  style={inputStyle}
                  onClick={() => document.getElementById("tag-input").focus()}
                >
                  {formData.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs px-3 py-1 rounded-full font-medium">
                      {tag}
                      <button type="button" onClick={(e) => { e.stopPropagation(); removeTag(tag); }} className="hover:text-indigo-900 transition-colors">
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                  <input
                    id="tag-input"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    onBlur={addTag}
                    placeholder={formData.tags.length === 0 ? "Type a tag and press Enter…" : ""}
                    className="flex-1 min-w-[140px] bg-transparent text-sm outline-none"
                    style={{ color: "var(--text)" }}
                  />
                </div>
                <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>
                  Press{" "}
                  <kbd className="px-1.5 py-0.5 rounded font-mono text-[11px]" style={{ background: "var(--bg-soft)", color: "var(--text-muted)" }}>Enter</kbd>
                  {" "}or{" "}
                  <kbd className="px-1.5 py-0.5 rounded font-mono text-[11px]" style={{ background: "var(--bg-soft)", color: "var(--text-muted)" }}>,</kbd>
                  {" "}to add a tag
                </p>
              </div>
            </div>
          </section>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pb-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/courses")}
              className="px-6 py-3.5 rounded-xl text-sm font-medium transition-all"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl py-3.5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-200 active:translate-y-0"
            >
              {isLoading ? (
                <><Loader2 size={16} className="animate-spin" />{id ? "Saving…" : "Creating…"}</>
              ) : (
                <>{id ? "Save Changes" : "Create & Add Lessons"}<ArrowRight size={16} /></>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useCreateCourseMutation,
//   useUpdateCourseMutation,
//   useGetCourseByIdQuery,
// } from "../../features/courses/coursesApi";
// import { useGetCategoriesQuery } from "../../features/categories/categoriesApi";
// import { toast } from "react-toastify";
// import {
//   BookOpen,
//   Video,
//   Tag,
//   ChevronUp,
//   ChevronDown,
//   X,
//   Plus,
//   AlertCircle,
//   Loader2,
//   ArrowRight,
// } from "lucide-react";

// export default function CreateCourse() {
//   const navigate = useNavigate();
//   const { id }   = useParams();

//   const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();
//   const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
//   const { data: categories = [] }                  = useGetCategoriesQuery();

//   const { data: courseData, isLoading: isFetching } = useGetCourseByIdQuery(id, { skip: !id });

//   const [error, setError]       = useState("");
//   const [tagInput, setTagInput] = useState("");

//   const [formData, setFormData] = useState({
//     title:       "",
//     description: "",
//     category_id: "",
//     thumbnail:   "",
//     tags:        [],
//     lessons:     [{ title: "", description: "", video_url: "" }],
//   });

//   useEffect(() => {
//     if (courseData) {
//       setFormData({
//         title:       courseData.title       || "",
//         description: courseData.description || "",
//         category_id: courseData.category_id ? String(courseData.category_id) : "",
//         thumbnail:   courseData.thumbnail   || "",
//         tags:        courseData.tags?.map((t) => (typeof t === "string" ? t : t.name)) || [],
//         lessons:
//           courseData.lessons?.length
//             ? courseData.lessons.map((l) => ({
//                 title:       l.title       || "",
//                 description: l.description || "",
//                 video_url:   l.video_url   || "",
//               }))
//             : [{ title: "", description: "", video_url: "" }],
//       });
//     }
//   }, [courseData]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const addTag = () => {
//     const tag = tagInput.trim();
//     if (tag && !formData.tags.includes(tag))
//       setFormData({ ...formData, tags: [...formData.tags, tag] });
//     setTagInput("");
//   };

//   const removeTag = (tag) =>
//     setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });

//   const handleTagKeyDown = (e) => {
//     if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); }
//     if (e.key === "Backspace" && !tagInput && formData.tags.length)
//       removeTag(formData.tags[formData.tags.length - 1]);
//   };

//   const updateLesson = (i, field, value) => {
//     const lessons = [...formData.lessons];
//     lessons[i] = { ...lessons[i], [field]: value };
//     setFormData({ ...formData, lessons });
//   };

//   const addLesson = () =>
//     setFormData({
//       ...formData,
//       lessons: [...formData.lessons, { title: "", description: "", video_url: "" }],
//     });

//   const removeLesson = (i) => {
//     if (formData.lessons.length === 1) return;
//     setFormData({ ...formData, lessons: formData.lessons.filter((_, idx) => idx !== i) });
//   };

//   const moveLesson = (i, dir) => {
//     const lessons = [...formData.lessons];
//     const swap = i + dir;
//     if (swap < 0 || swap >= lessons.length) return;
//     [lessons[i], lessons[swap]] = [lessons[swap], lessons[i]];
//     setFormData({ ...formData, lessons });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!formData.title.trim())       return setError("Course title is required.");
//     if (!formData.description.trim()) return setError("Description is required.");
//     if (!formData.category_id)        return setError("Please select a category.");

//     const payload = {
//       ...formData,
//       category_id: Number(formData.category_id),
//     };

//     try {
//       if (id) {
//         await updateCourse({ id, ...payload }).unwrap();
//         toast.success("Course updated successfully!");
//       } else {
//         await createCourse(payload).unwrap();
//         toast.success("Course created successfully!");
//       }
//       navigate("/dashboard/courses");
//     } catch (err) {
//       setError(err?.data?.detail || `Failed to ${id ? "update" : "create"} course.`);
//     }
//   };

//   // ── Style tokens using CSS variables ──────────────────────────────────────
//   const inputStyle = {
//     background:  "var(--bg-card)",
//     border:      "1px solid var(--border)",
//     color:       "var(--text)",
//   };
//   const inputCls =
//     "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 placeholder:opacity-50";

//   const labelCls =
//     "block text-xs font-bold uppercase tracking-widest mb-2";

//   const sectionStyle = {
//     background: "var(--bg-card)",
//     border:     "1px solid var(--border)",
//   };

//   const isLoading = isCreating || isUpdating;

//   // ── Skeleton ───────────────────────────────────────────────────────────────
//   if (id && isFetching) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "var(--bg)" }}>
//         <div className="max-w-3xl w-full space-y-5 animate-pulse">
//           <div className="h-8 w-64 rounded-xl" style={{ background: "var(--bg-soft)" }} />
//           <div className="rounded-2xl p-7 shadow-sm space-y-4" style={sectionStyle}>
//             <div className="h-4 w-32 rounded" style={{ background: "var(--bg-soft)" }} />
//             <div className="h-10 rounded-xl"  style={{ background: "var(--bg-soft)" }} />
//             <div className="h-24 rounded-xl"  style={{ background: "var(--bg-soft)" }} />
//             <div className="grid grid-cols-2 gap-4">
//               <div className="h-10 rounded-xl" style={{ background: "var(--bg-soft)" }} />
//               <div className="h-10 rounded-xl" style={{ background: "var(--bg-soft)" }} />
//             </div>
//           </div>
//           <div className="rounded-2xl p-7 shadow-sm space-y-3" style={sectionStyle}>
//             <div className="h-4 w-24 rounded"  style={{ background: "var(--bg-soft)" }} />
//             <div className="h-32 rounded-xl"   style={{ background: "var(--bg-soft)" }} />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "var(--bg)" }}>
//       <div className="max-w-3xl w-full">

//         {/* ── Page header ── */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-black" style={{ color: "var(--text)" }}>
//             {id
//               ? <>Edit <span className="text-indigo-600">Course</span></>
//               : <>Create a <span className="text-indigo-600">New Course</span></>
//             }
//           </h1>
//           <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
//             {id
//               ? "Update the course details, lessons, and settings below."
//               : "Fill in the details below. Add lessons and tag your course for discoverability."
//             }
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} noValidate className="space-y-5">

//           {/* ── Course Details ── */}
//           <section className="rounded-2xl p-7 shadow-sm" style={sectionStyle}>
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
//                 <BookOpen size={18} className="text-indigo-500" />
//               </div>
//               <h2 className="text-base font-bold" style={{ color: "var(--text)" }}>Course Details</h2>
//             </div>

//             <div className="space-y-5">
//               {/* Title */}
//               <div>
//                 <label className={labelCls} style={{ color: "var(--text-muted)" }}>
//                   Course Title <span className="text-red-400">*</span>
//                 </label>
//                 <input
//                   name="title"
//                   placeholder="e.g. Introduction to Python"
//                   value={formData.title}
//                   onChange={handleChange}
//                   className={inputCls}
//                   style={inputStyle}
//                 />
//               </div>

//               {/* Description */}
//               <div>
//                 <label className={labelCls} style={{ color: "var(--text-muted)" }}>
//                   Description <span className="text-red-400">*</span>
//                 </label>
//                 <textarea
//                   name="description"
//                   placeholder="What will students learn? Who is this course for?"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows={4}
//                   className={`${inputCls} resize-none`}
//                   style={inputStyle}
//                 />
//               </div>

//               {/* Category + Thumbnail */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className={labelCls} style={{ color: "var(--text-muted)" }}>
//                     Category <span className="text-red-400">*</span>
//                   </label>
//                   <select
//                     name="category_id"
//                     value={formData.category_id}
//                     onChange={handleChange}
//                     className={`${inputCls} appearance-none cursor-pointer`}
//                     style={inputStyle}
//                   >
//                     <option value="">Select a category…</option>
//                     {categories.map((cat) => (
//                       <option key={cat.id} value={cat.id}>{cat.name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className={labelCls} style={{ color: "var(--text-muted)" }}>Thumbnail URL</label>
//                   <input
//                     name="thumbnail"
//                     placeholder="https://example.com/cover.png"
//                     value={formData.thumbnail}
//                     onChange={handleChange}
//                     className={inputCls}
//                     style={inputStyle}
//                   />
//                 </div>
//               </div>

//               {/* Tags */}
//               <div>
//                 <label className={labelCls} style={{ color: "var(--text-muted)" }}>
//                   <span className="inline-flex items-center gap-1.5"><Tag size={11} /> Tags</span>
//                 </label>
//                 <div
//                   className="flex flex-wrap gap-2 items-center min-h-[48px] px-4 py-2 rounded-xl transition-all duration-200 cursor-text focus-within:ring-2 focus-within:ring-indigo-100"
//                   style={inputStyle}
//                   onClick={() => document.getElementById("tag-input").focus()}
//                 >
//                   {formData.tags.map((tag) => (
//                     <span key={tag} className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs px-3 py-1 rounded-full font-medium">
//                       {tag}
//                       <button type="button" onClick={(e) => { e.stopPropagation(); removeTag(tag); }} className="hover:text-indigo-900 transition-colors">
//                         <X size={11} />
//                       </button>
//                     </span>
//                   ))}
//                   <input
//                     id="tag-input"
//                     value={tagInput}
//                     onChange={(e) => setTagInput(e.target.value)}
//                     onKeyDown={handleTagKeyDown}
//                     onBlur={addTag}
//                     placeholder={formData.tags.length === 0 ? "Type a tag and press Enter…" : ""}
//                     className="flex-1 min-w-[140px] bg-transparent text-sm outline-none"
//                     style={{ color: "var(--text)" }}
//                   />
//                 </div>
//                 <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>
//                   Press{" "}
//                   <kbd className="px-1.5 py-0.5 rounded font-mono text-[11px]" style={{ background: "var(--bg-soft)", color: "var(--text-muted)" }}>Enter</kbd>
//                   {" "}or{" "}
//                   <kbd className="px-1.5 py-0.5 rounded font-mono text-[11px]" style={{ background: "var(--bg-soft)", color: "var(--text-muted)" }}>,</kbd>
//                   {" "}to add a tag
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* ── Lessons ── */}
//           <section className="rounded-2xl p-7 shadow-sm" style={sectionStyle}>
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-3">
//                 <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center">
//                   <Video size={18} className="text-purple-500" />
//                 </div>
//                 <h2 className="text-base font-bold" style={{ color: "var(--text)" }}>
//                   Lessons
//                   <span className="ml-2 text-xs font-normal" style={{ color: "var(--text-muted)" }}>
//                     ({formData.lessons.length} {formData.lessons.length === 1 ? "lesson" : "lessons"})
//                   </span>
//                 </h2>
//               </div>
//               <button
//                 type="button"
//                 onClick={addLesson}
//                 className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 border border-indigo-200 hover:border-indigo-300 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-all font-semibold"
//               >
//                 <Plus size={13} /> Add Lesson
//               </button>
//             </div>

//             <div className="space-y-4">
//               {formData.lessons.map((lesson, i) => (
//                 <div
//                   key={i}
//                   className="rounded-xl p-5 group transition-colors"
//                   style={{ background: "var(--bg-soft)", border: "1px solid var(--border)" }}
//                 >
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center gap-2">
//                       <span className="w-6 h-6 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 text-xs font-black">{i + 1}</span>
//                       <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Lesson {i + 1}</span>
//                     </div>
//                     <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                       {[
//                         { action: () => moveLesson(i, -1), disabled: i === 0, icon: <ChevronUp size={13} /> },
//                         { action: () => moveLesson(i,  1), disabled: i === formData.lessons.length - 1, icon: <ChevronDown size={13} /> },
//                         { action: () => removeLesson(i),   disabled: formData.lessons.length === 1,     icon: <X size={13} />, danger: true },
//                       ].map(({ action, disabled, icon, danger }, idx) => (
//                         <button
//                           key={idx}
//                           type="button"
//                           onClick={action}
//                           disabled={disabled}
//                           className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all
//                             disabled:opacity-30 disabled:cursor-not-allowed
//                             ${danger ? "hover:text-red-500 hover:border-red-200" : "hover:text-indigo-500 hover:border-indigo-200"}`}
//                           style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-muted)" }}
//                         >
//                           {icon}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="space-y-3">
//                     <div>
//                       <label className={labelCls} style={{ color: "var(--text-muted)" }}>Lesson Title</label>
//                       <input placeholder="e.g. Variables and Data Types" value={lesson.title}
//                         onChange={(e) => updateLesson(i, "title", e.target.value)}
//                         className={inputCls} style={inputStyle} />
//                     </div>
//                     <div>
//                       <label className={labelCls} style={{ color: "var(--text-muted)" }}>Video URL</label>
//                       <input placeholder="https://example.com/videos/lesson.mp4" value={lesson.video_url}
//                         onChange={(e) => updateLesson(i, "video_url", e.target.value)}
//                         className={inputCls} style={inputStyle} />
//                     </div>
//                     <div>
//                       <label className={labelCls} style={{ color: "var(--text-muted)" }}>Description</label>
//                       <textarea placeholder="What does this lesson cover?" value={lesson.description}
//                         onChange={(e) => updateLesson(i, "description", e.target.value)}
//                         rows={2} className={`${inputCls} resize-none`} style={inputStyle} />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <button
//               type="button"
//               onClick={addLesson}
//               className="w-full mt-4 border-2 border-dashed rounded-xl py-3 text-sm transition-all flex items-center justify-center gap-2 font-medium hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50/20"
//               style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
//             >
//               <Plus size={15} /> Add another lesson
//             </button>
//           </section>

//           {/* ── Error ── */}
//           {error && (
//             <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
//               <AlertCircle size={16} className="flex-shrink-0" />
//               {error}
//             </div>
//           )}

//           {/* ── Actions ── */}
//           <div className="flex items-center gap-3 pb-4">
//             <button
//               type="button"
//               onClick={() => navigate("/dashboard/courses")}
//               className="px-6 py-3.5 rounded-xl text-sm font-medium transition-all"
//               style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
//             >
//               Cancel
//             </button>
//             <button type="submit" disabled={isLoading}
//               className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl py-3.5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-200 active:translate-y-0">
//               {isLoading ? (
//                 <><Loader2 size={16} className="animate-spin" />{id ? "Saving…" : "Publishing…"}</>
//               ) : (
//                 <>{id ? "Save Changes" : "Publish Course"}<ArrowRight size={16} /></>
//               )}
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }