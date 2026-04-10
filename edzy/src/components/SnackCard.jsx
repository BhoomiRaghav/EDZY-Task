export default function SnackCard({ snack, onOrder }) {
  return (
    <div className="snack-card">
      <div className="snack-emoji">{snack.emoji}</div>
      <div className="snack-badge">{snack.category}</div>
      <h3 className="snack-name">{snack.name}</h3>
      <div className="snack-meta">
        <span className="snack-price">₹{snack.price}</span>
        <span className="snack-orders">🛒 {snack.ordersCount} orders</span>
      </div>
      <button className="btn btn-primary snack-order-btn" onClick={() => onOrder(snack)}>
        Order Now
      </button>
    </div>
  )
}