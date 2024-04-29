import { Task, TaskProps } from '../entities/task'
import { TasksRepository } from '../repositories/tasks-repository'

export class CreateTask {
  constructor(private tasksRepository: TasksRepository) {}

  async handle(request: TaskProps): Promise<Task> {
    const task = new Task(request)

    await this.tasksRepository.create(task)

    return task
  }
}
