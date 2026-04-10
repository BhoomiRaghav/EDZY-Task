import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">🍽️</span>
        <span className="brand-name">CanteenX</span>
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span className={`ham-line ${menuOpen ? 'open' : ''}`}></span>
        <span className={`ham-line ${menuOpen ? 'open' : ''}`}></span>
        <span className={`ham-line ${menuOpen ? 'open' : ''}`}></span>
      </button>

      <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setMenuOpen(false)}>
          <span className="nav-icon">🍟</span> Snacks
        </NavLink>
        <NavLink to="/students" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setMenuOpen(false)}>
          <span className="nav-icon">👤</span> Students
        </NavLink>
        <NavLink to="/create-student" className={({ isActive }) => isActive ? 'nav-link active cta-link' : 'nav-link cta-link'} onClick={() => setMenuOpen(false)}>
          <span className="nav-icon">➕</span> Add Student
        </NavLink>
      </div>
    </nav>
  )
}