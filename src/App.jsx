import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import BlogPage from './pages/blog/BlogPage';
import Homepage from './pages/Homepage';
import NotFound from './components/home/NotFound';
import AboutUs from './pages/AboutUs';
import CoursesPage from './pages/course/Courses';


function App() {
  return (
      <Routes>

        {/* Public — with Navbar + Footer */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/courses" element={<CoursesPage/>} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}

export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./components/ProtectedRoute";

// // Layout
// import RootLayout from "./layout/RootLayout";

// // Auth
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";

// // Shared
// import Unauthorized from "./pages/Unauthorized";
// import NotFound from "./components/home/NotFound";
// import Profile from "./pages/dashboard/Profile";

// // Teacher
// import TeacherDashBoard from "./pages/teacher/TeacherDashboard";
// import AllCourses from "./pages/teacher/AllCourse";
// import CreateCourse from "./pages/dashboard/CreateCourse";
// import CreateLesson from "./pages/dashboard/CreateLesson";
// import AllBook from "./pages/book/AllBook";
// import CreateBook from "./pages/book/CreateBook";
// import AllBlogs from "./pages/blog/AllBlogs";
// import CreateBlog from "./pages/blog/CreateBlog";

// // Student
// import StudentDashboard from "./pages/student/StudentDashboard";
// import MyCourses from "./pages/student/MyCourses";
// import CourseDetail from "./pages/student/CourseDetail";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<RootLayout />}>

//           {/* ===== TEACHER ROUTES ===== */}
//           <Route
//             path="/teacher"
//             element={
//               <ProtectedRoute roles={["teacher"]}>
//                 <TeacherDashBoard />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="profile" element={<Profile />} />

//             {/* Courses */}
//             <Route path="courses" element={<AllCourses />} />
//             <Route path="courses/create" element={<CreateCourse />} />
//             <Route path="courses/:id/edit" element={<CreateCourse />} />

//             {/* Lessons */}
//             <Route path="lessons/create" element={<CreateLesson />} />
//             <Route path="courses/:id/lessons/create" element={<CreateLesson />} />

//             {/* Books */}
//             <Route path="books" element={<AllBook />} />
//             <Route path="books/create" element={<CreateBook />} />
//             <Route path="books/:id/edit" element={<CreateBook />} />

//             {/* Blogs */}
//             <Route path="blogs" element={<AllBlogs />} />
//             <Route path="blogs/create" element={<CreateBlog />} />
//             <Route path="blogs/:id/edit" element={<CreateBlog />} />
//           </Route>

//           {/* ===== STUDENT ROUTES ===== */}
//           <Route
//             path="/student"
//             element={
//               <ProtectedRoute roles={["student"]}>
//                 <StudentDashboard />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="profile" element={<Profile />} />
//             <Route path="my-courses" element={<MyCourses />} />
//             <Route path="my-courses/:courseId" element={<CourseDetail />} />

//             {/* Students can also create blogs */}
//             <Route path="blogs/create" element={<CreateBlog />} />
//             <Route path="blogs/:id/edit" element={<CreateBlog />} />
//           </Route>

//           {/* ===== SHARED PROTECTED (teacher + student) ===== */}
//           {/* e.g. shared profile fallback if needed */}

//           {/* ===== PUBLIC ===== */}
//           <Route path="/unauthorized" element={<Unauthorized />} />
//           <Route path="*" element={<NotFound />} />
//         </Route>

//         {/* Auth — outside RootLayout (no navbar/footer) */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;