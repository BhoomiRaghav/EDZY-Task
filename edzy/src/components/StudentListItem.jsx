import { useNavigate } from 'react-router-dom'

export default function StudentListItem({ student }) {
  const navigate = useNavigate()

  const initials = student.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const colors = ['avatar-blue', 'avatar-green', 'avatar-orange', 'avatar-purple', 'avatar-red']
  const colorClass = colors[student.id % colors.length]

  return (
    <div className="student-item">
      <div className={`student-avatar ${colorClass}`}>{initials}</div>
      <div className="student-info">
        <h3 className="student-name">{student.name}</h3>
        <div className="student-meta-row">
          <span className="student-referral">🔖 {student.referralCode}</span>
          <span className="student-spent">💰 ₹{student.totalSpent} spent</span>
        </div>
      </div>
      <button
        className="btn btn-outline btn-sm"
        onClick={() => navigate(`/students/${student.id}`)}
      >
        View →
      </button>
    </div>
  )
}