import { configureStore } from '@reduxjs/toolkit'
// You can add slices later (user, courses, cart...)
export const store = configureStore({
  reducer: {
    // example: courses: coursesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch