import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import OrderForm from '../components/OrderForm'
import LoadingSpinner from '../components/LoadingSpinner'

export default function StudentDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useApp()
  const [orderSnack, setOrderSnack] = useState(null)
  const [showSnackPicker, setShowSnackPicker] = useState(false)

  const student = state.students.find((s) => s.id === Number(id))
  const studentOrders = state.orders
    .filter((o) => o.studentId === Number(id))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const initials = student?.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
  const colors = ['avatar-blue', 'avatar-green', 'avatar-orange', 'avatar-purple', 'avatar-red']
  const colorClass = colors[student?.id % colors.length]

  if (state.loading) return <LoadingSpinner message="Loading student..." />
  if (!student) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <span className="empty-icon">❓</span>
          <p>Student not found.</p>
          <button className="btn btn-outline" onClick={() => navigate('/students')}>← Back</button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <button className="back-btn" onClick={() => navigate('/students')}>← Back to Students</button>

      <div className="detail-hero">
        <div className={`student-avatar avatar-lg ${colorClass}`}>{initials}</div>
        <div className="detail-info">
          <h1 className="detail-name">{student.name}</h1>
          <div className="detail-badges">
            <span className="badge badge-ref">🔖 {student.referralCode}</span>
            <span className="badge badge-spent">💰 ₹{student.totalSpent} spent</span>
            <span className="badge badge-orders">🛒 {studentOrders.length} orders</span>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowSnackPicker(true)}>
          + New Order
        </button>
      </div>

      <div className="orders-section">
        <h2 className="section-title">Order History</h2>
        {studentOrders.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🧾</span>
            <p>No orders yet. Place the first one!</p>
          </div>
        ) : (
          <div className="orders-list">
            {studentOrders.map((order, i) => (
              <div key={order.id} className="order-card" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="order-left">
                  <span className="order-emoji">
                    {state.snacks.find((s) => s.id === order.snackId)?.emoji || '🍽️'}
                  </span>
                  <div>
                    <p className="order-name">{order.snackName}</p>
                    <p className="order-date">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                <div className="order-right">
                  <span className="order-qty">×{order.quantity}</span>
                  <span className="order-amount">₹{order.payableAmount}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showSnackPicker && (
        <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && setShowSnackPicker(false)}>
          <div className="snack-picker-modal">
            <button className="modal-close" onClick={() => setShowSnackPicker(false)}>✕</button>
            <h2 className="modal-title">Choose a Snack</h2>
            <div className="snack-picker-grid">
              {state.snacks.map((snack) => (
                <button
                  key={snack.id}
                  className="snack-pick-btn"
                  onClick={() => {
                    setOrderSnack(snack)
                    setShowSnackPicker(false)
                  }}
                >
                  <span>{snack.emoji}</span>
                  <span className="pick-name">{snack.name}</span>
                  <span className="pick-price">₹{snack.price}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {orderSnack && (
        <OrderForm
          snack={orderSnack}
          prefilledStudentId={student.id}
          onClose={() => setOrderSnack(null)}
          onSuccess={() => setOrderSnack(null)}
        />
      )}
    </div>
  )
}