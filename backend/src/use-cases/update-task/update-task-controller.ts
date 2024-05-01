import { FastifyReply, FastifyRequest } from 'fastify'
import { UpdateTaskUseCase } from './update-task-use-case'
import { UpdateTaskDTO } from './update-task-dto'
import { z } from 'zod'

export class UpdateTaskController {
  constructor(private updateTaskUseCase: UpdateTaskUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { id, ...updatingData } = req.body as UpdateTaskDTO

    try {
      z.object({
        id: z.string().uuid(),
        title: z.string().optional(),
        description: z.string().optional(),
        startsAt: z.string().datetime().optional(),
        endsAt: z.string().datetime().optional(),
      }).parse(req.body)

      const res = await this.updateTaskUseCase.handle({ id, ...updatingData })

      return reply.status(201).send(res.id)
    } catch (err) {
      return reply.status(400).send({
        message: 'Unexpected error',
      })
    }
  }
}
