import { apiSlice } from "../api/apiSlice";

export const blogsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({

    getAllBlogs: build.query({
      query: ({ page = 1, limit = 10, search, tag } = {}) => ({
        url: "/blogs/",
        params: {
          page,
          limit,
          ...(search && { search }),
          ...(tag    && { tag }),
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...(Array.isArray(result) ? result : result.blogs ?? []).map(
                ({ id }) => ({ type: "Blog", id })
              ),
              { type: "Blog", id: "LIST" },
            ]
          : [{ type: "Blog", id: "LIST" }],
    }),

    // ✅ Fetch a single blog by ID — used by the edit form
    getBlogById: build.query({
      query: (id) => `/blogs/${id}/`,
      providesTags: (result, error, id) => [{ type: "Blog", id }],
    }),

    createBlog: build.mutation({
      query: (body) => ({
        url: "/blogs/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Blog", id: "LIST" }],
    }),

    updateBlog: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/blogs/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Blog", id },
        { type: "Blog", id: "LIST" },
      ],
    }),

    deleteBlog: build.mutation({
      query: (id) => ({
        url: `/blogs/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Blog", id },
        { type: "Blog", id: "LIST" },
      ],
    }),

  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,     // ✅ used by CreateBlog edit mode
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogsApi;