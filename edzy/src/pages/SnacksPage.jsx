import { useState } from 'react'
import { useApp } from '../context/AppContext'
import SnackCard from '../components/SnackCard'
import OrderForm from '../components/OrderForm'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

const CATEGORIES = ['All', 'Mains', 'Snacks', 'Drinks', 'Desserts', 'Healthy']

export default function SnacksPage() {
  const { state } = useApp()
  const [selectedSnack, setSelectedSnack] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = state.snacks.filter((s) => {
    const matchCat = activeCategory === 'All' || s.category === activeCategory
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  if (state.loading) return <LoadingSpinner message="Loading snacks..." />
  if (state.error) return <ErrorMessage message={state.error} />

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Today's Menu</h1>
          <p className="page-subtitle">{state.snacks.length} items available in the canteen</p>
        </div>
      </div>

      <div className="snacks-toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="🔍 Search snacks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-tab ${activeCategory === cat ? 'cat-tab-active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🍽️</span>
          <p>No snacks found. Try a different search.</p>
        </div>
      ) : (
        <div className="snacks-grid">
          {filtered.map((snack, i) => (
            <div key={snack.id} className="snack-card-wrapper" style={{ animationDelay: `${i * 60}ms` }}>
              <SnackCard snack={snack} onOrder={setSelectedSnack} />
            </div>
          ))}
        </div>
      )}

      {selectedSnack && (
        <OrderForm
          snack={selectedSnack}
          onClose={() => setSelectedSnack(null)}
          onSuccess={() => setSelectedSnack(null)}
        />
      )}
    </div>
  )
}