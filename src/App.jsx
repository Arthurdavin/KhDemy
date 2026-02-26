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
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        {/* Add later: /courses, /library etc */}
      </Routes>
    </div>
  )
}

export default App
