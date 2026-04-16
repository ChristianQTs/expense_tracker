import { getAllExpenses, addExpense, updateExpense, deleteExpense } from './controllers/expenseControllers.js'
import { POST_SCHEMA, PATCH_SCHEMA, DELETE_SCHEMA } from './validationSchemas.js'
//expenses plugin:
export async function expensesRoutes(fastify, opts) {

    fastify.addSchema(POST_SCHEMA)
    fastify.addSchema(PATCH_SCHEMA)
    fastify.addSchema(DELETE_SCHEMA)

    fastify.get('/', getAllExpenses)
    fastify.post('/', { schema: { body: { $ref: 'POST_SCHEMA#' } } }, addExpense)
    fastify.patch('/:expenseId', { schema: { body: { $ref: 'PATCH_SCHEMA#' } } }, updateExpense)
    fastify.delete('/:expenseId', { schema: { params: { $ref: 'DELETE_SCHEMA#' } } }, deleteExpense)
}