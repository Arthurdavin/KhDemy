import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      // ✅ matches your existing auth pattern (localStorage)
      const token = localStorage.getItem("access_token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Book", "Category", "Author", "Blog"],
  endpoints: (build) => ({

    // POST /files/upload  →  FormData { file: <File> }
    // ✅ correct path from Postman collection (was "/upload/" before — wrong)
    uploadFile: build.mutation({
      query: (formData) => ({
        url: "/files/upload",   // ← fixed: was "/upload/"
        method: "POST",
        body: formData,
        // ⚠️ Do NOT set Content-Type manually — browser sets it automatically
        // with the correct multipart boundary when body is FormData
      }),
    }),

  }),
});

export const { useUploadFileMutation } = apiSlice;