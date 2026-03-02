// // src/components/layout/Footer.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   FaFacebookF, 
//   FaTelegramPlane, 
//   FaYoutube, 
//   FaInstagram 
// } from 'react-icons/fa';

// const Footer = () => {
//   return (
//     <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-10 px-6 mt-auto">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-16 text-center md:text-left">
        
//         {/* 1. Organized by - KhDemy */}
//         <div className="flex flex-col items-center md:items-start">
//           <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
//             Organized by
//           </p>
//           <img
//             src="public/logo.jpg"  // ← replace with your actual KhDemy logo path
//             alt="KhDemy"
//             className="h-20 sm:h-24 object-contain mb-3"
//           />
//           <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
//             Institute of Science and Technology
//             <br />
//             Advanced Development
//           </p>
//         </div>

//         {/* 2. Central logo + tagline */}
//         <div className="flex flex-col items-center md:items-start col-span-1 md:col-span-2">
//           <img
//             src="/assets/ku-logo.png"      // ← replace with your KU / KhU logo path
//             alt="KhU"
//             className="h-28 sm:h-32 lg:h-40 object-contain mb-4"
//           />
//           <p className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300 text-center md:text-left max-w-md">
//             Where Industry Experts Build
//             <br />
//             Tomorrow's Innovators.
//           </p>
//         </div>

//         {/* 3. Explore */}
//         <div className="flex flex-col items-center md:items-start">
//           <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-5">
//             Explore
//           </h3>
//           <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
//             <li>
//               <Link to="/courses" className="hover:text-blue-600 transition-colors">
//                 Course
//               </Link>
//             </li>
//             <li>
//               <Link to="/library" className="hover:text-blue-600 transition-colors">
//                 Library
//               </Link>
//             </li>
//             <li>
//               <Link to="/blog" className="hover:text-blue-600 transition-colors">
//                 Blog
//               </Link>
//             </li>
//             <li>
//               <Link to="/about" className="hover:text-blue-600 transition-colors">
//                 About us
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* 4. Contact us - Social icons */}
//         <div className="flex flex-col items-center md:items-start">
//           <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-5">
//             Contact us
//           </h3>
//           <div className="flex gap-6 text-2xl text-gray-600 dark:text-gray-400">
//             <a
//               href="https://facebook.com/yourpage"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Facebook"
//               className="hover:text-blue-600 transition-colors"
//             >
//               <FaFacebookF />
//             </a>
//             <a
//               href="https://t.me/yourchannel"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Telegram"
//               className="hover:text-blue-500 transition-colors"
//             >
//               <FaTelegramPlane />
//             </a>
//             <a
//               href="https://youtube.com/yourchannel"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="YouTube"
//               className="hover:text-red-600 transition-colors"
//             >
//               <FaYoutube />
//             </a>
//             <a
//               href="https://instagram.com/yourprofile"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Instagram"
//               className="hover:text-pink-600 transition-colors"
//             >
//               <FaInstagram />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Copyright */}
//       <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
//         © {new Date().getFullYear()} KhDemy | All Rights Reserved
//       </div>
//     </footer>
//   );
// };

// export default Footer;


// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaTelegramPlane, 
  FaYoutube, 
  FaInstagram 
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 mt-auto">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">
          
          {/* 1. Organized by - Institute Logo (ISTAD) */}
          <div className="flex flex-col items-center text-center">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 tracking-wide">
              Organized by
            </h4>
            <div className="mb-4 flex justify-center">
              <img
                src="public/logoISTAD.png"
                alt="Institute of Science and Technology"
                className="h-20 sm:h-24 lg:h-28 object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Institute of Science and Technology
              <br />
              Advanced Development
            </p>
          </div>

          {/* 2. KhDemy Logo + Tagline (logo.jpg) */}
          <div className="flex flex-col items-center text-center">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 tracking-wide">
              KHdemy
            </h4>
            <div className="mb-4 flex justify-center">
              <img
                src="public/logoKhdemy.png"
                alt="KhDemy"
                className="h-24 sm:h-28 lg:h-32 object-contain"
              />
            </div>
            <p className="text-sm sm:text-sm  text-gray-600 dark:text-gray-300 leading-relaxed">
              Where Industry Experts Build
              <br />
              Tomorrow's Innovators.
            </p>
          </div>

          {/* 3. Explore Section */}
          <div className="flex flex-col items-center sm:items-center lg:items-start text-center lg:text-left">
            <h3 className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-200 mb-4 sm:mb-5">
              Explore
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-700 dark:text-gray-400 text-xs sm:text-sm">
              <li>
                <Link 
                  to="/courses" 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  Course
                </Link>
              </li>
              <li>
                <Link 
                  to="/library" 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  Library
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  About us
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Contact us - Social Icons */}
          <div className="flex flex-col items-center sm:items-center lg:items-start text-center lg:text-left">
            <h3 className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-200 mb-4 sm:mb-5">
              Contact us
            </h3>
            <div className="flex gap-5 sm:gap-6 text-xl sm:text-2xl">
              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-600 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://t.me/yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="text-gray-600 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <FaTelegramPlane />
              </a>
              <a
                href="https://youtube.com/yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-gray-600 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200"
              >
                <FaYoutube />
              </a>
              <a
                href="https://instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-600 dark:text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-300 dark:border-gray-700"></div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-500">
        © {new Date().getFullYear()} KhDemy | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;