// import { Routes, Route } from "react-router-dom";
// import RootLayout from "./layout/RootLayout";
// import BlogPage from "./pages/blog/BlogPage";
// import NotFound from "./components/home/NotFound";
// import AboutUs from "./pages/AboutUs";
// import CoursesPage from "./pages/course/Courses";
// import Login from "./pages/login/Login";
// import Registration from "./pages/register/Register";

// import ProtectedRoute from "./components/ProtectedRoute";
// import Home from "./pages/Homepage";
// import TeacherDashboard from "./components/teacher/TeacherDashboard";
// import CreateCourse from "./pages/course/CreateCourse";
// import CreateBlog from "./pages/blog/CreateBlog";
// import CreateBook from "./pages/book/CreateBook";
// import MyAllArticles from "./components/ui/MyAllArticle";
// import ProfileCard from "./pages/teacher/ProfileTeacher";
// import AllCoursesTable from "./components/teacher/AllCourses";
// import EditCourse from "./pages/course/EditCourse";
// import CourseDetail from "./pages/course/CourseDetail";
// import AllBook from "./pages/book/AllBook";
// import CreateLesson from "./pages/lesson/CreateLesson";
// import BlogDetail from "./pages/blog/BlogDetail";
// import EditBlogForm from "./pages/blog/EditBlogForm";
// import MyAllBlogs from "./components/ui/MyAllArticle";
// import MyBook from "./components/ui/MyBook";
// import AllBooks from "./components/teacher/AllBooks";
// import BookDetail from "./pages/book/BookDetail";

// // import TeacherDashboard from "./pages/teacher/TeacherDashboard";
// // import NotFound from "./components/common/NotFound";

// function App() {
//   return (
//     <Routes>

//       {/* Public + layout with header/footer */}
//       <Route element={<RootLayout />}>
//         <Route path="/" element={<Home/>} />
//         <Route path="/courses" element={<CoursesPage/>} />
//         <Route path="/courses/:id" element={<CourseDetail />} />
//         {/* <Route path="courses/:id" element={<CourseDetail />} /> */}
//         <Route path="/about" element={<AboutUs />} />
//         <Route path="/blogs" element={<BlogPage/>} />
//         <Route path="/library" element={<AllBook/>} />
//         <Route path="/profile" element={<TeacherDashboard/>} />
//         <Route path="/teacher/create-course" element={<CreateCourse/>} />
//         <Route path="/blogs/create" element={<CreateBlog/>} />
//         <Route path="/teacher/add-book" element={<CreateBook/>} />
//         <Route path="/teacher/add-lesson" element={<CreateLesson/>} />
//         <Route path="profile/all-blogs" element={<MyAllArticles/>} />
//         <Route path="profile/all-courses" element={<AllCoursesTable/>} />
//         <Route path="/teacher/edit-profile" element={<ProfileCard/>} />
//         <Route path="/dashboard/courses/:id/edit" element={<EditCourse />} />
//         <Route path="/blogs/edit/:id" element={<EditBlogForm />} />
//         <Route path="/blogs/:id" element={<BlogDetail />} />
//         <Route path="/profile/all-books" element={<AllBooks/>} />
//         <Route path="/books/:id" element={<BookDetail />} />

//       </Route>
//       <Route path="/login" element={<Login  />} />
//       <Route path="/register" element={<Registration/>} />

//       {/* Auth pages – clean layout */}
//       {/* <Route element={<AuthLayout />}>
//         <Route path="login" element={<Login />} /> */}
//         {/* <Route path="register" element={<Register />} /> */}
//       {/* </Route> */}

//       {/* Protected – student & teacher */}
//       {/* <Route element={<DashboardLayout />}> */}
//         {/* Everyone logged in */}
//         {/* <Route element={<ProtectedRoute />}>
//           <Route path="profile" element={<div>Profile page (later)</div>} />
//         </Route> */}

//         {/* Only students */}
//         {/* <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
//           <Route path="student/dashboard" element={<StudentDashboard />} />
//           <Route path="my-courses" element={<MyCourses />} />
//         </Route> */}

//         {/* Only teachers */}
//         {/* <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
//           <Route path="teacher/dashboard" element={<TeacherDashboard />} />
//           <Route path="teacher/courses" element={<TeacherCourses />} />
//           <Route path="teacher/courses/new" element={<CreateCourse />} />
//         </Route> */}
//       {/* </Route> */}

//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }

// export default App;

import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "./features/auth/authSlice";

import RootLayout from "./layout/RootLayout";
import BlogPage from "./pages/blog/BlogPage";
import NotFound from "./components/home/NotFound";
import AboutUs from "./pages/AboutUs";
import CoursesPage from "./pages/course/Courses";
import Login from "./pages/login/Login";
import Registration from "./pages/register/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Homepage";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import CreateCourse from "./pages/course/CreateCourse";
import CreateBlog from "./pages/blog/CreateBlog";
import CreateBook from "./pages/book/CreateBook";
import MyAllArticles from "./components/ui/MyAllArticle";
import ProfileCard from "./pages/teacher/ProfileTeacher";
import AllCoursesTable from "./components/teacher/AllCourses";
import EditCourse from "./pages/course/EditCourse";
import CourseDetail from "./pages/course/CourseDetail";
import AllBook from "./pages/book/AllBook";
import CreateLesson from "./pages/lesson/CreateLesson";
import BlogDetail from "./pages/blog/BlogDetail";
import EditBlogForm from "./pages/blog/EditBlogForm";
import MyAllBlogs from "./components/ui/MyAllArticle";
import MyBook from "./components/ui/MyBook";
import AllBooks from "./components/teacher/AllBooks";
import BookDetail from "./pages/book/BookDetail";
import EditBook from "./pages/book/EditBook";

function App() {
  const dispatch = useDispatch();
  const token    = useSelector((state) => state.auth.token);

  // ── Rehydrate user on every page load/refresh ──────────────────────────────
  useEffect(() => {
    if (!token) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          // Token expired — clean up
          dispatch(logout());
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) dispatch(setUser(data));
      })
      .catch(() => {});
  }, [token]);

  return (
    <Routes>

      {/* Public + layout with header/footer */}
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home/>} />
        <Route path="/courses" element={<CoursesPage/>} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/blogs" element={<BlogPage/>} />
        <Route path="/library" element={<AllBook/>} />
        <Route path="/profile" element={<TeacherDashboard/>} />
        <Route path="/teacher/create-course" element={<CreateCourse/>} />
        <Route path="/blogs/create" element={<CreateBlog/>} />
        <Route path="/teacher/add-book" element={<CreateBook/>} />
        <Route path="/teacher/add-lesson" element={<CreateLesson/>} />
        <Route path="profile/all-blogs" element={<MyAllArticles/>} />
        <Route path="profile/all-courses" element={<AllCoursesTable/>} />
        <Route path="/teacher/edit-profile" element={<ProfileCard/>} />
        <Route path="/dashboard/courses/:id/edit" element={<EditCourse />} />
        <Route path="/blogs/edit/:id" element={<EditBlogForm />} />
        <Route path="/dashboard/books/edit/:id" element={<EditBook />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/profile/all-books" element={<AllBooks/>} />
        <Route path="/books/:id" element={<BookDetail />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration/>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;