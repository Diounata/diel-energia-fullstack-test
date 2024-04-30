import { Task, TaskProps } from '../../entities/task'
import { TasksRepository } from '../../repositories/tasks-repository'

export class CreateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async handle(request: TaskProps): Promise<string> {
    const task = new Task(request, request.id)

    const id = await this.tasksRepository.create(task)

    return id
  }
}
