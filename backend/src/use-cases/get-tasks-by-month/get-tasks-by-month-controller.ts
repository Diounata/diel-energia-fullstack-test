import { FastifyReply, FastifyRequest } from 'fastify'
import { GetTasksByMonthUseCase } from './get-tasks-by-month-use-case'
import { GetTasksByMonthDTO } from './get-tasks-by-month-dto'
import { Prisma } from '@prisma/client'
import { z } from 'zod'

export class GetTasksByMonthController {
  constructor(private getTasksByMonthUseCase: GetTasksByMonthUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { date } = req.query as GetTasksByMonthDTO

    try {
      z.object({ date: z.string().datetime() }).parse(req.query)

      const tasks = await this.getTasksByMonthUseCase.handle(new Date(date))

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
