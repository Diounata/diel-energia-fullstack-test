import Fastify from 'fastify'

import { getTasksByMonthController } from './use-cases/get-tasks-by-month'
import { createTaskController } from './use-cases/create-task'
import { updateTaskController } from './use-cases/update-task'
import { deleteTaskController } from './use-cases/delete-task'

const fastify = Fastify()

fastify.get('/tasks/by-month', (req, reply) => getTasksByMonthController.handle(req, reply))
fastify.post('/tasks', (req, reply) => createTaskController.handle(req, reply))
fastify.put('/tasks', (req, reply) => updateTaskController.handle(req, reply))
fastify.delete('/tasks', (req, reply) => deleteTaskController.handle(req, reply))

fastify.listen({ port: 4000 })
