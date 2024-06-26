import { Task, TaskProps } from '../../entities/task'
import { TasksRepository } from '../../repositories/tasks-repository'

export class UpdateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async handle(task: Partial<TaskProps> & { id: string }): Promise<TaskProps> {
    return await this.tasksRepository.update(task)
  }
}
