
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa'; // or use your own icons

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode (you can also use context/provider for global theme)
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo - left */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="public/log1.png"           
                alt="KhDemy Logo"
                className="h-10 w-auto"
              />
              {/* Optional text beside logo */}
              {/* <span className="text-xl font-bold text-blue-700 dark:text-blue-400">KhDemy</span> */}
            </Link>
          </div>

          {/* Desktop Navigation - centered */}
          <div className="hidden md:flex md:items-center md:justify-center flex-1">
            <div className="flex items-baseline space-x-10 lg:space-x-16">
              {['Courses', 'Library', 'Blog', 'About Us'].map((item) => (
                <NavLink
                  key={item}
                  to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className={({ isActive }) =>
                    `text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-1 py-2 text-base font-medium transition-colors ${
                      isActive ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : ''
                    }`
                  }
                >
                  {item}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right side: Dark toggle + Login */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FaSun className="w-5 h-5 text-yellow-400" />
              ) : (
                <FaMoon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Login button */}
            <Link
              to="/login"
              className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </Link>

            {/* Mobile menu button (hamburger) - you can expand later */}
            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                aria-label="Open main menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown - placeholder (expand when you add state for mobile menu) */}
      {/* You can use useState + conditional render here if needed */}
    </nav>
  );
};

export default Navbar;
