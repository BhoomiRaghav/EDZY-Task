import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider } from '../src/context/AppContext'
import Navbar from '../src/components/Navbar'
import SnacksPage from '../src/pages/SnacksPage'
import StudentsPage from '../src/pages/StudentsPage'
import StudentDetailPage from '../src/pages/StudentDetailPage'
import CreateStudentPage from '../src/pages/CreateStudentPage'
import './App.css'
import NotFound from '../src/components/NotFound'
export default function App() {
  return (
    <AppProvider>
      
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<SnacksPage />} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/students/:id" element={<StudentDetailPage />} />
              <Route path="/create-student" element={<CreateStudentPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  )
}