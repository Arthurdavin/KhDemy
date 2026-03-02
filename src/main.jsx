import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Blog from './pages/blog/BlogPage.jsx'  
import BlogDetail from './pages/blog/BlogDetail.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Bd from './pages/blog/BlogAndDetail.jsx'
import BlogAndDetail from './pages/blog/BlogAndDetail.jsx'
import CoursesPage from './pages/course/Courses.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Blog /> */}
    {/* <BlogDetail/> */}
    {/* <AboutUs/> */}
    {/* <BlogAndDetail/>  */}

    <CoursesPage />


  </StrictMode>,
)