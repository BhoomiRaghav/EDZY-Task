import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import StudentListItem from '../components/StudentListItem'
import LoadingSpinner from '../components/LoadingSpinner'

export default function StudentsPage() {
  const { state } = useApp()
  const navigate = useNavigate()

  const totalSpent = state.students.reduce((sum, s) => sum + s.totalSpent, 0)
  const totalOrders = state.orders.length

  if (state.loading) return <LoadingSpinner message="Loading students..." />

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Students</h1>
          <p className="page-subtitle">{state.students.length} registered students</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/create-student')}>
          + Add Student
        </button>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-icon">👤</span>
          <div>
            <p className="stat-num">{state.students.length}</p>
            <p className="stat-label">Students</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🛒</span>
          <div>
            <p className="stat-num">{totalOrders}</p>
            <p className="stat-label">Total Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💰</span>
          <div>
            <p className="stat-num">₹{totalSpent}</p>
            <p className="stat-label">Total Spent</p>
          </div>
        </div>
      </div>

      {state.students.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">👥</span>
          <p>No students yet. Add one!</p>
          <button className="btn btn-primary" onClick={() => navigate('/create-student')}>
            Create Student
          </button>
        </div>
      ) : (
        <div className="students-list">
          {state.students.map((student, i) => (
            <div key={student.id} className="student-item-wrapper" style={{ animationDelay: `${i * 80}ms` }}>
              <StudentListItem student={student} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}