import Fastify from 'fastify'

import { createTaskController } from './use-cases/create-task'
import { updateTaskController } from './use-cases/update-task'
import { deleteTaskController } from './use-cases/delete-task'

const fastify = Fastify()

fastify.post('/tasks', (req, reply) => createTaskController.handle(req, reply))
fastify.put('/tasks', (req, reply) => updateTaskController.handle(req, reply))
fastify.delete('/tasks', (req, reply) => deleteTaskController.handle(req, reply))

fastify.listen({ port: 4000 })
