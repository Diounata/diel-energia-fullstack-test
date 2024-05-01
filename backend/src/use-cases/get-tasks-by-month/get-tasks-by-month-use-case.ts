import { TaskProps } from '../../entities/task'
import { TasksRepository } from '../../repositories/tasks-repository'

export class GetTasksByMonthUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async handle(date: Date): Promise<TaskProps[]> {
    return await this.tasksRepository.getAllByMonth(date)
  }
}
