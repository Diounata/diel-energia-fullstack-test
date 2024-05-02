import { prismaClient } from '../database/prismaClient'
import { Task, TaskProps } from '../entities/task'

export interface ITasksRepository {
  getAll(): Promise<TaskProps[]>
  create(task: Task): Promise<string>
  update(task: Partial<TaskProps> & { id: string }): Promise<TaskProps>
  delete(id: string): Promise<string>
}

export class TasksRepository implements ITasksRepository {
  async getAll(): Promise<TaskProps[]> {
    const tasks = await prismaClient.task.findMany()

    return tasks
  }

  async create(task: Task): Promise<string> {
    const { title, description, startsAt, endsAt } = task

    const { id } = await prismaClient.task.create({ data: { title, description, startsAt, endsAt } })

    return id
  }

  async update(task: Partial<TaskProps> & { id: string }): Promise<TaskProps> {
    const res = await prismaClient.task.update({ data: task, where: { id: task.id } })

    return res
  }

  async delete(id: string): Promise<string> {
    const res = await prismaClient.task.delete({ where: { id } })

    return res.id
  }
}
