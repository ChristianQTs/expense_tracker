import express from 'express'
import { getAllExpenses, addExpense, deleteExpense, updateExpense } from '../controllers/expenseControllers.js'

const expenseRouter = express.Router()

expenseRouter.get('/:user_id/expenses', getAllExpenses)
expenseRouter.post('/:user_id/expenses', addExpense)
expenseRouter.delete('/:user_id/expenses/:expenseId', deleteExpense)
expenseRouter.patch('/:user_id/expenses/:expenseId', updateExpense)

export  {expenseRouter}
