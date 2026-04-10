export const mockSnacks = [
  { id: 1, name: 'Veggie Burger', price: 45, ordersCount: 120, emoji: '🍔', category: 'Mains' },
  { id: 2, name: 'Cheese Pizza Slice', price: 35, ordersCount: 98, emoji: '🍕', category: 'Mains' },
  { id: 3, name: 'Masala Fries', price: 25, ordersCount: 210, emoji: '🍟', category: 'Snacks' },
  { id: 4, name: 'Mango Smoothie', price: 30, ordersCount: 75, emoji: '🥭', category: 'Drinks' },
  { id: 5, name: 'Chocolate Brownie', price: 20, ordersCount: 155, emoji: '🍫', category: 'Desserts' },
  { id: 6, name: 'Spring Rolls (2pc)', price: 28, ordersCount: 88, emoji: '🥢', category: 'Snacks' },
  { id: 7, name: 'Cold Coffee', price: 40, ordersCount: 134, emoji: '☕', category: 'Drinks' },
  { id: 8, name: 'Paneer Wrap', price: 50, ordersCount: 67, emoji: '🌯', category: 'Mains' },
  { id: 9, name: 'Fruit Salad', price: 22, ordersCount: 43, emoji: '🍓', category: 'Healthy' },
  { id: 10, name: 'Samosa (2pc)', price: 15, ordersCount: 300, emoji: '🔶', category: 'Snacks' },
  { id: 11, name: 'Lemon Soda', price: 18, ordersCount: 90, emoji: '🍋', category: 'Drinks' },
  { id: 12, name: 'Ice Cream Cup', price: 25, ordersCount: 112, emoji: '🍦', category: 'Desserts' },
]

export const mockStudents = [
  { id: 101, name: 'Aarav Sharma', referralCode: 'AARAV2024', totalSpent: 0 },
  { id: 102, name: 'Priya Patel', referralCode: 'PRIYA2024', totalSpent: 0 },
  { id: 103, name: 'Rohan Gupta', referralCode: 'ROHAN2024', totalSpent: 0 },
  { id: 104, name: 'Sneha Verma', referralCode: 'SNEHA2024', totalSpent: 0 },
  { id: 105, name: 'Karan Mehta', referralCode: 'KARAN2024', totalSpent: 0 },
]

export const mockOrders = [
  { id: 1001, studentId: 101, snackId: 1, snackName: 'Veggie Burger', quantity: 2, payableAmount: 90, createdAt: '2024-01-15T10:30:00Z' },
  { id: 1002, studentId: 101, snackId: 7, snackName: 'Cold Coffee', quantity: 1, payableAmount: 40, createdAt: '2024-01-15T11:00:00Z' },
  { id: 1003, studentId: 102, snackId: 3, snackName: 'Masala Fries', quantity: 3, payableAmount: 75, createdAt: '2024-01-16T12:00:00Z' },
  { id: 1004, studentId: 103, snackId: 5, snackName: 'Chocolate Brownie', quantity: 2, payableAmount: 40, createdAt: '2024-01-16T13:30:00Z' },
  { id: 1005, studentId: 104, snackId: 10, snackName: 'Samosa (2pc)', quantity: 4, payableAmount: 60, createdAt: '2024-01-17T09:45:00Z' },
  { id: 1006, studentId: 102, snackId: 8, snackName: 'Paneer Wrap', quantity: 1, payableAmount: 50, createdAt: '2024-01-17T14:00:00Z' },
  { id: 1007, studentId: 105, snackId: 2, snackName: 'Cheese Pizza Slice', quantity: 2, payableAmount: 70, createdAt: '2024-01-18T11:30:00Z' },
  { id: 1008, studentId: 103, snackId: 12, snackName: 'Ice Cream Cup', quantity: 3, payableAmount: 75, createdAt: '2024-01-18T15:00:00Z' },
]