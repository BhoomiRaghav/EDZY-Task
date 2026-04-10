export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="spinner-container">
      <div className="spinner-ring">
        <div></div><div></div><div></div><div></div>
      </div>
      <p className="spinner-text">{message}</p>
    </div>
  )
}