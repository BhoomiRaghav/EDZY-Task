import { createContext, useContext, useReducer, useEffect } from 'react'
import { mockSnacks, mockStudents, mockOrders } from '../api/mockData'

const AppContext = createContext()

const initialState = {
  snacks: [],
  students: [],
  orders: [],
  loading: false,
  error: null,
}

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_SNACKS':
      return { ...state, snacks: action.payload, loading: false }
    case 'SET_STUDENTS':
      return { ...state, students: action.payload, loading: false }
    case 'SET_ORDERS':
      return { ...state, orders: action.payload }
    case 'ADD_STUDENT':
      return { ...state, students: [...state.students, action.payload] }
    case 'ADD_ORDER': {
      const newOrder = action.payload
      const updatedStudents = state.students.map((s) =>
        s.id === newOrder.studentId
          ? { ...s, totalSpent: s.totalSpent + newOrder.payableAmount }
          : s
      )
      const updatedSnacks = state.snacks.map((sn) =>
        sn.id === newOrder.snackId
          ? { ...sn, ordersCount: sn.ordersCount + newOrder.quantity }
          : sn
      )
      const updatedOrders = [...state.orders, newOrder]
      localStorage.setItem('canteen_orders', JSON.stringify(updatedOrders))
      return {
        ...state,
        orders: updatedOrders,
        students: updatedStudents,
        snacks: updatedSnacks,
      }
    }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true })
    setTimeout(() => {
      dispatch({ type: 'SET_SNACKS', payload: mockSnacks })
      dispatch({ type: 'SET_STUDENTS', payload: mockStudents })
      const savedOrders = localStorage.getItem('canteen_orders')
      const orders = savedOrders ? JSON.parse(savedOrders) : mockOrders
      dispatch({ type: 'SET_ORDERS', payload: orders })

      if (savedOrders) {
        const parsed = JSON.parse(savedOrders)
        const updatedStudents = mockStudents.map((s) => {
          const spent = parsed
            .filter((o) => o.studentId === s.id)
            .reduce((sum, o) => sum + o.payableAmount, 0)
          return { ...s, totalSpent: s.totalSpent + spent }
        })
        dispatch({ type: 'SET_STUDENTS', payload: updatedStudents })
      }
    }, 800)
  }, [])

  const addStudent = (studentData) => {
    const newStudent = {
      id: Date.now(),
      name: studentData.name,
      referralCode: studentData.referralCode,
      totalSpent: 0,
    }
    dispatch({ type: 'ADD_STUDENT', payload: newStudent })
    return newStudent
  }

  const placeOrder = (orderData) => {
    const snack = state.snacks.find((s) => s.id === orderData.snackId)
    const newOrder = {
      id: Date.now(),
      studentId: orderData.studentId,
      snackId: orderData.snackId,
      snackName: snack?.name || 'Unknown',
      quantity: orderData.quantity,
      payableAmount: snack ? snack.price * orderData.quantity : 0,
      createdAt: new Date().toISOString(),
    }
    dispatch({ type: 'ADD_ORDER', payload: newOrder })
    return newOrder
  }

  return (
    <AppContext.Provider value={{ state, dispatch, addStudent, placeOrder }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}