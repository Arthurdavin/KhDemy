import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Homepage from './pages/Homepage.jsx'
import StudentDashboard from './pages/student/StudentDashboard.jsx'
import Courseenrollment from './features/enroll/Courseenrollment.jsx'
import mycourse from './pages/student/mycourse.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Homepage />
    {/* <StudentDashboard /> */}
    {/* <mycourse/> */}

    {/* <Courseenrollment /> */}
  </StrictMode>,

)