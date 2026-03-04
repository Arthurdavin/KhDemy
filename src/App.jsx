import { Routes, Route } from "react-router-dom";
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

// import TeacherDashboard from "./pages/teacher/TeacherDashboard";
// import NotFound from "./components/common/NotFound";

function App() {
  return (
    <Routes>

      {/* Public + layout with header/footer */}
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home/>} />
        <Route path="/courses" element={<CoursesPage/>} />
        {/* <Route path="courses/:id" element={<CourseDetail />} /> */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/blogs" element={<BlogPage/>} />
        {/* <Route path="/profile" element={<TeacherDashboard/>} /> */}
        <Route path="/profile" element={<TeacherDashboard/>} />
        <Route path="/teacher/create-course" element={<CreateCourse/>} />
        <Route path="/create-blog" element={<CreateBlog/>} />
        <Route path="/teacher/add-book" element={<CreateBook/>} />
        <Route path="profile/all-blogs" element={<MyAllArticles/>} />
        <Route path="profile/all-courses" element={<AllCoursesTable/>} />
        <Route path="/teacher/edit-profile" element={<ProfileCard/>} />
        <Route path="/dashboard/courses/:id/edit" element={<EditCourse />} />
      </Route>
      <Route path="/login" element={<Login  />} />
      <Route path="/register" element={<Registration/>} />

      {/* Auth pages – clean layout */}
      {/* <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} /> */}
        {/* <Route path="register" element={<Register />} /> */}
      {/* </Route> */}

      {/* Protected – student & teacher */}
      {/* <Route element={<DashboardLayout />}> */}
        {/* Everyone logged in */}
        {/* <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<div>Profile page (later)</div>} />
        </Route> */}

        {/* Only students */}
        {/* <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="student/dashboard" element={<StudentDashboard />} />
          <Route path="my-courses" element={<MyCourses />} />
        </Route> */}

        {/* Only teachers */}
        {/* <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
          <Route path="teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="teacher/courses" element={<TeacherCourses />} />
          <Route path="teacher/courses/new" element={<CreateCourse />} />
        </Route> */}
      {/* </Route> */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

// import { Routes, Route } from "react-router-dom";
// import RootLayout from "./layout/RootLayout";
// import Home from "./pages/Homepage";
// import CoursesPage from "./pages/course/Courses";
// import BlogPage from "./pages/blog/BlogPage";
// import AboutUs from "./pages/AboutUs";
// import Login from "./pages/login/Login";
// import Registration from "./pages/register/Register";
// import NotFound from "./components/home/NotFound";

// import ProtectedRoute from "./components/ProtectedRoute";
// import TeacherLayout from "./components/teacher/TeacherLayout";
// import TeacherDashboard from "./components/teacher/TeacherDashboard";

// function App() {
//   return (
//     <Routes>

//       {/* Public Layout */}
//       <Route element={<RootLayout />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/courses" element={<CoursesPage />} />
//         <Route path="/blogs" element={<BlogPage />} />
//         <Route path="/about" element={<AboutUs />} />
//       </Route>

//       {/* Auth */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Registration />} />

//       {/* Teacher Protected Routes */}
//       <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
//         <Route path="/profile" element={<TeacherDashboard/>} />
//         {/* <Route path="/teacher" element={<TeacherLayout />}>
//           <Route path="/profile" element={<TeacherDashboard/>} />
//           <Route path="create-course" element={<div>Create Course Page</div>} />
//           <Route path="add-lesson" element={<div>Add Lesson Page</div>} />
//           <Route path="add-quiz" element={<div>Add Quiz Page</div>} />
//           <Route path="edit-lesson" element={<div>Edit Lesson Page</div>} />
//           <Route path="add-book" element={<div>Add Book Page</div>} />
//           <Route path="add-article" element={<div>Add Article Page</div>} />
//           <Route path="edit-profile" element={<div>Edit Profile Page</div>} />

//         </Route> */}
//       </Route>

//       <Route path="*" element={<NotFound />} />

//     </Routes>
//   );
// }

// export default App;