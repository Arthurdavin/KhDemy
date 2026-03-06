import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";           // adjust if you store user differently
import { toast } from "react-toastify";
import { useDeleteBookMutation, useGetOwnerBooksQuery } from "../../features/books/booksAPI";


const LIMIT = 5;

// ─── helpers ──────────────────────────────────────────────────────────────────
const fmtDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric",
      })
    : "—";

// ─── Confirm Delete Modal ──────────────────────────────────────────────────────
function ConfirmDeleteModal({ book, onConfirm, onCancel, isLoading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-800">Delete Book</h3>
        </div>
        <p className="text-slate-500 mb-6 text-sm leading-relaxed">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-700">"{book.title}"</span>?
          This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition font-medium text-sm disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition font-medium text-sm disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── View Modal ────────────────────────────────────────────────────────────────
function ViewModal({ book, onClose, onEdit }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg animate-fade-in">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold text-slate-800">Book Details</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {book.thumbnail ? (
          <img
            src={book.thumbnail}
            alt={book.title}
            className="w-full h-44 object-cover rounded-xl mb-5 shadow-sm"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        ) : (
          <div className="w-full h-44 rounded-xl mb-5 bg-slate-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        <div className="space-y-2.5 text-sm">
          {[
            ["Title",       book.title],
            ["Description", book.description],
            ["Author ID",   book.author_id],
            ["Categories",  book.categories?.map((c) => c.name ?? c).join(", ") || "—"],
            ["File URL",    book.file_url || "—"],
            ["Uploaded",    fmtDate(book.uploaded_at)],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-3">
              <span className="text-slate-400 w-28 shrink-0 font-medium">{label}</span>
              <span className="text-slate-700 break-all">{value}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition font-medium text-sm"
          >
            Close
          </button>
          <button
            onClick={onEdit}
            className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium text-sm flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Book
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Skeleton Row ──────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div className="grid grid-cols-[80px_1fr_2fr_120px_110px_120px] gap-4 px-6 py-4 items-center border-b border-slate-100 animate-pulse">
      <div className="w-14 h-11 rounded-lg bg-slate-200" />
      <div className="h-4 bg-slate-200 rounded w-3/4" />
      <div className="h-4 bg-slate-200 rounded" />
      <div className="h-6 bg-slate-200 rounded-full w-20 mx-auto" />
      <div className="h-4 bg-slate-200 rounded w-2/3 mx-auto" />
      <div className="flex gap-2 justify-center">
        {[1, 2, 3].map((i) => <div key={i} className="w-8 h-8 rounded-lg bg-slate-200" />)}
      </div>
    </div>
  );
}

// ─── Category badge ────────────────────────────────────────────────────────────
function CatBadge({ categories }) {
  if (!categories?.length) return <span className="text-slate-300 text-xs">—</span>;
  return (
    <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-semibold px-2.5 py-1 rounded-full">
      {categories[0]?.name ?? categories[0]}
      {categories.length > 1 && ` +${categories.length - 1}`}
    </span>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AllBooks() {
  const navigate = useNavigate();

  // Get the logged-in user's ID from Redux auth slice
  // Adjust the selector to match your store shape, e.g. state.auth.user?.id
  const ownerId = useSelector((state) => state.auth?.user?.id);

  const [page,         setPage]         = useState(1);
  const [search,       setSearch]       = useState("");
  const [sortBy,       setSortBy]       = useState("Newest");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [viewTarget,   setViewTarget]   = useState(null);

  // ── Fetch owner's books ───────────────────────────────────────────────────
  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = useGetOwnerBooksQuery(
    { owner_id: ownerId, page, limit: LIMIT },
    { skip: !ownerId }           // don't fire until we have a user id
  );

  const [deleteBook, { isLoading: deleting }] = useDeleteBookMutation();

  const books      = data?.items       ?? [];
  const totalPages = data?.total_pages ?? 1;
  const totalCount = data?.total       ?? 0;

  // Client-side search + sort on the current page
  const displayed = books
    .filter(
      (b) =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.description.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "Newest") return new Date(b.uploaded_at) - new Date(a.uploaded_at);
      if (sortBy === "Oldest") return new Date(a.uploaded_at) - new Date(b.uploaded_at);
      if (sortBy === "A-Z")    return a.title.localeCompare(b.title);
      return 0;
    });

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    try {
      await deleteBook(deleteTarget.id).unwrap();
      setDeleteTarget(null);
      toast.success("Book deleted successfully.");
    } catch {
      toast.error("Failed to delete book.");
    }
  };

  const goEdit   = (book) => navigate(`/dashboard/books/edit/${book.id}`);
  const goCreate = ()     => navigate("/teacher/add-book");

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        @keyframes fade-in  { from { opacity:0; transform:translateY(8px); }  to { opacity:1; transform:none; } }
        @keyframes slide-up { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
        .animate-fade-in  { animation: fade-in  .2s ease forwards; }
        .animate-slide-up { animation: slide-up .3s ease forwards; }
        .row-hover { transition: background .12s; }
        .row-hover:hover { background: #f8fafc; }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs mb-7" style={{ color: "#94a3b8" }}>
          <button onClick={() => navigate("/profile")} className="hover:text-indigo-600 transition-colors font-medium">
            Dashboard
          </button>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-semibold text-slate-700">My Books</span>
        </nav>

        {/* Page header */}
        <div className="flex items-start justify-between mb-7 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-900 tracking-tight">My Books</h1>
            {!isLoading && (
              <p className="text-sm text-slate-400 mt-0.5">
                {totalCount} book{totalCount !== 1 ? "s" : ""} published
              </p>
            )}
          </div>

          <button
            onClick={goCreate}
            className="shrink-0 flex items-center gap-2 border-2 border-blue-600 text-blue-700 bg-white hover:bg-blue-600 hover:text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-all duration-200 text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Create New Book
          </button>
        </div>

        {/* Search + Sort bar */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search books…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 text-sm placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-slate-500 whitespace-nowrap">Sort by :</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none border border-slate-200 rounded-xl px-4 py-2.5 pr-8 text-slate-700 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
              >
                <option>Newest</option>
                <option>Oldest</option>
                <option>A-Z</option>
              </select>
              <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Table card */}
        <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-opacity duration-200 ${isFetching && !isLoading ? "opacity-70" : "opacity-100"}`}>

          {/* Column headers */}
          <div className="grid grid-cols-[80px_1fr_2fr_120px_110px_120px] gap-4 px-6 py-3 border-b border-slate-100 bg-slate-50/80">
            {["Thumbnails", "Courses Name", "Descriptions", "Categories", "Uploaded", "Action"].map((h, i) => (
              <span key={i} className={`text-xs font-bold uppercase tracking-wider text-blue-700 ${i >= 3 ? "text-center" : ""}`}>
                {h}
              </span>
            ))}
          </div>

          {/* Error state */}
          {isError && (
            <div className="py-16 text-center">
              <p className="text-rose-500 font-medium text-sm">Failed to load your books.</p>
              <button onClick={() => window.location.reload()} className="mt-3 text-xs text-slate-400 underline hover:text-slate-600">
                Retry
              </button>
            </div>
          )}

          {/* No user id yet */}
          {!ownerId && !isError && (
            <div className="py-16 text-center text-slate-400 text-sm">
              Not logged in.
            </div>
          )}

          {/* Loading skeletons */}
          {isLoading && !isError &&
            Array.from({ length: LIMIT }).map((_, i) => <SkeletonRow key={i} />)
          }

          {/* Empty */}
          {!isLoading && !isError && ownerId && displayed.length === 0 && (
            <div className="py-20 text-center text-slate-400">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-sm font-medium">No books yet.</p>
              <button
                onClick={goCreate}
                className="mt-3 text-xs text-indigo-500 hover:text-indigo-700 underline transition"
              >
                Create your first book →
              </button>
            </div>
          )}

          {/* Data rows */}
          {!isLoading && !isError && displayed.map((book, idx) => (
            <div
              key={book.id}
              className={`row-hover grid grid-cols-[80px_1fr_2fr_120px_110px_120px] gap-4 px-6 py-4 items-center ${idx < displayed.length - 1 ? "border-b border-slate-100" : ""}`}
            >
              {/* Thumbnail */}
              <div className="w-14 h-11 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center shadow-sm shrink-0">
                {book.thumbnail ? (
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                ) : (
                  <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>

              {/* Title */}
              <span className="font-semibold text-slate-800 text-sm truncate" title={book.title}>
                {book.title}
              </span>

              {/* Description */}
              <span className="text-slate-500 text-sm truncate" title={book.description}>
                {book.description}
              </span>

              {/* Categories */}
              <div className="flex justify-center">
                <CatBadge categories={book.categories} />
              </div>

              {/* Uploaded date */}
              <div className="text-center text-slate-400 text-xs">{fmtDate(book.uploaded_at)}</div>

              {/* Action buttons */}
              <div className="flex items-center justify-center gap-1.5">
                {/* View */}
                <button
                  onClick={() => setViewTarget(book)}
                  title="View"
                  className="w-8 h-8 rounded-lg border-2 border-sky-300 text-sky-500 hover:bg-sky-50 flex items-center justify-center transition"
                >
                  <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>

                {/* Edit — navigates to CreateBook with the book's id */}
                <button
                  onClick={() => goEdit(book)}
                  title="Edit"
                  className="w-8 h-8 rounded-lg border-2 border-amber-300 text-amber-500 hover:bg-amber-50 flex items-center justify-center transition"
                >
                  <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>

                {/* Delete */}
                <button
                  onClick={() => setDeleteTarget(book)}
                  title="Delete"
                  className="w-8 h-8 rounded-lg border-2 border-red-300 text-red-400 hover:bg-red-50 flex items-center justify-center transition"
                >
                  <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Server-driven pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-1 mt-5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isFetching}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 transition"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                disabled={isFetching}
                className={`w-8 h-8 rounded-lg text-sm font-semibold transition disabled:opacity-50 ${
                  page === n
                    ? "bg-blue-600 text-white shadow"
                    : "border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || isFetching}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 transition"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* ── Modals ── */}
      {deleteTarget && (
        <ConfirmDeleteModal
          book={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          isLoading={deleting}
        />
      )}

      {viewTarget && (
        <ViewModal
          book={viewTarget}
          onClose={() => setViewTarget(null)}
          onEdit={() => { setViewTarget(null); goEdit(viewTarget); }}
        />
      )}
    </div>
  );
}