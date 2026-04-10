import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useApp } from '../context/AppContext'
import { generateReferralCode } from '../utils/generateReferralCode'

export default function CreateStudentPage() {
  const navigate = useNavigate()
  const { addStudent } = useApp()
  const [created, setCreated] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (data) => {
    setSubmitting(true)
    setTimeout(() => {
      const referralCode = generateReferralCode(data.name)
      const student = addStudent({ name: data.name.trim(), referralCode })
      setCreated(student)
      setSubmitting(false)
      reset()
    }, 800)
  }

  return (
    <div className="page-container create-page">
      <div className="create-split">
        <div className="create-left">
          <h1 className="page-title">Add New Student</h1>
          <p className="page-subtitle">Register a student to start ordering from the canteen.</p>

          <div className="feature-list">
            {['Auto-generated referral code', 'Order history tracking', 'Spending insights'].map((f) => (
              <div key={f} className="feature-item">
                <span className="feature-check">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="create-right">
          {created ? (
            <div className="success-card">
              <div className="success-anim">🎉</div>
              <h2>Student Created!</h2>
              <div className="created-detail">
                <p><strong>{created.name}</strong></p>
                <p className="created-ref">Referral: <span>{created.referralCode}</span></p>
              </div>
              <div className="success-actions">
                <button className="btn btn-primary" onClick={() => navigate(`/students/${created.id}`)}>
                  View Profile
                </button>
                <button className="btn btn-outline" onClick={() => { setCreated(null) }}>
                  Add Another
                </button>
              </div>
            </div>
          ) : (
            <form className="create-form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="form-group">
                <label className="form-label">Student Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'input-error' : ''}`}
                  placeholder="e.g. Aarav Sharma"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' },
                    maxLength: { value: 50, message: 'Name is too long' },
                    pattern: { value: /^[a-zA-Z\s]+$/, message: 'Only letters and spaces allowed' },
                  })}
                />
                {errors.name && <span className="error-msg">{errors.name.message}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Referral Code</label>
                <input
                  type="text"
                  className="form-control"
                  value="Auto-generated on submit"
                  readOnly
                  style={{ opacity: 0.5, cursor: 'not-allowed' }}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
                {submitting ? (
                  <span className="btn-loading"><span className="dot-spin"></span> Creating...</span>
                ) : (
                  'Create Student →'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}