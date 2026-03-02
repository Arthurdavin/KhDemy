// import { Routes, Route } from 'react-router-dom';

// import RootLayout from './layout/RootLayout';
// import Navbar from './layout/NavBarComponent';
// import Footer from './layout/FooterComponent';
// import Homepage From  './pages/Homepage';

// function App() {
//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
      
//       <main className="flex-grow">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           {/* <Route path="/courses" element={<Courses />} /> */}
//           {/* <Route path="*" element={<NotFound />} /> */}
//         </Routes>
//       </main>
      
//       <Footer />
//     </div>
//   );
// }

// export default App;

import { Routes, Route } from 'react-router-dom';
import Navbar from './layout/NavBarComponent';
import Footer from './layout/FooterComponent';
import Library from './pages/Library';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Homepage />} /> {/* ✅ matches import name */}
          {/* <Route path="/courses" element={<Courses />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;