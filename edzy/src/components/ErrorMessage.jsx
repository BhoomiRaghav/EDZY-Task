export default function ErrorMessage({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="error-box">
      <span className="error-icon">⚠️</span>
      <p className="error-text">{message}</p>
      {onRetry && (
        <button className="btn btn-outline" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  )
}