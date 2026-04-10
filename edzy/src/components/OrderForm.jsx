import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useApp } from '../context/AppContext'

export default function OrderForm({ snack, onClose, onSuccess, prefilledStudentId }) {
  const { state, placeOrder } = useApp()
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      studentId: prefilledStudentId ? String(prefilledStudentId) : '',
      quantity: 1,
    },
  })

  const quantity = watch('quantity', 1)
  const totalCost = snack ? snack.price * quantity : 0

  const onSubmit = (data) => {
    setSubmitting(true)
    setTimeout(() => {
      placeOrder({
        snackId: snack.id,
        studentId: Number(data.studentId),
        quantity: Number(data.quantity),
      })
      setSubmitting(false)
      setSubmitted(true)
      setTimeout(() => {
        onSuccess?.()
        onClose()
      }, 1200)
    }, 700)
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>

        {submitted ? (
          <div className="order-success">
            <div className="success-icon">✅</div>
            <h3>Order Placed!</h3>
            <p>Enjoy your {snack?.name}!</p>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <span className="modal-emoji">{snack?.emoji}</span>
              <div>
                <h2 className="modal-title">Order {snack?.name}</h2>
                <p className="modal-subtitle">₹{snack?.price} per item</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="order-form" noValidate>
              <div className="form-group">
                <label className="form-label">Select Student</label>
                <select
                  className={`form-control ${errors.studentId ? 'input-error' : ''}`}
                  {...register('studentId', { required: 'Please select a student' })}
                  disabled={!!prefilledStudentId}
                >
                  <option value="">-- Choose Student --</option>
                  {state.students.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                {errors.studentId && <span className="error-msg">{errors.studentId.message}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Quantity (1 – 5)</label>
                <div className="qty-row">
                  <input
                    type="number"
                    className={`form-control qty-input ${errors.quantity ? 'input-error' : ''}`}
                    {...register('quantity', {
                      required: 'Quantity is required',
                      min: { value: 1, message: 'Min 1' },
                      max: { value: 5, message: 'Max 5' },
                    })}
                  />
                  <div className="cost-preview">
                    <span className="cost-label">Total</span>
                    <span className="cost-value">₹{totalCost}</span>
                  </div>
                </div>
                {errors.quantity && <span className="error-msg">{errors.quantity.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
                {submitting ? (
                  <span className="btn-loading"><span className="dot-spin"></span> Placing...</span>
                ) : (
                  `Confirm Order — ₹${totalCost}`
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}