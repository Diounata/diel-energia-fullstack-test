import { FastifyReply, FastifyRequest } from 'fastify'
import { DeleteTaskUseCase } from './delete-task-use-case'
import { DeleteTaskDTO } from './delete-task-dto'
import { z } from 'zod'

export class DeleteTaskController {
  constructor(private deleteTaskUseCase: DeleteTaskUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.body as DeleteTaskDTO

    try {
      z.object({
        id: z.string().uuid(),
      })

      await this.deleteTaskUseCase.handle(id)

      return reply.status(200).send(`${id} deleted`)
    } catch (err) {
      reply.status(400).send({ message: 'Unexpected error' })
    }
  }
}
