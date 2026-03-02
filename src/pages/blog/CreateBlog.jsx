import { useState, useRef, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ChevronDown, X, CloudUpload, Loader2, ChevronRight } from "lucide-react";

import {
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useGetBlogByIdQuery,       // ✅ fetch single blog directly
} from "../../features/blog/blogApi";
import { useGetCategoriesQuery } from "../../features/categories/categoriesApi";
import { useUploadFileMutation } from "../../features/api/apiSlice";
import RichTextEditor from "./RichTextEditor";

const inputCls =
  "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";
const labelCls = "block text-xs font-bold text-gray-600 mb-1.5";

// ─── Reusable Dropdown ────────────────────────────────────────────────────────
const Dropdown = ({ options, value, onChange, placeholder, loading, className = "w-full" }) => {
  const [open, setOpen] = useState(false);
  const ref             = useRef(null);
  const selected        = options.find((o) => o.value === value);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div className={`relative ${className}`} ref={ref}>
      <button type="button" onClick={() => setOpen(!open)}
        className={`${inputCls} flex items-center justify-between`}>
        <span className={selected ? "text-gray-800" : "text-gray-400"}>
          {loading ? "Loading…" : selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={15} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-30 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg max-h-52 overflow-y-auto">
          {options.map((opt) => (
            <div key={opt.value} onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                value === opt.value ? "bg-indigo-50 text-indigo-600 font-semibold" : "text-gray-600 hover:bg-gray-50"
              }`}>
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Thumbnail Upload ─────────────────────────────────────────────────────────
const ThumbnailUpload = ({ file, onFileSelect, existingUrl }) => {
  const inputRef                = useRef(null);
  const [dragging, setDragging] = useState(false);
  const validate = (f) => { if (!f.type.startsWith("image/")) { toast.error("Images only!"); return false; } return true; };
  const handleChange = (e) => { const f = e.target.files[0]; if (f && validate(f)) onFileSelect(f); };
  const handleDrop   = (e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f && validate(f)) onFileSelect(f); };
  const preview = file instanceof File ? URL.createObjectURL(file) : existingUrl || null;
  return (
    <div onClick={() => inputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)} onDrop={handleDrop}
      className={`relative h-36 rounded-xl flex flex-col items-center justify-center cursor-pointer border-2 border-dashed overflow-hidden transition-all ${
        preview   ? "border-emerald-400 bg-emerald-50"
        : dragging ? "border-indigo-400 bg-indigo-50"
        : "border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/40"
      }`}>
      {preview ? (
        <>
          <img src={preview} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <p className="text-white text-xs font-semibold bg-black/40 px-3 py-1 rounded-full">Click to change</p>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <CloudUpload size={28} className="text-gray-400" />
          <p className="text-gray-500 text-xs font-medium">Click or drag file to upload</p>
          <p className="text-gray-300 text-[11px]">JPG, PNG, WEBP</p>
        </div>
      )}
      <input type="file" ref={inputRef} accept="image/*" onChange={handleChange} className="hidden" />
    </div>
  );
};

// ─── Tags Input ───────────────────────────────────────────────────────────────
const TagsInput = ({ tags, onChange }) => {
  const [input, setInput] = useState("");
  const addTag = (val) => { const t = val.trim().replace(/,+$/, ""); if (!t || tags.includes(t)) { setInput(""); return; } onChange([...tags, t]); setInput(""); };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(input); }
    if (e.key === "Backspace" && !input && tags.length) onChange(tags.slice(0, -1));
  };
  return (
    <div className="flex flex-wrap gap-2 items-center min-h-[36px]">
      {tags.map((tag) => (
        <span key={tag}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
          {tag}
          <button type="button" onClick={() => onChange(tags.filter((t) => t !== tag))}
            className="text-indigo-400 hover:text-indigo-700 transition-colors"><X size={11} /></button>
        </span>
      ))}
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown} onBlur={() => addTag(input)}
        placeholder={tags.length === 0 ? "Add a tag and press Enter…" : ""}
        className="text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent min-w-[160px]" />
    </div>
  );
};

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
const FormSkeleton = () => (
  <div className="space-y-5 animate-pulse">
    {[{ h: 38, lw: 10 }, { h: 220, lw: 20 }, { h: 144, lw: 16 }, { h: 38, lw: 18 }, { h: 38, lw: 8 }].map(({ h, lw }, i) => (
      <div key={i}>
        <div className={`h-3 w-${lw} bg-gray-100 rounded mb-1.5`} />
        <div className="bg-gray-100 rounded-lg" style={{ height: h }} />
      </div>
    ))}
    <div className="flex gap-3 pt-2">
      <div className="h-10 w-44 bg-gray-100 rounded-lg" />
      <div className="h-10 w-32 bg-gray-100 rounded-lg ml-auto" />
    </div>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function CreateBlog() {
  const { id }   = useParams();
  const navigate = useNavigate();

  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [uploadFile]                            = useUploadFileMutation();

  // ✅ Fetch the blog to edit directly by ID — no list scanning, no pagination issues
  const { data: rawBlogData, isLoading: isFetching } = useGetBlogByIdQuery(id, { skip: !id });

  // Unwrap if API returns { blog: {...} } or { data: {...} } instead of the object directly
  const blogToEdit = rawBlogData?.blog ?? rawBlogData?.data ?? rawBlogData ?? null;

  // Debug: open browser console to confirm the shape — remove once working
  if (rawBlogData) console.log("Blog API response:", rawBlogData);

  const { data: categoriesData, isLoading: catLoading } = useGetCategoriesQuery();
  const categories = (categoriesData ?? []).map((c) => ({ value: c.id, label: c.name }));
  const statusOpts = [{ value: "draft", label: "Draft" }, { value: "published", label: "Published" }];

  const [title,         setTitle]         = useState("");
  const [content,       setContent]       = useState("");
  const [tags,          setTags]          = useState([]);
  const [category,      setCategory]      = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [status,        setStatus]        = useState("draft");
  const [step,          setStep]          = useState("idle");

  // ✅ Populate form once blog data arrives
  useEffect(() => {
    if (blogToEdit) {
      setTitle(blogToEdit.title || "");
      setContent(blogToEdit.content || "");
      setTags(blogToEdit.tags || []);
      setCategory(blogToEdit.category_id || "");
      setStatus(blogToEdit.status || "draft");
      setThumbnailFile(null);
    }
  }, [blogToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) { toast.error("Title is required!"); return; }
    const plainText = content.replace(/<[^>]*>/g, "").trim();
    if (!plainText)   { toast.error("Content is required!"); return; }
    if (!id && !thumbnailFile) { toast.error("Please upload a thumbnail!"); return; }

    try {
      let thumbnail_url = blogToEdit?.thumbnail_url || "";

      if (thumbnailFile instanceof File) {
        setStep("uploading");
        const fd = new FormData();
        fd.append("file", thumbnailFile);
        const res = await uploadFile(fd).unwrap();
        thumbnail_url = res?.url || res?.file_url || res?.filename || res?.path || "";
        if (!thumbnail_url) {
          toast.error("Upload succeeded but no URL returned.");
          setStep("idle");
          return;
        }
      }

      setStep(id ? "updating" : "publishing");

      const payload = {
        title: title.trim(),
        content,
        thumbnail_url,
        status,
        ...(category        && { category_id: category }),
        ...(tags.length > 0 && { tags }),
      };

      if (id) {
        await updateBlog({ id, ...payload }).unwrap();
        toast.success("Blog updated!");
      } else {
        await createBlog(payload).unwrap();
        toast.success("Blog published!");
      }

      navigate("/dashboard/blogs");
    } catch (err) {
      console.error("❌ Blog save error:", err);
      toast.error(err?.data?.detail || JSON.stringify(err?.data) || "Failed to save blog!");
    } finally {
      setStep("idle");
    }
  };

  const busy      = step !== "idle" || isCreating || isUpdating;
  const stepLabel = { uploading: "Uploading…", publishing: "Publishing…", updating: "Updating…" };

  return (
    <div className="max-w-2xl">

      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
          <Link to="/dashboard"       className="hover:text-indigo-600 transition-colors">Dashboard</Link>
          <ChevronRight size={12} className="text-gray-300" />
          <Link to="/dashboard/blogs" className="hover:text-indigo-600 transition-colors">Blogs</Link>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="text-gray-600 font-semibold">{id ? "Edit" : "New"}</span>
        </nav>
        <h1 className="text-xl font-black text-gray-800">
          {id ? "Edit Article" : "Add New Article"}
        </h1>
      </div>

      {/* ✅ Show skeleton while fetching blog to edit */}
      {id && isFetching ? <FormSkeleton /> : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">

          {/* Title */}
          <div>
            <label className={labelCls}>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title" className={inputCls} />
          </div>

          {/* Rich Text Editor */}
          <div>
            <label className={labelCls}>Description</label>
            <RichTextEditor value={content} onChange={setContent} placeholder="Write your blog content here…" />
          </div>

          {/* Thumbnail */}
          <div>
            <label className={labelCls}>
              Thumbnail
              {step === "uploading" && (
                <span className="ml-2 inline-flex items-center gap-1 text-indigo-500 font-normal normal-case">
                  <Loader2 size={11} className="animate-spin" /> Uploading…
                </span>
              )}
            </label>
            <ThumbnailUpload
              file={thumbnailFile}
              onFileSelect={setThumbnailFile}
              existingUrl={blogToEdit?.thumbnail_url}
            />
          </div>

          {/* Categories */}
          <div>
            <label className={labelCls}>Categories</label>
            <Dropdown options={categories} value={category} onChange={setCategory}
              placeholder="Select Category" loading={catLoading} />
          </div>

          {/* Tags */}
          <div>
            <label className={labelCls}>Tags</label>
            <div className="border border-gray-200 rounded-lg px-3 py-2.5 bg-white focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <TagsInput tags={tags} onChange={setTags} />
            </div>
            <p className="text-xs text-gray-400 mt-1.5 ml-0.5">Press Enter or comma to add a tag</p>
          </div>

          {/* Status + Submit */}
          <div className="flex items-end gap-3 pt-2 pb-4">
            <div>
              <label className={labelCls}>Status</label>
              <Dropdown options={statusOpts} value={status} onChange={setStatus}
                placeholder="Draft" className="w-44" />
            </div>
            <button type="submit" disabled={busy}
              className="flex items-center gap-2 px-6 py-2.5 bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-lg transition-all hover:shadow-md hover:shadow-green-200 whitespace-nowrap ml-auto">
              {busy
                ? <><Loader2 size={15} className="animate-spin" />{stepLabel[step] || "Working…"}</>
                : id ? "Update Article" : "Publish Article"
              }
            </button>
          </div>

        </form>
      )}
    </div>
  );
}