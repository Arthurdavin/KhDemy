// import './App.css'

// function App() {
  
//   return (
//     <>
//       <h1 className='bg-amber-500 text-5xl'>Hello World</h1>
//     </>
//   )
// }

// export default App

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Homepage'
import Navbar from './components/layout/NavBarComponent';
import Footer from './components/layout/FooterComponent';

function App() {
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add later: /courses, /login, /library etc */}
      </Routes>
    </div>
  )
}

export default App
// import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <>
//       <Navbar />
//     </>
//   );
// }

