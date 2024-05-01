import { Task, TaskProps } from '../../entities/task'
import { TasksRepository } from '../../repositories/tasks-repository'

export class CreateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async handle(request: Omit<TaskProps, 'id'>): Promise<string> {
    const task = new Task(request)

    const id = await this.tasksRepository.create(task)

    return id
  }
}
