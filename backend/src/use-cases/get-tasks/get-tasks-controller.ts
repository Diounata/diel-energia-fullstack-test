import { FastifyReply, FastifyRequest } from 'fastify'
import { GetTasksUseCase } from './get-tasks-use-case'
import { Prisma } from '@prisma/client'

export class GetTasksController {
  constructor(private getTasksBUseCase: GetTasksUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const tasks = await this.getTasksBUseCase.handle()

      reply.status(200).send(tasks)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return reply.status(400).send({
          error: e.meta?.cause || 'Unexpected error',
          code: 'database_error',
        })
      }

      return reply.status(400).send({
        message: e || 'Unexpected error',
      })
    }
  }
}
