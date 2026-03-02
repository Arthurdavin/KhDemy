import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { authApi } from "../features/auth/authApi";
import { apiSlice } from "../features/api/apiSlice";      // ← base api (books, blogs, upload)
import { courseApi } from "../features/courses/courseApi";
import { categoriesApi } from "../features/categories/categoriesApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]:       authApi.reducer,
    [apiSlice.reducerPath]:      apiSlice.reducer,         // ← "api" — books, blogs, upload
    [courseApi.reducerPath]:     courseApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      apiSlice.middleware,                                 // ← must be here to fix the error
      courseApi.middleware,
      categoriesApi.middleware,
    ),
});