import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery,
  tagTypes: ["Book"],
  endpoints: (builder) => ({

    // GET /books/?page=1&limit=5
    getBooks: builder.query({
      query: ({ page = 1, limit = 5 } = {}) =>
        `/books/?page=${page}&limit=${limit}`,
      transformResponse: (res) => {
        const list = res?.books ?? [];
        return list.map((b) => ({
          id:            b.id,
          title:         b.title ?? "",
          desc:          b.description ?? "",
          author:        b.author?.full_name ?? "",
          thumbnail_url: b.thumbnail_url ?? b.thumbnail ?? null,
        }));
      },
      providesTags: ["Book"],
    }),

    // GET /books/  — all books (used by CreateBook to find bookToEdit)
    getAllBooks: builder.query({
      query: () => "/books/",
      providesTags: ["Book"],
    }),

    // POST /books/
    createBook: builder.mutation({
      query: (body) => ({
        url: "/books/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Book"],
    }),

    // PUT /books/:id
    updateBook: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "Book", id }, "Book"],
    }),

    // DELETE /books/:id
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),

  }),
});

export const {
  useGetBooksQuery,
  useGetAllBooksQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;