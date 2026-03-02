// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Homepage'; 
import AboutUs from './pages/AboutUs';
import Library from './pages/Library';



import RootLayout from './layout/RootLayout';


import './index.css'; // or your global styles
import Courses from './pages/course/Courses';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home  />} />
          <Route path="/courses" element={<Courses />} /> 
          {/* <Route path="/library" element={<Library />} />  */}
          {/* <Route path="/blog" element={<Blog />} />  */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/login" element={<Login />} />  */}

          {/* Optional: 404 page */}
           {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);