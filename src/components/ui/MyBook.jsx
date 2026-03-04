// // components/MyBook.jsx
// import { useState, useEffect } from "react";
// import { fetchBooks } from "../../features/data/api";
import { useNavigate } from "react-router-dom";
import { MediaThumb, SectionHeader, SmallAvatar } from "./Profile";
import { useGetBooksQuery } from "../../features/books/booksAPI";

const SkeletonRow = () => (
  <div className="flex items-center gap-5 py-4 animate-pulse">
    <div className="w-24 h-16 rounded-lg bg-gray-100 flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3 w-48 bg-gray-100 rounded" />
      <div className="h-2 w-64 bg-gray-100 rounded" />
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-100" />
        <div className="h-2 w-16 bg-gray-100 rounded" />
      </div>
    </div>
  </div>
);

const BookRow = ({ book, idx }) => (
  <div className="flex items-center gap-5 py-4 rounded-xl transition-colors duration-150 hover:bg-slate-50">
    {book.thumbnail_url ? (
      <img
        src={book.thumbnail_url}
        alt={book.title}
        className="w-24 h-16 rounded-lg object-cover flex-shrink-0 shadow"
      />
    ) : (
      <MediaThumb idx={idx + 1} />
    )}
    <div className="flex-1 min-w-0">
      <p className="text-base font-bold text-gray-800 truncate">{book.title}</p>
      <p className="text-sm text-gray-400 truncate mb-2">{book.desc}</p>
      <div className="flex items-center gap-2">
        <SmallAvatar />
        <span className="text-sm text-gray-500 font-medium">{book.author}</span>
      </div>
    </div>
  </div>
);

export default function MyBook() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBooksQuery({ limit: 3 });

  const books = (
    Array.isArray(data) ? data : data?.books ?? data?.data ?? data?.results ?? []
  ).slice(0, 3);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-7">
      <SectionHeader
        title="Book"
        highlight="My"
        linkLabel="See All Books"
        onLink={() => navigate("/profile/all-books")}
      />

      {isError && (
        <p className="text-xs text-red-400 py-3 text-center">Failed to load books.</p>
      )}

      <div className="divide-y divide-gray-50">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
          : books.map((book, idx) => (
              <BookRow key={book.id} book={book} idx={idx} />
            ))}
      </div>
    </div>
  );
}