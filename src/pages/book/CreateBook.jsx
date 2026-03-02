import { useState, useRef, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  BookMarked,
  Paperclip,
  FileText,
  ImageIcon,
  ChevronDown,
  CheckCircle2,
  ChevronRight,
  Loader2,
  ArrowRight,
  Circle,
} from "lucide-react";
import {
  useCreateBookMutation,
  useGetAllBooksQuery,
  useUpdateBookMutation,
} from "../../features/books/booksAPI";
import { useGetCategoriesQuery } from "../../features/categories/categoriesApi";

// ─── Style tokens ────────────────────────────────────────────────────────────
const inputCls =
  "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

const labelCls =
  "block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2";

const sectionCls =
  "bg-white border border-gray-100 rounded-2xl p-7 shadow-sm";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

// ─── FormField wrapper ────────────────────────────────────────────────────────
const FormField = ({ label, children }) => (
  <div className="mb-5">
    <label className={labelCls}>{label}</label>
    {children}
  </div>
);

// ─── Custom Dropdown ──────────────────────────────────────────────────────────
const CustomDropdown = ({ options, placeholder, value, onChange }) => {
  const [isOpen, setIsOpen]  = useState(false);
  const dropdownRef           = useRef(null);
  const selected              = options.find((o) => o.value === value) || null;

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${inputCls} flex items-center justify-between`}
      >
        <span className={selected ? "text-gray-800" : "text-gray-400"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={15}
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => { onChange(opt.value); setIsOpen(false); }}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                value === opt.value
                  ? "bg-indigo-50 text-indigo-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Drag & Drop Upload Area ──────────────────────────────────────────────────
const DragAndDropArea = ({ label, file, onFileSelect, accept }) => {
  const inputRef          = useRef(null);
  const [dragging, setDragging] = useState(false);

  const validate = (f) => {
    if (accept === "pdf"   && f.type !== "application/pdf")  { toast.error("Only PDF files are allowed!"); return false; }
    if (accept === "image" && !f.type.startsWith("image/"))  { toast.error("Only image files are allowed!"); return false; }
    return true;
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f && validate(f)) onFileSelect(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && validate(f)) onFileSelect(f);
  };

  const fileName =
    file instanceof File ? file.name : file?.url?.split("/").pop();

  return (
    <FormField label={label}>
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`h-[140px] rounded-xl flex flex-col items-center justify-center cursor-pointer border-2 border-dashed transition-all duration-300 ${
          file
            ? "border-emerald-400 bg-emerald-50"
            : dragging
            ? "border-indigo-400 bg-indigo-50 scale-[1.01]"
            : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/40"
        }`}
      >
        {file ? (
          <div className="text-center space-y-1.5">
            <CheckCircle2 size={28} className="text-emerald-500 mx-auto" />
            <p className="text-emerald-600 text-xs font-bold">Ready!</p>
            <p className="text-gray-400 text-[11px] truncate max-w-[200px] mx-auto">
              {fileName}
            </p>
          </div>
        ) : (
          <div className="text-center space-y-2 flex flex-col items-center">
            {accept === "pdf"
              ? <FileText size={28} className="text-gray-300" />
              : <ImageIcon size={28} className="text-gray-300" />
            }
            <p className="text-gray-400 text-xs">
              Drag & drop or{" "}
              <span className="text-indigo-500 underline underline-offset-2 font-medium">
                browse
              </span>
            </p>
            <p className="text-gray-300 text-[10px] uppercase tracking-wider">
              {accept === "pdf" ? "PDF only" : "JPG, PNG, WEBP"}
            </p>
          </div>
        )}
        <input
          type="file"
          ref={inputRef}
          accept={accept === "pdf" ? "application/pdf" : "image/*"}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </FormField>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CreateBook() {
  const { id }      = useParams();
  const navigate    = useNavigate();

  const [createBook, { isLoading }]          = useCreateBookMutation();
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const { data: categoriesData, isLoading: catLoading } = useGetCategoriesQuery();
  const { data: booksData }                  = useGetAllBooksQuery();

  const categories  = categoriesData?.map((c) => ({ value: c.id, label: c.name })) || [];
  const booksList   = Array.isArray(booksData) ? booksData : booksData?.books ?? [];
  const bookToEdit  = id ? booksList.find((b) => b.id === Number(id)) : null;

  // ── Form state ───────────────────────────────────────────────────────────
  const [title,         setTitle]         = useState("");
  const [description,   setDescription]   = useState("");
  const [category,      setCategory]      = useState("");
  const [fileBook,      setFileBook]      = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [status,        setStatus]        = useState("draft");
  const [isConverting,  setIsConverting]  = useState(false);

  const statusOptions = [
    { value: "draft",     label: "Draft"     },
    { value: "published", label: "Published" },
  ];

  // ── Pre-fill when editing ────────────────────────────────────────────────
  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title || "");
      setDescription(bookToEdit.description || "");
      setCategory(bookToEdit.category_ids?.[0] || "");
      setStatus(bookToEdit.status || "draft");
      setFileBook({ url: bookToEdit.file_url });
      setThumbnailFile({ url: bookToEdit.thumbnail });
    } else {
      setTitle(""); setDescription(""); setCategory("");
      setStatus("draft"); setFileBook(null); setThumbnailFile(null);
    }
  }, [bookToEdit]);

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category || !fileBook || !thumbnailFile) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      setIsConverting(true);

      const file_url  = fileBook  instanceof File ? await toBase64(fileBook)  : bookToEdit?.file_url  || "";
      const thumbnail = thumbnailFile instanceof File ? await toBase64(thumbnailFile) : bookToEdit?.thumbnail || "";

      setIsConverting(false);

      const payload = { title, description, category_ids: [category], file_url, thumbnail, status };

      if (id) {
        await updateBook({ id, ...payload }).unwrap();
        toast.success("Book updated successfully!");
      } else {
        await createBook(payload).unwrap();
        toast.success("Book created successfully!");
      }

      navigate("/dashboard/books");
    } catch (err) {
      setIsConverting(false);
      if (err?.status === "FETCH_ERROR") {
        toast.error("Cannot reach the server. Check your Vite proxy config.");
      } else {
        toast.error(err?.data?.detail || "Failed to save book!");
      }
    }
  };

  const busy = isLoading || isUpdating || isConverting;

  return (
    <div className="max-w-3xl">

      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link to="/dashboard"       className="hover:text-indigo-600 transition-colors">Dashboard</Link>
        <ChevronRight size={13} className="text-gray-300" />
        <Link to="/dashboard/books" className="hover:text-indigo-600 transition-colors">All Books</Link>
        <ChevronRight size={13} className="text-gray-300" />
        <span className="text-gray-700 font-semibold">{id ? "Edit Book" : "Add Book"}</span>
      </nav>

      {/* ── Page heading ── */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">
          <Circle size={6} className="fill-indigo-500 text-indigo-500" />
          {id ? "Edit Book" : "New Book"}
        </div>
        <h1 className="text-2xl font-black text-gray-800">
          {id ? "Update your " : "Publish a "}
          <span className="text-indigo-600">Book</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          {id
            ? "Make changes to the book details below."
            : "Fill in the details and upload your PDF and cover image."}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">

        {/* ── Section 1: Book Details ── */}
        <section className={sectionCls}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
              <BookMarked size={18} className="text-indigo-500" />
            </div>
            <h2 className="text-base font-bold text-gray-800">Book Details</h2>
          </div>

          <div className="space-y-5">
            <FormField label="Title *">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter book title"
                className={inputCls}
              />
            </FormField>

            <FormField label="Description *">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this book about?"
                rows={4}
                className={`${inputCls} resize-none`}
              />
            </FormField>

            <FormField label="Category *">
              <CustomDropdown
                options={categories}
                placeholder={catLoading ? "Loading categories…" : "Select a category"}
                value={category}
                onChange={setCategory}
              />
            </FormField>
          </div>
        </section>

        {/* ── Section 2: Files ── */}
        <section className={sectionCls}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center">
              <Paperclip size={18} className="text-purple-500" />
            </div>
            <h2 className="text-base font-bold text-gray-800">
              Files
              {isConverting && (
                <span className="ml-3 inline-flex items-center gap-1.5 text-xs text-indigo-500 font-normal">
                  <Loader2 size={12} className="animate-spin" />
                  Converting…
                </span>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <DragAndDropArea
              label="Cover Thumbnail *"
              file={thumbnailFile}
              onFileSelect={setThumbnailFile}
              accept="image"
            />
            <DragAndDropArea
              label="Book PDF *"
              file={fileBook}
              onFileSelect={setFileBook}
              accept="pdf"
            />
          </div>
        </section>

        {/* ── Footer: Status + Actions ── */}
        <div className="flex items-center justify-between gap-4 pb-4">
          <div className="w-44">
            <FormField label="Status">
              <CustomDropdown
                options={statusOptions}
                placeholder="Select status"
                value={status}
                onChange={setStatus}
              />
            </FormField>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/dashboard/books")}
              className="px-6 py-3.5 rounded-xl border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-300 text-sm font-medium transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={busy}
              className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-200 active:translate-y-0"
            >
              {busy ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  {isConverting ? "Converting…" : id ? "Updating…" : "Publishing…"}
                </>
              ) : (
                <>
                  {id ? "Update Book" : "Publish Book"}
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}