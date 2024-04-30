import Fastify from 'fastify'
import { createTaskController } from './use-cases/create-task'

const fastify = Fastify()

fastify.post('/tasks', (req, reply) => createTaskController.handle(req, reply))

fastify.listen({ port: 4000 })
