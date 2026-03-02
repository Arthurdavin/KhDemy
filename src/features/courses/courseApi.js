import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Course"],
  endpoints: (builder) => ({

    createCourse: builder.mutation({
      query: (body) => ({
        url: "/courses/",             // ✅ trailing slash
        method: "POST",
        body,
      }),
      invalidatesTags: ["Course"],
    }),

    getAllCourses: builder.query({
      query: (params = {}) => ({
        url: "/courses/",             // ✅ trailing slash
        params,
      }),
      providesTags: ["Course"],
    }),

    getOwnCourses: builder.query({
      query: () => "/courses/get-own-course/",  // ✅ trailing slash
      providesTags: ["Course"],
    }),

    getEnrolledCourses: builder.query({
      query: () => "/courses/enrollments/",     // ✅ trailing slash
    }),

    updateCourse: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/courses/${id}/`,       // ✅ trailing slash
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Course"],
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}/`,       // ✅ trailing slash
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),

    enrollCourse: builder.mutation({
      query: (courseId) => ({
        url: `/courses/${courseId}/enroll/`,  // ✅ trailing slash
        method: "POST",
      }),
    }),

  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useGetOwnCoursesQuery,
  useGetEnrolledCoursesQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useEnrollCourseMutation,
} = courseApi;