import { TasksRepository } from '../repositories/tasks-repository'

export class DeleteTask {
  constructor(private tasksRepository: TasksRepository) {}

  async handle(id: string): Promise<string> {
    return await this.tasksRepository.delete(id)
  }
}
