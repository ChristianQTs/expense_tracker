import { expenses_table, updateId } from '../../expenses_array.js'

export async function getAllExpenses (request, reply) {

    const userId = Number(request.params.user_id)

    const userExpenses = expenses_table.filter(e => e.user_id === userId)

    if (userExpenses.length === 0) return reply.code(404).send({ message: 'No expense found' })

    return {data : userExpenses}
}

export async function addExpense(request, reply) {

        const user_id = Number(request.params.user_id)

        const { name, amount, category } = request.body

        const newExpense = { user_id, id: updateId(), name, amount, category }

        expenses_table.push(newExpense)

    return {data : newExpense}
}

export async function updateExpense(request, reply) {

    const user_id = Number(request.params.user_id)
    const expense = expenses_table.find(e => e.id === Number(request.params.expenseId))

    if (!expense) return reply.code(404).send({ message: 'Expense not found' })
    if (expense.user_id !== user_id) return reply.code(403).send({ message: 'Request denied' })

    const { name, amount, category } = request.body

    if (name !== undefined) expense.name = name
    if (amount !== undefined) expense.amount = amount
    if (category !== undefined) expense.category = category

    return { expense }
}

export async function deleteExpense(request, reply) {

    const expenseId = Number(request.params.expenseId)
    const expenseIndex = expenses_table.findIndex(e => e.id === expenseId)

    if (expenseIndex === -1) return reply.code(404).send({ message: 'Expense not found' })
    if (expenses_table[expenseIndex].user_id !== Number(request.params.user_id)) return reply.code(403).send({message : 'Request denied'})

    expenses_table.splice(expenseIndex, 1)

    return { expenseId }
}