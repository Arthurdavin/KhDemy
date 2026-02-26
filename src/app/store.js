import { configureStore } from '@reduxjs/toolkit'

// Configure a basic store. Add slices later (user, courses, cart...)
const store = configureStore({
  reducer: {
    // example: courses: coursesReducer,
  },
})

export default store