import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ExpenseTrackerPage } from './ExpenseTrackerPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <ExpenseTrackerPage/>
  </StrictMode>,
)
