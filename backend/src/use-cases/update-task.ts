import { Task, TaskProps } from '../entities/task'
import { TasksRepository } from '../repositories/tasks-repository'

export class UpdateTask {
  constructor(private tasksRepository: TasksRepository) {}

  async handle(task: Partial<TaskProps> & { id: string }): Promise<Task> {
    return await this.tasksRepository.update(task)
  }
}
