import { apiSlice } from "../api/apiSlice";

export const booksApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({

    // GET /books/?page=1&limit=10&author_id=&search=&category_id=
    getAllBooks: build.query({
      query: ({ page = 1, limit = 10, author_id, search, category_id } = {}) => ({
        url: "/books/",
        params: {
          page,
          limit,
          ...(author_id   && { author_id }),
          ...(search      && { search }),
          ...(category_id && { category_id }),
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...(Array.isArray(result)
                ? result
                : result.books ?? []
              ).map(({ id }) => ({ type: "Book", id })),
              { type: "Book", id: "LIST" },
            ]
          : [{ type: "Book", id: "LIST" }],
    }),

    // GET /books/:id/
    getBookById: build.query({
      query: (id) => `/books/${id}/`,
      providesTags: (result, error, id) => [{ type: "Book", id }],
    }),

    // POST /books/
    createBook: build.mutation({
      query: (formData) => ({
        url: "/books/",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: [{ type: "Book", id: "LIST" }],
    }),

    // PATCH /books/:id/
    updateBook: build.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}/`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Book", id },
        { type: "Book", id: "LIST" },
      ],
    }),

    // DELETE /books/:id/
    deleteBook: build.mutation({
      query: (id) => ({
        url: `/books/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Book", id },
        { type: "Book", id: "LIST" },
      ],
    }),

  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;