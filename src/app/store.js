import { configureStore } from "@reduxjs/toolkit";

// You can add slices later (user, courses, cart, auth...)
export const store = configureStore({
  reducer: {
    // example: auth: authReducer,
    // example: courses: coursesReducer,
  },
});

