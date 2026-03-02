// src/layouts/RootLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './NavBarComponent';  // adjust path if needed
import Footer from './FooterComponent'; // adjust path if needed
const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Fixed/Sticky Navbar */}
      <header className="sticky top-0 z-50">
        <Navbar/>
      </header>

      {/* Main content - grows to fill available space */}
      <main className="flex-grow">
        <Outlet />           {/* ← All page content (Home, Courses, About, etc.) renders here */}
      </main>

      {/* Footer - always at bottom */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;