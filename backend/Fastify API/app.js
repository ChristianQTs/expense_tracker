
import Fastify from 'fastify'
import cors from '@fastify/cors'
import 'dotenv/config'
import { expensesRoutes } from './expensesRoutes.js'
const port = process.env.PORT || 3001
const app = Fastify({ logger: false })
await app.register(cors, { origin: 'http://localhost:5173', methods: ['GET', 'POST', 'PATCH', 'DELETE']})
//register expenses plugin
app.register(expensesRoutes, { prefix: '/users/:user_id/expenses'})
//handle errors
app.setErrorHandler(async (err, request, reply) => {
    if (err.validation) {
        reply.code(400)
        return err.message
    }
    console.log(err)
    request.log.error({ err })
    reply.code(err.statusCode || 500)
})
app.listen({ port }, function (err) {
    if (err) {
        return app.log.error(err)
    }
    console.log(`Server listening on port ${port}`)
})