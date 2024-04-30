import { prismaClient } from '../database/prismaClient'
import { Task, TaskProps } from '../entities/task'

export interface ITasksRepository {
  create(task: Task): Promise<string>
  update(task: Partial<TaskProps> & { id: string }): Promise<Task>
  delete(id: string): Promise<string>
}

export class TasksRepository implements ITasksRepository {
  async create(task: Task): Promise<string> {
    const { title, description, startsAt, endsAt } = task

    const { id } = await prismaClient.task.create({ data: { title, description, startsAt, endsAt } })

    return id
  }

  async update(task: Partial<TaskProps> & { id: string }): Promise<Task> {
    const res = await prismaClient.task.update({ data: task, where: { id: task.id } })

    return new Task(res)
  }

  async delete(id: string): Promise<string> {
    const res = await prismaClient.task.delete({ where: { id } })

    return res.id
  }
}
