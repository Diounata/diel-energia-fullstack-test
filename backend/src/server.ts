import Fastify from 'fastify'
import cors from '@fastify/cors'

import { getTasksController } from './use-cases/get-tasks'
import { createTaskController } from './use-cases/create-task'
import { updateTaskController } from './use-cases/update-task'
import { deleteTaskController } from './use-cases/delete-task'

const fastify = Fastify()

fastify.register(cors, { origin: 'http://localhost:3000' })

fastify.get('/tasks', (req, reply) => getTasksController.handle(req, reply))
fastify.post('/tasks', (req, reply) => createTaskController.handle(req, reply))
fastify.put('/tasks', (req, reply) => updateTaskController.handle(req, reply))
fastify.delete('/tasks', (req, reply) => deleteTaskController.handle(req, reply))

fastify.listen({ port: 4000 })
