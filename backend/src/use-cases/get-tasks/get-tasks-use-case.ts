import { TaskProps } from '../../entities/task'
import { TasksRepository } from '../../repositories/tasks-repository'

export class GetTasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async handle(): Promise<TaskProps[]> {
    return await this.tasksRepository.getAll()
  }
}
