//POST REQUESTS SCHEMA:

export const POST_SCHEMA = {
    $id: 'POST_SCHEMA',
    type: "object",
    properties: {
        name: { type: 'string', minLength: 1, pattern: '^(?=.*[a-zA-Z]).+$' },
        amount: { type: 'number', minimum: 1 },
        category: { type: 'string', minLength: 1, pattern: '^(?=.*[a-zA-Z]).+$' }
    },
    required: ['name', 'amount', 'category']
}
//PATCH REQUESTS SCHEMA:
export const PATCH_SCHEMA = {
    $id: 'PATCH_SCHEMA',
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1, pattern: '^(?=.*[a-zA-Z]).+$' },
        amount: { type: 'number', minimum: 1 },
        category: { type: 'string', minLength: 1, pattern: '^(?=.*[a-zA-Z]).+$' }
    },
    minProperties: 1,
    additionalProperties : false
}
//DELETE REQUESTS SCHEMA:
export const DELETE_SCHEMA = {
    $id: 'DELETE_SCHEMA',
    type: 'object',
    properties: {
        user_id: { type: 'string' },
        expenseId: { type: 'string', pattern: '^[0-9]+$' }
    },
    required: ['expenseId', 'user_id']
}