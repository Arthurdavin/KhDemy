import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "./features/auth/authSlice";

import RootLayout from "./layout/RootLayout";

const Home = lazy(() => import("./pages/Homepage"));
const BlogPage = lazy(() => import("./pages/blog/BlogPage"));
const NotFound = lazy(() => import("./components/home/NotFound"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const CoursesPage = lazy(() => import("./pages/course/CoursePage"));
const Login = lazy(() => import("./pages/login/Login"));
const Registration = lazy(() => import("./pages/register/Register"));
const TeacherDashboard = lazy(() => import("./components/teacher/TeacherDashboard"));
const CreateCourse = lazy(() => import("./pages/course/CreateCourse"));
const CreateBlog = lazy(() => import("./pages/blog/CreateBlog"));
const CreateBook = lazy(() => import("./pages/book/CreateBook"));
const MyAllArticles = lazy(() => import("./components/ui/MyAllArticle"));
const ProfileCard = lazy(() => import("./pages/teacher/ProfileTeacher"));
const AllCoursesTable = lazy(() => import("./components/teacher/AllCourses"));
const EditCourse = lazy(() => import("./pages/course/EditCourse"));
const CourseDetail = lazy(() => import("./pages/course/CourseDetail"));
const AllBook = lazy(() => import("./pages/book/AllBook"));
const CreateLesson = lazy(() => import("./pages/lesson/CreateLesson"));
const BlogDetail = lazy(() => import("./pages/blog/BlogDetail"));
const EditBlogForm = lazy(() => import("./pages/blog/EditBlogForm"));
const AllBooks = lazy(() => import("./components/teacher/AllBooks"));
const BookDetail = lazy(() => import("./pages/book/BookDetail"));
const EditBook = lazy(() => import("./pages/book/EditBook"));
const MyProgress = lazy(() => import("./pages/course/MyProgress"));
const CoursePlayer = lazy(() => import("./pages/course/CoursePlayer"));

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
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
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/library" element={<AllBook />} />
          <Route path="/profile" element={<TeacherDashboard />} />
          <Route path="/teacher/create-course" element={<CreateCourse />} />
          <Route path="/blogs/create" element={<CreateBlog />} />
          <Route path="/teacher/add-book" element={<CreateBook />} />
          <Route path="/teacher/add-lesson" element={<CreateLesson />} />
          <Route path="profile/all-blogs" element={<MyAllArticles />} />
          <Route path="profile/all-courses" element={<AllCoursesTable />} />
          <Route path="/teacher/edit-profile" element={<ProfileCard />} />
          <Route path="/dashboard/courses/:id/edit" element={<EditCourse />} />
          <Route path="/blogs/edit/:id" element={<EditBlogForm />} />
          <Route path="/dashboard/books/edit/:id" element={<EditBook />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/profile/all-books" element={<AllBooks />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/my-progress" element={<MyProgress />} />
          <Route path="/courses/:id/play" element={<CoursePlayer />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;