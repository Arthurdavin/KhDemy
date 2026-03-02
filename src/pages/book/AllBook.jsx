import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiEye, FiBookOpen } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  useGetAllBooksQuery,
  useDeleteBookMutation,
} from "../../features/books/booksAPI";
import { useGetCategoriesQuery } from "../../features/categories/categoriesApi";

// ─── Status badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) =>
  status === "published" ? (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-200">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      Published
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-amber-50 text-amber-600 border border-amber-200">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
      Draft
    </span>
  );

// ─── Skeleton card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-100" />
    <div className="p-5 space-y-3">
      <div className="h-3 bg-gray-200 rounded-full w-3/4" />
      <div className="h-3 bg-gray-100 rounded-full w-1/2" />
      <div className="h-3 bg-gray-100 rounded-full w-full" />
      <div className="h-3 bg-gray-100 rounded-full w-5/6" />
    </div>
  </div>
);

// ─── Book card ────────────────────────────────────────────────────────────────
const BookCard = ({ book, categoryMap, onDelete }) => {
  const categoryName =
    book.category_ids?.[0] ? categoryMap[book.category_ids[0]] : null;

  return (
    <div className="group relative isolate bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden transition-all duration-300 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/50 hover:-translate-y-0.5">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-gray-50">
        {book.thumbnail ? (
          <img
            src={book.thumbnail}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-20">
            📖
          </div>
        )}

        {/* Overlay actions — pure CSS group-hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex items-end justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
          <Link
            to={`/dashboard/books/${book.id}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 text-gray-700 text-xs font-medium hover:bg-white transition-colors shadow-sm"
          >
            <FiEye className="text-xs" /> Preview
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to={`/dashboard/books/edit/${book.id}`}
              className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-500 transition-colors shadow"
            >
              <FiEdit2 className="text-xs" />
            </Link>
            <button
              onClick={() => onDelete(book.id, book.title)}
              className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow"
            >
              <FiTrash2 className="text-xs" />
            </button>
          </div>
        </div>

        {/* Status badge top-right */}
        <div className="absolute top-3 right-3">
          <StatusBadge status={book.status} />
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        {categoryName && (
          <span className="text-[10px] uppercase tracking-widest text-indigo-500 font-semibold">
            {categoryName}
          </span>
        )}
        <h3 className="mt-1 text-sm font-semibold text-gray-800 line-clamp-1 leading-snug">
          {book.title}
        </h3>
        <p className="mt-1.5 text-xs text-gray-400 line-clamp-2 leading-relaxed">
          {book.description || "No description provided."}
        </p>
      </div>
    </div>
  );
};

// ─── Empty state ──────────────────────────────────────────────────────────────
const EmptyState = ({ search }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
    <div className="text-6xl mb-4 opacity-20">📚</div>
    <p className="text-gray-400 text-sm">
      {search ? `No books match "${search}"` : "No books yet. Add your first one!"}
    </p>
    {!search && (
      <Link
        to="/dashboard/books/create"
        className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-xl transition-colors shadow-sm hover:shadow-md hover:shadow-indigo-200"
      >
        <FiPlus /> Add Book
      </Link>
    )}
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AllBook() {
  const [search, setSearch]         = useState("");
  const [page, setPage]             = useState(1);
  const [categoryId, setCategoryId] = useState("");
  const limit = 12;

  const { data: booksData, isLoading, isError, isFetching } = useGetAllBooksQuery({
    page,
    limit,
    search: search || undefined,
    category_id: categoryId || undefined,
  });

  const { data: categoriesData } = useGetCategoriesQuery();
  const [deleteBook]             = useDeleteBookMutation();

  const books      = Array.isArray(booksData) ? booksData : booksData?.books ?? [];
  const total      = Array.isArray(booksData) ? booksData.length : booksData?.total ?? 0;
  const totalPages = Math.ceil(total / limit) || 1;

  const categoryMap = Object.fromEntries(
    (categoriesData ?? []).map((c) => [c.id, c.name])
  );
  const categoryOptions = (categoriesData ?? []).map((c) => ({ value: c.id, label: c.name }));

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted.");
    } catch (err) {
      toast.error(err?.data?.detail || "Failed to delete book.");
    }
  };

  const handleSearch        = (e) => { setSearch(e.target.value); setPage(1); };
  const handleCategoryChange = (e) => { setCategoryId(e.target.value); setPage(1); };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-600 text-xs font-medium uppercase tracking-widest mb-4">
              <FiBookOpen className="text-xs" />
              Library
            </span>
            <h1 className="text-4xl font-bold text-gray-800 leading-tight">
              All <span className="italic text-indigo-500">Books</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {isLoading ? "Loading…" : `${total} book${total !== 1 ? "s" : ""} in your library`}
            </p>
          </div>

          <Link
            to="/dashboard/books/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-200 self-start sm:self-auto"
          >
            <FiPlus /> Add Book
          </Link>
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search by title…"
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {categoryOptions.length > 0 && (
            <select
              value={categoryId}
              onChange={handleCategoryChange}
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 cursor-pointer min-w-[160px]"
            >
              <option value="">All Categories</option>
              {categoryOptions.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          )}
        </div>

        {/* ── Grid ── */}
        {isError ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-red-400 text-sm">Failed to load books.</p>
            <p className="text-gray-400 text-xs mt-1">Check your network connection or proxy config.</p>
          </div>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 transition-opacity duration-200 ${isFetching ? "opacity-60" : "opacity-100"}`}>
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
              : books.length === 0
              ? <EmptyState search={search} />
              : books.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    categoryMap={categoryMap}
                    onDelete={handleDelete}
                  />
                ))}
          </div>
        )}

        {/* ── Pagination ── */}
        {!isLoading && !isError && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isFetching}
              className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-gray-800 hover:border-gray-300 text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push("ellipsis-" + p);
                acc.push(p);
                return acc;
              }, [])
              .map((p) =>
                typeof p === "string" ? (
                  <span key={p} className="text-gray-300 px-1">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    disabled={isFetching}
                    className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                      p === page
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                        : "bg-white border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-300"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || isFetching}
              className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-gray-800 hover:border-gray-300 text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}