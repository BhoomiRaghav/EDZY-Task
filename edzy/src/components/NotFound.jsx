import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you’re looking for doesn’t exist.</p>

      <Link to="/" style={{ color: '#3498db', textDecoration: 'none' }}>
        Go Back Home
      </Link>
    </div>
  )
}