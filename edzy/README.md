🍽️ School Canteen Frontend (React)

A simple React-based web application built as part of a frontend screening task.
The app simulates a school canteen ordering system where users can view snacks, manage students, and place orders.

🚀 Features
View all available snacks 🍔
Create new students 👩‍🎓
Place snack orders
Track student spending & order history
Dynamic routing with React Router
404 Not Found page handling
🧠 My Approach

I focused on building a clean, modular, and scalable structure rather than just making things work.

<h4>Component-Based Architecture</h4>
Broke UI into reusable components (Navbar, Cards, Pages)
Separated pages and components for clarity


<h4>State Management</h4>
Used React Context API for global state
Managed:
Students
Snacks
Orders


<h4>Routing</h4>
Implemented routing using React Router
Dynamic route:
/students/:id → Student detail page
Added a 404 catch-all route


<h4>Data Flow</h4>
Centralized logic inside context
Passed only required props to components
Avoided prop drilling where possible

<h4>Project Structure</h4>

   src/
    │
    ├── components/     # Reusable UI components
    ├── pages/          # Page-level components
    ├── context/        # Global state (AppContext)
    ├── data/           # Mock data
    ├── hooks/   
    ├── utils/       
    ├── App.jsx         # Main routing setup


<h4>Libraries Used</h4>

Only kept it minimal (as required):

React – Core framework
react-router-dom – Routing

(No unnecessary libraries used to keep the app lightweight and focused)

<h4>Mock Data Approach</h4>

Since no backend was required, I used hardcoded mock data to simulate API behavior.

Example:
export const mockSnacks = [
  { id: 1, name: 'Veggie Burger', price: 45, ordersCount: 120, emoji: '🍔', category: 'Mains' },
]
Why this approach?
Faster development
No dependency on backend
Easy to simulate real-world data
Data handled:
Snacks
Students
Orders

All operations (create student, place order) update the state dynamically like a real app.

⚙️ Setup Instructions
1. Clone the repository
git clone https://github.com/BhoomiRaghav/EDZY-Task.git
cd edzy
2. Install dependencies
npm install
3. Run the app
npm run dev
🌐 Deployment (Vercel)

The app is deployed using Vercel.

Steps I followed:
Pushed code to GitHub
Connected GitHub repo to Vercel
Selected project framework (React / Vite)
Clicked Deploy

Vercel automatically handled:

Build
Hosting
CI/CD
🔄 Git Workflow

Initialized repo using:

git init

Added files:

git add .

Committed changes:

git commit -m "Initial commit"

Connected to GitHub:

git remote add origin <https://github.com/BhoomiRaghav/EDZY-Task.git>
git push -u origin main

Used Git regularly to track progress and maintain version history.

✨ Improvements (Future Scope)
Add backend integration (Node.js / Firebase)
Persist data using localStorage or database
Add form validation (React Hook Form)
Improve UI with animations
Add authentication
👩‍💻 Author

Bhoomi Raghav

📌 Final Note

This project focuses on:

Clean code structure
Reusability
State management
Practical React concepts