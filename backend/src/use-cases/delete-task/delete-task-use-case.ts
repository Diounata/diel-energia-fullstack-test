import { TasksRepository } from '../../repositories/tasks-repository'

export class DeleteTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async handle(id: string): Promise<string> {
    return await this.tasksRepository.delete(id)
  }
}
