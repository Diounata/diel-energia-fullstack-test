import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateTaskUseCase } from './create-task-use-case'
import { CreateTaskDTO } from './create-task-dto'

export class CreateTaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { title, description, startsAt, endsAt } = req.body as CreateTaskDTO

    try {
      z.object({
        title: z.string(),
        description: z.string(),
        startsAt: z.string().datetime(),
        endsAt: z.string().datetime(),
      }).parse(req.body)

      const id = await this.createTaskUseCase.handle({
        title,
        description,
        startsAt: new Date(startsAt),
        endsAt: new Date(endsAt),
      })

      return reply.status(201).send(id)
    } catch (err) {
      return reply.status(400).send({
        message: err || 'Unexpected error',
      })
    }
  }
}
