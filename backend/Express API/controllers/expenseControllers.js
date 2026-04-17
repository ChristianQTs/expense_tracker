import { expenses_table, updateId } from '../../expenses_array.js'
import prisma from '../../prisma/prismaClient.ts'
export async function getUser(req, res) {

    const user_id = parseInt(req.params.user_id,10)

    const user = await prisma.users.findUnique({
        where: {id : user_id}
    })

    if (!user) {

        return res.status(404).json({ message: 'User not found.' })
        
    }

    res.status(200).json({ data: user })

}


export  function addExpense(req, res) {

    const { name, amount, category } = req.body

    if (typeof name !== 'string' || !name.trim() || typeof category !== 'string' || !category.trim() || typeof amount !== 'number' || !amount ||  amount <= 0) {
        return res.status(400).json({message : 'Invalid fields'})
    }
    
    const newExpense = {

        user_id : Number(req.params.user_id),
        id: updateId(),
        name, 
        amount: Number(amount),
        category

    }

    expenses_table.push(newExpense)
    res.status(201).json({data : newExpense, message:'Expense added'})
}

export function deleteExpense(req, res) {

    const expenseId = Number(req.params.expenseId)
    const expenseIndex = expenses_table.findIndex(e => e.id === expenseId)

    if (expenseIndex === -1) return res.status(404).json({ message: 'Expense not found.' })
    if (expenses_table[expenseIndex].user_id !== Number(req.params.user_id)) return res.status(403).json({message : 'Request denied.'})

    expenses_table.splice(expenseIndex, 1)

    res.status(200).json({message:'Expense deleted', expenseId})
}

export function updateExpense(req, res) {

    const expenseId = Number(req.params.expenseId)    
    const expense = expenses_table.find(e => e.id === expenseId)

    if (!expense) return res.status(404).json({ 'message': 'Expense not found.' })
    if (expense.user_id !== Number(req.params.user_id)) return res.status(403).json({ message: 'Request denied.' })

    const { name, amount, category } = req.body
    const numAmount = Number(amount)

    if (name !== undefined) if (typeof name === 'string' && name.trim())  {expense.name = name} else {return res.status(400).json({ message : 'Invalid name' })}
    if (amount !== undefined) if (!isNaN(numAmount) || numAmount<0) {expense.amount = numAmount} else {return res.status(400).json({ message: 'Invalid amount' })}
    if (category !== undefined) if (typeof category === 'string' && category.trim()) {expense.category = category} else {return res.status(400).json({ message: 'Invalid category' })}

    res.status(200).json({message:'Expense updated', expense})
 
}