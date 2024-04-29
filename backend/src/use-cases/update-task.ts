import { TaskProps } from '../entities/task'
import { TasksRepository } from '../repositories/tasks-repository'

export class UpdateTask {
  constructor(private tasksRepository: TasksRepository) {}

  async handle(task: Partial<TaskProps> & { id: string }) {
    return await this.tasksRepository.update(task)
  }
}
